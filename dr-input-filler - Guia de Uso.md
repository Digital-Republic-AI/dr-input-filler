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

## 📊 Validação de CPF

A extensão gera CPF válido seguindo o algoritmo oficial:

- 11 dígitos no total
- Primeiros 9 dígitos aleatórios
- 10º dígito: primeiro dígito verificador
- 11º dígito: segundo dígito verificador

Os CPF gerados são **válidos matematicamente** mas **fictícios**.

## ✨ Versão

**dr-input-filler v1.0.0**
