// utility functions
function createElement(tag, className, textContent="") {
    const element = document.createElement(tag)
    element.classList.add(className)
    element.textContent = textContent
    return element
}

function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode)
}

// API
const apiURL = "http://localhost:5678/api/"
const URLS = {
    works: `${apiURL}works`,
    categories: `${apiURL}categories`,
}

async function fetchProjets() {
    const response = await fetch(URLS.works)
    return await response.json()
}
async function fetchCategories() {
    const categories = await fetch(URLS.categories)
    return await categories.json()
}

// variables globales 

    // script.js
const baliseContact = document.getElementById("contact")
const galerie = createElement("section", "galerie")
const filtresBarre = createElement("div", "filtresBarre")
const h3MesProjets = createElement("h3", "h3", "Mes projets")
const insta = document.getElementById("insta")
const login = document.getElementById("login")
const logout = createElement("li", "logout", "logout")
const token = localStorage.getItem("token")
const userId = localStorage.getItem("userId")
const modifierIcone = createElement("i", "fa-regular")
modifierIcone.classList.add("fa-pen-to-square")
const arrow = createElement("i")

    // modale.js
const modale = createElement("div", "modale-wrapper")
function creerModale() {
    modale.innerHTML = `
    <div class="modale-header">
        <i class="fa-solid fa-xmark"></i>
        <h1 class="modale-h1">Galerie photo</h1>
    </div>
    <div class="modale-body"></div>
    <hr>
    <div class="modale-footer">
        <button class="bouton-ajouter-photo">Ajouter une photo</button>
        <button class="bouton-valider">Valider</button>
    </div>`
}
creerModale()

async function genererGalerieModale() {
    const projets = await fetchProjets()
    const modaleBody = document.querySelector(".modale-body")
    if (modaleBody.innerHTML === "") {
        projets.forEach((projet) => {
            creerProjetsModale(projet)
        })
    }
    deleteWork()
} 

async function creerProjetsModale(projet) {
    const modaleBody = document.querySelector(".modale-body")
    const imgContainer = createElement("div", "img-container")
    const imageElement = createElement("img")
    const trash = createElement("i", "fa-regular")
    trash.classList.add("fa-trash-can")
    trash.id = projet.id

    imageElement.src = projet.imageUrl

    modaleBody.appendChild(imgContainer)
    imgContainer.appendChild(imageElement)
    imgContainer.appendChild(trash)
}

function createSecondModal() {
    const uploadImgDiv = createElement("div")
    uploadImgDiv.innerHTML = `
            <form class="form-modale" runat="server">
                <div class="upload-div">
                    <i class="fa-regular fa-image"></i>
                    <img id="blah"></img>
                        <label for="input" class="bouton-upload-image">+ Ajouter photo</label>
                        <input name="needed_image" accept="image/jpg, image/png max-size:4096KB" type="file" id="input" style="display:none"/>
                    <p class="upload-p">jpeg, png: 4mo max</p>
                </div>
                <p>Titre</p>
                <input class="modale-input" type=list></input>
            </form>
            <p>Catégorie</p>
            <select class="select" name="categories>
                <option value="">Sélectionnez une option</option>
                <option value="1" id="Objets">Objets</option>
                <option value="2" id="Appartements">Appartements</option>
                <option value="3" id="Hotels & restaurants">Hotels & restaurants</option>
            </select>
        `
    modaleBody.appendChild(uploadImgDiv)
    modaleBody.classList.remove("modale-body")
    modaleBody.classList.add("transformed-modale-body")
}

// delete work
async function deleteWork() {
    const trashes = document.querySelectorAll(".fa-trash-can")
    for (let i = 0; i < trashes.length; i++) {
        trashes[i].addEventListener("click", (e) => {
            e.preventDefault
            alert("Etes vous sûre de vouloir supprimer ce projet ?")
            const reponse = fetch(`${URLS.works}/${trashes[i].id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            })
            modaleBody.innerHTML = ""
            genererGalerieModale()
            galerie.innerHTML = ""
            genererGalerie()
        })
    }
}

// preview of uploaded image
function displayUploadedImg() {
    blah.classList.add("zindex-100")
    const input = document.getElementById("input")
    input.onchange = evt => {
    const file = evt.target.files[0]
    const validFormats = ["image/jpeg", "image/png"]
    if (file) {
        if (file.size < 4 * 1024 * 1024) {
            if (validFormats.includes(file.type)) {
                blah.src = URL.createObjectURL(file)
                blah.classList.remove("zindex-100")
                blah.classList.add("zindex100")
            } else {
                alert("Le format de l'image est invalide, veuillez télécharger une image au format JPEG ou PNG")
            }
        } else {
            alert("La taille de l'image ne doit pas dépasser 4mo.")
        }}      
    }
}