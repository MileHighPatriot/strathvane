export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#15181c" />
      <path d="M13 47L32 31L51 47" fill="none" stroke="#c8cdd4" strokeWidth="6.5" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M13 33L32 17L51 33" fill="none" stroke="#8b82f2" strokeWidth="6.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
