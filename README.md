# BRACCI Signature Generator

Gerador web interno de assinaturas de e-mail da BRACCI.

**Estado atual: Sprint 0** — apenas a fundação técnica. O gerador ainda não foi implementado.

## Requisitos

- Node.js 24 e npm
- Elixir 1.17+ (testado com 1.19.6 / OTP 28) e Erlang/OTP

## Iniciar `apps/web`

```bash
cd apps/web
npm install
npm run dev   # http://localhost:3000
```

Validação: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Iniciar `apps/server`

```bash
cd apps/server
mix deps.get
mix phx.server   # http://localhost:4000
```

Validação: `mix format --check-formatted`, `mix test`.

## Estrutura

```
apps/web      aplicação Next.js
apps/server   aplicação Phoenix (sem endpoints nem banco)
docs/         documentação de arquitetura
```

Veja [docs/architecture.md](docs/architecture.md).
