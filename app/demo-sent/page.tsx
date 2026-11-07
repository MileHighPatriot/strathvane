import Link from "next/link";
import { demoLine } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Demo Only | Strathvane",
  description: demoLine,
  path: "/demo-sent/",
  noindex: true,
});

export default function DemoSent() {
  return (
    <section className="page-hero page-min" aria-labelledby="ds-title">
      <div className="wrap narrow">
        <h1 id="ds-title">Demo only</h1>
        <p className="lead">{demoLine}</p>
        <Link href="/" className="btn btn-iris">
          Go to the home page
        </Link>
      </div>
    </section>
  );
}
