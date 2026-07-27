import { getSessionUser } from "@/lib/auth/server";
import { isInstructorUser, pinAllowsSignoff } from "@/lib/skills/auth";
import { getSkillSheet, skillSheets, type SkillSignoff } from "@/lib/skills/sheets";
import {
  listRecentSkillSignoffs,
  listSkillSignoffsForLearner,
  saveSkillSignoff,
} from "@/lib/skills/store";

export async function GET(req: Request) {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, email, profile } = session;
  const learnerId = new URL(req.url).searchParams.get("learnerUserId") ?? userId;

  try {
    const instructor = isInstructorUser({
      emailAddresses: email ? [email] : [],
      publicMetadata: { instructor: profile.instructor },
    });

    const mine = await listSkillSignoffsForLearner(learnerId);
    const recent = instructor ? await listRecentSkillSignoffs(30) : [];

    return Response.json({
      sheets: skillSheets,
      signoffs: mine,
      recent,
      isInstructor: instructor,
      pinConfigured: Boolean(process.env.NYXPULSE_INSTRUCTOR_PIN),
    });
  } catch (err) {
    console.error("Failed to load skills:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, email, firstName, lastName, displayName, profile } = session;

  let courseSlug: string;
  let learnerUserId: string;
  let learnerName: string;
  let skillIds: string[];
  let notes: string | undefined;
  let pin: string | undefined;
  let instructorNameOverride: string | undefined;

  try {
    const body = await req.json();
    courseSlug = body?.courseSlug;
    learnerUserId = body?.learnerUserId || userId;
    learnerName = typeof body?.learnerName === "string" ? body.learnerName.trim() : "";
    skillIds = Array.isArray(body?.skillIds)
      ? body.skillIds.filter((id: unknown): id is string => typeof id === "string")
      : [];
    notes = typeof body?.notes === "string" ? body.notes.trim() : undefined;
    pin = typeof body?.pin === "string" ? body.pin : undefined;
    instructorNameOverride =
      typeof body?.instructorName === "string" ? body.instructorName.trim() : undefined;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const sheet = getSkillSheet(courseSlug);
  if (!sheet) {
    return Response.json({ error: "No skill sheet for this course" }, { status: 404 });
  }
  if (!learnerName) {
    return Response.json({ error: "Learner name is required" }, { status: 400 });
  }
  if (skillIds.length === 0) {
    return Response.json({ error: "Select at least one skill" }, { status: 400 });
  }
  const validIds = new Set(sheet.skills.map((s) => s.id));
  if (skillIds.some((id) => !validIds.has(id))) {
    return Response.json({ error: "Invalid skill id" }, { status: 400 });
  }

  try {
    const instructor = isInstructorUser({
      emailAddresses: email ? [email] : [],
      publicMetadata: { instructor: profile.instructor },
    });
    const pinOk = pinAllowsSignoff(pin);

    if (!instructor && !pinOk) {
      return Response.json(
        {
          error:
            "Instructor authorization required. Use an approved instructor account or the facility PIN.",
        },
        { status: 403 }
      );
    }

    const instructorName =
      instructorNameOverride ||
      [firstName, lastName].filter(Boolean).join(" ") ||
      displayName ||
      "NyxPulse Instructor";
    const instructorEmail = email || "instructor@nyxpulse.local";

    const signoff: SkillSignoff = {
      id: `SKILL-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`,
      courseSlug,
      learnerUserId,
      learnerName,
      instructorName,
      instructorEmail,
      skillIds,
      notes,
      signedAt: new Date().toISOString(),
      method: "instructor-portal",
    };

    await saveSkillSignoff(signoff);
    return Response.json({ success: true, signoff });
  } catch (err) {
    console.error("Failed to save skill signoff:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
