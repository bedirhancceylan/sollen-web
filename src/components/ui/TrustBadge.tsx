interface TrustBadgeProps {
  label: string;
  sub?: string;
  logo?: string;
}

export default function TrustBadge({ label, sub, logo }: TrustBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-5 py-4 bg-[#0A1128]/[0.03] border border-[#0A1128]/10 rounded-2xl min-w-[200px]">
      {logo && (
        <div className="h-10 flex items-center justify-center">
          <img src={logo} alt={label} className="max-h-full max-w-[120px] object-contain" />
        </div>
      )}
      <div className="flex flex-col items-center text-center gap-1 mt-1">
        <span className="text-[#1E3A8A] text-sm font-semibold tracking-tight whitespace-pre-line">{label}</span>
        {sub && <span className="text-[#0A1128]/60 text-xs">{sub}</span>}
      </div>
    </div>
  );
}
