# Arquitetura

## 1. Objetivo atual do produto

Gerador web interno de assinaturas de e-mail da BRACCI. Estado atual: apenas a fundação técnica (Sprint 0); o gerador ainda não existe.

## 2. Responsabilidade do Next.js (`apps/web`)

Toda a interface e a lógica do gerador de assinaturas.

## 3. Responsabilidade potencial do Phoenix (`apps/server`)

Qualquer necessidade que exija servidor (por exemplo, persistência ou integração com sistemas internos). Hoje não possui endpoints, domínio, banco nem regras de negócio.

## 4. Regra de arquitetura

Phoenix só receberá funcionalidade quando houver uma necessidade de servidor concreta.

## 5. Princípios adotados

- **YAGNI:** nada é implementado ou instalado sem necessidade atual.
- **KISS:** a solução mais simples que cumpra o objetivo.
- **Clean Code:** nomes claros, estrutura pequena, responsabilidades explícitas.
