import Layout from "../../components/Layout";
import ChannelSearchFeature from "../../features/channel_search";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function ChannelSearchPage() {
  return (
    <Layout>
      <ChannelSearchFeature apiBaseUrl={API_BASE_URL} />
    </Layout>
  );
}
