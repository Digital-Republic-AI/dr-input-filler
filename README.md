# dr-input-filler

Extensao Chrome (Manifest V3) para preencher campos de texto com dados fake brasileiros. Gera e insere CPF valido, Email, Nome de pessoa e Lorem Ipsum diretamente em campos de formulario via menu de contexto ou popup da extensao. Ideal para testes de formularios, QA e desenvolvimento frontend.

---

## Principais Funcionalidades

- **CPF Valido**
  - Geracao de CPF com digitos verificadores calculados pelo algoritmo modulo-11
  - Opcao de formato com mascara (XXX.XXX.XXX-XX) ou apenas digitos

- **Email Fake**
  - Combinacao de nomes brasileiros aleatorios com dominios fictcios
  - Formato realista (ex: `joao.silva42@email.com`)

- **Nome de Pessoa**
  - Nomes e sobrenomes brasileiros aleatorios (~30 opcoes cada)
  - Formato configuravel: nome completo, somente primeiro nome ou somente sobrenome

- **Lorem Ipsum**
  - Sentencas aleatorias montadas a partir de banco de palavras classico
  - Quantidade de sentencas configuravel (1 a 5)

- **Menu de Contexto**
  - Submenu agrupado "dr-input-filler" com 4 opcoes ao clicar com botao direito em campos editaveis

- **Popup**
  - Seletor de tipo de dado, geracao instantanea e copia automatica para clipboard

- **Pagina de Configuracoes**
  - Preferencias globais (notificacao, clipboard) e por tipo de dado
  - Persistencia via `chrome.storage.sync`

---

## Tecnologias Utilizadas

- **JavaScript (Vanilla)** - Sem frameworks, bundlers ou transpiladores
- **Chrome Extensions Manifest V3** - Service workers, content scripts, popup e options page
- **Chrome APIs** - `contextMenus`, `scripting`, `activeTab`, `storage`
- **HTML5 / CSS3** - Interface do popup e pagina de configuracoes

### Pre-requisitos

- **Google Chrome** (versao 88+ com suporte a Manifest V3)
- **Modo Desenvolvedor** habilitado em `chrome://extensions/`

---

## Instalacao

### Passo 1: Clonar o repositorio

```sh
git clone https://github.com/seu-usuario/dr-input-filler.git
cd dr-input-filler
```

### Passo 2: Carregar a extensao no Chrome

1. Abra `chrome://extensions/` no navegador
2. Ative o **Modo Desenvolvedor** (toggle no canto superior direito)
3. Clique em **"Carregar sem compactacao"** (Load unpacked)
4. Selecione a pasta raiz do projeto `dr-input-filler`

### Passo 3: Usar a extensao

**Via menu de contexto:**
1. Clique em um campo de texto em qualquer pagina
2. Clique com o botao direito
3. Selecione **"dr-input-filler"** e escolha o tipo de dado (CPF, Email, Nome ou Lorem Ipsum)

**Via popup:**
1. Clique no icone da extensao na barra do Chrome
2. Selecione o tipo de dado no dropdown
3. O dado e gerado automaticamente e copiado para o clipboard

**Configuracoes:**
1. Clique com botao direito no icone da extensao > **"Opcoes"**
2. Ajuste preferencias globais e por tipo de dado
3. Clique em **"Salvar Configuracoes"**

> Apos qualquer alteracao no codigo-fonte, recarregue a extensao em `chrome://extensions/` clicando no botao de reload.

---

## Estrutura de Diretorios

```
dr-input-filler/
  images/
    icon-16.png             # Icone 16x16
    icon-48.png             # Icone 48x48
    icon-128.png            # Icone 128x128
  manifest.json             # Configuracao da extensao (Manifest V3)
  background.js             # Service worker - menu de contexto e roteamento de mensagens
  content.js                # Content script - preenchimento de campos e notificacoes
  utils.js                  # Classes geradoras (CPF, Email, Nome, Lorem) e constantes
  popup.html                # Interface do popup
  popup.js                  # Logica do popup - geracao e clipboard
  popup.css                 # Estilos do popup
  options.html              # Pagina de configuracoes
  options.js                # Logica de configuracoes - load/save storage
  options.css               # Estilos da pagina de configuracoes
  CLAUDE.md                 # Guia de arquitetura para Claude Code
  README.md                 # Documentacao do projeto
```

---

## Autor

Desenvolvido pela **Digital Republic**.

---

## Contato

Contato atraves do e-mail: contato@digitalrepublic.com.br
