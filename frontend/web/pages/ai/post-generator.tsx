import Layout from "../../components/Layout";
import AiPostGeneratorFeature from "../../features/ai_post_generator";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function AiPostGeneratorPage() {
  return (
    <Layout>
      <AiPostGeneratorFeature apiBaseUrl={API_BASE_URL} />
    </Layout>
  );
}
