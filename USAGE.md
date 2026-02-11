# dr-input-filler - Guia de Uso

## Descricao

**dr-input-filler** e uma extensao Chrome (Manifest V3) para preenchimento automatico de campos editaveis com dados fake brasileiros. Suporta geracao de CPF valido, Email, Nome de pessoa e Lorem Ipsum via context menu ou popup.

## Instalacao

1. Acesse `chrome://extensions/`
2. Habilite **Developer mode**
3. Selecione **Load unpacked** e aponte para o diretorio raiz do projeto
4. A extensao sera registrada e o icone exibido na toolbar do Chrome

## Utilizacao

### Context Menu (clique direito)

1. Foque em um elemento editavel (`<input>`, `<textarea>` ou `contenteditable`)
2. Acione o context menu (botao direito)
3. Navegue ate **dr-input-filler** e selecione o tipo de dado:
   - **CPF valido** - Gera CPF com digitos verificadores (algoritmo modulo-11)
   - **Email** - Combina nome aleatorio + numero + dominio ficticio
   - **Nome de pessoa** - Nome completo brasileiro aleatorio
   - **Lorem Ipsum** - Sentencas aleatorias do banco classico de palavras
4. O valor e inserido no campo, eventos `input` e `change` sao disparados

### Popup

1. Clique no icone da extensao na toolbar
2. Selecione o tipo de dado no `<select>`
3. O valor e gerado automaticamente e copiado para o clipboard
4. Clique em **Gerar** para regenerar

### Pagina de Configuracoes

Acesse via: icone da extensao (botao direito) > **Opcoes**, ou `chrome://extensions/` > dr-input-filler > Detalhes > Opcoes da extensao.

**Configuracoes globais:**
- Notificacao toast apos preenchimento (on/off)
- Copia automatica para clipboard (on/off)

**Configuracoes por tipo:**
- **CPF**: formato com mascara (`XXX.XXX.XXX-XX`) ou apenas digitos
- **Nome**: nome completo, somente primeiro nome ou somente sobrenome
- **Lorem Ipsum**: quantidade de sentencas (1 a 5)

Todas as preferencias sao persistidas via `chrome.storage.sync`.

## Arquitetura de Comunicacao

```
context menu click
  -> background.js (service worker)
  -> chrome.tabs.sendMessage({action: "fill", type})
  -> content.js
  -> chrome.storage.sync.get() (carrega settings)
  -> Generator.generate() (gera valor conforme tipo)
  -> element.value = valor + dispatchEvent(input/change)
```

Caso o content script nao esteja carregado na tab (extensao recarregada sem refresh da pagina), o `background.js` injeta os scripts via `chrome.scripting.executeScript` como fallback e reenvia a mensagem.

## Geradores (utils.js)

| Classe | Metodo | Descricao |
|---|---|---|
| `CPFGenerator` | `generateValidCPF()` | 9 digitos aleatorios + 2 verificadores (modulo-11) |
| `CPFGenerator` | `formatCPF(cpf)` | Aplica mascara `XXX.XXX.XXX-XX` |
| `CPFGenerator` | `validateCPF(cpf)` | Valida CPF pelo algoritmo reverso |
| `EmailGenerator` | `generate()` | `nome.sobrenome{N}@dominio` |
| `PersonNameGenerator` | `generate(format)` | Retorna full, first ou last name |
| `LoremIpsumGenerator` | `generate(sentences)` | N sentencas de 6-14 palavras |

## Seguranca e Privacidade

- Nenhum dado e transmitido para servidores externos
- Toda a geracao ocorre client-side no contexto da extensao
- Permissoes utilizadas: `contextMenus`, `scripting`, `activeTab`, `storage`
- Os dados gerados sao aleatorios e nao correspondem a registros reais

## Troubleshooting

| Sintoma | Causa provavel | Solucao |
|---|---|---|
| Submenu nao aparece no context menu | Elemento focado nao e editavel | Focar em `<input>`, `<textarea>` ou `contenteditable` |
| Campo nao e preenchido | Content script nao carregado | Recarregar a pagina ou a extensao em `chrome://extensions/` |
| Notificacao nao exibida | Setting desabilitado | Verificar em Opcoes > Mostrar notificacao |
| Erro "Receiving end does not exist" | Tab aberta antes da instalacao | Recarregar a pagina (o fallback de inject resolve automaticamente) |

## Versao

**dr-input-filler v2.0.0**
