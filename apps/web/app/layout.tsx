import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRACCI Signature Generator",
  description: "Gerador interno de assinaturas de e-mail da BRACCI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
