# BRACCI Signature Generator

Gerador web interno de assinaturas de e-mail da BRACCI. O marketing preenche os dados pessoais, vê a prévia e copia a assinatura pronta para colar no Gmail/Outlook.

## Estado atual

- `apps/web` (Next.js): gerador completo — formulário, prévia em tempo real e cópia da assinatura/HTML.
- `apps/server` (Phoenix): fundação apenas. **Não tem responsabilidade funcional** (sem endpoints, banco ou regras). O gerador roda 100% no navegador.

## Requisitos

- Node.js 24 e npm (necessário para o gerador)
- Elixir 1.17+ (testado com 1.19.6 / OTP 28) e Erlang/OTP (só se for rodar o Phoenix)

## Executar o gerador (`apps/web`)

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
2. Confira a prévia.
3. **Copiar assinatura**: copia a assinatura formatada (`text/html` + `text/plain`). Cole direto no editor de assinatura do Gmail/Outlook.
4. **Copiar HTML**: copia o código HTML bruto, só da assinatura.

Site e logo da BRACCI são fixos e não editáveis.

## Clipboard API

A cópia usa `navigator.clipboard`, que só funciona em **HTTPS** ou em **`localhost`**. Em HTTP comum, os botões mostram "Não foi possível copiar".

## Limitação conhecida: URL da logo

A logo na assinatura usa uma URL absoluta (e-mail não resolve caminhos relativos). Hoje ela aponta para `raw.githubusercontent.com`, fixada no commit que adicionou o arquivo. **Isso é provisório**: depende do repositório continuar público e não é um host apropriado para produção. Antes do uso definitivo, substitua `company.logoSrc` em `apps/web/components/email-signature.tsx` por um asset público e estável controlado pela BRACCI.

## Validação

```bash
cd apps/web
npm run lint
npx tsc --noEmit
npm run build
```

Phoenix: `mix format --check-formatted` e `mix test` em `apps/server`.

## Estrutura

```
apps/web      aplicação Next.js (gerador)
apps/server   aplicação Phoenix (sem endpoints nem banco)
docs/         documentação de arquitetura
```

Veja [docs/architecture.md](docs/architecture.md).
