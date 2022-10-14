import {Api} from "./models/api.js"
import {Header} from "./models/header.js"
import {Render} from "./models/render.js"
import {Modal} from "./models/modal.js"

const token = localStorage.getItem('@redeSocial:token')
class Dashboard {

    static renderHomepage(posts) {

        if (!token || token == 'undefined') {
            window.location.assign('../../index.html')
        } else{
            Render.renderPagePosts(posts)
        }

    }

    static async renderProfile() {
        const idUser = localStorage.getItem('@redeSocial:User_id')

        const figurePerfil = document.querySelector('#figurePerfil')
        figurePerfil.innerHTML = ''

        const userProfile = await Api.findUser(idUser)
        const Profile = Render.renderUser(userProfile)

        figurePerfil.append(Profile)
    }

    static async renderSuggestions() {
        const sectionSuggestions = document.querySelector('#sectionSuggestions ul')

        sectionSuggestions.innerHTML = ''

        const usersArray = await Api.getUsers()
        const randomCheck = []

        let i = 0

        while ( i < 3 ) {

            let randomUser = Math.floor(Math.random() * 10)

            if(randomCheck.length >= 1) {
                while(randomCheck.includes(randomUser)) {
                    randomUser = Math.floor(Math.random() * 10)
                }
            }
            const renderUser = Render.renderUser(usersArray[randomUser])

            randomCheck.push(randomUser)

            const li = document.createElement('li')
            const button = document.createElement('button')

            li.classList.add('d-flex', 'justify-content-space-between', 'align-items-center')
            button.classList.add('btn', 'btn-outline-medium')

            button.innerText = 'Seguir'
                button.setAttribute('follow-user', usersArray[i].uuid)
            
            li.append(renderUser, button)
            sectionSuggestions.append(li)

            i++
        }

        Dashboard.followUser()
        Dashboard.likePost()
    }

    static async followUser() {

        const sectionSuggestions = document.querySelector('#sectionSuggestions ul')

        sectionSuggestions.addEventListener("click", async event => {
            let btnClicado = event.target

            if(btnClicado.hasAttribute("follow-user")) {
                const user = btnClicado.getAttribute("follow-user")
                const erro = await Api.follow(user)

                console.log(erro)

                btnClicado.setAttribute("unfollow-user", user)
                btnClicado.innerText = "Seguindo"

                btnClicado.removeAttribute("follow-user")

            } else if (btnClicado.hasAttribute("unfollow-user")){
                const user = btnClicado.getAttribute("unfollow-user")
                const erro = await Api.unfollow(user)

                console.log(erro)
                btnClicado.setAttribute("follow-user", user)
                btnClicado.innerText = "Seguir"

                btnClicado.removeAttribute("unfollow-user")
            }
        })
    }

    static async likePost() {

        const sectionPosts = document.querySelector('#sectionPosts')

        sectionPosts.addEventListener("click", async event => {
            let btnClicado = event.target
            let btnFilhos = btnClicado.children

            if(btnClicado.hasAttribute("like")) {

                const post = btnClicado.getAttribute("like")
                const erro = await Api.like(post)

                console.log(erro)

                btnClicado.setAttribute("dislike", post)
                btnFilhos[1].innerHTML = Number(btnFilhos[1].innerHTML) + 1

                btnClicado.removeAttribute("like")

            } else if (btnClicado.hasAttribute("dislike")){
                const post = btnClicado.getAttribute("dislike")
                const erro = await Api.dislike(post)

                console.log(erro)

                btnClicado.setAttribute("like", post)
                btnFilhos[1].innerHTML = Number(btnFilhos[1].innerHTML) - 1

                btnClicado.removeAttribute("dislike")
            }
        })
    }

    static createPost() {

        const inputPostTitle = document.querySelector('#inputPostTitle')
        const textPostContent = document.querySelector('#textPostContent')
        const btnNewPost = document.querySelector("#btnNewPost")

        inputPostTitle.addEventListener("input", () => {

            if (inputPostTitle.value.trim() != "" && textPostContent.value.trim() != "") {
                btnNewPost.disabled = false;
            } else {
                btnNewPost.disabled = true;
            }

        })

        textPostContent.addEventListener("input", () => {

            if (inputPostTitle.value.trim() != "" && textPostContent.value.trim() != "") {
                btnNewPost.disabled = false;
            } else {
                btnNewPost.disabled = true;
            }

        })

        btnNewPost.addEventListener("click", async () => {

            const data = {
                "title": inputPostTitle.value.trim(),
                "description": textPostContent.value.trim()
            }

            const erro = await Api.createPost(data)

            console.log(erro)

            const posts = await Api.getAllPosts()
            this.renderHomepage(posts.results)

        })

    }

    static logout() {
        const btnLogout = document.querySelector(".divBtnAcoes a")

        btnLogout.addEventListener('click', () => {

            Api.mensagem("Volte sempre.", "Logout realizado!")

            localStorage.removeItem('@redeSocial:token')
            localStorage.removeItem('@redeSocial:User_id')

            setTimeout(() => {
                window.location.assign('../../index.html')
            }, 1000)
        })

    }
}

if (!token || token == 'undefined') {
    window.location.assign('../../index.html')
} else{
    Header.renderizarHeader()

    const posts = await Api.getAllPosts()
    Dashboard.renderHomepage(posts.results)
    Modal.openModal()
    Dashboard.createPost()
    Dashboard.renderProfile()
    Dashboard.renderSuggestions()
    Dashboard.logout()
}