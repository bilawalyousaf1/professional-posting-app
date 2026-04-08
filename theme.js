function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const themeToggle = document.querySelector("#themeToggle");
  if (themeToggle) {
    updateThemeIcon(savedTheme, themeToggle);
    themeToggle.addEventListener("click", toggleTheme);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  const themeToggle = document.querySelector("#themeToggle");
  const icon = themeToggle ? themeToggle.querySelector("i") : null;

  if (icon) {
    icon.style.transition = "transform 0.35s ease, opacity 0.2s ease";
    icon.style.transform = "rotate(90deg) scale(0)";
    icon.style.opacity = "0";
  }

  setTimeout(() => {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    if (icon) {
      icon.className =
        newTheme === "light" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";

      requestAnimationFrame(() => {
        icon.style.transform = "rotate(-90deg) scale(0)";
        icon.style.opacity = "0";
        requestAnimationFrame(() => {
          icon.style.transition =
            "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease";
          icon.style.transform = "rotate(0deg) scale(1)";
          icon.style.opacity = "1";
        });
      });
    }
  }, 200);
}

function updateThemeIcon(theme, btn) {
  const icon = btn.querySelector("i");
  if (!icon) return;
  icon.className =
    theme === "light" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
}

document.addEventListener("DOMContentLoaded", initTheme);
