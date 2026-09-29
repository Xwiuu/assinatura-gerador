// Corpo da assinatura: tabelas + estilos inline, sem depender de CSS global.
// Gmail e Outlook ignoram flexbox/grid e removem <style>, então tudo é inline.

const FONT = "Arial, Helvetica, sans-serif";
const TEXT = "#1a1a1a";
const MUTED = "#555555";
const ACCENT = "#000000";

export type SignatureData = {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string; // URL completa ou @identificador
  linkedin: string; // URL completa
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");
const isUrl = (value: string) => /^https?:\/\//i.test(value);

function telHref(phone: string) {
  const plus = phone.trim().startsWith("+") ? "+" : "";
  return `tel:${plus}${onlyDigits(phone)}`;
}

function whatsappHref(whatsapp: string) {
  return `https://wa.me/${onlyDigits(whatsapp)}`;
}

function instagramHref(instagram: string) {
  const value = instagram.trim();
  if (isUrl(value)) return value;
  return `https://www.instagram.com/${value.replace(/^@/, "")}/`;
}

function linkedinHref(linkedin: string) {
  return linkedin.trim();
}

// Elementos institucionais fixos da BRACCI.
const company = {
  site: "bracci.com.br",
  siteHref: "https://bracci.com.br",
  // Preview local; URL absoluta (hospedada) fica para quando houver CDN.
  logoSrc: "/bracci-logo.png",
};

const linkStyle = { color: TEXT, textDecoration: "none" } as const;
const rowStyle = {
  fontFamily: FONT,
  fontSize: "13px",
  lineHeight: "20px",
  color: TEXT,
} as const;

function Label({ children }: { children: string }) {
  return (
    <span style={{ color: MUTED, fontWeight: "bold" }}>{children}&nbsp;</span>
  );
}

export function EmailSignature({ data }: { data: SignatureData }) {
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      border={0}
      role="presentation"
      style={{ borderCollapse: "collapse", width: "480px", maxWidth: "100%" }}
    >
      <tbody>
        <tr>
          <td
            style={{
              fontFamily: FONT,
              fontSize: "18px",
              lineHeight: "24px",
              fontWeight: "bold",
              color: TEXT,
              paddingBottom: "2px",
            }}
          >
            {data.name}
          </td>
        </tr>
        <tr>
          <td
            style={{
              fontFamily: FONT,
              fontSize: "13px",
              lineHeight: "18px",
              color: MUTED,
              paddingBottom: "10px",
              borderBottom: `2px solid ${ACCENT}`,
            }}
          >
            {data.role}
          </td>
        </tr>
        <tr>
          <td style={{ paddingTop: "10px" }}>
            <table
              cellPadding={0}
              cellSpacing={0}
              border={0}
              role="presentation"
              style={{ borderCollapse: "collapse" }}
            >
              <tbody>
                <tr>
                  <td style={rowStyle}>
                    <Label>Tel</Label>
                    <a href={telHref(data.phone)} style={linkStyle}>
                      {data.phone}
                    </a>
                    <span style={{ color: MUTED }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <Label>WhatsApp</Label>
                    <a href={whatsappHref(data.whatsapp)} style={linkStyle}>
                      {data.whatsapp}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={rowStyle}>
                    <Label>E-mail</Label>
                    <a href={`mailto:${data.email.trim()}`} style={linkStyle}>
                      {data.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={rowStyle}>
                    <Label>Endereço</Label>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`} style={linkStyle}>
                      {data.address}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ paddingTop: "12px" }}>
            <a href={company.siteHref}>
              {/* <img> puro: next/image não existe em HTML de e-mail. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={company.logoSrc}
                alt="BRACCI"
                width={120}
                height={20}
                style={{ display: "block", border: 0 }}
              />
            </a>
          </td>
        </tr>
        <tr>
          <td style={{ ...rowStyle, paddingTop: "6px" }}>
            <a href={company.siteHref} style={{ ...linkStyle, fontWeight: "bold" }}>
              {company.site}
            </a>
            <span style={{ color: MUTED }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <a href={instagramHref(data.instagram)} style={linkStyle}>
              Instagram
            </a>
            <span style={{ color: MUTED }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <a href={linkedinHref(data.linkedin)} style={linkStyle}>
              LinkedIn
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
