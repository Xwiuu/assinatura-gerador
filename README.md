# BRACCI Signature Generator

Gerador web interno de assinaturas de e-mail da BRACCI. O marketing preenche os dados pessoais, vê a prévia e copia a assinatura pronta para colar no Gmail/Outlook.

## Estado atual

Aplicação **Next.js 100% client-side** (`apps/web`): formulário, prévia em tempo real e cópia da assinatura/HTML. Não há backend, banco nem API.

## Requisitos

- Node.js 24 e npm

## Executar

```bash
cd apps/web
npm install
npm run dev              # desenvolvimento: http://localhost:3000
```

Produção:

```bash
npm run build
npm start                # http://localhost:3000
```

## Como usar

1. Preencha os campos. Nome, cargo e e-mail são obrigatórios para copiar; telefone, WhatsApp, endereço, Instagram e LinkedIn são opcionais e, se vazios, somem da assinatura.
2. **WhatsApp:** informe o número **com código do país** (ex.: `+55 54 99999-9999`). O link `wa.me` usa só os dígitos digitados e não adivinha o país; sem DDI o link não funciona.
3. **Instagram:** `@usuário` ou URL completa. **LinkedIn:** URL completa (`https://…`).
4. Confira a prévia.
5. **Copiar assinatura**: copia a assinatura formatada (`text/html` + `text/plain`). Cole direto no editor de assinatura do Gmail/Outlook.
6. **Copiar HTML**: copia o código HTML bruto, só da assinatura.

Site e logo da BRACCI são fixos e não editáveis.

## Clipboard API

A cópia usa `navigator.clipboard`, que só funciona em **HTTPS** ou em **`localhost`**. Em HTTP comum, os botões mostram "Não foi possível copiar".

## Produção (Vercel)

- **URL estável:** `https://web-ten-kohl-45.vercel.app`. É o domínio de produção do projeto `web` na Vercel: não muda entre deploys e sempre serve o último deploy de produção (branch `main`, Root Directory `apps/web`). Não use URLs de preview/deploy (`web-xxxxxxx-xwiuus-projects.vercel.app`), que mudam a cada deploy e exigem login.
- **Iframe no portal:** precisa da permissão de clipboard, senão "Copiar assinatura" falha dentro do iframe:

  ```html
  <iframe
    src="https://web-ten-kohl-45.vercel.app"
    allow="clipboard-write"
  ></iframe>
  ```

## Imagens da assinatura

A assinatura usa URLs absolutas para os PNGs de `apps/web/public/` (o Gmail descarta imagens em base64). A base é `NEXT_PUBLIC_ASSET_BASE_URL` (definida no build; hoje `https://web-ten-kohl-45.vercel.app` em Production e Preview na Vercel); sem ela, a origem onde o gerador está aberto. A cópia é bloqueada se essa base não for HTTPS pública (ex.: `localhost`), pois as imagens quebrariam no destinatário.

**As assinaturas já geradas carregam as imagens desta URL a cada abertura do e-mail.** Não remova, renomeie nem mova estes arquivos sem uma estratégia de compatibilidade (manter os caminhos antigos servindo):

- `https://web-ten-kohl-45.vercel.app/bracci-logo.png`
- `https://web-ten-kohl-45.vercel.app/wave-edge.png`
- `https://web-ten-kohl-45.vercel.app/icons/{instagram,facebook,linkedin,youtube,pinterest,whatsapp,phone,pin}.png`

Alterar o conteúdo de um desses PNGs muda a aparência de todas as assinaturas já enviadas (respeitado o cache do proxy do Gmail).

## Pendências

- **Compatibilidade:** homologado no Gmail web (envio e recebimento). Ainda falta validar Outlook web e Outlook desktop (incluindo modo escuro).

## Validação

```bash
cd apps/web
npm ci
npm run lint
npx tsc --noEmit
npm run build
```

## Estrutura

```
apps/web      aplicação Next.js (gerador)
docs/         documentação de arquitetura
```

Veja [docs/architecture.md](docs/architecture.md).
