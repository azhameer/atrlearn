//member atas
const teamMembers = [
  { name: "Fadel Azhar M", role: "Innovation Architect", bio: "Informatika 2026 - H1D026007", github: "azhameer", placeholder: "azhameer", color: "#38624d", image: "assets/team/azhar1.jpg" },
  { name: "M.Abduh Arifin", role: "Research Strategist", bio: "Informatika 2026 - H1D026031", github: "abduharifin28-coder", placeholder: "abduharifin28-coder", color: "#5b6b50", image: "assets/team/arif1.jpg" },
  { name: "Amelia Zahro", role: "Literature Analyst", bio: "Informatika 2026 - H1D026001", github: "ameng-cell", placeholder: "ameng-cell", color: "#646d85", image: "assets/team/amel1.jpg" },
  { name: "Intan Rizkia J", role: "Strategic Reviewer", bio: "Informatika 2026 - H1D026037", github: "cinnamon2278", placeholder: "cinnamon2278", color: "#786551", image: "assets/team/intan1.jpg" },
  { name: "Zakya Fiby Audya", role: "Research Synthesist", bio: "Informatika 2026 - H1D026045", github: "zkyfbyady", placeholder: "zkyfbyady", color: "#566b68", image: "assets/team/zakya1.jpg" }
];

// char atas
const characters = [
  { id: "bima", name: "Bima", gender: "Laki-laki", number: "01", type: "PENJELAJAH", role: "Penjelajah Hutan", trait: "Berani & teliti", description: "Petualang penuh rasa ingin tahu yang gemar menemukan jalur baru di Hutan Logika.", color: "#527a5d", image: "assets/characters/bima.svg" },
  { id: "arga", name: "Arga", gender: "Laki-laki", number: "02", type: "PEMETA", role: "Pembaca Peta", trait: "Strategis & tenang", description: "Pemetaan wilayah dan rute menjadi kekuatannya saat menghadapi tantangan belajar.", color: "#537a86", image: "assets/characters/arga.svg" },
  { id: "nara", name: "Nara", gender: "Perempuan", number: "03", type: "PENELITI", role: "Penjelajah Pengetahuan", trait: "Kritis & penasaran", description: "Selalu membawa catatan untuk memahami petunjuk dan mengurai teka-teki dalam quest.", color: "#a27f62", image: "assets/characters/nara.svg" },
  { id: "sora", name: "Sora", gender: "Perempuan", number: "04", type: "PENGAMAT", role: "Pengamat Alam", trait: "Cermat & kreatif", description: "Peka terhadap detail lingkungan dan senang mengamati berbagai cara menyelesaikan misi.", color: "#8e789e", image: "assets/characters/sora.svg" },
  { id: "kirana", name: "Kirana", gender: "Perempuan", number: "05", type: "PENEMU", role: "Pencari Kunci", trait: "Gigih & adaptif", description: "Tertarik dengan tantangan baru serta pantang menyerah sampai kunci terakhir ditemukan.", color: "#ad8053", image: "assets/characters/kirana.svg" }
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

// char bawah
const characterPicker = document.querySelector("#characterPicker");
let selectedCharacter = "bima";
try {
  const saved = localStorage.getItem("atr-selected-character");
  if (characters.some(character => character.id === saved)) selectedCharacter = saved;
} catch (_) { /* tetap bisa dibuka secara lokal jika storage dibatasi browser */ }

function selectCharacter(id) {
  const chosen = characters.find(character => character.id === id);
  if (!chosen) return;
  selectedCharacter = id;
  document.querySelectorAll(".character-card").forEach(card => {
    const active = card.dataset.character === id;
    card.classList.toggle("is-selected", active);
    card.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#selectedCharacterImage").src = chosen.image;
  document.querySelector("#selectedCharacterImage").alt = `Ilustrasi ${chosen.name}, ${chosen.gender}, ${chosen.role}`;
  document.querySelector("#selectedCharacterNum").textContent = chosen.number;
  document.querySelector(".preview-watermark").textContent = chosen.number;
  document.querySelector("#selectedCharacterName").textContent = chosen.name;
  document.querySelector("#selectedCharacterType").textContent = chosen.type;
  document.querySelector("#selectedCharacterDesc").textContent = chosen.description;
  document.querySelector("#selectedCharacterRole").textContent = chosen.role;
  document.querySelector("#selectedCharacterTrait").textContent = chosen.trait;
  document.querySelector("#selectedCharacterStatus").textContent = `${chosen.name} dipilih untuk pratinjau karakter.`;
  try { localStorage.setItem("atr-selected-character", id); } catch (_) { /* optional */ }
}

characters.forEach(character => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "character-card";
  card.dataset.character = character.id;
  card.setAttribute("aria-label", `Pratinjau ${character.name}, ${character.gender}`);
  card.setAttribute("aria-pressed", "false");
  card.style.setProperty("--char-color", character.color);
  const art = document.createElement("div");
  art.className = "character-card-art";
  const img = document.createElement("img");
  img.src = character.image;
  img.alt = "";
  img.loading = "lazy";
  art.append(img);
  const label = document.createElement("div");
  label.className = "character-card-label";
  const name = document.createElement("strong");
  name.textContent = character.name;
  const gender = document.createElement("small");
  gender.textContent = character.gender;
  label.append(name, gender);
  card.append(art, label);
  card.addEventListener("click", () => selectCharacter(character.id));
  characterPicker.append(card);
});
selectCharacter(selectedCharacter);


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
