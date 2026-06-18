export default function FormField({
  id,
  label,
  placeholder,
  type,
  required,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
}) {
  const sharedClass =
    "w-full bg-transparent border-b border-[#0A1128]/20 focus:border-[#1E3A8A] text-[#0A1128] text-base py-3 outline-none transition-colors duration-300 placeholder-zinc-600";

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-[#0A1128] text-xs tracking-[0.2em] uppercase mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          required={required}
          placeholder={placeholder}
          className={`${sharedClass} resize-none`}
          style={{ color: "#0A1128", WebkitTextFillColor: "#0A1128" }}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className={sharedClass}
          style={{ color: "#0A1128", WebkitTextFillColor: "#0A1128" }}
        />
      )}
    </div>
  );
}
