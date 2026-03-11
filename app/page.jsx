import PortalClient from "../components/PortalClient";
import { loadPortalPages } from "@/lib/loadPortalPages";

export const metadata = {
  title: "Richard Gamarra Portal",
  description:
    "Richard Gamarra Portal - infrastructure, systems, automation, and practical technology leadership.",
};

export default async function Page() {
  const portalPages = await loadPortalPages();

  return <PortalClient initialContent={portalPages} />;
}