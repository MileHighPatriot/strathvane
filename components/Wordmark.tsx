import Link from "next/link";
import BrandMark from "@/components/BrandMark";

/** Mark plus the HTML wordmark: STRATH / VANE in Michroma, ROOFING SYSTEMS under it. */
export default function Wordmark() {
  return (
    <Link href="/" className="lockup" aria-label="Strathvane home">
      <BrandMark size={40} className="lockup-mark" />
      <span className="lockup-text" aria-hidden="true">
        <span className="wordmark">
          STRATH<span className="wordmark-vane">VANE</span>
        </span>
        <span className="wordmark-sub">ROOFING SYSTEMS</span>
      </span>
    </Link>
  );
}
