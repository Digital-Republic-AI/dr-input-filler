# dr-input-filler - Guia de Uso

## Descrição

**dr-input-filler** é uma extensão Chrome (Manifest V3) para preenchimento automático de campos editáveis com dados fake brasileiros. Suporta geração de CPF válido, Email, Nome de pessoa e Lorem Ipsum via context menu ou popup.

## Instalação

1. Acesse `chrome://extensions/`
2. Habilite **Developer mode**
3. Selecione **Load unpacked** e aponte para o diretório raiz do projeto
4. A extensão será registrada e o ícone exibido na toolbar do Chrome

## Utilização

### Context Menu (clique direito)

1. Foque em um elemento editável (`<input>`, `<textarea>` ou `contenteditable`)
2. Acione o context menu (botão direito)
3. Navegue até **dr-input-filler** e selecione o tipo de dado:
   - **CPF válido** - Gera CPF com dígitos verificadores (algoritmo módulo-11)
   - **Email** - Combina nome aleatório + número + domínio fictício
   - **Nome de pessoa** - Nome completo brasileiro aleatório
   - **Lorem Ipsum** - Sentenças aleatórias do banco clássico de palavras
4. O valor é inserido no campo, eventos `input` e `change` são disparados

### Popup

1. Clique no ícone da extensão na toolbar
2. Selecione o tipo de dado no `<select>`
3. O valor é gerado automaticamente e copiado para o clipboard
4. Clique em **Gerar** para regenerar

### Página de Configurações

Acesse via: ícone da extensão (botão direito) > **Opções**, ou `chrome://extensions/` > dr-input-filler > Detalhes > Opções da extensão.

**Configurações globais:**
- Notificação toast após preenchimento (on/off)
- Cópia automática para clipboard (on/off)

**Configurações por tipo:**
- **CPF**: formato com máscara (`XXX.XXX.XXX-XX`) ou apenas dígitos
- **Nome**: nome completo, somente primeiro nome ou somente sobrenome
- **Lorem Ipsum**: quantidade de sentenças (1 a 5)

Todas as preferências são persistidas via `chrome.storage.sync`.

## Arquitetura de Comunicação

```
context menu click
  -> background.js (service worker)
  -> chrome.tabs.sendMessage({action: "fill", type})
  -> content.js
  -> chrome.storage.sync.get() (carrega settings)
  -> Generator.generate() (gera valor conforme tipo)
  -> element.value = valor + dispatchEvent(input/change)
```

Caso o content script não esteja carregado na tab (extensão recarregada sem refresh da página), o `background.js` injeta os scripts via `chrome.scripting.executeScript` como fallback e reenvia a mensagem.

## Geradores (utils.js)

| Classe | Método | Descrição |
|---|---|---|
| `CPFGenerator` | `generateValidCPF()` | 9 dígitos aleatórios + 2 verificadores (módulo-11) |
| `CPFGenerator` | `formatCPF(cpf)` | Aplica máscara `XXX.XXX.XXX-XX` |
| `CPFGenerator` | `validateCPF(cpf)` | Valida CPF pelo algoritmo reverso |
| `EmailGenerator` | `generate()` | `nome.sobrenome{N}@domínio` |
| `PersonNameGenerator` | `generate(format)` | Retorna full, first ou last name |
| `LoremIpsumGenerator` | `generate(sentences)` | N sentenças de 6-14 palavras |

## Segurança e Privacidade

- Nenhum dado é transmitido para servidores externos
- Toda a geração ocorre client-side no contexto da extensão
- Permissões utilizadas: `contextMenus`, `scripting`, `activeTab`, `storage`
- Os dados gerados são aleatórios e não correspondem a registros reais

## Troubleshooting

| Sintoma | Causa provável | Solução |
|---|---|---|
| Submenu não aparece no context menu | Elemento focado não é editável | Focar em `<input>`, `<textarea>` ou `contenteditable` |
| Campo não é preenchido | Content script não carregado | Recarregar a página ou a extensão em `chrome://extensions/` |
| Notificação não exibida | Setting desabilitado | Verificar em Opções > Mostrar notificação |
| Erro "Receiving end does not exist" | Tab aberta antes da instalação | Recarregar a página (o fallback de inject resolve automaticamente) |

## Versão

**dr-input-filler v2.0.0**
