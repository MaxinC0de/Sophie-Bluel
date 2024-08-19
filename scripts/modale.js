const overlay = createElement("div", "overlay")

// insert modal into DOM 
function modaleIntoDOM() {
    document.body.appendChild(modale)
    document.body.appendChild(overlay)
    modale.style.display = "none"
    overlay.style.display = "none"
}
modaleIntoDOM()

const modaleHeader = document.querySelector(".modale-header")
const modaleBody = document.querySelector(".modale-body")
const modaleFooter = document.querySelector(".modale-footer")
const btnValider = document.querySelector(".bouton-valider")
const xmark = document.querySelector(".fa-xmark")
const btnAjouterPhoto = document.querySelector(".bouton-ajouter-photo")
const modaleh1 = document.querySelector(".modale-h1")

// open and close modal
modifierIcone.addEventListener("click", openModal)
overlay.addEventListener("click", closeModal)
xmark.addEventListener("click", closeModal)

function openModal() {
    modaleBody.innerHTML = ""
    genererGalerieModale()
    overlay.style.display = "block"
    modale.style.display = "block"
    btnValider.style.display = "none"
    btnAjouterPhoto.style.display = "block"
}

function closeModal() {
    modaleBody.innerHTML = ""
    overlay.style.display = "none"
    modale.style.display = "none"
    arrow.style.display = "none"
    modaleBody.classList.add("modale-body")
    modaleBody.classList.remove("transformed-modale-body")
    resetButtons()
}

// transform first modal to second one
btnAjouterPhoto.addEventListener("click", transformModal)
function transformModal() {
    modaleBody.innerHTML = ""
    // h1
    modaleh1.innerText = "Ajout photo"
    // arrow
    arrow.classList.add("fa-solid", "fa-arrow-left")
    arrow.style.display = "block"
    modaleHeader.appendChild(arrow)
    // shortcut to inner HTML of second modal
    createSecondModal()
    // button
    btnValider.style.display = "block"
    btnValider.classList.remove("valid-form")
    btnValider.classList.add("bouton-valider")
    btnAjouterPhoto.style.display = "none"
    // display uploaded image
    displayUploadedImg()
    // check if every form input is filled
    const checkForm = () => {
        const form = document.querySelector(".modale-wrapper .form-modale")
        const btnValider = document.querySelector(".modale-wrapper .bouton-valider")
        const title = document.querySelector(".modale-wrapper .modale-input")
        const input = document.getElementById("input")

        form.addEventListener("input", () => {
            if (title.value !== "" && input.value !== "") {
                btnValider.classList.remove("bouton-valider")
                btnValider.classList.add("valid-form")
            } 
        })
    }
    checkForm()    
}

// transform second modal to first one
arrow.addEventListener("click", toFirstModal)
function toFirstModal() {
    modaleBody.innerHTML = ""
    genererGalerieModale()
    modaleh1.innerHTML = "Galerie photo"
    arrow.style.display = "none"
    modaleBody.classList.add("modale-body")
    modaleBody.classList.remove("transformed-modale-body")
    btnAjouterPhoto.style.display = "block"
    btnValider.style.display = "none"
}

// post project and close modal on posting project
btnValider.addEventListener("click", async (e) => {
    e.preventDefault()
    let projets = await fetchProjets()
    const title = document.querySelector(".modale-wrapper .modale-input").value
    const category = document.querySelector(".select")
    const input = document.getElementById("input").files[0]
    const formData = new FormData()

    formData.append("title", title)
    formData.append("category", category.value)
    formData.append("image", input)

    const reponse = fetch(URLS.works, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: formData,
    })
    if (title.value !== "" && input.value !== "") {
        closeModal()
        projets = await fetchProjets()
        galerie.innerHTML = ""
        genererGalerie()
    } else if (title.value == "" || input.value == "") {
        alert("Veuillez remplir chaque champ du formulaire avant de valider l'envoi du projet.")
    }   
})