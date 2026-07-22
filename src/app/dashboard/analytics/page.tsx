import { redirect } from "next/navigation";

export default function AnalyticsPage() {
  // Analytics UI is not production-ready yet.
  redirect("/dashboard");
}
