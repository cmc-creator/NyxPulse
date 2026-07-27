import { getSessionUserId } from "@/lib/auth/server";
import { getDrillTemplate } from "@/lib/drills/catalog";
import { getDrill, updateDrill } from "@/lib/drills/store";
import type { DrillRecord } from "@/lib/drills/types";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const userId = await getSessionUserId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  try {
    const drill = await getDrill(id);
    if (!drill) return Response.json({ error: "Drill not found" }, { status: 404 });
    if (drill.organizerUserId !== userId) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    const template = getDrillTemplate(drill.templateId) ?? null;
    return Response.json({ drill, template });
  } catch (err) {
    console.error("Failed to load drill:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, ctx: Ctx) {
  const userId = await getSessionUserId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  let action: string;
  let note: string | undefined;
  let afterAction:
    | {
        whatWentWell: string;
        gaps: string;
        actions: string;
        score: number;
      }
    | undefined;

  try {
    const body = await req.json();
    action = body?.action;
    note = typeof body?.note === "string" ? body.note.trim() : undefined;
    afterAction = body?.afterAction;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const existing = await getDrill(id);
    if (!existing) return Response.json({ error: "Drill not found" }, { status: 404 });
    if (existing.organizerUserId !== userId) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    let next: DrillRecord = { ...existing };

    if (action === "timeline") {
      if (!note) return Response.json({ error: "Note required" }, { status: 400 });
      next = {
        ...next,
        timeline: [...next.timeline, { at: new Date().toISOString(), note }],
      };
    } else if (action === "abort") {
      next = {
        ...next,
        status: "aborted",
        endedAt: new Date().toISOString(),
        timeline: [
          ...next.timeline,
          { at: new Date().toISOString(), note: note || "Drill aborted" },
        ],
      };
    } else if (action === "complete") {
      if (
        !afterAction ||
        typeof afterAction.whatWentWell !== "string" ||
        typeof afterAction.gaps !== "string" ||
        typeof afterAction.actions !== "string" ||
        typeof afterAction.score !== "number"
      ) {
        return Response.json({ error: "After-action fields required" }, { status: 400 });
      }
      const score = Math.max(0, Math.min(100, Math.round(afterAction.score)));
      next = {
        ...next,
        status: "completed",
        endedAt: new Date().toISOString(),
        afterAction: {
          whatWentWell: afterAction.whatWentWell.trim(),
          gaps: afterAction.gaps.trim(),
          actions: afterAction.actions.trim(),
          score,
          completedAt: new Date().toISOString(),
        },
        timeline: [
          ...next.timeline,
          {
            at: new Date().toISOString(),
            note: `After-action completed (team score ${score})`,
          },
        ],
      };
    } else {
      return Response.json({ error: "Unknown action" }, { status: 400 });
    }

    await updateDrill(next);
    return Response.json({ success: true, drill: next });
  } catch (err) {
    console.error("Failed to update drill:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
