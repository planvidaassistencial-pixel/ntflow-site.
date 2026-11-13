# NT Flow — Página de vendas

Página estática oficial do projeto de vendas do NT Flow.

## Arquivos

- `index.html`: conteúdo, estilos e menu responsivo.
- `assets/logo.png`: logotipo da marca.
- `assets/monogram.png`: símbolo e favicon.
- `assets/painel.png`: imagem do produto.

## Editar e visualizar

Edite `index.html` e mantenha os caminhos relativos dos arquivos em `assets/`. A página pode ser aberta diretamente no navegador. Para servir por HTTP, execute `npx --yes serve .` nesta pasta.

Sem parâmetro de origem, os links comerciais usam o WhatsApp **+55 22 99226-8946**. A configuração por origem está descrita abaixo. O menu móvel funciona com JavaScript; o conteúdo e os links continuam disponíveis sem ele.

## Publicação

Não há etapa de compilação. Publique a raiz deste repositório em uma hospedagem estática. Para GitHub Pages: em **Settings → Pages**, selecione **Deploy from a branch**, branch **main** e pasta **/(root)**. O endereço público deve ser confirmado após a publicação.

A hospedagem oficial usa Cloudflare Pages no projeto `ntflow-site` conectado à branch `main`; o pré-cadastro envia dados ao backend do projeto NT Flow existente.

## Verificação desta versão

- Textos em UTF-8 e idioma `pt-BR`.
- Imagens locais e links internos conferidos.
- Quatro chamadas comerciais roteadas ao WhatsApp do perfil identificado.
- Sintaxe do JavaScript conferida.

## Pré-cadastro e origem dos links

A página principal continua única. Atribuição inicial por parâmetro `ref`:

- Luan: `https://ntflow-site.pages.dev/?ref=luan` → WhatsApp +55 22 98120-8565.
- Nathan: `https://ntflow-site.pages.dev/?ref=nathan` → WhatsApp +55 22 99226-8946.
- NT Flow: `https://ntflow-site.pages.dev/?ref=ntflow` → o mesmo WhatsApp do Nathan.
- @wromitoo: `https://ntflow-site.pages.dev/?ref=influenciador-wromitoo` → WhatsApp oficial; o identificador `wromitoo` aparece no detalhe da origem no CRM.
- Influenciadores futuros: `https://ntflow-site.pages.dev/?ref=influenciador-<slug>` → um código único por perfil.

O campo `source` e o detalhe da origem ficam no CRM. Os visitantes que completarem nome, WhatsApp e e-mail com autorização de contato entram em Administração → CRM · Leads com status Novo. O backend de captura roda no projeto Lovable existente; o site estático envia apenas os dados declarados pelo visitante. Se o número já constar no CRM, o registro anterior não é substituído e sua origem original é preservada.

**Publicação:** o backend e a migração já estão no projeto Lovable existente. Integrar e validar esta página no Cloudflare Pages antes de divulgar os links nas bios. Cada botão comercial recebe seu número a partir da origem; sem JavaScript, nenhum botão exibe um número fixo que possa direcionar o contato ao perfil errado.
