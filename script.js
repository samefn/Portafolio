const links = [...document.querySelectorAll(".nav-link")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = () => {
  const current = sections.reduce((active, section) => {
    const top = section.getBoundingClientRect().top;
    return top <= 140 ? section.id : active;
  }, "inicio");

  links.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
};

document.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

document.getElementById("downloadCv").addEventListener("click", () => {
  const message = "Agrega tu CV como cv.pdf en esta carpeta y conectaré la descarga.";
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    left: 50%;
    bottom: 28px;
    z-index: 10;
    transform: translateX(-50%);
    max-width: min(420px, calc(100% - 32px));
    padding: 14px 18px;
    border: 1px solid rgba(131, 71, 255, 0.55);
    border-radius: 8px;
    color: white;
    background: rgba(7, 9, 22, 0.92);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
    font-size: 14px;
    text-align: center;
  `;

  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2600);
});

const projects = [
  {
    title: "Itza",
    image: "assets/Itza.png",
    alt: "Pantalla principal de Itza",
    description:
      "Juego 3D en primera persona basado en la mitología azteca. Itza debe superar diferentes pruebas y derrotar enemigos para llegar hasta el dios del agua.",
    // Agrega aqui el link del repositorio de GitHub de Itza.
    url: "#",
  },
  {
    title: "Código de Cancha",
    image: "assets/CodigoDeCancha.png",
    alt: "Pantalla principal de Código de Cancha",
    description:
      "Juego 3D con vista panorámica que genera la sensación de un juego 2D. Tendrás que responder preguntas morales para poder usar tu turno e intentar marcar gol.",
    // Agrega aqui el link del repositorio de GitHub de Codigo de Cancha.
    url: "#",
  },
  {
    title: "Wave Breaker",
    image: "assets/WaveBreaker.png",
    alt: "Pantalla principal de Wave Breaker",
    description:
      "Shooter de supervivencia con tres oleadas de enemigos. El objetivo es sobrevivir eliminándolos a todos; cada oleada suma más enemigos y una IA más desafiante.",
    // Agrega aqui el link del repositorio de GitHub de Wave Breaker.
    url: "#",
  },
  {
    title: "Ninja Game",
    image: "assets/NinjaGame.png",
    alt: "Pantalla principal de Ninja Game",
    description:
      "Juego 2D pixel art donde debes derrotar robots corrompidos por la industria futurista del mundo en el que te encuentras.",
    // Agrega aqui el link del repositorio de GitHub de Ninja Game.
    url: "#",
  },
];

const fallbackImage = (title) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#071022"/>
          <stop offset="0.52" stop-color="#26105a"/>
          <stop offset="1" stop-color="#050713"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="720" fill="url(#bg)"/>
      <path d="M0 570 C220 505 330 650 520 575 C760 480 855 625 1200 520 V720 H0Z" fill="#060817" opacity="0.72"/>
      <circle cx="950" cy="140" r="110" fill="#31c7ff" opacity="0.11"/>
      <circle cx="260" cy="170" r="150" fill="#8347ff" opacity="0.16"/>
      <text x="72" y="370" fill="#ffffff" font-family="Arial, sans-serif" font-size="92" font-weight="900" letter-spacing="4">${title}</text>
      <text x="76" y="430" fill="#a35cff" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="8">IMAGEN DEL PROYECTO</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const projectPanel = document.querySelector(".project-panel");
const projectImage = document.getElementById("projectImage");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const projectCount = document.getElementById("projectCount");
const projectLink = document.getElementById("projectLink");
const projectDots = document.getElementById("projectDots");
const prevProject = document.getElementById("prevProject");
const nextProject = document.getElementById("nextProject");
let activeProject = 0;

projects.forEach((project, index) => {
  const dot = document.createElement("button");
  dot.className = "project-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Ver proyecto ${project.title}`);
  dot.addEventListener("click", () => showProject(index));
  projectDots.appendChild(dot);
});

const updateProjectDots = () => {
  [...projectDots.children].forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeProject);
  });
};

const showProject = (index) => {
  activeProject = (index + projects.length) % projects.length;
  const project = projects[activeProject];

  projectPanel.classList.remove("is-changing");
  void projectPanel.offsetWidth;
  projectPanel.classList.add("is-changing");

  projectImage.onerror = () => {
    projectImage.onerror = null;
    projectImage.src = fallbackImage(project.title.toUpperCase());
  };
  projectImage.src = project.image;
  projectImage.alt = project.alt;
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectCount.textContent = `${String(activeProject + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  projectLink.href = project.url;

  updateProjectDots();
};

prevProject.addEventListener("click", () => showProject(activeProject - 1));
nextProject.addEventListener("click", () => showProject(activeProject + 1));

document.addEventListener("keydown", (event) => {
  if (!document.getElementById("proyectos").matches(":hover")) return;
  if (event.key === "ArrowLeft") showProject(activeProject - 1);
  if (event.key === "ArrowRight") showProject(activeProject + 1);
});

showProject(0);
