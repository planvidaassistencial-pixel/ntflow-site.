(() => {
  "use strict";

  const SITE_API = "https://home-fin-nest.lovable.app/";
  const DEFAULT_WHATSAPP = "5522992268946";
  const PHONE_BY_REF = { nathan: DEFAULT_WHATSAPP, ntflow: DEFAULT_WHATSAPP };
  const STORAGE_KEY = "ntflow:site-ref:v1";
  const params = new URLSearchParams(location.search);

  function validRef(value) {
    const ref = (value || "").trim().toLowerCase();
    if (["luan", "nathan", "ntflow", "site"].includes(ref)) return ref;
    return /^influenciador-[a-z0-9-]{2,40}$/.test(ref) ? ref : null;
  }

  function trackedRef() {
    const explicit = validRef(params.get("ref"));
    if (explicit) return explicit;
    const source = params.get("source");
    const sources = { instagram_luan: "luan", instagram_nathan: "nathan", instagram_ntflow: "ntflow" };
    if (source && sources[source]) return sources[source];
    const campaign = (params.get("utm_campaign") || "").toLowerCase();
    if (campaign === "ntflow_luan") return "luan";
    if (campaign === "ntflow_nathan") return "nathan";
    if (campaign === "ntflow_instagram") return "ntflow";
    try { return validRef(sessionStorage.getItem(STORAGE_KEY)) || "site"; }
    catch { return "site"; }
  }

  const ref = trackedRef();
  try { sessionStorage.setItem(STORAGE_KEY, ref); } catch {}
  const phone = ref === "luan" ? null : (PHONE_BY_REF[ref] || DEFAULT_WHATSAPP);
  const originLabel = ref === "luan" ? "Instagram do Luan"
    : ref === "nathan" ? "Instagram do Nathan"
    : ref === "ntflow" ? "Instagram do NT Flow"
    : ref.startsWith("influenciador-") ? "influenciador " + ref.slice(14).replaceAll("-", " ")
    : "site do NT Flow";
  const message = "Olá! Vim pelo " + originLabel + " e quero conhecer o NT Flow.";

  document.querySelectorAll('[data-contact="whatsapp"]').forEach((link) => {
    if (!phone) {
      link.href = "#cadastro";
      link.removeAttribute("target");
      link.removeAttribute("rel");
      return;
    }
    link.href = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  const visiblePhone = document.getElementById("contact-phone");
  if (visiblePhone && !phone) visiblePhone.textContent = "um consultor";

  const form = document.getElementById("lead-form");
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const feedback = document.getElementById("lead-feedback");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;
    button.disabled = true;
    button.textContent = "Enviando...";
    feedback.textContent = "";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const fields = new FormData(form);
      const response = await fetch(SITE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          whatsapp: fields.get("whatsapp"),
          email: fields.get("email"),
          ref,
          website: fields.get("website") || "",
          contactAuthorized: fields.get("contactAuthorized") === "on",
        }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Não foi possível enviar.");
      feedback.textContent = "Pré-cadastro recebido! Nossa equipe entrará em contato.";
      feedback.className = "lead-feedback success";
      form.reset();
    } catch (error) {
      feedback.textContent = error && error.name === "AbortError"
        ? "A conexão demorou. Tente enviar novamente."
        : error instanceof Error ? error.message : "Não foi possível enviar. Tente novamente.";
      feedback.className = "lead-feedback error";
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.textContent = "Quero receber contato";
    }
  });
})();
