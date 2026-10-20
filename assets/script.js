//member atas
const teamMembers = [
  { name: "Fadel Azhar M", role: "Innovation Architect", bio: "Informatika 2026 - H1D026007", github: "azhameer", placeholder: "azhameer", color: "#38624d", image: "assets/team/azhar1.jpg" },
  { name: "M.Abduh Arifin", role: "Research Strategist", bio: "Informatika 2026 - H1D026031", github: "abduharifin28-coder", placeholder: "abduharifin28-coder", color: "#5b6b50", image: "assets/team/arif1.jpg" },
  { name: "Amelia Zahro", role: "Literature Analyst", bio: "Informatika 2026 - H1D026001", github: "ameng-cell", placeholder: "ameng-cell", color: "#646d85", image: "assets/team/amel1.jpg" },
  { name: "Intan Rizkia J", role: "Strategic Reviewer", bio: "Informatika 2026 - H1D026037", github: "cinnamon2278", placeholder: "cinnamon2278", color: "#786551", image: "assets/team/intan1.jpg" },
  { name: "Zakya Fiby Audya", role: "Research Synthesist", bio: "Informatika 2026 - H1D026045", github: "zkyfbyady", placeholder: "zkyfbyady", color: "#566b68", image: "assets/team/zakya1.jpg" }
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

//member bawah
const teamCards = document.querySelector("#teamCards");
const githubGrid = document.querySelector("#githubGrid");
teamMembers.forEach((member, index) => {
  const card = document.createElement("button");
  card.className = "team-card";
  card.type = "button";
  card.style.setProperty("--tone", member.color);
  card.setAttribute("aria-expanded", "false");
  card.setAttribute("aria-label", `Lihat profil ${member.name}, ${member.role}`);
  const img = document.createElement("img");
  img.src = member.image;
  img.alt = "";
  img.loading = "lazy";
  const indexTag = document.createElement("span");
  indexTag.className = "team-card-index";
  indexTag.textContent = String(index + 1).padStart(2, "0");
  const corner = document.createElement("span");
  corner.className = "team-card-corner";
  corner.setAttribute("aria-hidden", "true");
  corner.textContent = "↗";
  const bottom = document.createElement("div");
  bottom.className = "team-card-bottom";
  const role = document.createElement("span");
  role.className = "team-card-role";
  role.textContent = member.role;
  const name = document.createElement("h3");
  name.className = "team-card-name";
  name.textContent = member.name;
  const expanded = document.createElement("div");
  expanded.className = "team-card-expanded";
  const bio = document.createElement("span");
  bio.textContent = member.bio;
  const githubText = document.createElement("span");
  githubText.className = "member-github";
  githubText.textContent = `@${member.github || member.placeholder}`;
  expanded.append(bio, document.createElement("br"), githubText);
  bottom.append(role, name, expanded);
  card.append(img, indexTag, corner, bottom);
  card.addEventListener("click", () => {
    const wasOpen = card.classList.contains("is-active");
    const cards = teamCards.querySelectorAll(".team-card");
    cards.forEach(c => { c.classList.remove("is-active"); c.setAttribute("aria-expanded", "false"); });
    if (wasOpen) teamCards.classList.remove("has-active");
    else { teamCards.classList.add("has-active"); card.classList.add("is-active"); card.setAttribute("aria-expanded", "true"); }
  });
  teamCards.appendChild(card);

  // Link dibuat aktif HANYA jika github sudah diisi; username contoh tidak menjadi link palsu.
  const git = document.createElement(member.github ? "a" : "div");
  git.className = `github-card${member.github ? "" : " disabled"}`;
  if (member.github) {
    git.href = `https://github.com/${encodeURIComponent(member.github.replace(/^@/, ""))}`;
    git.target = "_blank";
    git.rel = "noopener noreferrer";
    git.setAttribute("aria-label", `GitHub ${member.name}: ${member.github}`);
  }
  const icon = document.createElement("span");
  icon.className = "github-icon";
  icon.textContent = String(index + 1).padStart(2, "0");
  const detail = document.createElement("span");
  detail.className = "github-details";
  const label = document.createElement("small");
  label.textContent = member.name;
  const username = document.createElement("strong");
  username.textContent = `@${(member.github || member.placeholder).replace(/^@/, "")}`;
  detail.append(label, username);
  git.append(icon, detail);
  githubGrid.appendChild(git);
});



//footer
const revealNodes = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealNodes.forEach(node => node.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .1 });
  revealNodes.forEach(node => revealObserver.observe(node));
}

document.querySelector("#currentYear").textContent = String(new Date().getFullYear());
