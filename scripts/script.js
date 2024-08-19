// création et ancrage de : galerie, "Mes projets", barre de filtres
function creationEtAncrageGalerieTitreFiltres() {
    document.body.appendChild(filtresBarre)
    insertBefore(galerie, baliseContact)
    insertBefore(filtresBarre, galerie)
    insertBefore(h3MesProjets, filtresBarre)
    insertBefore(logout, insta)
}

// galerie
async function genererGalerie() {
    let projets = await fetchProjets()
    projets.forEach(creerProjets)
}

async function creerProjets(projet) {    
    const projetContainer = createElement("div", "img")
    const imageElement = createElement("img")
    const pElement = createElement("p", "p", projet.title)

    imageElement.src = projet.imageUrl
    imageElement.setAttribute("id", projet.id)

    projetContainer.appendChild(imageElement)
    projetContainer.appendChild(pElement)
    galerie.appendChild(projetContainer)
}

// login 
function setupLogin() {
    login.addEventListener("click", () => {window.location.href = "../pages/login.html"})
    if (token && userId) {
        login.style.display = "none"
        logout.style.display = "block"
        // Mode édition
        const modifyMode = createElement("div", "modify-mode")
        modifyMode.innerHTML = `<i class="fa-regular fa-pen-to-square icone1"></i><p>Mode édition</p>`
        const header = document.querySelector(".header")
        insertBefore(modifyMode, header)
        // Icone modifier
        modifierIcone.classList.add("fa-regular", "fa-pen-to-squar", "icone2")
        h3MesProjets.appendChild(modifierIcone)
    } else {
        login.style.display = "block"
        logout.style.display = "none"
    }

    logout.addEventListener("click", () => {
        window.location.href = "../index.html"
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
    })
}

function init() {
    creationEtAncrageGalerieTitreFiltres()
    genererGalerie()
    setupLogin()
}
init()