const overlay = document.querySelector("#overlay");
const hamburgerMenuBtn = document.querySelector("#hamburgerMenuBtn");
const navMenu = document.querySelector("#menu");

const hasHamburgerBtnExpandedAttribute = () => hamburgerMenuBtn.getAttribute("aria-expanded") === "true";

const setARIAAttributes = (expanded, label) => {
    hamburgerMenuBtn.setAttribute("aria-expanded", expanded);
    hamburgerMenuBtn.setAttribute("aria-label", label);
}

const openNavMenu = () => {
    setARIAAttributes(true, "Close menu");
    overlay.classList.add("visible");
}

const closeNavMenu = () => {
    setARIAAttributes(false, "Open menu");
    overlay.classList.remove("visible");
    hamburgerMenuBtn.focus();
}

hamburgerMenuBtn.addEventListener("click", () => {
    return !hasHamburgerBtnExpandedAttribute() ? openNavMenu() : closeNavMenu();
});

overlay.addEventListener("click", () => {
    if (hasHamburgerBtnExpandedAttribute()) {
        closeNavMenu();
    }
});

navMenu.addEventListener("transitionend", (e) => {
    if (hasHamburgerBtnExpandedAttribute() && e.propertyName == "transform" && e.target === navMenu) {
        navMenu.querySelector("a").focus({focusVisible: true});
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hasHamburgerBtnExpandedAttribute()) {
        closeNavMenu();
    }
});