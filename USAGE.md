# dr-input-filler - Guia de Uso

## 📋 Descrição

**dr-input-filler** é uma extensão Chrome que permite preencher campos de texto com CPF válido de forma rápida e fácil, usando apenas o menu de contexto (clique direito).

## 🚀 Como Usar

### Instalação

1. Abra o Chrome e vá para `chrome://extensions/`
2. Ative o "Modo de desenvolvedor" (canto superior direito)
3. Clique em "Carregar extensão não empacotada"
4. Selecione a pasta da extensão (`dr-input-filler`)
5. A extensão aparecerá na barra de ferramentas do Chrome

### Preenchimento de CPF

1. **Clique em um campo de texto** (input ou textarea) em qualquer página web
2. **Clique com o botão direito** no campo
3. **Selecione "Preencher com CPF válido"** no menu de contexto
4. Um CPF válido será gerado e preenchido automaticamente
5. Uma notificação confirmará a ação

## ⚙️ Configurações

Acesse as configurações da extensão para personalizar:

- **Formato do CPF**: Escolha entre formatado (XXX.XXX.XXX-XX) ou sem formatação
- **Mostrar notificação**: Ative/desative a notificação ao preencher
- **Copiar para área de transferência**: Copie automaticamente o CPF gerado

### Como acessar as configurações

1. Clique no ícone da extensão na barra de ferramentas
2. Clique em "Configurações" no rodapé do popup
3. Ou acesse `chrome://extensions/` → dr-input-filler → Detalhes → Opções

## 🎯 Funcionalidades

- ✅ Geração de CPF válido com dígitos verificadores corretos
- ✅ Menu de contexto integrado (clique direito)
- ✅ Formatação automática (XXX.XXX.XXX-XX)
- ✅ Notificação visual ao preencher
- ✅ Popup com gerador de CPF
- ✅ Configurações personalizáveis
- ✅ Funciona em qualquer página web

## 🔒 Segurança

- A extensão **não coleta dados pessoais**
- Os CPF gerados são **aleatórios e válidos matematicamente**
- Nenhuma informação é enviada para servidores externos
- Funciona completamente **offline**

## 📝 Exemplos de Uso

### Preenchimento em Formulários

1. Abra um formulário com campo de CPF
2. Clique no campo de CPF
3. Clique direito e selecione "Preencher com CPF válido"
4. O campo será preenchido automaticamente

### Geração Rápida

1. Clique no ícone da extensão na barra de ferramentas
2. Clique em "Gerar CPF"
3. O CPF será exibido e copiado para a área de transferência
4. Cole em qualquer lugar

## 🐛 Troubleshooting

### A extensão não aparece no menu de contexto

- Verifique se você clicou em um campo de texto (input ou textarea)
- Recarregue a página (F5)
- Recarregue a extensão em `chrome://extensions/`

### O CPF não está sendo preenchido

- Certifique-se de que o campo está focado (clique nele primeiro)
- Verifique se o campo não tem JavaScript que impede a alteração
- Tente em outra página

### A notificação não aparece

- Verifique as configurações (deve estar ativada por padrão)
- Certifique-se de que a extensão tem permissão para exibir notificações

## 📊 Validação de CPF

A extensão gera CPF válido seguindo o algoritmo oficial:

- 11 dígitos no total
- Primeiros 9 dígitos aleatórios
- 10º dígito: primeiro dígito verificador
- 11º dígito: segundo dígito verificador

Os CPF gerados são **válidos matematicamente** mas **fictícios** (não correspondem a pessoas reais).

## 🔄 Atualizações

Verifique periodicamente se há atualizações disponíveis em `chrome://extensions/`.

## 📧 Suporte

Para reportar bugs ou sugerir melhorias, considere:

1. Verificar se o problema já foi resolvido em uma versão mais recente
2. Desabilitar outras extensões para verificar conflitos
3. Limpar cache do navegador

## 📜 Licença

Esta extensão é fornecida como está, para fins educacionais e de desenvolvimento.

## ✨ Versão

**dr-input-filler v1.0.0**

---

**Aproveite a extensão! 🎉**
