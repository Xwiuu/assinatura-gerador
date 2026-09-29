import { EmailSignature } from "@/components/email-signature";

export default function Home() {
  return (
    <main>
      <h1>BRACCI Signature Generator</h1>
      <p>Prévia da assinatura (dados provisórios).</p>
      <div style={{ background: "#ffffff", border: "1px solid #dddddd", padding: "24px" }}>
        <EmailSignature />
      </div>
    </main>
  );
}
