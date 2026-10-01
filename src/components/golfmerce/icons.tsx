import type { ReactNode } from "react";

/** One stroke style for every GolfMerce-layout icon (1.6px, round caps). */
function Icon({
  children,
  className = "h-5 w-5",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

type P = { className?: string };

export const HomeIcon = (p: P) => (
  <Icon {...p}>
    <path d="M4 11 12 4l8 7v9h-5v-6H9v6H4v-9Z" />
  </Icon>
);
export const BagIcon = (p: P) => (
  <Icon {...p}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </Icon>
);
export const SparkIcon = (p: P) => (
  <Icon {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </Icon>
);
export const PeopleIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9.5" r="2.3" />
    <path d="M3.5 20c.6-3.4 2.9-5.5 5.5-5.5s4.9 2.1 5.5 5.5M14.5 20c.4-2.5 1.9-4.2 4-4.6" />
  </Icon>
);
export const ChartIcon = (p: P) => (
  <Icon {...p}>
    <path d="M4 20V10M11 20V4M18 20v-7M3 20h18" />
  </Icon>
);
export const SearchIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Icon>
);
export const ChevronLeft = (p: P) => (
  <Icon {...p}>
    <path d="m15 5-7 7 7 7" />
  </Icon>
);
export const ChevronRight = (p: P) => (
  <Icon {...p}>
    <path d="m9 5 7 7-7 7" />
  </Icon>
);
export const ArrowRight = (p: P) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);
export const ClubIcon = (p: P) => (
  <Icon {...p}>
    <path d="M18.5 2.5 11 16.5" />
    <path d="M11 16.5c1 .3 1.6 1.4 1.2 2.4l-.3.8c-.3.8-1 1.3-1.9 1.3H5.2c-.9 0-1.4-1-.8-1.7 1.6-2 4.2-3.3 6.6-2.8Z" />
  </Icon>
);
export const BallIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="10" cy="9.5" r=".6" fill="currentColor" />
    <circle cx="13.5" cy="10" r=".6" fill="currentColor" />
    <circle cx="11.5" cy="13" r=".6" fill="currentColor" />
    <circle cx="15" cy="13.5" r=".6" fill="currentColor" />
  </Icon>
);
export const GolfBagIcon = (p: P) => (
  <Icon {...p}>
    <rect x="7" y="8" width="8" height="13" rx="2" />
    <path d="M9 8V3M12 8V4.5M15 3.5 13.5 8M15 11l3 1v6l-3 1" />
  </Icon>
);
export const CartIcon = (p: P) => (
  <Icon {...p}>
    <path d="M6 3l3 12h8l2-7H8" />
    <circle cx="10" cy="19" r="1.6" />
    <circle cx="16" cy="19" r="1.6" />
  </Icon>
);
export const ShirtIcon = (p: P) => (
  <Icon {...p}>
    <path d="M8 4 4 6.5 5.5 10 7 9.3V20h10V9.3l1.5.7L20 6.5 16 4c-.7 1.4-2.2 2.2-4 2.2S8.7 5.4 8 4Z" />
  </Icon>
);
export const ShoeIcon = (p: P) => (
  <Icon {...p}>
    <path d="M3 17v-6l4-1 3 3 6 1c2.5.4 5 1.4 5 3v1H3Z" />
    <path d="M3 17h18" />
  </Icon>
);
export const GloveIcon = (p: P) => (
  <Icon {...p}>
    <path d="M8 21v-4l-3-4.5a1.4 1.4 0 0 1 2.3-1.6L8 12V5a1.3 1.3 0 0 1 2.6 0v5-6.5a1.3 1.3 0 0 1 2.6 0V10 5a1.3 1.3 0 0 1 2.6 0v5.5-3a1.3 1.3 0 0 1 2.6 0V15a6 6 0 0 1-2.4 4.8V21" />
  </Icon>
);
export const CapIcon = (p: P) => (
  <Icon {...p}>
    <path d="M4 15a8 8 0 0 1 16 0H4Z" />
    <path d="M12 7V5.5M20 15h2" />
  </Icon>
);
export const TargetIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r=".8" fill="currentColor" />
  </Icon>
);
export const ScreenIcon = (p: P) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M9 20h6M12 16v4" />
  </Icon>
);
export const FlagIcon = (p: P) => (
  <Icon {...p}>
    <path d="M6 21V3l11 4-11 4" />
    <path d="M3 21h9" />
  </Icon>
);
export const WrenchIcon = (p: P) => (
  <Icon {...p}>
    <path d="M14.5 6.5a4 4 0 0 0 5 5L14 17l-4 4-3-3 4-4 5.5-5.5a4 4 0 0 1-5-5l2.5 2.5 2-2-2.5-2.5Z" />
  </Icon>
);
export const RefreshIcon = (p: P) => (
  <Icon {...p}>
    <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4" />
  </Icon>
);
export const StarIcon = (p: P) => (
  <Icon {...p}>
    <path d="m12 4 2.4 5 5.6.6-4.2 3.8 1.2 5.6L12 16.2 7 19l1.2-5.6L4 9.6 9.6 9 12 4Z" />
  </Icon>
);
export const PlaneIcon = (p: P) => (
  <Icon {...p}>
    <path d="M10.5 13.5 3 11l1.5-1.5 8 .5 4-4a2 2 0 0 1 3 3l-4 4 .5 8L14.5 22l-2.5-7.5" />
  </Icon>
);
export const CompassIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </Icon>
);
export const ScaleIcon = (p: P) => (
  <Icon {...p}>
    <path d="M12 4v16M8 20h8M5 7h14M5 7l-2.5 6a2.5 2.5 0 0 0 5 0L5 7ZM19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7Z" />
  </Icon>
);
