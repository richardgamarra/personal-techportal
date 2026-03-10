import { contentIndex } from "@/data/contentIndex";
import { loadPortalHtmlPages } from "@/lib/loadPortalPages";
import PortalClient from "@/components/PortalClient";

export default function Page() {
  const autoHtmlPages = loadPortalHtmlPages();

  const mergedContent = [
    ...autoHtmlPages,
    ...contentIndex.filter(
      (manualItem) =>
        !autoHtmlPages.some(
          (autoItem) =>
            autoItem.href === manualItem.href ||
            autoItem.path === manualItem.path ||
            autoItem.id === manualItem.id
        )
    ),
  ];

  return <PortalClient initialContent={mergedContent} />;
}