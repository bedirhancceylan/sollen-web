import Image from "next/image";

const HEIGHTS = { sm: 30, md: 40, lg: 58 } as const;
const ISGENIUS_RATIO = 1662 / 1112; // intrinsic aspect of the ISGenius logo
const SOLLEN_RATIO = 214 / 119; // intrinsic aspect of the Sollen logo

interface IsGeniusBadgeProps {
  className?: string;
  size?: keyof typeof HEIGHTS;
  /**
   * When true, shows the Sollen logo side by side at the same size — a clean
   * co-brand lockup. When false, only the ISGenius logo is shown (app screens).
   */
  withSollen?: boolean;
}

export default function IsGeniusBadge({ className = "", size = "sm", withSollen }: IsGeniusBadgeProps) {
  const h = HEIGHTS[size];
  return (
    <span className={`inline-flex items-center gap-4 ${className}`}>
      <Image
        src="/logos/isgenius-logo.png"
        alt="ISGenius"
        width={Math.round(h * ISGENIUS_RATIO)}
        height={h}
        className="w-auto object-contain"
        style={{ height: h }}
      />
      {withSollen && (
        <>
          <span aria-hidden className="w-px self-stretch bg-[#0A1128]/15" />
          <Image
            src="/logos/beyaz-ustu-logo-1.png"
            alt="Sollen"
            width={Math.round(h * SOLLEN_RATIO)}
            height={h}
            className="w-auto object-contain"
            style={{ height: h }}
          />
        </>
      )}
    </span>
  );
}
