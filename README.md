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

Este envio versiona a página existente. Não configura hospedagem nem integrações.

## Verificação desta versão

- Textos em UTF-8 e idioma `pt-BR`.
- Imagens locais e links internos conferidos.
- Três chamadas para o WhatsApp conferidas.
- Sintaxe do JavaScript conferida.

## Pré-cadastro e origem dos links

A página principal continua única. Atribuição inicial por parâmetro `ref`:

- Luan: `https://ntflow-site.pages.dev/?ref=luan` (CTA de WhatsApp aguardando número confirmado).
- Nathan: `https://ntflow-site.pages.dev/?ref=nathan` → WhatsApp +55 22 99226-8946.
- NT Flow: `https://ntflow-site.pages.dev/?ref=ntflow` → o mesmo WhatsApp do Nathan.
- Influenciador: `https://ntflow-site.pages.dev/?ref=influenciador-<slug>` → WhatsApp oficial; informe o nome/@ antes de divulgar o primeiro link.

O campo `source` e o detalhe da origem ficam no CRM. Os visitantes que completarem nome, WhatsApp e e-mail com autorização de contato entram em Administração → CRM · Leads com status Novo. O backend de captura roda no projeto Lovable existente; o site estático envia apenas os dados declarados pelo visitante. Se o número já constar no CRM, o registro anterior não é substituído e sua origem original é preservada.

**Publicação:** a mudança depende da migração no banco e da publicação do backend. Não distribuir a URL do Luan até confirmar o número dele e preencher a configuração do site. A página não envia esse contato para o número do Nathan quando `ref=luan`.
