document.addEventListener("DOMContentLoaded", function () {
    // Tanár oldal tartalma
    const container = document.createElement("div");
    container.className = "container mt-5";

    const title = document.createElement("h1");
    title.textContent = "Tanár oldal";
    title.className = "text-center";

    const description = document.createElement("p");
    description.textContent = "Üdvözlünk a tanár oldalán!";
    description.className = "text-center";

    container.appendChild(title);
    container.appendChild(description);
    document.body.appendChild(container);
});
