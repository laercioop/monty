(function () {
  const pages = [
    ["index.html", { pt: "Início", en: "Home" }],
    ["analise.html", { pt: "Análise", en: "Analysis" }],
    ["trajetoria.html", { pt: "Trajetória", en: "Career" }],
    ["publicacoes.html", { pt: "Publicações", en: "Publications" }],
  ];

  function getLang() {
    try {
      return localStorage.getItem("schw-lang") || "pt";
    } catch (_) {
      return "pt";
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem("schw-lang", lang);
    } catch (_) {}
    applyLang();
  }

  function buildHeader() {
    const active = document.body.dataset.active || "index.html";
    const lang = getLang();
    const nav = pages.map(([href, label]) => {
      const current = href === active ? ' class="active"' : "";
      return `<a href="${href}" data-page="${href}"${current}>${label[lang]}</a>`;
    }).join("");
    return `
      <header class="site-header">
        <div class="container header-row">
          <a class="brand" href="index.html" aria-label="Alexandre Schwartsman">
            <span class="brand-name">Alexandre Schwartsman</span>
            <span class="brand-sub" data-pt="Economista" data-en="Economist">Economista</span>
          </a>
          <nav class="nav">${nav}</nav>
          <div class="lang-switch" role="group" aria-label="Language">
            <button type="button" data-lang="pt">PT</button>
            <button type="button" data-lang="en">EN</button>
          </div>
          <div class="ps-where">
            <span data-pt="Onde achar:" data-en="Find him:">Onde achar:</span>
            <a class="ps-link" href="https://psassociados.com" target="_blank" rel="noopener" aria-label="Pinotti & Schwartsman Associados">P&amp;S</a>
          </div>
        </div>
      </header>
    `;
  }

  function buildFooter() {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <strong>Alexandre Schwartsman</strong>
            <p class="footer-note">Consultorias econômicas através da<br><a href="https://psassociados.com" target="_blank" rel="noopener">Pinotti &amp; Schwartsman Associados</a></p>
          </div>
          <div>
            <span class="footer-label">Links</span>
            <nav class="footer-links" aria-label="Links externos">
              <a href="https://maovisivel.blogspot.com/" target="_blank" rel="noopener">A Mão Visível</a>
              <a href="https://www.estadao.com.br/economia/alexandre-schwartsman/" target="_blank" rel="noopener">Estadão</a>
              <a href="https://alexschwartsman.substack.com/" target="_blank" rel="noopener">Substack</a>
              <a href="https://veja.abril.com.br/coluna/alexandre-schwartsman/" target="_blank" rel="noopener">Veja</a>
              <a class="pending-link" href="#" aria-disabled="true">LinkedIn</a>
            </nav>
            <a class="footer-email" href="mailto:contato@psassociados.com">contato@psassociados.com</a>
          </div>
        </div>
      </footer>
    `;
  }

  function initContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const body = Array.from(data.entries())
        .map(([key, value]) => `${key}: ${value || "-"}`)
        .join("\n");
      const subject = encodeURIComponent("Contato pelo site - Alexandre Schwartsman / P&S");
      window.location.href = `mailto:contato@psassociados.com?subject=${subject}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector("[data-form-status]");
      if (status) status.hidden = false;
    });
  }

  function initPendingLinks() {
    document.querySelectorAll(".pending-link").forEach((link) => {
      link.addEventListener("click", (event) => event.preventDefault());
    });
  }

  function applyLang() {
    const lang = getLang();
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-pt]").forEach((el) => {
      const value = el.getAttribute(`data-${lang}`);
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll(".nav a[data-page]").forEach((link) => {
      const item = pages.find(([href]) => href === link.dataset.page);
      if (item) link.textContent = item[1][lang];
    });
    document.querySelectorAll(".lang-switch button").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === lang);
    });
  }

  function initLangSwitch() {
    document.querySelectorAll(".lang-switch button").forEach((button) => {
      button.addEventListener("click", () => setLang(button.dataset.lang));
    });
  }

  document.querySelector("[data-slot=header]").outerHTML = buildHeader();
  document.querySelector("[data-slot=footer]").outerHTML = buildFooter();
  initContactForm();
  initPendingLinks();
  initLangSwitch();
  applyLang();
})();
