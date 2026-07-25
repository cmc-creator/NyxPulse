import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { courses } from "@/lib/courses";
import OrgPortalClient from "@/components/OrgPortalClient";
import type { OrgMember } from "@/lib/org/types";
import type { PublicUserMetadata } from "@/lib/user-metadata";

export default async function OrgPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const pub = (user.publicMetadata ?? {}) as PublicUserMetadata;

  return (
    <OrgPortalClient
      initialPlan={pub.plan ?? "individual"}
      initialOrgName={pub.orgName ?? "Your Organization"}
      initialOrgRole={pub.orgRole ?? "admin"}
      initialMembers={(pub.orgMembers ?? []) as OrgMember[]}
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
