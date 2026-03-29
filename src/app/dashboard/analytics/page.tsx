import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

export const metadata = {
  title: "Analytics | NyxPulse Dashboard",
  description: "View detailed analytics and learner progress metrics",
};

export default async function AnalyticsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // In production, check if user is admin or has analytics permission
  const isAdmin = true; // TODO: check user role

  if (!isAdmin) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-slate-400">
          You don't have permission to view analytics. Contact your administrator.
        </p>
      </div>
    );
  }

  return <AnalyticsDashboard />;
}
