# Arquitetura

## 1. Objetivo atual do produto

Gerador web interno de assinaturas de e-mail da BRACCI. Estado atual: o gerador existe e roda inteiramente no navegador (formulário, prévia e cópia da assinatura).

## 2. Responsabilidade do Next.js (`apps/web`)

Toda a interface e a lógica do gerador de assinaturas, incluindo a geração do HTML da assinatura e a cópia para o clipboard.

## 3. Responsabilidade potencial do Phoenix (`apps/server`)

Qualquer necessidade que exija servidor (por exemplo, persistência ou integração com sistemas internos). Hoje não possui endpoints, domínio, banco nem regras de negócio.

## 4. Regra de arquitetura

Phoenix só receberá funcionalidade quando houver uma necessidade de servidor concreta.

## 5. Princípios adotados

- **YAGNI:** nada é implementado ou instalado sem necessidade atual.
- **KISS:** a solução mais simples que cumpra o objetivo.
- **Clean Code:** nomes claros, estrutura pequena, responsabilidades explícitas.
