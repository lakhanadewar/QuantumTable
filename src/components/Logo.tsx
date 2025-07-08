export default function Logo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <rect width="36" height="36" rx="8" fill="currentColor" />
      <text
        x="18"
        y="26"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="18"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        QT
      </text>
    </svg>
  );
}
