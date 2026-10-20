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
