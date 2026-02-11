# dr-input-filler

Extensão Chrome (Manifest V3) para preencher campos de texto com dados fake brasileiros. Gera e insere CPF, CNPJ, RG, Email, Nome de pessoa, Celular e Lorem Ipsum diretamente em campos de formulário via menu de contexto ou popup da extensão. Ideal para testes de formulários, QA e desenvolvimento frontend.

---

## Principais Funcionalidades

- **CPF Válido**
  - Geração de CPF com dígitos verificadores calculados pelo algoritmo módulo-11
  - Opção de formato com máscara (XXX.XXX.XXX-XX) ou apenas dígitos

- **CNPJ Válido**
  - Geração de CNPJ com dígitos verificadores calculados pelo algoritmo módulo-11
  - Filial padrão 0001
  - Opção de formato com máscara (XX.XXX.XXX/XXXX-XX) ou apenas dígitos

- **RG**
  - Geração de RG com 8 dígitos aleatórios e dígito verificador calculado
  - Opção de formato com máscara (XX.XXX.XXX-X) ou apenas dígitos

- **Email Fake**
  - Combinação de nomes brasileiros aleatórios com domínios fictícios
  - Formato realista (ex: `joao.silva42@email.com`)

- **Nome de Pessoa**
  - Nomes e sobrenomes brasileiros aleatórios (~30 opções cada)
  - Formato configurável: nome completo, somente primeiro nome ou somente sobrenome

- **Celular**
  - Geração de número de celular com DDDs brasileiros válidos
  - Prefixo 9 obrigatório para celulares
  - Opção de formato com máscara ((XX) 9XXXX-XXXX) ou apenas dígitos

- **Lorem Ipsum**
  - Sentenças aleatórias montadas a partir de banco de palavras clássico
  - Quantidade de sentenças configurável (1 a 5)

- **Menu de Contexto**
  - Submenu agrupado "dr-input-filler" com 7 opções ao clicar com botão direito em campos editáveis

- **Popup**
  - Seletor de tipo de dado, geração instantânea e cópia automática para clipboard

- **Página de Configurações**
  - Preferências globais (notificação, clipboard) e por tipo de dado
  - Persistência via `chrome.storage.sync`

---

## Tecnologias Utilizadas

- **JavaScript (Vanilla)** - Sem frameworks, bundlers ou transpiladores
- **Chrome Extensions Manifest V3** - Service workers, content scripts, popup e options page
- **Chrome APIs** - `contextMenus`, `scripting`, `activeTab`, `storage`
- **HTML5 / CSS3** - Interface do popup e página de configurações

### Pré-requisitos

- **Google Chrome** (versão 88+ com suporte a Manifest V3)
- **Modo Desenvolvedor** habilitado em `chrome://extensions/`

---

## Instalação

### Passo 1: Clonar o repositório

```sh
git clone git@github.com:Digital-Republic-AI/dr-input-filler.git
cd dr-input-filler
```

### Passo 2: Carregar a extensão no Chrome

1. Abra `chrome://extensions/` no navegador
2. Ative o **Modo Desenvolvedor** (toggle no canto superior direito)
3. Clique em **"Carregar sem compactação"** (Load unpacked)
4. Selecione a pasta raiz do projeto `dr-input-filler`

### Passo 3: Usar a extensão

**Via menu de contexto:**
1. Clique em um campo de texto em qualquer página
2. Clique com o botão direito
3. Selecione **"dr-input-filler"** e escolha o tipo de dado (CPF, CNPJ, RG, Email, Nome, Celular ou Lorem Ipsum)

**Via popup:**
1. Clique no ícone da extensão na barra do Chrome
2. Selecione o tipo de dado no dropdown
3. O dado é gerado automaticamente e copiado para o clipboard

**Configurações:**
1. Clique com botão direito no ícone da extensão > **"Opções"**
2. Ajuste preferências globais e por tipo de dado
3. Clique em **"Salvar Configurações"**

> Após qualquer alteração no código-fonte, recarregue a extensão em `chrome://extensions/` clicando no botão de reload.

---

## Estrutura de Diretórios

```
dr-input-filler/
  images/
    icon-16.png             # Ícone 16x16
    icon-48.png             # Ícone 48x48
    icon-128.png            # Ícone 128x128
  manifest.json             # Configuração da extensão (Manifest V3)
  background.js             # Service worker - menu de contexto e roteamento de mensagens
  content.js                # Content script - preenchimento de campos e notificações
  utils.js                  # Classes geradoras (CPF, CNPJ, RG, Email, Nome, Celular, Lorem) e constantes
  popup.html                # Interface do popup
  popup.js                  # Lógica do popup - geração e clipboard
  popup.css                 # Estilos do popup
  options.html              # Página de configurações
  options.js                # Lógica de configurações - load/save storage
  options.css               # Estilos da página de configurações
  README.md                 # Documentação do projeto
```

---

## Autor

Desenvolvido pela **Digital Republic**.

---

## Contato

Contato através do e-mail: contato@digitalrepublic.com.br
