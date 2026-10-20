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

// Gagasan Atas
const flowDetails = [
  { title: "Masuk ke Dunia Belajar", text: "Mahasiswa mengakses web pembelajaran dan memilih mata kuliah. Setiap mata kuliah dapat memiliki lingkungan dan rangkaian quest yang relevan dengan materinya." },
  { title: "Eksplorasi Peta 2D", text: "Mahasiswa bebas menjelajahi area yang tersedia pada peta semi-open world dua dimensi, menemukan lokasi misi, serta mempelajari materi yang terhubung dengan lingkungan game." },
  { title: "Pretest Berbasis Game Quest", text: "Asesmen awal dikemas menjadi quest dengan pertanyaan pemahaman dasar. Hasil jawaban menjadi indikator awal untuk memetakan tingkat penguasaan materi mahasiswa." },
  { title: "Rekomendasi Misi Adaptif", text: "Berdasarkan hasil pretest, sistem yang diusulkan akan merekomendasikan quest dengan tingkat kesulitan lebih sesuai. Performa pada misi berikutnya dapat menjadi masukan untuk rekomendasi selanjutnya." },
  { title: "Quest, Poin dan Pengumpulan Kunci", text: "Mahasiswa menyelesaikan kuis atau materi di tiap quest. Daftar quest bergeser ke tahap berikutnya, poin diperbarui, dan kunci diperoleh setelah misi memenuhi syarat penyelesaian." },
  { title: "Selesaikan atau Masuk Spectator", text: "Setelah semua quest dan kunci diselesaikan, mahasiswa dapat menuju pintu keluar atau, pada konsep pengembangan game sesungguhnya, mengamati aktivitas pemain lain melalui spectator mode." }
];

// gagasan bawah
const flowSteps = document.querySelectorAll(".flow-step");
flowSteps.forEach(step => {
  step.addEventListener("click", () => {
    const index = Number(step.dataset.step);
    flowSteps.forEach(btn => {
      const active = btn === step;
      btn.classList.toggle("is-selected", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    document.querySelector("#flowDetailIndex").textContent = String(index + 1).padStart(2, "0");
    document.querySelector("#flowDetailTitle").textContent = flowDetails[index].title;
    document.querySelector("#flowDetailText").textContent = flowDetails[index].text;
  });
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
