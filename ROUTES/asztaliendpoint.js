document.addEventListener("DOMContentLoaded", function () {
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
    termsDiv.innerHTML = '<input type="checkbox" id="check1" name="option1" value="something" checked> ' +
        '<label for="check1">Elfogadom a felhasználási feltételeket</label>';
    fieldset.appendChild(termsDiv);

    // Regisztráció gomb
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "d-grid gap-2 col-6 mx-auto";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Regisztráció";
    button.addEventListener("click", function () {
        const nev = document.getElementById("nev").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("password2").value;
        const check1 = document.getElementById("check1").checked;

        if (!nev || !email || !password || !password2) {
            alert("Minden mező kitöltése kötelező!");
            return;
        }

        if (password !== password2) {
            alert("A két jelszó nem egyezik!");
            return;
        }

        if (!check1) {
            alert("El kell fogadnia a felhasználási feltételeket!");
            return;
        }

        alert("Sikeres regisztráció!");
    });
    buttonDiv.appendChild(button);
    fieldset.appendChild(buttonDiv);

    form.appendChild(fieldset);
    container.appendChild(form);
    document.body.appendChild(container);
});

//Tanár törlése(1 év inaktivitás esetén)

//Tantárgyak hozzáadása

