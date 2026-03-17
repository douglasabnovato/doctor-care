const navigation = document.getElementById("navigation");
const backToTopButton = document.getElementById("backToTopButton");
const footer = document.querySelector("footer");
const home = document.getElementById("home");
const services = document.getElementById("services");
const about = document.getElementById("about");
const contact = document.getElementById("contact");
const openMenuButton = document.querySelector(".open-menu");
const closeMenuButton = document.querySelector(".close-menu");
const menuLinks = document.querySelectorAll(
  '.menu a[href^="#"], .menu a.button',
);

function setMenuExpanded(isExpanded) {
  document.body.classList.toggle("menu-expanded", isExpanded);

  if (openMenuButton) {
    openMenuButton.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  }

  if (closeMenuButton) {
    closeMenuButton.setAttribute(
      "aria-expanded",
      isExpanded ? "true" : "false",
    );
  }
}

function openMenu() {
  setMenuExpanded(true);
}

function closeMenu() {
  setMenuExpanded(false);
}

if (openMenuButton) {
  openMenuButton.addEventListener("click", openMenu);
}

if (closeMenuButton) {
  closeMenuButton.addEventListener("click", closeMenu);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", onScroll);
document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  onScroll();
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    document.body.classList.contains("menu-expanded")
  ) {
    closeMenu();
  }
});

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(home);
  activateMenuAtCurrentSection(services);
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  if (!section) return;

  const targetLine = window.scrollY + window.innerHeight / 2;

  // verificar se a seção passou da linha
  // quais dados vou precisar?
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop;

  // verificar se a base está abaixo da linha alvo

  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine;

  // limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href="#${sectionId}"]`);

  if (!menuElement) return;

  menuElement.classList.remove("active");
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
  updateBackToTopButtonFooterState();
}

function updateBackToTopButtonFooterState() {
  if (!backToTopButton || !footer) return;

  const footerRect = footer.getBoundingClientRect();
  const isFooterVisible = footerRect.top < window.innerHeight;

  backToTopButton.classList.toggle("footer-visible", isFooterVisible);
}

function setCurrentYear() {
  const yearElement = document.getElementById("currentYear");
  if (!yearElement) return;
  yearElement.textContent = new Date().getFullYear();
}

const scrollRevealTargets = `
  #home,
  #home img,
  #home .stats,
  #services,
  #services header,
  #services .card,
  #about,
  #about header,
  #about .content`;

if (window.ScrollReveal) {
  ScrollReveal({
    origin: "top",
    distance: "30px",
    duration: 700,
  }).reveal(scrollRevealTargets);
}

function changeColorTheme() {
  const dots = document.querySelectorAll(".color-dot");
  const heroImage = document.querySelector("#hero-image");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const hue = dot.getAttribute("data-hue");
      const image = dot.getAttribute("data-image");

      // LÓGICA DE COR:
      // Se hue for 0, saturação é 0% (Cinza). Se não, 100%.
      const saturation = hue === "0" ? "0%" : "100%";
      // Se houver data-lightness (Preto), usa ele. Se não, usa o padrão 26%.
      const lightness = dot.getAttribute("data-lightness") || "26%";

      // 1. Aplica as mudanças no CSS Root
      document.documentElement.style.setProperty("--hue", hue);

      // Sobrescreve a cor primária para garantir que o HSL seja respeitado
      document.documentElement.style.setProperty(
        "--primary-color",
        `hsl(${hue}, ${saturation}, ${lightness})`,
      );

      // 2. Troca a imagem da Hero Section
      if (heroImage && image) {
        heroImage.setAttribute("src", image);
      }

      // 3. Feedback visual (Acessibilidade + UX)
      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });
}

// Chame a função após carregar o DOM ou no final do arquivo
changeColorTheme();
