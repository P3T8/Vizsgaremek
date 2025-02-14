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

    // Regisztrációs oldal tartalma
    const container = document.createElement("div");
    container.className = "container mt-5";

    const form = document.createElement("form");
    form.action = "#";
    form.method = "get";

    const legend = document.createElement("legend");
    legend.textContent = "Regisztráció";
    form.appendChild(legend);

    const fieldset = document.createElement("fieldset");

    const inputs = [
        { label: "Név:", type: "text", id: "nev", name: "nev" },
        { label: "E-mail:", type: "email", id: "email", name: "email" },
        { label: "Felhasználónév:", type: "text", id: "nickname", name: "nickname" },
        { label: "Jelszó:", type: "password", id: "password", name: "password" },
        { label: "Jelszó újra:", type: "password", id: "password2", name: "password2" },
        { label: "Születési dátum:", type: "date", id: "szuletesi_datum", name: "szuletesi_datum" }
    ];

    inputs.forEach(inputData => {
        const div = document.createElement("div");
        div.className = "beviteli";
        const label = document.createElement("label");
        label.setAttribute("for", inputData.id);
        label.textContent = inputData.label;
        const input = document.createElement("input");
        input.type = inputData.type;
        input.className = "form-control";
        input.id = inputData.id;
        input.name = inputData.name;
        input.required = true;
        div.appendChild(label);
        div.appendChild(input);
        fieldset.appendChild(div);
    });

    // Nem választás
    const genderDiv = document.createElement("div");
    genderDiv.className = "beviteli";
    genderDiv.innerHTML = '<label>Nem:</label><br>' +
        '<input type="radio" name="nem" value="ferfi" required> Férfi ' +
        '<input type="radio" name="nem" value="no" required> Nő ' +
        '<input type="radio" name="nem" value="egyeb" required> Egyéb';
    fieldset.appendChild(genderDiv);

    // Tanár / Diák választás
    const roleDiv = document.createElement("div");
    roleDiv.className = "beviteli";
    roleDiv.innerHTML = '<label>Tanár / Diák:</label><br>' +
        '<input type="radio" name="ted" value="tanar" required> Tanár ' +
        '<input type="radio" name="ted" value="diak" required> Diák';
    fieldset.appendChild(roleDiv);

    // Felhasználási feltételek
    const termsDiv = document.createElement("div");
    termsDiv.className = "beviteli";
    termsDiv.innerHTML = '<input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked> ' +
        '<label class="form-check-label" for="check1">Elfogadom a felhasználási feltételeket</label>';
    fieldset.appendChild(termsDiv);

    // Regisztráció gomb
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "d-grid gap-2 col-6 mx-auto";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-outline-info";
    button.textContent = "Regisztráció";
    buttonDiv.appendChild(button);
    fieldset.appendChild(buttonDiv);

    form.appendChild(fieldset);
    container.appendChild(form);
    document.body.appendChild(container);
});
