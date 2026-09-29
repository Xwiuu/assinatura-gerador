// Corpo da assinatura: tabelas + estilos inline, sem depender de CSS global.
// Gmail e Outlook ignoram flexbox/grid e removem <style>, então tudo é inline.

const FONT = "Arial, Helvetica, sans-serif";
const TEXT = "#1a1a1a";
const MUTED = "#555555";
const ACCENT = "#000000";

// Dados PESSOAIS provisórios da Sprint 1 (o gerador virá depois).
// Instagram e LinkedIn são URLs de demonstração, não perfis oficiais da BRACCI.
const person = {
  name: "Norberto Jahn",
  role: "CEO",
  phone: "(54) 0000-0000",
  phoneHref: "tel:+555400000000",
  whatsapp: "(54) 99999-9999",
  whatsappHref: "https://wa.me/5554999999999",
  email: "norberto@bracci.com.br",
  address: "Canela - RS",
  addressHref: "https://www.google.com/maps/search/?api=1&query=Canela+RS",
  instagramHref: "https://www.instagram.com/exemplo/",
  linkedinHref: "https://www.linkedin.com/in/exemplo/",
};

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

export function EmailSignature() {
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
            {person.name}
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
            {person.role}
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
                    <a href={person.phoneHref} style={linkStyle}>
                      {person.phone}
                    </a>
                    <span style={{ color: MUTED }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <Label>WhatsApp</Label>
                    <a href={person.whatsappHref} style={linkStyle}>
                      {person.whatsapp}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={rowStyle}>
                    <Label>E-mail</Label>
                    <a href={`mailto:${person.email}`} style={linkStyle}>
                      {person.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={rowStyle}>
                    <Label>Endereço</Label>
                    <a href={person.addressHref} style={linkStyle}>
                      {person.address}
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
            <a href={person.instagramHref} style={linkStyle}>
              Instagram
            </a>
            <span style={{ color: MUTED }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <a href={person.linkedinHref} style={linkStyle}>
              LinkedIn
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
