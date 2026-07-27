import { getSessionUser } from "@/lib/auth/server";
import {
  findUserIdByEmail,
  updateUserProfile,
  type UserProfile,
} from "@/lib/auth/profile";
import { courses } from "@/lib/courses";
import { enrollUserInCourses } from "@/lib/enrollment";
import { sendTeamInvitationEmail } from "@/lib/email-automation";
import { saveOrgInvite } from "@/lib/org/store";
import type { OrgMember } from "@/lib/org/types";
import { getRoleMatrix } from "@/lib/roles/matrices";

function requireTeamAdmin(profile: UserProfile) {
  const plan = profile.plan ?? "individual";
  const orgRole = profile.orgRole ?? "admin";
  if (plan === "individual") {
    return { error: "Team or Organization plan required", status: 403 as const };
  }
  if (orgRole !== "admin") {
    return { error: "Only team admins can manage the roster", status: 403 as const };
  }
  return null;
}

export async function GET() {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { profile } = session;
    return Response.json({
      plan: profile.plan ?? "individual",
      orgName: profile.orgName ?? "Your Organization",
      orgRole: profile.orgRole ?? "admin",
      members: profile.orgMembers ?? [],
      catalog: courses.map((c) => ({
        slug: c.slug,
        shortTitle: c.shortTitle,
        title: c.title,
        icon: c.icon,
        price: c.price,
      })),
    });
  } catch (err) {
    console.error("Failed to load org:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let action: string;
  let email: string | undefined;
  let name: string | undefined;
  let courseSlugs: string[] | undefined;
  let workforceRoleId: string | undefined;
  let memberEmail: string | undefined;

  try {
    const body = await req.json();
    action = body?.action;
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : undefined;
    name = typeof body?.name === "string" ? body.name.trim() : undefined;
    courseSlugs = Array.isArray(body?.courseSlugs)
      ? body.courseSlugs.filter((s: unknown): s is string => typeof s === "string")
      : undefined;
    workforceRoleId =
      typeof body?.workforceRoleId === "string" ? body.workforceRoleId : undefined;
    memberEmail =
      typeof body?.memberEmail === "string" ? body.memberEmail.trim().toLowerCase() : undefined;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const { userId, profile, displayName } = session;
    const gate = requireTeamAdmin(profile);
    if (gate) return Response.json({ error: gate.error }, { status: gate.status });

    const orgName = profile.orgName ?? "Your Organization";
    const members: OrgMember[] = [...(profile.orgMembers ?? [])];
    const adminName = displayName || "Team admin";

    if (action === "invite") {
      if (!email || !name) {
        return Response.json({ error: "Name and email are required" }, { status: 400 });
      }
      if (members.some((m) => m.email.toLowerCase() === email)) {
        return Response.json({ error: "Member already on roster" }, { status: 400 });
      }

      const role = workforceRoleId ? getRoleMatrix(workforceRoleId) : null;
      const assigned =
        courseSlugs && courseSlugs.length > 0
          ? courseSlugs
          : role
            ? role.requiredCourseSlugs
            : [];

      const token = `INV-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;
      const createdAt = new Date().toISOString();
      const expires = new Date();
      expires.setUTCDate(expires.getUTCDate() + 7);

      await saveOrgInvite({
        token,
        orgAdminUserId: userId,
        orgName,
        email,
        name,
        courseSlugs: assigned,
        workforceRoleId,
        createdAt,
        expiresAt: expires.toISOString(),
      });

      members.push({
        email,
        name,
        courses: assigned,
        completedCourses: [],
        workforceRoleId,
        invitedAt: createdAt,
        status: "invited",
      });

      await updateUserProfile(userId, {
        orgMembers: members,
        orgRole: profile.orgRole ?? "admin",
        orgName,
      });

      const existingUserId = await findUserIdByEmail(email);
      if (existingUserId && assigned.length > 0) {
        await enrollUserInCourses({ userId: existingUserId, courseSlugs: assigned });
        const idx = members.findIndex((m) => m.email === email);
        if (idx >= 0) members[idx] = { ...members[idx], status: "active" };
        await updateUserProfile(userId, { orgMembers: members, orgName });
      }

      const emailResult = await sendTeamInvitationEmail(
        email,
        adminName,
        orgName,
        token,
        "learner"
      );

      return Response.json({
        success: true,
        members,
        inviteToken: token,
        emailSent: emailResult.success,
        emailError: emailResult.error,
      });
    }

    if (action === "assign") {
      if (!memberEmail) {
        return Response.json({ error: "memberEmail is required" }, { status: 400 });
      }
      if (!courseSlugs || courseSlugs.length === 0) {
        return Response.json({ error: "Select at least one course" }, { status: 400 });
      }
      const valid = new Set(courses.map((c) => c.slug));
      if (courseSlugs.some((slug) => !valid.has(slug))) {
        return Response.json({ error: "Unknown course slug" }, { status: 400 });
      }

      const idx = members.findIndex((m) => m.email.toLowerCase() === memberEmail);
      if (idx < 0) {
        return Response.json({ error: "Member not found on roster" }, { status: 404 });
      }

      const nextCourses = Array.from(new Set([...members[idx].courses, ...courseSlugs]));
      members[idx] = { ...members[idx], courses: nextCourses };

      await updateUserProfile(userId, { orgMembers: members });

      const existingUserId = await findUserIdByEmail(memberEmail);
      if (existingUserId) {
        await enrollUserInCourses({
          userId: existingUserId,
          courseSlugs,
        });
      }

      return Response.json({ success: true, members });
    }

    if (action === "assign-role") {
      if (!memberEmail || !workforceRoleId) {
        return Response.json({ error: "memberEmail and workforceRoleId required" }, { status: 400 });
      }
      const role = getRoleMatrix(workforceRoleId);
      if (!role) return Response.json({ error: "Unknown role" }, { status: 400 });

      const idx = members.findIndex((m) => m.email.toLowerCase() === memberEmail);
      if (idx < 0) return Response.json({ error: "Member not found" }, { status: 404 });

      const nextCourses = Array.from(
        new Set([...members[idx].courses, ...role.requiredCourseSlugs])
      );
      members[idx] = {
        ...members[idx],
        workforceRoleId,
        courses: nextCourses,
      };

      await updateUserProfile(userId, { orgMembers: members });

      const existingUserId = await findUserIdByEmail(memberEmail);
      if (existingUserId) {
        await enrollUserInCourses({
          userId: existingUserId,
          courseSlugs: role.requiredCourseSlugs,
        });
        await updateUserProfile(existingUserId, { workforceRoleId });
      }

      return Response.json({ success: true, members, role });
    }

    if (action === "bootstrap-org") {
      const desiredName =
        typeof name === "string" && name.length > 0 ? name : `${adminName}'s Team`;
      await updateUserProfile(userId, {
        plan: profile.plan === "org" ? "org" : "team",
        orgRole: "admin",
        orgName: desiredName,
        orgMembers: profile.orgMembers ?? [],
      });
      return Response.json({ success: true, plan: "team", orgName: desiredName });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("Org admin action failed:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
