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

## Pendências para produção

- **Logo:** a assinatura usa uma URL absoluta (e-mail não resolve caminhos relativos). Hoje ela aponta para `raw.githubusercontent.com`, fixada no commit que adicionou o arquivo. **Isso é provisório**: depende do repositório continuar público e não é um host apropriado para produção. Antes do uso definitivo, substitua `company.logoSrc` em `apps/web/components/email-signature.tsx` por um asset público e estável controlado pela BRACCI.
- **Compatibilidade:** a assinatura foi testada em navegador, mas **ainda precisa de homologação real** em Gmail web, Outlook web e Outlook desktop (incluindo modo escuro).

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
