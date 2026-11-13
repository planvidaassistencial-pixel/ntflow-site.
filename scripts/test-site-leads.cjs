const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const script = fs.readFileSync("assets/lead-capture.js", "utf8");

function render(search, sessionStorage = new Map()) {
  const links = Array.from({ length: 2 }, () => ({
    href: "https://wa.me/5522992268946",
    target: "_blank",
    rel: "noopener noreferrer",
    removeAttribute(field) { delete this[field]; },
  }));
  const button = { disabled: false, textContent: "" };
  const feedback = { textContent: "", className: "" };
  const phone = { textContent: "(22) 99226-8946" };
  const form = {
    fields: {
      name: "Pessoa Teste",
      whatsapp: "(22) 99999-9999",
      email: "pessoa@example.com",
      website: "",
      contactAuthorized: "on",
    },
    querySelector() { return button; },
    addEventListener(type, listener) { if (type === "submit") this.submit = listener; },
    reportValidity() { return true; },
    reset() { this.cleared = true; },
  };
  const requests = [];
  vm.runInNewContext(script, {
    location: { search },
    URLSearchParams,
    AbortController,
    setTimeout,
    clearTimeout,
    encodeURIComponent,
    sessionStorage: {
      getItem(key) { return sessionStorage.get(key) || null; },
      setItem(key, value) { sessionStorage.set(key, value); },
    },
    document: {
      querySelectorAll() { return links; },
      getElementById(id) { return id === "lead-form" ? form : id === "lead-feedback" ? feedback : id === "contact-phone" ? phone : null; },
    },
    FormData: class {
      constructor(source) { this.source = source; }
      get(key) { return this.source.fields[key]; }
    },
    fetch: async (url, options) => {
      requests.push({ url, options });
      return { ok: true, json: async () => ({ ok: true }) };
    },
  });
  return { links, form, phone, feedback, requests, sessionStorage };
}

(async () => {
  const nathan = render("?ref=nathan");
  assert.ok(nathan.links.every(link => link.href.startsWith("https://wa.me/5522992268946?")));
  assert.match(decodeURIComponent(nathan.links[0].href), /Instagram do Nathan/);
  await nathan.form.submit({ preventDefault() {} });
  const payload = JSON.parse(nathan.requests[0].options.body);
  assert.equal(nathan.requests[0].url, "https://home-fin-nest.lovable.app/");
  assert.equal(payload.ref, "nathan");
  assert.equal(payload.contactAuthorized, true);
  assert.equal(payload.name, "Pessoa Teste");
  assert.match(nathan.feedback.textContent, /recebido/i);

  const account = render("?ref=ntflow");
  assert.match(decodeURIComponent(account.links[0].href), /Instagram do NT Flow/);

  const luan = render("?ref=luan");
  assert.ok(luan.links.every(link => link.href === "#cadastro"));
  assert.equal(luan.phone.textContent, "um consultor");

  const influencer = render("?ref=influenciador-maria-exemplo");
  await influencer.form.submit({ preventDefault() {} });
  assert.equal(JSON.parse(influencer.requests[0].options.body).ref, "influenciador-maria-exemplo");
  assert.match(decodeURIComponent(influencer.links[0].href), /maria exemplo/);

  const session = new Map();
  render("?ref=nathan", session);
  const fromSession = render("", session);
  assert.match(decodeURIComponent(fromSession.links[0].href), /Instagram do Nathan/);

  const invalid = render("?ref=influenciador-%3Cscript%3E");
  assert.match(decodeURIComponent(invalid.links[0].href), /site do NT Flow/);
  console.log("Bio link attribution and pre-registration form checks passed");
})().catch((error) => { console.error(error); process.exitCode = 1; });
