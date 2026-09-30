"use client";

import { useRef, useState } from "react";
import {
  EmailSignature,
  signatureText,
  type SignatureData,
} from "@/components/email-signature";

// Valores iniciais de exemplo, só para a tela não abrir vazia.
const exampleData: SignatureData = {
  name: "Norberto Jahn",
  role: "CEO",
  phone: "(54) 0000-0000",
  whatsapp: "(54) 99999-9999",
  email: "norberto@bracci.com.br",
  address: "Canela - RS",
  instagram: "https://www.instagram.com/exemplo/",
  linkedin: "https://www.linkedin.com/in/exemplo/",
};

const fields: { key: keyof SignatureData; label: string; type: string }[] = [
  { key: "name", label: "Nome", type: "text" },
  { key: "role", label: "Cargo", type: "text" },
  { key: "phone", label: "Telefone", type: "tel" },
  { key: "whatsapp", label: "WhatsApp", type: "tel" },
  { key: "email", label: "E-mail", type: "email" },
  { key: "address", label: "Endereço", type: "text" },
  { key: "instagram", label: "Instagram (URL ou @usuário)", type: "text" },
  { key: "linkedin", label: "LinkedIn (URL)", type: "text" },
];

export default function Home() {
  const [data, setData] = useState<SignatureData>(exampleData);
  const [feedback, setFeedback] = useState("");
  // Só o container da assinatura: o innerHTML não inclui form nem wrapper.
  const signatureRef = useRef<HTMLDivElement>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy(successMessage: string, action: () => Promise<void>) {
    let message = successMessage;
    try {
      await action();
    } catch (error) {
      console.error(error);
      message = "Não foi possível copiar";
    }
    setFeedback(message);
    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(""), 3000);
  }

  const signatureHtml = () => signatureRef.current?.innerHTML ?? "";

  const copySignature = () =>
    copy("Assinatura copiada", () =>
      navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([signatureHtml()], { type: "text/html" }),
          "text/plain": new Blob([signatureText(data)], { type: "text/plain" }),
        }),
      ]),
    );

  const copyHtml = () =>
    copy("HTML copiado", () => navigator.clipboard.writeText(signatureHtml()));

  return (
    <main>
      <h1>BRACCI Signature Generator</h1>
      <div className="generator">
        <form className="generator-form">
          {fields.map(({ key, label, type }) => (
            <label key={key}>
              {label}
              <input
                type={type}
                value={data[key]}
                onChange={(e) => setData({ ...data, [key]: e.target.value })}
              />
            </label>
          ))}
        </form>
        <div>
          <div className="generator-preview" ref={signatureRef}>
            <EmailSignature data={data} />
          </div>
          <div className="generator-actions">
            <button type="button" onClick={copySignature}>
              Copiar assinatura
            </button>
            <button type="button" onClick={copyHtml}>
              Copiar HTML
            </button>
            <span role="status">{feedback}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
