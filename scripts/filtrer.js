async function createButtons() {
    if (token == null && userId == null) {
        const categories = await fetchCategories()
        categories.unshift({id: 0, name: "Tous"})
        for (i = 0; i < categories.length; i++) {
        const button = createElement("button", "div-filtres", `${categories[i].name}`)
        button.id = categories[i].id
        filtresBarre.appendChild(button)
    }
    }
}

async function filter() {
    let projets = await fetchProjets()
    const buttons = document.querySelectorAll(".div-filtres")
    buttons[0].classList.add("button-active")
    buttons.forEach(button => {
        button.addEventListener("click", async (e) => {
            projets = await fetchProjets()
            const buttonId = e.target.id
            galerie.innerHTML = ""
            if (buttonId !== 0) {
                const projetsFiltres = projets.filter((projet) => {
                    return projet.categoryId == buttonId
                })
                projetsFiltres.forEach(creerProjets)
            }
        })
    })
    // there's no category 0, condition then
    if (buttons[0]) {buttons[0].addEventListener("click", () => {
        galerie.innerHTML = ""
        genererGalerie()
    })}
    // state of active button
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            buttons.forEach((otherButton, otherIndex) => {
                if (index !== otherIndex) {
                    otherButton.classList.remove("button-active")
                } else {
                    button.classList.add("button-active")
                }
            })
        })
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    await createButtons()
    await filter()
})

async function resetButtons() {
    const buttons = document.querySelectorAll(".div-filtres")
    buttons.forEach(button => {
        button.classList.remove("button-active")
    })
    buttons[0].classList.add("button-active")
}
