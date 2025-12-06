# FafecomSite

Aplicativo web front-end que gera **ícones estilo app** a partir da fusão de **imagens** (upload, URL ou aleatórias) com **sites/apps** (URL). O ícone resultante contém um selo personalizável e, ao ser clicado, abre o site destino em nova aba — ideal para criar atalhos visuais estilo smartphone.

---

## Recursos principais

* Geração inteira **no navegador** (sem backend).
* Upload de imagem, uso de URL de imagem ou seleção aleatória ("Surpresa").
* Campo para URL do site/app destino.
* Selo personalizável (texto) posicionado discretamente no ícone.
* Ícone 1:1 com bordas arredondadas (canvas 512×512).
* Ícone clicável que abre o site destino em nova aba.
* Download do PNG final.
* Fácil deploy em hosting estático (GitHub Pages, Netlify, Vercel, etc).

---

## Estrutura de arquivos

```
/ (root)
├─ index.html        # página principal (UI)
├─ script.js         # lógica de geração (canvas, uploads, Surpresa)
├─ style.css         # estilos
├─ assets/           # (opcional) imagens locais de exemplo
README.md             # este arquivo
```

---

## Como executar localmente (rápido)

> Recomenda-se usar um servidor local para evitar problemas de CORS com imagens remotas.

1. Clone ou baixe os arquivos no seu computador.
2. No diretório do projeto, inicie um servidor estático simples:

* Com Node (http-server):

```bash
npx http-server -c-1 .
# ou
npm install -g http-server
http-server -c-1 .
```

* Com Python 3:

```bash
python -m http.server 8000
```

3. Abra no navegador:

```
http://localhost:8080   # (ajuste a porta conforme o servidor)
# ou
http://localhost:8000
```

4. Use o botão **Surpresa** ou envie sua própria imagem/URL, preencha o site destino e o selo, clique **Gerar Ícone**. Clique no ícone para abrir o site e use **Baixar PNG** para salvar.

---

## Deploy no GitHub Pages (passo a passo)

1. Crie um novo repositório no GitHub (por exemplo `FafecomSite`) na sua conta (`thutubealegria-tech`).
2. Faça upload dos arquivos (`index.html`, `script.js`, `style.css`, `README.md`, `assets/`).
3. No GitHub vá em **Settings → Pages** (ou `Settings → Pages` na nova UI).
4. Em **Source** selecione `main` branch e `/ (root)` como pasta e salve.
5. Aguarde alguns minutos. A página pública estará disponível em:

```
https://<seu-usuario>.github.io/FafecomSite/
# Exemplo:
https://thutubealegria-tech.github.io/FafecomSite/
```

---

## Personalização rápida

* **Banco de imagens de "Surpresa"**: edite o array `SAMPLE_IMAGES` em `script.js`.
* **Sites de exemplo**: edite `SAMPLE_SITES` em `script.js`.
* **Dimensões do ícone**: ajuste `size` no `canvas` (padrão 512).
* **Aparência do selo**: altere estilos do badge (tamanho, posição, cor, opacidade) no `script.js`.
* **Estilos visuais**: edite `style.css`.

---

## Melhorias e próximos passos sugeridos

* Gerar múltiplas resoluções (512/192/180/96/72) e empacotar em ZIP (client-side ou via backend).
* Backend (Node.js + sharp) para composições mais avançadas e geração server-side.
* Transformar em PWA (adicionar `manifest.json` + `service-worker.js`) para permitir instalação nativa no dispositivo.
* Opções visuais do selo: fontes, cores, monogramas, posicionamento (configurável pela UI).
* Armazenamento em nuvem (S3) para hosts grandes ou compartilhamento de ícones gerados.

---

## Problemas conhecidos / dicas

* Algumas imagens remotas podem bloquear carregamento por CORS — se isso ocorrer, use upload local ou hospede a imagem em um domínio que permita `cross-origin`. Ao testar localmente, sirva via servidor (veja seção "Como executar localmente").
* Navegadores antigos podem apresentar diferenças na renderização de fontes no canvas.

---

## Licença

Licença MIT — sinta-se livre para adaptar, distribuir e usar no seu projeto. Inclua crédito se compartilhar publicamente.

---

## Contato / Suporte

Se quiser que eu:

* gere o ZIP final com todos os arquivos prontos para upload no GitHub Pages,
* adicione PWA (manifest + service-worker),
* gere a versão com backend (Node.js + sharp) e ZIP com múltiplas resoluções,

me diga qual opção prefere que eu faça agora. Obrigado!
