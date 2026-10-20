//beranda dan sistem
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.querySelector("#siteHeader");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuToggle.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("is-open", opened);
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.setAttribute("aria-label", opened ? "Tutup menu navigasi" : "Buka menu navigasi");
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  }
});

const sections = document.querySelectorAll("main > section[id]");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll(".nav-link").forEach(link => {
      const isActive = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-24% 0px -64% 0px" });
sections.forEach(section => sectionObserver.observe(section));
