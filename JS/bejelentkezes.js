document.addEventListener("DOMContentLoaded", function () {
    const container = document.createElement("div");
    container.id = "bejelentkezes";

    const form = document.createElement("form");
    form.action = "#";
    form.method = "get";

    const legend = document.createElement("legend");
    legend.textContent = "Belépés";
    form.appendChild(legend);

    const fieldset = document.createElement("fieldset");

    const emailDiv = document.createElement("div");
    emailDiv.className = "beviteli";
    const emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.textContent = "E-mail cím:";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.id = "email";
    emailInput.required = true;
    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);

    const passwordDiv = document.createElement("div");
    passwordDiv.className = "beviteli";
    const passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "password");
    passwordLabel.textContent = "Jelszó:";
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.id = "password";
    passwordInput.required = true;
    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "d-grid gap-2 col-6 mx-auto";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-outline-info";
    button.textContent = "Bejelentkezés";
    buttonDiv.appendChild(button);

    fieldset.appendChild(emailDiv);
    fieldset.appendChild(passwordDiv);
    fieldset.appendChild(buttonDiv);
    form.appendChild(fieldset);
    container.appendChild(form);
    document.body.appendChild(container);

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
});
