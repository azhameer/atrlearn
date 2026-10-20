const teamMembers = [
  { name: "Fadel Azhar M", role: "Innovation Architect", bio: "Informatika 2026 - H1D026007", github: "azhameer", placeholder: "azhameer", color: "#38624d", image: "team/azhar.jpg" },
  { name: "M.Abduh Arifin", role: "Research Strategist", bio: "Informatika 2026 - H1D026031", github: "abduharifin28-coder", placeholder: "abduharifin28-coder", color: "#5b6b50", image: "team/arif.jpg" },
  { name: "Amelia Zahro", role: "Literature Analyst", bio: "Informatika 2026 - H1D026001", github: "ameng-cell", placeholder: "ameng-cell", color: "#646d85", image: "team/amel.jpg" },
  { name: "Intan Rizkia J", role: "Strategic Reviewer", bio: "Informatika 2026 - H1D026037", github: "", placeholder: "cinnamon2278", color: "#786551", image: "assets/team/intan.jpg" },
  { name: "Zakya Fiby Audya", role: "Research Synthesist", bio: "Informatika 2026 - H1D026045", github: "", placeholder: "", color: "#566b68", image: "team/zakya.jpg" }
];

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
