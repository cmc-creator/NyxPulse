import { getSessionUser } from "@/lib/auth/server";
import { findUserIdByEmail, updateUserProfile, type OrgMember } from "@/lib/auth/profile";
import { courses } from "@/lib/courses";
import { sendTeamInvitationEmail } from "@/lib/email-automation";
import { saveOrgInvite } from "@/lib/org/store";
import { getRoleMatrix } from "@/lib/roles/matrices";

function requireTeamAdmin(user: Awaited<ReturnType<typeof getSessionUser>>) {
  if (!user) return { error: "Unauthorized", status: 401 as const };
  if (user.profile.plan === "individual") return { error: "Team or Organization plan required", status: 403 as const };
  if ((user.profile.orgRole ?? "admin") !== "admin") return { error: "Only team admins can manage the roster", status: 403 as const };
  return null;
}

export async function GET() {
  const user = await getSessionUser();
  const gate = requireTeamAdmin(user);
  if (gate) return Response.json({ error: gate.error }, { status: gate.status });
  return Response.json({
    plan: user.profile.plan,
    orgName: user.profile.orgName ?? "Your Organization",
    orgRole: user.profile.orgRole ?? "admin",
    members: user.profile.orgMembers ?? [],
    catalog: courses.map((course) => ({ slug: course.slug, shortTitle: course.shortTitle, title: course.title, icon: course.icon, price: course.price })),
  });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  const gate = requireTeamAdmin(user);
  if (gate) return Response.json({ error: gate.error }, { status: gate.status });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.action !== "string") return Response.json({ error: "Invalid request body" }, { status: 400 });

  const members: OrgMember[] = [...(user.profile.orgMembers ?? [])];
  const orgName = user.profile.orgName ?? "Your Organization";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const courseSlugs = Array.isArray(body.courseSlugs) ? body.courseSlugs.filter((item: unknown): item is string => typeof item === "string") : [];

  if (body.action === "invite") {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!email || !name) return Response.json({ error: "Name and email are required" }, { status: 400 });
    if (members.some((member) => member.email.toLowerCase() === email)) return Response.json({ error: "Member already on roster" }, { status: 400 });
    const workforceRoleId = typeof body.workforceRoleId === "string" ? body.workforceRoleId : undefined;
    const assigned = courseSlugs.length ? courseSlugs : getRoleMatrix(workforceRoleId ?? "")?.requiredCourseSlugs ?? [];
    const now = new Date().toISOString();
    const token = `INV-${crypto.randomUUID()}`;
    const expires = new Date(Date.now() + 7 * 86400000).toISOString();
    await saveOrgInvite({ token, orgAdminUserId: user.userId, orgName, email, name, courseSlugs: assigned, workforceRoleId, createdAt: now, expiresAt: expires });
    members.push({ email, name, courses: assigned, completedCourses: [], workforceRoleId, invitedAt: now, status: "invited" });
    await updateUserProfile(user.userId, { orgMembers: members, orgRole: user.profile.orgRole ?? "admin", orgName });
    const emailResult = await sendTeamInvitationEmail(email, user.displayName, orgName, token, "learner");
    return Response.json({ success: true, members, emailSent: emailResult.success, emailError: emailResult.error });
  }

  if (body.action === "assign") {
    const memberEmail = typeof body.memberEmail === "string" ? body.memberEmail.trim().toLowerCase() : "";
    if (!memberEmail || !courseSlugs.length) return Response.json({ error: "memberEmail and courseSlugs are required" }, { status: 400 });
    const index = members.findIndex((member) => member.email.toLowerCase() === memberEmail);
    if (index < 0) return Response.json({ error: "Member not found" }, { status: 404 });
    members[index] = { ...members[index], courses: Array.from(new Set([...members[index].courses, ...courseSlugs])) };
    await updateUserProfile(user.userId, { orgMembers: members });
    const memberId = await findUserIdByEmail(memberEmail);
    if (memberId) await updateUserProfile(memberId, { courses: members[index].courses });
    return Response.json({ success: true, members });
  }

  return Response.json({ error: "Unsupported organization action" }, { status: 400 });
}
