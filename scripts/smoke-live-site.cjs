const assert = require("node:assert/strict");

const base = "https://ntflow-site.pages.dev/";
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkPublishedPage() {
  const bust = "?verification=" + Date.now();
  const [page, script] = await Promise.all([
    fetch(base + bust, { cache: "no-store" }),
    fetch(base + "assets/lead-capture.js" + bust, { cache: "no-store" }),
  ]);
  assert.equal(page.status, 200, "Cloudflare must serve the sales page");
  assert.equal(script.status, 200, "Cloudflare must serve the tracking script");

  const [html, js] = await Promise.all([page.text(), script.text()]);
  assert.match(html, /id="lead-form"/, "The published page must contain the pre-registration form");
  assert.match(html, /assets\/lead-capture\.js/, "The published page must load the routing script");
  assert.match(js, /5522981208565/, "The published Luan bio must reach Luan");
  assert.match(js, /5522992268946/, "The published Nathan and NT Flow bios must reach Nathan");
  assert.match(js, /home-fin-nest\.lovable\.app/, "The published form must target the existing NT Flow backend");
}

(async () => {
  let lastError;
  for (let attempt = 1; attempt <= 12; attempt++) {
    try {
      await checkPublishedPage();
      console.log("Cloudflare Pages serves the NT Flow form and the correct bio routing");
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 12) await pause(8000);
    }
  }
  throw lastError;
})().catch((error) => { console.error(error); process.exitCode = 1; });
