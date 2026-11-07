/**
 * Strathvane icon set: 24px grid, 1.75px stroke, rounded caps and joins, drawn in currentColor
 * (Vane Iris or Frost Lilac on dark, Iris Deep on light, set by the parent).
 */
const paths = {
  roof: "M2.5 12.5 12 4.5l9.5 8M5.5 10.2V19.5h13V10.2M10 19.5v-5h4v5",
  shingle: "M3 7.5h18M3 12h18M3 16.5h18M7.5 7.5V12M14 7.5V12M10.75 12v4.5M17.25 12v4.5M5 16.5v3M12 16.5v3M19 16.5v3",
  ridgeVent: "M2.5 15 12 7l9.5 8M7 10.8V9h10v1.8M9.5 9V7.5M12 9V7M14.5 9V7.5",
  gutter: "M3 7h18M4 7v3.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7M16.5 12.5v7M14.5 19.5h4",
  skylight: "M2.5 14 12 6l9.5 8M9 10.5h6v4.5H9zM12 10.5V15M9 12.75h6",
  chimneyFlashing: "M2.5 15 12 7l9.5 8M14.5 9.1V4.5h3v7M13.5 11.5h5M13.5 9.5l1-.5",
  drone: "M9 12h6M12 10v4M5 7.5h3M16 7.5h3M6.5 7.5 9 10.5M17.5 7.5 15 10.5M9 13.5l-2.5 3M15 13.5l2.5 3M5 16.5h3M16 16.5h3",
  satellite: "M8 5.5 5.5 8l4 4L12 9.5zM12 9.5l2.5-2.5 4 4-2.5 2.5zM9.5 12l2.5 2.5M12.75 15.25a3.5 3.5 0 0 0 3.5 3.5M12.5 19a6.5 6.5 0 0 0 6.5-6.5",
  hail: "M7 13.5a4 4 0 0 1 .3-8 5.5 5.5 0 0 1 10.4 1.6A3.2 3.2 0 0 1 17 13.5zM8 17.5v.01M12 16v.01M16 17.5v.01M10 20.5v.01M14 20.5v.01",
  stormCloud: "M7 15.5a4 4 0 0 1 .3-8 5.5 5.5 0 0 1 10.4 1.6A3.2 3.2 0 0 1 17 15.5zM9 18.5l-1 2M13 18.5l-1 2M17 18.5l-1 2",
  tape: "M4 6.5h11a5 5 0 0 1 0 10H4zM15 11.5h.01M4 16.5V19h16M8 16.5v-2M11 16.5v-1.5",
  warning: "M12 4 21 19.5H3zM12 10v4M12 16.75v.01",
  phone:
    "M6.5 3.5h3l1.5 4-2 1.25a10 10 0 0 0 6.25 6.25L16.5 13l4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2z",
  calendar: "M4.5 6h15v13.5h-15zM4.5 10h15M8.5 3.75V7.5M15.5 3.75V7.5M8 13.5h2M11 13.5h2M14 13.5h2M8 16.5h2",
  pin: "M12 21s6.5-6.1 6.5-11.25a6.5 6.5 0 0 0-13 0C5.5 15 12 21 12 21zM12 12.25a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  shield: "M12 3.5 19 6v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6zM9 12l2 2 4-4.5",
  check: "M5 12.5 10 17.5 19.5 7",
  arrow: "M4.5 12h15M13.5 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h10",
  close: "M6 6l12 12M18 6 6 18",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 24, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`icon ${className}`}
    >
      <path d={paths[name]} />
    </svg>
  );
}
