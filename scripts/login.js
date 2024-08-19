// récupération des éléments du DOM
const form = document.getElementById("form")
const email = document.getElementById("email")
const password = document.getElementById("password")

// fonction pour le login du client 
async function handleLogin(login) {
    login.preventDefault()
    const data = JSON.stringify({
        email: email.value,
        password:  password.value,
    })
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"}, 
        body: data,
    })
    if (reponse.ok) {
        const fetchToken = await reponse.json()
        const token = fetchToken.token
        const userId = fetchToken.userId
        localStorage.setItem("token", token)
        localStorage.setItem("userId", userId)
        window.location.href = "../index.html"
    } else {
        alert("L'e-mail et le mot de passe ne correspondent pas")
    }
}

if (form) {form.addEventListener("submit", handleLogin)}