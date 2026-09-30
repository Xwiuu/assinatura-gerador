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
  whatsapp: "(54) 0000.0000",
  email: "norberto@bracci.com.br",
  address: "Canela - RS",
  instagram: "https://www.instagram.com/exemplo/",
  linkedin: "https://www.linkedin.com/in/exemplo/",
};

const fields: {
  key: keyof SignatureData;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}[] = [
  { key: "name", label: "Nome", type: "text", required: true },
  { key: "role", label: "Cargo", type: "text", required: true },
  { key: "phone", label: "Telefone", type: "tel" },
  {
    key: "whatsapp",
    label: "WhatsApp (com DDI)",
    type: "tel",
    placeholder: "+55 54 99999-9999",
  },
  { key: "email", label: "E-mail", type: "email", required: true },
  { key: "address", label: "Endereço", type: "text" },
  {
    key: "instagram",
    label: "Instagram (@usuário ou URL)",
    type: "text",
    placeholder: "@usuario",
  },
  {
    key: "linkedin",
    label: "LinkedIn (URL completa)",
    type: "text",
    placeholder: "https://www.linkedin.com/in/usuario",
  },
];

export default function Home() {
  const [data, setData] = useState<SignatureData>(exampleData);
  const [feedback, setFeedback] = useState("");
  // Só o container da assinatura: o innerHTML não inclui form nem wrapper.
  const signatureRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function showFeedback(message: string) {
    setFeedback(message);
    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(""), 3000);
  }

  // Bloqueia só a cópia: nome, cargo e e-mail obrigatórios; e-mail com formato básico.
  function validationError() {
    const missing = fields
      .filter(({ key, required }) => required && data[key].trim() === "")
      .map(({ label }) => label.toLowerCase());
    if (missing.length > 0) return `Preencha ${missing.join(", ")}`;
    if (!formRef.current?.checkValidity()) return "Informe um e-mail válido";
    return null;
  }

  async function copy(successMessage: string, action: () => Promise<void>) {
    const error = validationError();
    if (error) return showFeedback(error);
    try {
      await action();
      showFeedback(successMessage);
    } catch (error) {
      console.error(error);
      showFeedback("Não foi possível copiar");
    }
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
    <main className="page">
      <header>
        <p className="eyebrow">BRACCI</p>
        <h1>Gerador de assinatura de e-mail</h1>
        <p>Preencha seus dados e copie a assinatura pronta.</p>
      </header>
      <div className="generator">
        <section aria-labelledby="dados-titulo">
          <h2 id="dados-titulo">Dados</h2>
          <form
            className="generator-form"
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
          >
            {fields.map(({ key, label, type, required, placeholder }) => (
              <label key={key} htmlFor={key}>
                {label}
                {required ? " *" : ""}
                <input
                  id={key}
                  name={key}
                  type={type}
                  required={required}
                  placeholder={placeholder}
                  value={data[key]}
                  onChange={(e) => setData({ ...data, [key]: e.target.value })}
                />
              </label>
            ))}
            <p className="hint">* Obrigatório para copiar.</p>
          </form>
        </section>
        <section aria-labelledby="previa-titulo">
          <h2 id="previa-titulo">Prévia</h2>
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
        </section>
      </div>
    </main>
  );
}
