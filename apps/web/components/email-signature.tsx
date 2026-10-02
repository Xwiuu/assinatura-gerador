// Corpo da assinatura: tabelas + estilos inline, sem depender de CSS global.
// Compatibilidade máxima com e-mails (Gmail, Outlook, Apple Mail).

import type { ReactNode } from "react";

const FONT = "Arial, Helvetica, sans-serif";
const TEXT = "#000000";
const MUTED = "#1a1a1a";

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

// Paleta e medidas do layout aprovado (418 x 118: 376 de conteúdo + 42 de curva).
const BEIGE = "#d9cab1";
const WIDTH = 418;
const WAVE_WIDTH = 42;
const CONTENT_WIDTH = WIDTH - WAVE_WIDTH;
const HEIGHT = 118;

// bgcolor (atributo legado) não está nos tipos do React; Gmail/Outlook o respeitam.
const BG_ATTR = { bgcolor: BEIGE } as Record<string, string>;
const bg = { backgroundColor: BEIGE };
// border="0" em <img> também é legado (evita borda azul em links no Outlook).
const IMG_BORDER_ATTR = { border: "0" } as Record<string, string>;

// Elementos institucionais oficiais da BRACCI.
const company = {
  site: "bracci.com.br",
  siteHref: "https://bracci.com.br",
  facebookHref: "https://www.facebook.com/braccimetaisbr/",
  youtubeHref: "https://www.youtube.com/channel/UCfhaIj3Q0SdbLy9lU7PXcGQ",
  pinterestHref: "https://br.pinterest.com/braccimetais/",
};

// Imagens servidas por URL absoluta: o Gmail descarta imagens em data-URI
// (base64) ao salvar a assinatura e ao enviar a mensagem.
const assetPaths = {
  logo: "/bracci-logo.png",
  wave: "/wave-edge.png",
  whatsapp: "/icons/whatsapp.png",
  phone: "/icons/phone.png",
  pin: "/icons/pin.png",
  instagram: "/icons/instagram.png",
  facebook: "/icons/facebook.png",
  linkedin: "/icons/linkedin.png",
  youtube: "/icons/youtube.png",
  pinterest: "/icons/pinterest.png",
};

export function signatureText(data: SignatureData) {
  const optional = (label: string, value: string) =>
    hasValue(value) ? `${label}: ${value.trim()}` : null;
  const contact = hasValue(data.whatsapp)
    ? `WhatsApp: ${data.whatsapp.trim()}`
    : hasValue(data.phone)
      ? `Telefone: ${data.phone.trim()}`
      : null;
  const address = hasValue(data.address)
    ? `Endereço: ${data.address.trim()}`
    : null;

  return [
    data.name.trim(),
    hasValue(data.role) ? data.role.trim() : null,
    contact,
    `E-mail: ${data.email.trim()}`,
    address,
    company.site,
    optional("Instagram", data.instagram),
    optional("LinkedIn", data.linkedin),
  ]
    .filter((line): line is string => line !== null && line !== "")
    .join("\n");
}

// Tabela "de e-mail": atributos legados explícitos + estilos inline.
function Table({
  width,
  beige = false,
  align,
  children,
}: {
  width?: number;
  beige?: boolean;
  align?: "center";
  children: ReactNode;
}) {
  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      width={width}
      align={align}
      {...(beige ? BG_ATTR : {})}
      style={{
        borderCollapse: "collapse",
        ...(width ? { width: `${width}px` } : {}),
        ...(beige ? bg : {}),
      }}
    >
      <tbody>{children}</tbody>
    </table>
  );
}

function Img({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...IMG_BORDER_ATTR}
      style={{
        display: "block",
        border: 0,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
}

// Uma linha ícone + texto com link, cada uma em sua própria tabela.
function ContactRow({
  icon,
  href,
  label,
  last,
}: {
  icon: string;
  href: string;
  label: string;
  last: boolean;
}) {
  return (
    <tr>
      <td
        {...BG_ATTR}
        style={{ ...bg, padding: last ? "0" : "0 0 2px 0" }}
      >
        <Table beige>
          <tr>
            <td
              {...BG_ATTR}
              width={17}
              valign="middle"
              style={{ ...bg, width: "17px", padding: "0 5px 0 0" }}
            >
              <Img src={icon} alt="" width={12} height={12} />
            </td>
            <td
              {...BG_ATTR}
              valign="middle"
              style={{
                ...bg,
                fontFamily: FONT,
                fontSize: "10px",
                lineHeight: "14px",
                color: TEXT,
                whiteSpace: "nowrap",
              }}
            >
              <a
                href={href}
                style={{
                  fontFamily: FONT,
                  fontSize: "10px",
                  lineHeight: "14px",
                  color: TEXT,
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            </td>
          </tr>
        </Table>
      </td>
    </tr>
  );
}

export function EmailSignature({
  data,
  assetBaseUrl,
}: {
  data: SignatureData;
  // Origem pública (https://...) usada para montar as URLs absolutas das imagens.
  assetBaseUrl: string;
}) {
  const asset = (key: keyof typeof assetPaths) =>
    `${assetBaseUrl}${assetPaths[key]}`;

  const contacts = [
    hasValue(data.whatsapp) && {
      icon: asset("whatsapp"),
      href: whatsappHref(data.whatsapp),
      label: data.whatsapp.trim(),
    },
    hasValue(data.phone) && {
      icon: asset("phone"),
      href: telHref(data.phone),
      label: data.phone.trim(),
    },
    hasValue(data.address) && {
      icon: asset("pin"),
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address.trim())}`,
      label: "Veja nossos endereços",
    },
  ].filter((row) => row !== false);

  const socialLinks = [
    {
      name: "Instagram",
      icon: asset("instagram"),
      href: hasValue(data.instagram) ? instagramHref(data.instagram) : "#",
    },
    { name: "Facebook", icon: asset("facebook"), href: company.facebookHref },
    {
      name: "LinkedIn",
      icon: asset("linkedin"),
      href: hasValue(data.linkedin) ? linkedinHref(data.linkedin) : "#",
    },
    { name: "YouTube", icon: asset("youtube"), href: company.youtubeHref },
    { name: "Pinterest", icon: asset("pinterest"), href: company.pinterestHref },
  ];

  const textCell = {
    ...bg,
    fontFamily: FONT,
    color: TEXT,
    textAlign: "left" as const,
  };

  return (
    <Table width={WIDTH}>
      <tr>
        {/* BLOCO BEGE: padding vertical (14 + 12) somado à altura fecha 118px */}
        <td
          {...BG_ATTR}
          width={CONTENT_WIDTH}
          height={HEIGHT - 26}
          valign="top"
          style={{
            ...bg,
            width: `${CONTENT_WIDTH}px`,
            height: `${HEIGHT - 26}px`,
            padding: "14px 8px 12px 18px",
            verticalAlign: "top",
          }}
        >
          <Table width={CONTENT_WIDTH - 26} beige>
            <tr>
              {/* COLUNA ESQUERDA: NOME, CARGO, CONTATO E ENDEREÇO */}
              <td
                {...BG_ATTR}
                valign="top"
                style={{ ...bg, verticalAlign: "top" }}
              >
                <Table beige>
                  <tr>
                    <td
                      {...BG_ATTR}
                      style={{
                        ...textCell,
                        fontSize: "15px",
                        lineHeight: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {data.name}
                    </td>
                  </tr>
                  {hasValue(data.role) && (
                    <tr>
                      <td
                        {...BG_ATTR}
                        style={{
                          ...textCell,
                          fontSize: "10px",
                          lineHeight: "13px",
                          color: MUTED,
                          padding: "1px 0 0 0",
                        }}
                      >
                        {data.role}
                      </td>
                    </tr>
                  )}
                  {contacts.length > 0 && (
                    <tr>
                      <td
                        {...BG_ATTR}
                        style={{ ...bg, padding: "8px 0 0 0" }}
                      >
                        <Table beige>
                          {contacts.map((row, idx) => (
                            <ContactRow
                              key={row.icon}
                              {...row}
                              last={idx === contacts.length - 1}
                            />
                          ))}
                        </Table>
                      </td>
                    </tr>
                  )}
                </Table>
              </td>

              {/* COLUNA DIREITA: LOGO BRACCI + ÍCONES SOCIAIS */}
              <td
                {...BG_ATTR}
                width={125}
                valign="top"
                align="center"
                style={{
                  ...bg,
                  width: "125px",
                  padding: "14px 12px 0 0",
                  verticalAlign: "top",
                  textAlign: "center",
                }}
              >
                <Table beige align="center">
                  <tr>
                    <td
                      {...BG_ATTR}
                      align="center"
                      style={{ ...bg, padding: "0 0 6px 0" }}
                    >
                      <a
                        href={company.siteHref}
                        style={{ color: TEXT, textDecoration: "none" }}
                      >
                        <Img
                          src={asset("logo")}
                          alt="BRACCI"
                          width={115}
                          height={20}
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td {...BG_ATTR} align="center" style={bg}>
                      <Table beige align="center">
                        <tr>
                          {socialLinks.map(({ name, icon, href }, idx) => (
                            <td
                              key={name}
                              {...BG_ATTR}
                              width={idx === 0 ? 14 : 17}
                              valign="middle"
                              style={{
                                ...bg,
                                padding: idx === 0 ? "0" : "0 0 0 3px",
                                verticalAlign: "middle",
                              }}
                            >
                              <a
                                href={href}
                                title={name}
                                style={{ color: TEXT, textDecoration: "none" }}
                              >
                                <Img src={icon} alt={name} width={14} height={14} />
                              </a>
                            </td>
                          ))}
                        </tr>
                      </Table>
                    </td>
                  </tr>
                </Table>
              </td>
            </tr>
          </Table>
        </td>

        {/* RECORTE DIREITO: PNG estático da curva (sem clip-path/CSS moderno) */}
        <td
          width={WAVE_WIDTH}
          height={HEIGHT}
          valign="top"
          style={{
            width: `${WAVE_WIDTH}px`,
            height: `${HEIGHT}px`,
            padding: "0",
            fontSize: "0",
            lineHeight: "0",
            verticalAlign: "top",
          }}
        >
          <Img src={asset("wave")} alt="" width={WAVE_WIDTH} height={HEIGHT} />
        </td>
      </tr>
    </Table>
  );
}
