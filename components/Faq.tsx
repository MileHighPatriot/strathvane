import { Rich } from "@/components/Rich";

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>
            <Rich text={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
