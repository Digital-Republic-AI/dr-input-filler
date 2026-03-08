# Changelog

Todas as mudancas relevantes deste projeto serao documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [2.1.0] - 2026-02-11

### Adicionado

- Gerador de CNPJ com algoritmo modulo-11 e filial 0001
- Gerador de Celular com DDDs validos e numeros de 9 digitos
- Gerador de RG com 8 digitos e digito verificador
- Itens de menu de contexto para CNPJ, Celular e RG
- Configuracoes de formato (formatado/nao formatado) para CNPJ, RG e Celular

## [2.0.0] - 2026-02-11

### Adicionado

- Versao inicial da extensao Chrome (Manifest V3)
- Gerador de CPF com validacao modulo-11
- Gerador de Email com nomes brasileiros e dominios ficticios
- Gerador de Nome completo, primeiro nome ou sobrenome
- Gerador de Lorem Ipsum com quantidade configuravel de sentencas
- Menu de contexto para preenchimento rapido em campos de texto
- Popup com seletor de tipo e copia para area de transferencia
- Pagina de opcoes com configuracoes globais e por tipo de dado
- Notificacao toast apos preenchimento
- Persistencia de configuracoes via chrome.storage.sync
- Documentacao de uso (USAGE.md)
