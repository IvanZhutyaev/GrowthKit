import Layout from "../components/Layout";
import DashboardFeature from "../features/dashboard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function DashboardPage() {
  return (
    <Layout>
      <DashboardFeature apiBaseUrl={API_BASE_URL} />
    </Layout>
  );
}
