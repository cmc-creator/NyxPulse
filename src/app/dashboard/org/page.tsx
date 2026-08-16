import { getSessionUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { courses } from "@/lib/courses";
import OrgPortalClient from "@/components/OrgPortalClient";
import type { OrgMember } from "@/lib/org/types";

export default async function OrgPage() {
  const session = await getSessionUser();
  if (!session) redirect("/sign-in");

  const profile = session.profile;

  return (
    <OrgPortalClient
      initialPlan={profile.plan ?? "individual"}
      initialOrgName={profile.orgName ?? "Your Organization"}
      initialOrgRole={profile.orgRole ?? "admin"}
      initialMembers={(profile.orgMembers ?? []) as OrgMember[]}
      catalog={courses.map((c) => ({
        slug: c.slug,
        shortTitle: c.shortTitle,
        title: c.title,
        icon: c.icon,
        price: c.price ?? null,
      }))}
    />
  );
}
