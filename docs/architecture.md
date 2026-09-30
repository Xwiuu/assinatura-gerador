# Arquitetura

## 1. Objetivo do produto

Gerador web interno de assinaturas de e-mail da BRACCI.

## 2. Arquitetura atual

Aplicação Next.js 100% client-side em `apps/web`. Não há backend, banco de dados nem API: toda a interface, a geração do HTML da assinatura e a cópia para o clipboard rodam no navegador.

## 3. Princípios adotados

- **YAGNI:** nada é implementado ou instalado sem necessidade atual.
- **KISS:** a solução mais simples que cumpra o objetivo.
- **Clean Code:** nomes claros, estrutura pequena, responsabilidades explícitas.
