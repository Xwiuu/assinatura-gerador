"use client";

import { useState } from "react";
import { EmailSignature, type SignatureData } from "@/components/email-signature";

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
        <div className="generator-preview">
          <EmailSignature data={data} />
        </div>
      </div>
    </main>
  );
}
