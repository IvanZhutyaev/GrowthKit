import Layout from "../components/Layout";
import AuthFeature from "../features/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function AuthPage() {
  return (
    <Layout>
      <AuthFeature apiBaseUrl={API_BASE_URL} />
    </Layout>
  );
}
