# Bíblia Sagrada — King James em Português

> "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus." — João 1:1
>
> "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho." — Salmos 119:105
>
> "Toda a Escritura é divinamente inspirada, e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça." — 2 Timóteo 3:16

Aplicativo desktop da Bíblia Sagrada King James em Português, desenvolvido em Electron, React, TypeScript e SQLite. Leitura offline, busca, favoritos, anotações e histórico — com foco em reverência, sobriedade e fidelidade ao texto.

![Bíblia Sagrada](./assets/screenshot.png)

---

## Propósito

Este projeto existe para tornar a leitura e o estudo da Palavra acessíveis, estáveis e sem distrações. Destina-se a quem deseja meditar, estudar e guardar a Escritura no dia a dia, com total funcionamento offline e dados mantidos localmente. Não há coleta de dados nem dependência de serviços externos.

"Escondi a tua palavra no meu coração, para eu não pecar contra ti." — Salmos 119:11

## Fundamento Bíblico

- "Toda a Escritura é divinamente inspirada..." — 2 Timóteo 3:16-17
- "Porque a palavra de Deus é viva e eficaz..." — Hebreus 4:12
- "A lei do Senhor é perfeita, e refrigera a alma..." — Salmos 19:7

## Funcionalidades

- **Leitura** — Navegação por livros, capítulos e versículos. Temas claro, escuro e automático. Tipografia configurável (tamanho e família).
- **Busca** — Busca por palavras ou frases, com filtros por livro e testamento, e destaque dos termos.
- **Favoritos** — Marcação de versículos com ordenação e exportação.
- **Anotações** — Editor para reflexões vinculadas a cada versículo, com busca e gerenciamento local.
- **Recursos adicionais** — Versículo do dia, histórico de leitura, estatísticas de uso e funcionamento completamente offline.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | React 19, TypeScript, Tailwind CSS, shadcn/ui, Lucide React |
| Desktop | Electron 37, Electron Forge, Vite |
| Dados | SQLite3 com índices FTS |
| Build | Vite, Electron Forge |

## Pré-requisitos

- Node.js 18 ou superior
- Bun (gerenciador recomendado) ou npm
- Git

Para Ubuntu/Debian, dependências nativas para compilação de módulos:

```bash
sudo apt update
sudo apt install nodejs git build-essential libnss3-dev libatk-bridge2.0-dev libxkbcommon-dev libxcomposite-dev libxdamage-dev libxrandr-dev libgbm-dev libxss-dev libasound2-dev
```

## Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/noejunior299/biblia-sagrada.git
cd biblia-sagrada
```

2. Instale as dependências:

```bash
bun install
```

3. Execute em desenvolvimento:

```bash
bun run dev
```

4. Verificação de tipos e lint:

```bash
bun run type-check
bun run lint
```

5. Empacotamento local (sem instalador):

```bash
bun run package
```

6. Gerar pacote para Ubuntu/Debian:

```bash
bun run make:deb
```

O arquivo `.deb` será gerado em `out/production/make/`.

## Empacotamento

| Alvo | Comando |
|---|---|
| Ubuntu/Debian (.deb) | `bun run make:deb` |
| Todas as plataformas Linux | `bun run make:linux` |
| Windows | `bun run make:win` |
| RPM | `bun run make:rpm` |

## Estrutura do Projeto

```
biblia-sagrada/
├── src/
│   ├── components/       # Componentes React
│   │   └── ui/           # Componentes base de interface
│   ├── pages/            # Páginas principais
│   ├── hooks/            # Hooks React
│   ├── database/         # Camada de banco de dados (SQLite, serviços, migração)
│   ├── types/            # Definições TypeScript
│   ├── utils/            # Utilitários
│   ├── main.ts           # Processo principal do Electron
│   ├── preload.ts        # Preload seguro (contextIsolation)
│   └── renderer.tsx      # Aplicação React
├── assets/               # Recursos estáticos (ícones, KJA.json)
├── forge.config.ts       # Configuração do Electron Forge
├── vite.*.config.ts      # Configurações Vite (main, preload, renderer)
└── package.json
```

## Scripts

| Script | Descrição |
|---|---|
| `bun run dev` | Inicia em modo desenvolvimento |
| `bun run build` | Compila a aplicação |
| `bun run package` | Empacota sem gerar instalador |
| `bun run make:deb` | Gera pacote .deb |
| `bun run make:rpm` | Gera pacote .rpm |
| `bun run make:linux` | Gera todos os alvos Linux |
| `bun run lint` | Executa ESLint |
| `bun run lint:fix` | Corrige problemas de lint |
| `bun run type-check` | Verifica tipos TypeScript |
| `bun run clean` | Remove `out`, `dist`, `.vite` e `.temp` |

## Banco de Dados

SQLite local, sem servidor. Tabelas principais:

- `livros` — metadados dos livros bíblicos
- `versiculos` — texto dos versículos com índice FTS
- `favoritos` — versículos marcados
- `anotacoes` — anotações do usuário
- `historico_leitura` — histórico de navegação
- `configuracoes` — preferências

A carga inicial é feita a partir de `assets/KJA.json` via `scripts/migrate-json-to-sqlite`. O banco fica no diretório de dados do usuário e não é enviado a terceiros.

## Segurança

- `contextIsolation` habilitado, `nodeIntegration` desabilitado no renderer
- Comunicação via `preload` com API mínima e validada (IPC)
- Content Security Policy restritiva
- Validação de navegação externa (links abertos no navegador do sistema)

## Personalização

**Temas:** claro, escuro e sistema (segue o sistema operacional).

**Tipografia:** tamanhos pequeno, médio, grande e extra grande; famílias sistema, serif, sans-serif e monoespaçada.

## Contribuição

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nome-da-feature`)
3. Commit com mensagem descritiva (`git commit -m "feat: descrição"`)
4. Push (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request para `dev`

Diretrizes:

- TypeScript com tipagem rigorosa
- Seguir configuração ESLint do projeto
- Mensagens de commit no padrão convencional
- Testar em Linux (alvo principal) e, quando possível, em outras plataformas
- Manter a documentação atualizada
- Zelar por linguagem e conteúdo compatíveis com o propósito da obra

"Portanto, quer comais quer bebais, ou façais outra qualquer coisa, fazei tudo para glória de Deus." — 1 Coríntios 10:31

## Licença

Licenciado sob MIT. Consulte o arquivo [LICENSE](LICENSE).

## Agradecimentos

- Tradução King James em Português
- Equipe Electron, React, Vite, Tailwind CSS, shadcn/ui e Lucide

## Suporte

- Issues: [GitHub Issues](https://github.com/noejunior299/biblia-sagrada/issues)
- Discussões: [GitHub Discussions](https://github.com/noejunior299/biblia-sagrada/discussions)
- Email: bibliasagrada@noejunior.me

## Versões

### v1.0.0

- Leitura completa da Bíblia
- Favoritos, anotações, busca, temas, versículo do dia, histórico e empacotamento .deb

### Próximas versões

- Planos de leitura
- Comentários e referências cruzadas
- Mapas bíblicos
- Sincronização opcional
- Múltiplas traduções
- Modo apresentação

---

Soli Deo Gloria.
