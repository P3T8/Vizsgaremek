document.addEventListener("DOMContentLoaded", function () {
    // Bootstrap CSS hozzáadása
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.rel = "stylesheet";
    bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapCSS);

    // Bootstrap JS hozzáadása
    const bootstrapJS = document.createElement("script");
    bootstrapJS.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(bootstrapJS);

    // Külső CSS fájl hozzáadása
    const customCSS = document.createElement("link");
    customCSS.rel = "stylesheet";
    customCSS.href = "/CSS/style.css";
    document.head.appendChild(customCSS);

    // Diák oldal tartalma
    const container = document.createElement("div");
    container.className = "container mt-5";

    const title = document.createElement("h1");
    title.textContent = "Diák oldal";
    title.className = "text-center";

    const description = document.createElement("p");
    description.textContent = "Üdvözlünk a diák oldalán!";
    description.className = "text-center";

    container.appendChild(title);
    container.appendChild(description);
    document.body.appendChild(container);
});
