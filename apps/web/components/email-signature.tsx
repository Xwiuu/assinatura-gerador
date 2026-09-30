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
const hasValue = (value: string) => value.trim() !== "";
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
  // URL ABSOLUTA: e-mail não resolve caminhos relativos. PENDÊNCIA: URL
  // provisória (raw do GitHub, fixada no commit que adicionou a logo); trocar
  // pela URL definitiva do site/CDN da BRACCI quando existir.
  logoSrc:
    "https://raw.githubusercontent.com/Xwiuu/assinatura-gerador/10badaba77552bbaed8026d7a86cf541d2f5d56e/apps/web/public/bracci-logo.png",
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
    <span style={{ color: MUTED, fontWeight: "bold" }}>{`${children}\u00a0`}</span>
  );
}

function Separator() {
  return <span style={{ color: MUTED }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>;
}

export function signatureText(data: SignatureData) {
  const optional = (label: string, value: string) =>
    hasValue(value) ? `${label}: ${value.trim()}` : null;
  return [
    data.name,
    data.role,
    optional("Telefone", data.phone),
    optional("WhatsApp", data.whatsapp),
    `E-mail: ${data.email}`,
    optional("Endereço", data.address),
    company.site,
    optional("Instagram", data.instagram),
    optional("LinkedIn", data.linkedin),
  ]
    .filter((line) => line !== null)
    .join("\n");
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
                {(hasValue(data.phone) || hasValue(data.whatsapp)) && (
                  <tr>
                    <td style={rowStyle}>
                      {hasValue(data.phone) && (
                        <>
                          <Label>Tel</Label>
                          <a href={telHref(data.phone)} style={linkStyle}>
                            {data.phone}
                          </a>
                        </>
                      )}
                      {hasValue(data.phone) && hasValue(data.whatsapp) && (
                        <Separator />
                      )}
                      {hasValue(data.whatsapp) && (
                        <>
                          <Label>WhatsApp</Label>
                          <a href={whatsappHref(data.whatsapp)} style={linkStyle}>
                            {data.whatsapp}
                          </a>
                        </>
                      )}
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={rowStyle}>
                    <Label>E-mail</Label>
                    <a href={`mailto:${data.email.trim()}`} style={linkStyle}>
                      {data.email}
                    </a>
                  </td>
                </tr>
                {hasValue(data.address) && (
                  <tr>
                    <td style={rowStyle}>
                      <Label>Endereço</Label>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address.trim())}`}
                        style={linkStyle}
                      >
                        {data.address}
                      </a>
                    </td>
                  </tr>
                )}
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
            {hasValue(data.instagram) && (
              <>
                <Separator />
                <a href={instagramHref(data.instagram)} style={linkStyle}>
                  Instagram
                </a>
              </>
            )}
            {hasValue(data.linkedin) && (
              <>
                <Separator />
                <a href={linkedinHref(data.linkedin)} style={linkStyle}>
                  LinkedIn
                </a>
              </>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
