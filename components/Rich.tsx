import { Fragment } from "react";
import { phoneHref } from "@/lib/paths";

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(Dial 911|\(555\) 555-0142)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part === "Dial 911") return <strong key={index}>Dial 911</strong>;
        if (part === "(555) 555-0142") {
          return (
            <a key={index} className="text-link" href={phoneHref}>
              (555) 555-0142
            </a>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
