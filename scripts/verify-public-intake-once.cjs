const assert = require("node:assert/strict");

(async () => {
  const response = await fetch("https://home-fin-nest.lovable.app/", {
    method: "POST",
    headers: {
      Origin: "https://ntflow-site.pages.dev",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Teste automatizado NT Flow",
      whatsapp: "22999900076",
      email: "ntflow.e2e.20261113@example.invalid",
      ref: "influenciador-wromitoo",
      website: "",
      contactAuthorized: true,
    }),
  });
  assert.equal(response.status, 200, "Public form must accept a valid pre-registration");
  assert.equal((await response.json()).ok, true);
  console.log("One synthetic lead was submitted; verify and remove it in Lovable Cloud.");
})().catch((error) => { console.error(error); process.exitCode = 1; });
