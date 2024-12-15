
# Documentação do Sistema de Blogging

  

## Sumário

  

- [Introdução](#introdução)

- [Arquitetura do Sistema](#arquitetura-do-sistema)

- [Visão Geral](#visão-geral)

- [Front-End](#front-end)

- [Back-End](#back-end)

- [Banco de Dados](#banco-de-dados)

- [Docker e Containers](#docker-e-containers)

- [Instalação e Uso da Aplicação](#instalação-e-uso-da-aplicação)

- [Requisitos](#requisitos)

- [Rodando o Back-End Localmente](#rodando-o-back-end-localmente)

- [Rodando o Front-End Localmente](#rodando-o-front-end-localmente)

- [Rodando com Docker Compose](#rodando-com-docker-compose)

- [Autenticação](#autenticação)

- [Funcionalidades Principais](#funcionalidades-principais)

- [Lista de Posts](#lista-de-posts)

- [Criação de Posts](#criação-de-posts)

- [Edição de Posts](#edição-de-posts)

- [Exclusão de Posts](#exclusão-de-posts)

- [Busca de Posts](#busca-de-posts)

- [Autenticação e Autorização](#autenticação-e-autorização)

- [Experiências e Desafios](#experiências-e-desafios)

- [Integração Front-End e Back-End](#integração-front-end-e-back-end)

- [Estilização e UX](#estilização-e-ux)

- [Manutenção do Estado e Responsividade](#manutenção-do-estado-e-responsividade)

- [Ajustes de Ambiente e Deploy](#ajustes-de-ambiente-e-deploy)

- [Conclusão](#conclusão)

  

---

  

## Introdução

  

Este documento descreve a arquitetura do sistema de blogging desenvolvido, detalha as camadas do projeto, explica como executar a aplicação e relata as experiências e desafios enfrentados pela equipe durante o desenvolvimento.

  

O objetivo da aplicação é permitir a criação, listagem, edição, exclusão e pesquisa de posts, além de fornecer mecanismos de autenticação e autorização simples para proteger certas operações (como criar, editar e administrar posts).

  

---

  

## Arquitetura do Sistema

  

### Visão Geral

  

O sistema é composto por:

  

- Um **Front-End** em React (utilizando Vite como bundler), responsável pela interface gráfica do usuário (UI/UX).

- Um **Back-End** em Node.js com Express, responsável por fornecer a API REST.

- Um **Banco de Dados** MongoDB para armazenamento de posts.

- Containers **Docker** para padronizar a execução do sistema.

  

A comunicação ocorre via HTTP/JSON entre o front-end e o back-end, seguindo uma arquitetura REST simples.

  

### Front-End

  

-  **Tecnologias:** React, Vite, Styled Components, React Router, Axios.

-  **Páginas principais:**

-  **HomePage:** Exibe lista de posts em cards, permite buscar posts, criar novo post (via modal), editar e excluir posts diretamente da página.

-  **LoginPage:** Tela de login estilizada, utiliza a mesma paleta de cores da Home.

-  **Estilização:** Tema baseado em um fundo azul escuro, destaques em amarelo e branco. Layout responsivo, usando Flexbox.

-  **Roteamento:** Utilização do React Router para navegação entre Home, Login, Admin e rotas protegidas.

-  **Autenticação no Front:** Simples, baseada em token armazenado no `localStorage`. Não há um back-end real de autenticação neste exemplo, apenas um mock.

### Back-End

  

-  **Tecnologias:** Node.js, Express, Mongoose.

-  **Endpoints principais:**

-  `GET /api/posts`: Lista todos os posts.

-  `GET /api/posts/:id`: Obtém um post específico por ID.

-  `POST /api/posts`: Cria um novo post.

-  `PUT /api/posts/:id`: Atualiza um post existente.

-  `DELETE /api/posts/:id`: Exclui um post.

-  `GET /api/posts/search?query=...`: Busca posts por palavra-chave no título ou conteúdo.

-  **Configuração:** As variáveis de ambiente (como URI do MongoDB) são lidas de um arquivo `.env`.

  

### Banco de Dados

  

-  **MongoDB:** Usado para armazenar os posts em uma coleção simples.

-  **Schema do Post:**

```javascript
{

title: String,

content: String,

author: String,

createdAt: Date

}
```

  

### Docker e Containers

Um Dockerfile é utilizado para construir a imagem do back-end.

Um docker-compose.yml orquestra a aplicação e o banco:

app (Node.js): exposto na porta 3000.

db (MongoDB): exposto na porta 27017.

O front-end também pode ser containerizado caso necessário.

  

### Instalação e Uso da Aplicação

Requisitos

- Node.js (para rodar localmente)

- NPM ou Yarn

- Docker e Docker Compose (opcional para rodar em contêiner)

  

### Rodando o Back-End Localmente

1. Na pasta do back-end:

```

npm install

npm start

```

O servidor estará disponível em http://localhost:3000.

  

2. Certifique-se de ter um MongoDB rodando (localmente ou via Docker). Ajuste a variável MONGO_URI no .env.

  

### Rodando o Front-End Localmente

1. Na pasta do front-end:

```

npm install

npm run dev

```
Acesse `http://localhost:5173`

2. Ajuste o proxy no `vite.config.js` se necessário, para direcionar `/api` para `http://localhost:3000`.

### Rodando com Docker Compose
1. Na raiz do projeto (contendo `docker-compose.yml`):

```
docker-compose up --build
```
A aplicação estará disponível em `http://localhost:3000/api` (back-end) e, caso o front-end também seja containerizado, em sua respectiva porta.

### Funcionalidades Principais
### Lista de Posts

-   Exibição de todos os posts em forma de cards.
-   Cada card pode ser clicado para expandir e exibir conteúdo detalhado, além de botões para editar e excluir (se autenticado).

### Criação de Posts

-   Botão “Criar Post” na HomePage.
-   Ao clicar, abre-se um modal com formulário (título, autor, conteúdo).
-   Ao enviar, o post é criado e adicionado à lista dinâmica.

### Edição de Posts

-   Ao expandir um card, pode-se clicar em “Editar” para entrar em modo de edição inline.
-   Ao salvar, o post é atualizado via endpoint PUT.

### Exclusão de Posts

-   Ao expandir um card, clicar em “Excluir” remove o post via endpoint DELETE.
-   Um toast de sucesso é exibido.

### Busca de Posts

-   Campo de busca na Home filtra localmente os posts pelo título e conteúdo.
-   Caso nenhum post seja encontrado, uma mensagem “Nenhum post disponível” é exibida.

### Autenticação e Autorização

-   Tela de login estilizada.
-   Só usuários logados podem criar, editar ou excluir posts.
-   O logout é feito via botão no rodapé da HomePage, removendo o token do `localStorage`.

### Experiências e Desafios

### Integração Front-End e Back-End

-   A principal dificuldade foi garantir que o front-end comunicasse corretamente com o back-end, respeitando o CORS e portas diferentes.
-   A configuração de um proxy no Vite simplificou o acesso ao endpoint `/api`.

### Estilização e UX

-   O uso do Styled Components ajudou a manter um padrão visual consistente.
-   O modal para criar posts e a expansão inline dos cards melhoraram a experiência do usuário.
-   O sistema de feedback visual com toasts (react-toastify) tornou o uso mais dinâmico e agradável.

### Manutenção do Estado e Responsividade

-   O uso de `useState`, `useEffect` e `axios` tornou a lógica de estado simples e direta.
-   A responsividade foi trabalhada utilizando Flexbox e layouts centrados.
-   O expandir/colapsar dos cards e o modo de edição inline foram gerenciados via estados locais.

### Ajustes de Ambiente e Deploy

-   O uso do Docker Compose facilitou a execução do back-end e do banco de dados de forma padronizada.
-   Em um ambiente de produção, recomendaria-se o uso de um build otimizado do front-end e de variáveis de ambiente protegidas, além de um sistema de autenticação real.

### Conclusão

O projeto demonstra um fluxo completo de desenvolvimento, indo do back-end Node.js/Express com banco MongoDB até um front-end React bem definido, estilizado e integrado. Os desafios enfrentados incluíram a integração entre camadas, a criação de uma UX mais rica e a manutenção da consistência visual.

Os resultados atendem aos requisitos funcionais: listar, criar, editar, excluir, buscar posts, autenticar usuários (mock) e exibir mensagens claras ao usuário. O código resultante pode servir de base para projetos futuros, escalando para um sistema de autenticação real, testes mais robustos e um pipeline de CI/CD mais complexo.