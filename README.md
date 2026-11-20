# ⚖️ VALIA — Informação, Direitos e Autonomia

### Aplicativo Mobile | Global Solution — FIAP

O **Valia** é uma aplicação mobile desenvolvida com o objetivo de democratizar o acesso à informação sobre direitos trabalhistas e oferecer ferramentas digitais que auxiliem trabalhadores no acompanhamento de suas relações profissionais.

Por meio de uma interface intuitiva e acessível, o aplicativo permite registrar vínculos empregatícios, acompanhar jornadas de trabalho, analisar horas trabalhadas, avaliar condições profissionais e participar de uma comunidade colaborativa.

O projeto combina **tecnologia, cidadania e impacto social**, buscando contribuir para uma relação mais consciente entre trabalhadores e seus direitos.

---

## 📑 Sumário

1. [Sobre o projeto](#-sobre-o-projeto)
2. [Objetivos](#-objetivos)
3. [Funcionalidades](#-funcionalidades)
4. [Telas do aplicativo](#-telas-do-aplicativo)
5. [Tecnologias utilizadas](#-tecnologias-utilizadas)
6. [Arquitetura e organização](#-arquitetura-e-organização)
7. [Integração com a API](#-integração-com-a-api)
8. [Autenticação e segurança](#-autenticação-e-segurança)
9. [Gerenciamento de dados](#-gerenciamento-de-dados)
10. [Validações e tratamento de erros](#-validações-e-tratamento-de-erros)
11. [Instalação e execução](#-instalação-e-execução)
12. [Fluxo de utilização](#-fluxo-de-utilização)
13. [Identidade visual](#-identidade-visual)
14. [Requisitos acadêmicos](#-requisitos-acadêmicos)
15. [Considerações finais](#-considerações-finais)

---

## 📌 Sobre o projeto

O acesso à informação trabalhista é fundamental para que as pessoas possam reconhecer seus direitos, compreender suas responsabilidades e identificar situações que merecem atenção.

Entretanto, muitos trabalhadores enfrentam dificuldades para interpretar a legislação, organizar informações sobre suas jornadas ou identificar possíveis irregularidades em suas relações profissionais.

O **Valia** foi desenvolvido como uma solução de *CitizenTech*, conceito relacionado ao uso da tecnologia para promover cidadania, participação social e acesso a direitos.

A aplicação reúne recursos preventivos, informativos e colaborativos em um único ambiente digital.

### Problema identificado

Entre os desafios que motivaram o desenvolvimento do projeto, destacam-se:

- Dificuldade de acesso a informações trabalhistas em linguagem acessível.
- Falta de ferramentas simples para acompanhar jornadas de trabalho.
- Dificuldade na organização de informações sobre vínculos profissionais.
- Baixa visibilidade sobre condições inadequadas de trabalho.
- Necessidade de espaços para compartilhar experiências e esclarecer dúvidas.

### Solução proposta

O Valia oferece uma plataforma mobile que permite ao trabalhador organizar informações profissionais, acompanhar sua rotina e consultar conteúdos educativos sobre direitos trabalhistas.

A proposta é proporcionar maior autonomia informacional, sem substituir a atuação de profissionais jurídicos ou órgãos competentes.

---

## 🎯 Objetivos

### Objetivo geral

Desenvolver uma aplicação mobile integrada a uma API REST que contribua para a conscientização e valorização dos direitos trabalhistas.

### Objetivos específicos

- Facilitar o acompanhamento de vínculos empregatícios.
- Permitir o registro e a consulta de jornadas de trabalho.
- Disponibilizar análises relacionadas às horas trabalhadas.
- Incentivar a avaliação das condições profissionais.
- Oferecer conteúdos educativos sobre legislação trabalhista.
- Promover a troca de experiências entre trabalhadores.
- Disponibilizar autenticação e gerenciamento de contas.
- Garantir integração entre aplicativo, backend e banco de dados.
- Proporcionar uma experiência visual intuitiva e consistente.

---

## 🚀 Funcionalidades

O Valia reúne funcionalidades organizadas em módulos.

### 🔐 Autenticação e gerenciamento de contas

O aplicativo possui um sistema de autenticação integrado à API.

**Funcionalidades:**

- Cadastro de novos usuários.
- Login com credenciais.
- Autenticação utilizando JWT.
- Persistência da sessão autenticada.
- Proteção de rotas privadas.
- Logout com encerramento da sessão.
- Consulta das informações do usuário.
- Atualização de e-mail e telefone.
- Desativação da conta.

A autenticação é realizada pelo backend, evitando a utilização de credenciais fictícias ou validações exclusivamente locais.

### 💼 Gerenciamento de vínculos empregatícios

O módulo de vínculos permite ao usuário organizar informações relacionadas às suas relações de trabalho.

**Funcionalidades:**

- Cadastro de vínculos.
- Consulta dos vínculos registrados.
- Visualização de informações individuais.
- Atualização dos registros.
- Exclusão conforme as regras de negócio da API.

Os vínculos também servem como referência para o registro das jornadas.

### 🕒 Registro de jornadas de trabalho

O módulo de jornadas permite acompanhar os horários trabalhados.

**Funcionalidades:**

- Cadastro de jornadas.
- Registro dos horários de entrada e saída.
- Registro do intervalo.
- Consulta do histórico de jornadas.
- Gerenciamento dos registros existentes.
- Associação das jornadas aos vínculos profissionais.

Os dados registrados são enviados à API e persistidos no banco de dados.

### 📊 Análise da jornada

O módulo de análise utiliza informações das jornadas registradas para apresentar indicadores relacionados às horas trabalhadas.

**Objetivos:**

- Facilitar a visualização da carga horária.
- Auxiliar na identificação de possíveis excessos.
- Apresentar informações calculadas a partir dos registros.
- Incentivar o acompanhamento da rotina profissional.

A análise é disponibilizada por meio da integração com os serviços do backend.

**Importante:** os resultados possuem caráter informativo e não representam, isoladamente, a comprovação de irregularidades trabalhistas.

### 📋 Avaliação das condições de trabalho

O aplicativo disponibiliza um módulo voltado à avaliação das condições profissionais.

Por meio de questionários, o usuário pode registrar informações relacionadas ao seu ambiente de trabalho.

**Funcionalidades:**

- Consulta de perguntas disponibilizadas pela API.
- Preenchimento de avaliações.
- Envio das respostas.
- Registro das avaliações no backend.
- Consulta das informações disponibilizadas pelo serviço.

O objetivo é incentivar a reflexão sobre segurança, bem-estar e condições adequadas de trabalho.

### 📚 Central de direitos trabalhistas

A aba **Direitos** disponibiliza conteúdos educativos organizados em categorias.

**Categorias disponíveis:**

| Categoria | Conteúdo |
|---|---|
| Jornada de trabalho | Jornada regular, horas extras e intervalos |
| Salário e benefícios | Pagamento, férias e décimo terceiro salário |
| Saúde e segurança | Prevenção de riscos e equipamentos de proteção |
| Contrato e rescisão | Registro do vínculo e modalidades de desligamento |
| Respeito no trabalho | Assédio, discriminação e dignidade profissional |
| Onde buscar ajuda | Órgãos públicos e canais de orientação |

**Recursos da central:**

- Pesquisa por palavras-chave.
- Filtragem de categorias.
- Navegação para páginas de detalhes.
- Explicações organizadas em seções.
- Referências legais e institucionais.
- Avisos sobre limitações e particularidades da legislação.

Diferentemente dos módulos transacionais, o conteúdo informativo é estruturado localmente no aplicativo, sem necessidade de requisições à API.

### 💬 Comunidade Valia

A Comunidade é um espaço destinado à interação entre usuários.

**Funcionalidades:**

- Consulta do feed de publicações.
- Filtragem por categoria.
- Criação de publicações.
- Publicações anônimas.
- Visualização dos detalhes de uma publicação.
- Consulta dos comentários.
- Criação de comentários.
- Comentários anônimos.
- Identificação de conteúdos pertencentes ao usuário autenticado.

As publicações são organizadas nas seguintes categorias:

| Categoria | Finalidade |
|---|---|
| Relato | Compartilhar experiências profissionais |
| Dúvida | Apresentar perguntas |
| Dica | Compartilhar orientações e sugestões |
| Discussão | Incentivar conversas sobre assuntos trabalhistas |
| Outro | Assuntos relacionados não classificados nas demais categorias |

O backend identifica o autor dos conteúdos, inclusive quando a publicação ou o comentário é exibido anonimamente.

A API também disponibiliza operações de exclusão, sujeitas à autorização do proprietário do conteúdo.

### 👤 Perfil do usuário

A tela de Perfil centraliza as informações da conta autenticada.

**Funcionalidades:**

- Consulta de dados pessoais.
- Atualização de e-mail.
- Atualização de telefone.
- Desativação da conta.
- Logout.

A desativação impede novas autenticações com a conta desativada, conforme a regra implementada no backend.

---

## 📱 Telas do aplicativo

### 1. Tela inicial pública

Apresenta a identidade visual do Valia e oferece acesso ao fluxo de autenticação.

### 2. Login

Permite a autenticação por meio das credenciais cadastradas.

O aplicativo envia as informações à API e recebe os dados necessários para estabelecer a sessão.

### 3. Cadastro

Permite a criação de uma nova conta, utilizando validações nos campos do formulário e integração com o backend.

### 4. Home

A Home funciona como painel principal do aplicativo.

Contém:

- Saudação personalizada.
- Banner informativo.
- Acesso rápido à jornada.
- Acesso à análise da jornada.
- Acesso às condições de trabalho.
- Acesso aos vínculos empregatícios.
- Conteúdo educativo.
- Atalhos para Comunidade e Direitos.

### 5. Meus Vínculos

Apresenta os vínculos profissionais cadastrados e permite acessar as operações de gerenciamento.

### 6. Minha Jornada

Disponibiliza o registro e acompanhamento das jornadas de trabalho.

### 7. Análise da Jornada

Apresenta informações e indicadores calculados com base nas jornadas registradas.

### 8. Condições de Trabalho

Permite responder às avaliações sobre o ambiente profissional.

### 9. Direitos Trabalhistas

Apresenta categorias educativas e um mecanismo de pesquisa.

### 10. Detalhes dos Direitos

Exibe explicações específicas sobre cada categoria, incluindo referências legais.

### 11. Comunidade

Apresenta publicações compartilhadas pelos usuários e filtros por categoria.

### 12. Nova Publicação

Permite criar publicações, selecionar categorias e optar pelo anonimato.

### 13. Detalhes da Publicação

Apresenta o conteúdo completo de uma publicação e seus comentários.

### 14. Perfil

Permite consultar e gerenciar informações da conta.

### 15. Edição do Perfil

Disponibiliza operações de atualização dos dados pessoais permitidos pela API.

---

## 🛠️ Tecnologias utilizadas

### Frontend mobile

| Tecnologia | Finalidade |
|---|---|
| React Native | Desenvolvimento da interface mobile |
| Expo | Ambiente de desenvolvimento e execução |
| TypeScript | Tipagem estática |
| React Navigation | Navegação entre telas |
| Axios | Comunicação HTTP com a API |
| TanStack Query | Gerenciamento de dados assíncronos |
| React Hook Form | Gerenciamento de formulários |
| Yup | Validação de dados |
| React Native Safe Area Context | Adaptação às áreas seguras dos dispositivos |
| Expo Vector Icons | Ícones da interface |

### Backend integrado

O aplicativo consome uma API REST desenvolvida separadamente.

| Tecnologia | Finalidade |
|---|---|
| ASP.NET Core 10 | Desenvolvimento da API |
| C# | Linguagem do backend |
| Entity Framework Core | Mapeamento e persistência de dados |
| Oracle Database | Banco de dados relacional |
| JWT Bearer | Autenticação |
| OpenAPI | Documentação dos endpoints |

O código do backend é mantido em um projeto próprio.

---

## 🏗️ Arquitetura e organização

A aplicação utiliza uma organização modular, separando responsabilidades entre telas, componentes, serviços, modelos, validações e navegação.

### Estrutura de diretórios

A estrutura abaixo representa os principais diretórios e arquivos utilizados no projeto:

```text
app-valia/
│
├── assets/
│
├── src/
│   │
│   ├── components/
│   │   ├── home/
│   │   │   ├── HomeHeader.tsx
│   │   │   ├── RightsBanner.tsx
│   │   │   ├── QuickActionCard.tsx
│   │   │   ├── EducationalCard.tsx
│   │   │   └── HomeExploreCard.tsx
│   │   │
│   │   ├── community/
│   │   │   ├── CommunityPostCard.tsx
│   │   │   └── CommunityCommentCard.tsx
│   │   │
│   │   └── rights/
│   │       └── RightCategoryCard.tsx
│   │
│   ├── screens/
│   │   ├── private/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── RightsScreen.tsx
│   │   │   ├── RightDetailsScreen.tsx
│   │   │   ├── CommunityScreen.tsx
│   │   │   ├── CreateCommunityPostScreen.tsx
│   │   │   └── CommunityPostDetailsScreen.tsx
│   │   │
│   │   └── ...
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── AppTabNavigator.tsx
│   │   └── ...
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── communityPostService.ts
│   │   ├── communityCommentService.ts
│   │   └── ...
│   │
│   ├── models/
│   │   ├── community.ts
│   │   ├── laborRights.ts
│   │   └── ...
│   │
│   ├── validations/
│   │   ├── communitySchema.ts
│   │   └── ...
│   │
│   ├── hooks/
│   │   └── useAuth.ts
│   │
│   ├── data/
│   │   └── laborRights.ts
│   │
│   └── utils/
│       └── communityCategory.ts
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

> A representação destaca os arquivos centrais dos módulos apresentados. Os demais arquivos seguem a organização existente no projeto.

### Separação de responsabilidades

**Screens:** responsáveis pela composição das interfaces, navegação e interação com os recursos da aplicação.

**Components:** elementos visuais reutilizáveis, como cards, cabeçalhos e botões.

**Services:** centralizam as requisições HTTP realizadas à API.

**Models:** definem os contratos de dados utilizados no TypeScript.

**Validations:** concentram os schemas responsáveis pela validação dos formulários.

**Navigation:** organiza as rotas públicas, privadas e a navegação por abas.

**Hooks:** encapsulam comportamentos reutilizáveis, incluindo o acesso ao contexto de autenticação.

**Data:** armazena informações estáticas, como o conteúdo da central de direitos trabalhistas.

**Utils:** reúne funções auxiliares utilizadas em diferentes módulos.

---

## 🔗 Integração com a API

O aplicativo utiliza o Axios para consumir os endpoints disponibilizados pela API REST.

A comunicação segue o fluxo:

```text
Usuário
   │
   ▼
Interface React Native
   │
   ▼
Services (Axios)
   │
   ▼
API REST ASP.NET Core
   │
   ▼
Regras de negócio e persistência
   │
   ▼
Oracle Database
```

### Principais endpoints utilizados

| Método | Endpoint | Finalidade |
|---|---|---|
| POST | `/api/Auth/login` | Autenticação |
| GET | `/api/Auth/me` | Consulta do usuário autenticado |
| PATCH | `/api/User/me/email` | Atualização de e-mail |
| PATCH | `/api/User/me/phone` | Atualização de telefone |
| PATCH | `/api/User/me/deactivate` | Desativação da conta |
| GET | `/api/CommunityPost` | Listagem de publicações |
| GET | `/api/CommunityPost/{id}` | Detalhes de uma publicação |
| POST | `/api/CommunityPost` | Criação de publicação |
| DELETE | `/api/CommunityPost/{id}` | Exclusão de publicação |
| GET | `/api/CommunityComment/post/{postId}` | Comentários de uma publicação |
| POST | `/api/CommunityComment` | Criação de comentário |
| DELETE | `/api/CommunityComment/{id}` | Exclusão de comentário |

Além desses endpoints, o aplicativo utiliza serviços relacionados aos vínculos empregatícios, jornadas de trabalho, análises e avaliações das condições profissionais.

### Comunicação HTTP

O Axios é responsável por:

- Enviar requisições à API.
- Transmitir dados em formato JSON.
- Incluir credenciais de autenticação quando necessário.
- Receber respostas do backend.
- Permitir o tratamento de erros de comunicação.

### TanStack Query

O TanStack Query é utilizado para gerenciar operações assíncronas e o estado dos dados recebidos da API.

Entre os recursos utilizados estão:

- `useQuery` para consultas.
- `useMutation` para operações de escrita.
- Controle de carregamento.
- Tratamento de falhas.
- Cache de consultas.
- Invalidação de consultas após alterações.

Por exemplo, após a criação de uma publicação na Comunidade, a consulta do feed pode ser invalidada para apresentar os dados atualizados.

---

## 🔒 Autenticação e segurança

A autenticação é realizada por meio de JWT (*JSON Web Token*).

### Fluxo de autenticação

```text
Usuário informa as credenciais
             │
             ▼
Aplicativo envia a requisição
             │
             ▼
API valida as credenciais
             │
             ▼
API retorna o token JWT
             │
             ▼
Aplicativo estabelece a sessão
             │
             ▼
Usuário acessa as rotas privadas
```

### Persistência da sessão

A aplicação mantém a sessão autenticada entre utilizações, evitando que o usuário precise realizar login a cada abertura.

### Proteção de rotas

As telas privadas são disponibilizadas somente quando existe uma sessão autenticada válida segundo o fluxo de autenticação da aplicação.

### Logout

Ao realizar logout, a sessão local é encerrada e o usuário retorna ao fluxo público de autenticação.

### Autorização no backend

A API é responsável por validar as permissões das operações protegidas.

Na Comunidade, por exemplo, o backend identifica o proprietário de cada publicação e comentário, permitindo aplicar as regras de autorização correspondentes.

### Desativação de contas

O aplicativo oferece a opção de desativação da conta.

O backend verifica o estado da conta durante a autenticação, impedindo novos logins de usuários desativados.

---

## 💾 Gerenciamento de dados

Os módulos transacionais utilizam dados provenientes da API.

Isso significa que registros como vínculos, jornadas, avaliações e publicações não dependem exclusivamente de estados locais do aplicativo.

### Persistência

Os dados são armazenados no Oracle Database por meio da API ASP.NET Core e de sua camada de persistência.

### Atualização das informações

O aplicativo utiliza consultas e invalidação de cache para atualizar as informações apresentadas após operações de cadastro ou alteração.

### Dados locais

O conteúdo da central de direitos trabalhistas é armazenado em arquivos TypeScript, pois possui caráter educativo e não depende de dados individuais dos usuários.

---

## ✅ Validações e tratamento de erros

O aplicativo utiliza mecanismos de validação e feedback para melhorar a experiência do usuário.

### Validações de formulários

Os formulários utilizam React Hook Form e Yup nos fluxos em que essa abordagem foi implementada.

As validações permitem verificar informações antes do envio à API.

Entre os exemplos estão:

- Campos obrigatórios.
- Formato dos dados.
- Limites de caracteres.
- Seleção de categorias.
- Consistência das informações preenchidas.

### Feedback visual

A interface utiliza diferentes estados para comunicar o resultado das operações.

**Carregamento:** indicadores visuais durante requisições.

**Sucesso:** mensagens de confirmação após operações concluídas.

**Erro:** mensagens informativas quando uma requisição não pode ser concluída.

**Estado vazio:** mensagens específicas quando não existem registros disponíveis.

**Confirmação:** alertas para operações sensíveis, como exclusões e desativação de conta.

### Tratamento de erros da API

As operações assíncronas possuem mecanismos para lidar com falhas de comunicação ou respostas de erro.

As validações realizadas no aplicativo complementam, mas não substituem, as regras implementadas no backend.

---

## ⚙️ Instalação e execução

### Pré-requisitos

Para executar o projeto localmente, é necessário possuir:

- Node.js instalado.
- npm.
- Git.
- Expo Go ou um emulador compatível.
- Acesso à API do Valia.
- Editor de código, como Visual Studio Code.

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

Acesse a pasta:

```bash
cd app-valia
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar a comunicação com a API

Verifique o arquivo responsável pela configuração do Axios:

```text
src/services/api.ts
```

Configure a URL base conforme o ambiente de execução.

Exemplo ilustrativo:

```typescript
const API_BASE_URL = 'http://SEU_IP_LOCAL:PORTA';
```

O endereço e a porta devem corresponder à configuração real do backend.

**Atenção:** quando o aplicativo é executado em um dispositivo físico, `localhost` representa o próprio dispositivo, e não o computador que está executando a API.

Nesse cenário, normalmente é necessário utilizar um endereço de rede acessível pelo dispositivo.

### 4. Iniciar o aplicativo

```bash
npx expo start
```

O Expo iniciará o servidor de desenvolvimento.

Para abrir o aplicativo, utilize o Expo Go ou um ambiente de emulação compatível com a versão do projeto.

### 5. Executar a API

O backend deve estar disponível e conectado ao banco de dados configurado.

Antes de testar os módulos integrados, verifique:

- Se a API está em execução.
- Se o banco de dados está acessível.
- Se a URL configurada no aplicativo está correta.
- Se o dispositivo consegue acessar o servidor.
- Se os endpoints de autenticação estão respondendo.

### 6. Verificar o TypeScript

Para executar a verificação estática:

```bash
npx tsc --noEmit
```

Esse comando identifica problemas de tipagem sem gerar arquivos JavaScript.

---

## 🔄 Fluxo de utilização

O fluxo principal da aplicação pode ser representado da seguinte forma:

```text
               VALIA
                 │
                 ▼
        Tela inicial pública
                 │
          ┌──────┴──────┐
          ▼             ▼
        Login        Cadastro
          │             │
          └──────┬──────┘
                 ▼
          Autenticação
                 │
                 ▼
                Home
                 │
       ┌─────────┼─────────┐
       │         │         │
       ▼         ▼         ▼
   Jornadas   Direitos  Comunidade
       │         │         │
       ▼         ▼         ▼
    Análises  Conteúdos  Publicações
       │       legais       │
       ▼                    ▼
   Condições             Comentários
   de trabalho
       │
       ▼
  Vínculos profissionais

       Perfil do usuário
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
     Dados  Editar  Logout
```

A navegação principal utiliza abas, enquanto funcionalidades específicas são acessadas por rotas adicionais.

---

## 🎨 Identidade visual

A identidade visual do Valia foi desenvolvida para transmitir acolhimento, confiança, seriedade e acessibilidade.

A paleta utiliza tons de vinho, ameixa, terracota e cores claras.

### Paleta de cores

| Cor | Código | Aplicação |
|---|---|---|
| Vinho | `#542039` | Títulos, destaques e elementos principais |
| Ameixa | `#8D4059` | Ícones e elementos secundários |
| Terracota | `#D76D45` | Ações e detalhes visuais |
| Creme | `#FFF7F1` | Fundo principal |
| Grafite | `#30212A` | Textos |
| Rosa-claro | `#F9E6DF` | Fundos de ícones e elementos de apoio |
| Branco | `#FFFFFF` | Cards e superfícies |

### Diretrizes visuais

- Interfaces com boa organização visual.
- Cards com bordas arredondadas.
- Espaçamento consistente.
- Ícones para facilitar a identificação das funcionalidades.
- Textos objetivos e acessíveis.
- Destaques visuais para ações importantes.
- Feedbacks para interações e operações assíncronas.

A proposta visual busca equilibrar uma aparência acolhedora com a seriedade do tema trabalhista.

---

## 🎓 Requisitos acadêmicos

O Valia foi desenvolvido como parte das atividades acadêmicas da **Global Solution — FIAP**, contemplando requisitos relacionados ao desenvolvimento de aplicações mobile integradas a serviços backend.

### Requisitos contemplados na implementação

| Requisito | Implementação |
|---|---|
| Múltiplas telas funcionais | Módulos de jornadas, vínculos, condições, direitos, comunidade e perfil |
| Integração com API .NET | Comunicação HTTP utilizando Axios |
| Operações de cadastro e consulta | Serviços integrados ao backend |
| Atualização e exclusão de registros | Operações disponibilizadas conforme cada módulo |
| Autenticação real | Login e cadastro integrados à API |
| Proteção de rotas | Navegação condicionada à autenticação |
| Persistência de sessão | Manutenção da sessão autenticada |
| Validação de formulários | React Hook Form e Yup |
| Feedback visual | Indicadores de carregamento, alertas e mensagens |
| Persistência de dados | API integrada ao Oracle Database |
| Organização de código | Separação entre telas, componentes, serviços, modelos e validações |
| Navegação mobile | React Navigation |

O projeto procura demonstrar não apenas a construção de interfaces, mas também a integração entre diferentes camadas de uma aplicação.

---

## 🌍 Impacto social

O Valia parte do princípio de que a tecnologia pode contribuir para ampliar o acesso à informação e fortalecer a cidadania.

Ao reunir conteúdos educativos e ferramentas de acompanhamento profissional, o aplicativo busca incentivar atitudes preventivas e uma maior compreensão das relações de trabalho.

A Comunidade complementa essa proposta ao oferecer um espaço para compartilhar experiências e dúvidas.

O projeto não pretende substituir instituições públicas, sindicatos ou profissionais especializados, mas oferecer uma ferramenta complementar de informação e organização.

---

## ⚠️ Aviso importante

As informações trabalhistas apresentadas no aplicativo possuem finalidade educativa.

A legislação pode estabelecer regras específicas conforme o vínculo empregatício, a categoria profissional, acordos coletivos e outras circunstâncias.

As análises realizadas pelo sistema não constituem parecer jurídico nem comprovação automática de irregularidades.

Em situações concretas, recomenda-se buscar orientação nos canais oficiais ou com profissionais habilitados.

---

## 👩‍💻 Desenvolvimento

**Projeto:** Valia — Informação, Direitos e Autonomia

**Instituição:** FIAP

**Contexto:** Global Solution

**Plataforma:** Mobile

**Frontend:** React Native, Expo e TypeScript

**Backend:** ASP.NET Core e C#

**Banco de dados:** Oracle Database

---

## 📄 Considerações finais

O desenvolvimento do Valia demonstra como diferentes tecnologias podem ser integradas para construir uma solução digital voltada a desafios sociais.

A aplicação combina autenticação, persistência de dados, formulários, operações CRUD, consultas assíncronas, navegação estruturada e conteúdos educativos.

Mais do que uma ferramenta de registro, o Valia foi concebido para incentivar o conhecimento, a autonomia e a valorização dos trabalhadores.

**Valia — Porque conhecer seus direitos também é uma forma de proteção.** ⚖️
