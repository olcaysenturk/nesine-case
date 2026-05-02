import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import BetsView from "./bets-view";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home");
}

export default function BetsPage() {
  return <BetsView />;
}
