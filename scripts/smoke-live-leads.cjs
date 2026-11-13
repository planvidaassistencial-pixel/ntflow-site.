const assert = require("node:assert/strict");

(async () => {
  const endpoint = "https://home-fin-nest.lovable.app/";
  const origin = "https://ntflow-site.pages.dev";
  const preflight = await fetch(endpoint, {
    method: "OPTIONS",
    headers: {
      Origin: origin,
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "content-type",
    },
  });
  assert.equal(preflight.status, 204, "CORS preflight must be handled by the NT Flow server");
  assert.equal(preflight.headers.get("access-control-allow-origin"), origin);

  const body = JSON.stringify({
    name: "Teste Automático",
    whatsapp: "(22) 99999-9999",
    email: "teste@example.invalid",
    ref: "nathan",
    website: "filled honeypot means no lead is inserted",
    contactAuthorized: true,
  });
  const blocked = await fetch(endpoint, {
    method: "POST",
    headers: { Origin: "https://invalid.example", "Content-Type": "application/json" },
    body,
  });
  assert.equal(blocked.status, 403, "Other origins must not post website leads");

  const allowed = await fetch(endpoint, {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body,
  });
  assert.equal(allowed.status, 200, "Valid form origin should reach the lead intake route");
  assert.equal(allowed.headers.get("access-control-allow-origin"), origin);
  assert.equal((await allowed.json()).ok, true);
  console.log("Published NT Flow lead intake smoke checks passed without creating a lead");
})().catch((error) => { console.error(error); process.exitCode = 1; });
