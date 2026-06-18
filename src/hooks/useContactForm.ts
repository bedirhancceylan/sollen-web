import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
}

export function useContactForm(locale: string) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data: ContactFormData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("send_failed");
      setSubmitted(true);
    } catch {
      setError(
        locale === "tr"
          ? "Mesaj gönderilemedi. Lütfen tekrar deneyin."
          : "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { submitted, loading, error, handleSubmit };
}
