// Corpo da assinatura: tabelas + estilos inline, sem depender de CSS global.
// Compatibilidade máxima com e-mails (Gmail, Outlook, Apple Mail).

const FONT = "Arial, Helvetica, sans-serif";
const TEXT = "#1a1a1a";
const MUTED = "#555555";
const BG_COLOR = "#EDE8E1";

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
// PENDÊNCIA: Facebook, YouTube e Pinterest utilizam links "#" temporariamente
// até que as URLs institucionais oficiais sejam confirmadas pela diretoria.
const company = {
  site: "bracci.com.br",
  siteHref: "https://bracci.com.br",
  facebookHref: "#",
  youtubeHref: "#",
  pinterestHref: "#",
  // URL ABSOLUTA: e-mail não resolve caminhos relativos. PENDÊNCIA: URL
  // provisória (raw do GitHub, fixada no commit que adicionou a logo); trocar
  // pela URL definitiva do site/CDN da BRACCI quando existir.
  logoSrc:
    "https://raw.githubusercontent.com/Xwiuu/assinatura-gerador/10badaba77552bbaed8026d7a86cf541d2f5d56e/apps/web/public/bracci-logo.png",
};

// Ícones otimizados em PNG embutidos para compatibilidade com clientes de e-mail.
const icons = {
  whatsapp:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABlBMVEUAAAAiIiLsfCyFAAAAAXRSTlMAQObYZgAAAKtJREFUSMfdlcESgCAIROH/f7pLoyW72+J0KU4h+3QkwIifWp7WU3tQArP0xVF6sIMr56sj0gk8HN3Q49hzNlpADV8W0gXKFxEsG5g5HK78TcjjpbADJHB05cCk7gD030GaEgpoXJoT99XVmUlzgElkshoDlbKOGQlEBZKWayXAASj7+gDcN0ofzZZ+eWiQsaTk8H4kxuckekFox6a0EEBY8qX1jQeuO8y/bgc6CwIfYY3j0wAAAABJRU5ErkJggg==",
  phone:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABlBMVEUAAAAiIiLsfCyFAAAAAXRSTlMAQObYZgAAAGZJREFUSMftlFEKACEIBfX+l96v2KJY5wkrEb3vmTIxzW54vEXlqbG3wIz/hb3bxPjXoLypvKl8wii74pCiao34gHEIydT3QP9zY8NH/qMuXwe8AwtrBbVX2VeyMCmxkFqhqfm6eQD9egGn9WT+7wAAAABJRU5ErkJggg==",
  pin:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABlBMVEUAAAAiIiLsfCyFAAAAAXRSTlMAQObYZgAAAHBJREFUSMfd1DESgDAIBVH2/pd2HK3IKKzRwlAm/zUJELFocZaMNwmpbL4S4AQ4AVJYAFKkRAnG+0I8B7dHPwGfvZL+uKnWmOy+eA3oifNALwEP9F7yQK/KLOq8B3bdN8bgWnTzHoTNH8Lkd+Hya9cGgY8CqcmtXq4AAAAASUVORK5CYII=",
  instagram:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABlBMVEUAAAAiIiLsfCyFAAAAAXRSTlMAQObYZgAAAKxJREFUSMftlkkSgDAIBMP/P+1NWUagPcvFJdNVBAjknMfs1Y4wGwzKM7LRe6L1VSx3YqXZ6INqpXeypf4R7vx3zxGwCMwemffFJBDjnnZb9SW58WWqkrL79LOtOQFU5/OqAtrPCOi6HwCdZQ2YBqwF3grpBz6HFSeOlwYuPl7e+ADxI6qaQAX6NpNCsG6td8wYsGrGAkDtHg8UPrLwUORjlw92fnXgl5OBcaILxJkDmVyFWX4AAAAASUVORK5CYII=",
  facebook:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABlBMVEUAAAAiIiLsfCyFAAAAAXRSTlMAQObYZgAAAI1JREFUSMfd08EOgzAMA1D7/3+ay6SNNnbiil3Iibp+QqIFKIafwWS4TFhvCMWEdUXITJCZ6Pqr6Pt3Men/ium2A+X7h31scQqST3gEXL/cMoCPAGaALwT9v/sKgAygB7SgPQd56WF2/g8wBzgESPNtp4nL0zHpGUAP3J0xUS10IoQMFBFLTcqFM/vTdy7vPwVzYiWh+gAAAABJRU5ErkJggg==",
  linkedin:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABlBMVEUAAAAiIiLsfCyFAAAAAXRSTlMAQObYZgAAAGZJREFUSMft1TsOwCAMA9Dk/pfuwEQAG1NFQiieUMsr5W9WEeIkav0oeP0gTgGUIyBtLYDtA9ad/0D+pfYoeR6ywVDqvwVGab6S94HlAZ+8RiDMPgVe4GkQTwME7trT8oWiX1kVlA9ybwOjmckJHwAAAABJRU5ErkJggg==",
  youtube:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABlBMVEUAAAAiIiLsfCyFAAAAAXRSTlMAQObYZgAAAGdJREFUSMft1TEKADEIRFH//S+9sMt2UfxgIEWmnldExETcbA5p+s216/Z/0e9/wvRfcR5wfRgBoUG5JWuQkxRkpAChQXQnUm7+MNj8aDlWUAAUAAeYBQceAQ/0qfTH2J97/6HcTOcB88MFpTzA9TgAAAAASUVORK5CYII=",
  pinterest:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABlBMVEUAAAAiIiLsfCyFAAAAAXRSTlMAQObYZgAAAMFJREFUSMe1lEEWxCAIQ8n9Lz2bqa9qQsKi7FrzFQJadQdWVBA4YqZ2DDAi0MRUzwhgRjj9SXj9TqiV6H+TK/vZuhHpyWzJLRQRb3AB2pnts9UzQuVngb1aRdAD2soIYJy5DfgccM1SAKYpZUCBT0MAwANL6CbaAM3w/cuuHAABmGVv4uyDuaLvySjWdAa0rwa7ldOH6Tk0fvn2hovyrlPBg+ZZGuCVaUB4IQHlXq5/XbdQv6Yhlj8NG+i7WcwQsvgDLQcFMQwLzNIAAAAASUVORK5CYII=",
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

export function EmailSignature({ data }: { data: SignatureData }) {
  const hasWhatsapp = hasValue(data.whatsapp);
  const hasPhone = hasValue(data.phone);
  const hasContact = hasWhatsapp || hasPhone;
  const hasAddress = hasValue(data.address);

  const contact = hasWhatsapp
    ? {
        display: data.whatsapp.trim(),
        href: whatsappHref(data.whatsapp),
        icon: icons.whatsapp,
      }
    : hasPhone
      ? {
          display: data.phone.trim(),
          href: telHref(data.phone),
          icon: icons.phone,
        }
      : null;

  const instagramLink = hasValue(data.instagram)
    ? instagramHref(data.instagram)
    : "#";
  const linkedinLink = hasValue(data.linkedin)
    ? linkedinHref(data.linkedin)
    : "#";

  const socialLinks = [
    { name: "Instagram", icon: icons.instagram, href: instagramLink },
    { name: "Facebook", icon: icons.facebook, href: company.facebookHref },
    { name: "LinkedIn", icon: icons.linkedin, href: linkedinLink },
    { name: "YouTube", icon: icons.youtube, href: company.youtubeHref },
    { name: "Pinterest", icon: icons.pinterest, href: company.pinterestHref },
  ];

  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      border={0}
      role="presentation"
      bgcolor={BG_COLOR}
      style={{
        borderCollapse: "separate",
        backgroundColor: BG_COLOR,
        borderRadius: "0 40px 0 0",
        width: "500px",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              padding: "24px 28px 22px 28px",
              verticalAlign: "top",
            }}
          >
            <table
              cellPadding={0}
              cellSpacing={0}
              border={0}
              role="presentation"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <tbody>
                <tr>
                  {/* Coluna Esquerda: Nome, Cargo, Contato e Endereço */}
                  <td
                    style={{
                      verticalAlign: "top",
                      textAlign: "left",
                      fontFamily: FONT,
                    }}
                  >
                    {/* Nome */}
                    <div
                      style={{
                        fontSize: "18px",
                        lineHeight: "22px",
                        fontWeight: "bold",
                        color: TEXT,
                      }}
                    >
                      {data.name}
                    </div>

                    {/* Cargo */}
                    {hasValue(data.role) && (
                      <div
                        style={{
                          fontSize: "12px",
                          lineHeight: "16px",
                          color: MUTED,
                          paddingTop: "2px",
                        }}
                      >
                        {data.role}
                      </div>
                    )}

                    {/* Espaçamento vertical entre cargo e contatos */}
                    {(hasContact || hasAddress) && (
                      <div
                        style={{
                          height: "18px",
                          lineHeight: "18px",
                          fontSize: "18px",
                        }}
                      >
                        &nbsp;
                      </div>
                    )}

                    {/* Bloco Contato & Endereço */}
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      border={0}
                      role="presentation"
                      style={{ borderCollapse: "collapse" }}
                    >
                      <tbody>
                        {/* Linha Contato (WhatsApp com preferência, ou Telefone) */}
                        {contact && (
                          <tr>
                            <td
                              style={{
                                paddingBottom: hasAddress ? "4px" : "0px",
                                verticalAlign: "middle",
                              }}
                            >
                              <table
                                cellPadding={0}
                                cellSpacing={0}
                                border={0}
                                role="presentation"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        paddingRight: "6px",
                                        lineHeight: 0,
                                      }}
                                    >
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={contact.icon}
                                        alt=""
                                        width={14}
                                        height={14}
                                        style={{
                                          display: "block",
                                          border: 0,
                                        }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        fontFamily: FONT,
                                        fontSize: "12px",
                                        lineHeight: "16px",
                                        color: TEXT,
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <a
                                        href={contact.href}
                                        style={{
                                          color: TEXT,
                                          textDecoration: "none",
                                        }}
                                      >
                                        {contact.display}
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}

                        {/* Linha Endereço: texto fixo 'Veja nossos endereços' com link Google Maps */}
                        {hasAddress && (
                          <tr>
                            <td style={{ verticalAlign: "middle" }}>
                              <table
                                cellPadding={0}
                                cellSpacing={0}
                                border={0}
                                role="presentation"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        paddingRight: "6px",
                                        lineHeight: 0,
                                      }}
                                    >
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={icons.pin}
                                        alt=""
                                        width={14}
                                        height={14}
                                        style={{
                                          display: "block",
                                          border: 0,
                                        }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        fontFamily: FONT,
                                        fontSize: "12px",
                                        lineHeight: "16px",
                                        color: TEXT,
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address.trim())}`}
                                        style={{
                                          color: TEXT,
                                          textDecoration: "none",
                                        }}
                                      >
                                        Veja nossos endereços
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </td>

                  {/* Coluna Direita: Logo BRACCI + Ícones das Redes Sociais */}
                  <td
                    style={{
                      verticalAlign: "top",
                      textAlign: "right",
                      width: "140px",
                    }}
                  >
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      border={0}
                      role="presentation"
                      align="right"
                      style={{
                        borderCollapse: "collapse",
                        marginLeft: "auto",
                      }}
                    >
                      <tbody>
                        {/* Logo BRACCI */}
                        <tr>
                          <td align="right" style={{ paddingBottom: "22px" }}>
                            <a
                              href={company.siteHref}
                              style={{
                                textDecoration: "none",
                                display: "inline-block",
                              }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={company.logoSrc}
                                alt="BRACCI"
                                width={130}
                                height={22}
                                style={{
                                  display: "block",
                                  border: 0,
                                }}
                              />
                            </a>
                          </td>
                        </tr>

                        {/* Ícones das Redes Sociais: Instagram, Facebook, LinkedIn, YouTube, Pinterest */}
                        <tr>
                          <td align="right">
                            <table
                              cellPadding={0}
                              cellSpacing={0}
                              border={0}
                              role="presentation"
                              align="right"
                              style={{
                                borderCollapse: "collapse",
                                marginLeft: "auto",
                              }}
                            >
                              <tbody>
                                <tr>
                                  {socialLinks.map(
                                    ({ name, icon, href }, idx) => (
                                      <td
                                        key={name}
                                        style={{
                                          paddingLeft: idx === 0 ? "0px" : "8px",
                                          verticalAlign: "middle",
                                          lineHeight: 0,
                                        }}
                                      >
                                        <a
                                          href={href}
                                          style={{
                                            textDecoration: "none",
                                            display: "inline-block",
                                          }}
                                          title={name}
                                        >
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                            src={icon}
                                            alt={name}
                                            width={16}
                                            height={16}
                                            style={{
                                              display: "block",
                                              border: 0,
                                            }}
                                          />
                                        </a>
                                      </td>
                                    ),
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
