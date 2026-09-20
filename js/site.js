const NAV = [
  { href: "index.html", id: "home", label: "Home" },
  { href: "message.html", id: "message", label: "Message" },
  { href: "vision.html", id: "vision", label: "Vision" },
  { href: "overview.html", id: "overview", label: "Overview" },
  { href: "cup.html", id: "cup", label: "Cup" },
  { href: "sponsors.html", id: "sponsors", label: "Partners" },
  { href: "gallery.html", id: "gallery", label: "Gallery" }
];

function renderChrome() {
  const page = document.body.dataset.page;
  const header = document.querySelector("[data-header]");
  const footer = document.querySelector("[data-footer]");
  if (header) {
    header.innerHTML = `
      <a class="brand" href="index.html">
        <img src="assets/cilie-logo.webp" alt="Cilie Sports Club">
        <span class="brand-name">
          <strong>ASIA CHALLENGE CUP</strong>
          <span>Cilie Sports Club Thailand</span>
        </span>
      </a>
      <nav class="nav" data-nav>
        ${NAV.map((item) => `<a href="${item.href}" class="${page === item.id ? "is-active" : ""}">${item.label}</a>`).join("")}
      </nav>
      <div class="header-cta" data-cta>
        <a class="btn" href="sponsors.html#inquiry">Partner With Us</a>
      </div>
      <button class="menu-toggle" type="button" data-menu>Menu</button>
    `;
  }
  if (footer) {
    footer.innerHTML = `
      <div class="footer-grid">
        <div>
          <h4>Presented By</h4>
          <p>Cilie Sports Club Thailand<br>Khao Kilo, Surasak, Si Racha, Chon Buri</p>
          <p style="margin-top:12px">JP (+66) 94-310-0724<br>TH (+66) 99-330-9090</p>
        </div>
        <div>
          <h4>Navigate</h4>
          <p>${NAV.map((item) => `<a href="${item.href}">${item.label}</a>`).join("<br>")}</p>
        </div>
      </div>
      <div class="legal">
        <span>© ${new Date().getFullYear()} Asia Challenge Cup / Cilie Sports Club</span>
      </div>
    `;
  }
}

function bindMenu() {
  const toggle = document.querySelector("[data-menu]");
  const nav = document.querySelector("[data-nav]");
  const cta = document.querySelector("[data-cta]");
  const header = document.querySelector(".site-header");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    cta?.classList.toggle("is-open", open);
    header?.classList.toggle("is-menu-open", open);
    toggle.textContent = open ? "Close" : "Menu";
  });
}

function bindHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function bindReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  const show = (node) => node.classList.add("is-in");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        show(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
  nodes.forEach((node) => io.observe(node));
  requestAnimationFrame(() => {
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) show(node);
    });
  });
}

function bindSwitch(btnSel, panelSel, key) {
  const buttons = document.querySelectorAll(btnSel);
  const panels = document.querySelectorAll(panelSel);
  if (!buttons.length) return;
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset[key];
      buttons.forEach((b) => b.classList.toggle("is-on", b === btn));
      panels.forEach((panel) => {
        panel.hidden = panel.dataset[`${key}Panel`] !== id;
      });
    });
  });
}

function bindCup() {
  bindSwitch("[data-edition]", "[data-edition-panel]", "edition");
  document.querySelectorAll("[data-edition-panel]").forEach((edition) => {
    const buttons = edition.querySelectorAll("[data-stage]");
    const panels = edition.querySelectorAll("[data-stage-panel]");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.stage;
        buttons.forEach((b) => b.classList.toggle("is-on", b === btn));
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.stagePanel !== id;
        });
      });
    });
  });
}

function bindForm() {
  const form = document.querySelector("[data-inquiry]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector("[data-form-note]");
    if (note) {
      note.textContent = "送信後、弊社スタッフが確認次第、連絡差し上げます。";
    }
    form.reset();
  });
}

function bindPreloader() {
  const loader = document.querySelector("[data-preloader]");
  if (!loader) return;
  const done = () => loader.classList.add("is-done");
  window.addEventListener("load", () => setTimeout(done, 650));
  setTimeout(done, 1800);
}

renderChrome();
bindMenu();
bindHeader();
bindReveal();
bindCup();
bindForm();
bindPreloader();
