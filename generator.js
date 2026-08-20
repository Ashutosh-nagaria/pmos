// ---------- THEME ----------

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("pmos-theme");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggle.textContent = "LIGHT";
  themeToggle.setAttribute("aria-label", "Switch to light mode");
}

themeToggle.addEventListener("click", () => {

  const isDark =
    document.documentElement.getAttribute("data-theme") === "dark";

  if (isDark) {

    document.documentElement.removeAttribute("data-theme");

    localStorage.setItem("pmos-theme", "light");

    themeToggle.textContent = "DARK";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );

  } else {

    document.documentElement.setAttribute(
      "data-theme",
      "dark"
    );

    localStorage.setItem("pmos-theme", "dark");

    themeToggle.textContent = "LIGHT";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to light mode"
    );

  }

});
