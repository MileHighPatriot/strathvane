import type { SVGProps } from "react";

const common = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export type IconName =
  | "roof"
  | "shingle"
  | "ridge"
  | "gutter"
  | "skylight"
  | "flashing"
  | "drone"
  | "satellite"
  | "hail"
  | "cloud"
  | "tape"
  | "warning"
  | "phone"
  | "calendar"
  | "pin"
  | "shield"
  | "check"
  | "arrow";

function Path({ d }: { d: string }) {
  return <path d={d} />;
}

const paths: Record<IconName, string> = {
  roof: "M3 11.5 12 4l9 7.5V20H3v-8.5Z M12 4v16",
  shingle: "M4 7h7v5H4V7Zm9 0h7v5h-7V7ZM4 14h7v5H4v-5Zm9 0h7v5h-7v-5Z",
  ridge: "M3 15 12 8l9 7 M7 13.5h10 M8.5 16.5h7",
  gutter: "M3 8h18 M4 8v5a4 4 0 0 0 4 4h1 M20 8c0 6-2 8-5 8h-1 M12 17v3",
  skylight: "M4 15 12 8l8 7 M8 13.2 12 10l4 3.2V17H8v-3.8Z",
  flashing: "M8 4h6v7H8V4Z M5 11h12 M5 14h8 M4 18h16",
  drone: "M12 12v2.5 M12 9.5V8 M5 7l2.2 2.2 M19 7l-2.2 2.2 M5 17l2.2-2.2 M19 17l-2.2-2.2 M9.2 12h5.6",
  satellite: "M8 16 14 10 M10 8l6 6 M14 6l4 4 M7 17l-2 2 M15.5 8.5l1.5-1.5",
  hail: "M8 8.5a1.6 1.6 0 1 0 0.1 0 M15 7a1.3 1.3 0 1 0 0.1 0 M12 14a1.8 1.8 0 1 0 0.1 0",
  cloud: "M7 17h9a3.5 3.5 0 0 0 .4-7 4.5 4.5 0 0 0-8.6-1.2A3.2 3.2 0 0 0 7 17Z",
  tape: "M4 9h16v6H4V9Z M8 9v6 M12 12h5",
  warning: "M12 4 3.5 19h17L12 4Z M12 10v4 M12 16.5h.01",
  phone: "M8 4h2.5l1.2 3-1.7 1a12 12 0 0 0 5 5l1-1.7 3 1.2V16a2 2 0 0 1-2 2A13 13 0 0 1 6 6a2 2 0 0 1 2-2Z",
  calendar: "M5 6h14v14H5V6Z M5 10h14 M8 4v4 M16 4v4",
  pin: "M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z M12 11.2a1.6 1.6 0 1 0 0.1 0",
  shield: "M12 3.5 5 6.5v5.2c0 4 2.8 6.8 7 8.3 4.2-1.5 7-4.3 7-8.3V6.5L12 3.5Z",
  check: "M5 12.5 9.2 17 19 7",
  arrow: "M5 12h14 M13 6l6 6-6 6",
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg {...common} {...props}>
      <Path d={paths[name]} />
    </svg>
  );
}
