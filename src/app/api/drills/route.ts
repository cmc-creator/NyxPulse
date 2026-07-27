import { getSessionUser, getSessionUserId } from "@/lib/auth/server";
import { drillTemplates, getDrillTemplate } from "@/lib/drills/catalog";
import { createDrill, listDrillsForUser } from "@/lib/drills/store";
import type { DrillRecord, DrillRole } from "@/lib/drills/types";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const drills = await listDrillsForUser(userId);
    return Response.json({ templates: drillTemplates, drills });
  } catch (err) {
    console.error("Failed to list drills:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, firstName, lastName, displayName } = session;

  let templateId: string;
  let facilityName: string;
  let participants: { name: string; roleId: DrillRole }[] | undefined;

  try {
    const body = await req.json();
    templateId = body?.templateId;
    facilityName = typeof body?.facilityName === "string" ? body.facilityName.trim() : "";
    participants = body?.participants;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const template = getDrillTemplate(templateId);
  if (!template) {
    return Response.json({ error: "Unknown drill template" }, { status: 404 });
  }
  if (!facilityName) {
    return Response.json({ error: "Facility name is required" }, { status: 400 });
  }

  try {
    const organizerName =
      [firstName, lastName].filter(Boolean).join(" ") || displayName || "Drill organizer";

    const defaultParticipants =
      participants && Array.isArray(participants) && participants.length > 0
        ? participants
        : template.roles.map((role) => ({
            name: role.label,
            roleId: role.id,
          }));

    const record: DrillRecord = {
      id: `DRILL-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`,
      templateId: template.id,
      title: template.title,
      organizerUserId: userId,
      organizerName,
      facilityName,
      startedAt: new Date().toISOString(),
      status: "active",
      participants: defaultParticipants,
      timeline: [
        {
          at: new Date().toISOString(),
          note: `Drill started — ${template.title} at ${facilityName}`,
        },
      ],
    };

    await createDrill(record);
    return Response.json({ success: true, drill: record });
  } catch (err) {
    console.error("Failed to start drill:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
