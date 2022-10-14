import { Api } from "./api.js"

export class Render {


    static renderPagePosts(arr){
        
        const sectionPosts = document.getElementById("sectionPosts")

        sectionPosts.innerHTML = ""

        arr.forEach( post =>{
            return sectionPosts.appendChild(Render.renderPosts(post))
        })
    }

    static renderPosts(post) {

        const user          = localStorage.getItem('@redeSocial:User_id')

        const article       = document.createElement("article")
        const title      = document.createElement("h2")
        const text      = document.createElement("p")
        const divBtnsAcoes      = document.createElement("div")
        const abrirPost      = document.createElement("button")
        const pFavorite      = document.createElement("p")
        const heart      = document.createElement("i")
        const likes      = document.createElement("span")


        title.innerText = post.title
        text.innerText = post.description
        abrirPost.innerText = 'Abrir Post'
        //heart.src = '../assets/img/heartBlack.png'
        likes.innerText = post.likes.length

        article.id = 'articlePost'
        title.classList.add('title1')
        text.classList.add('text1')
        divBtnsAcoes.classList.add('d-flex', 'align-items-center')
        divBtnsAcoes.id = 'divBtnAcoes'
        abrirPost.classList.add('btn', 'btn-grey1')
        abrirPost.setAttribute('data-control-modal', 'modal-show-post')
        abrirPost.id = post.uuid
        pFavorite.id = 'pFavorite'
        pFavorite.classList.add('d-flex', 'align-items-center')

        if(Render.checkForUser(post.likes)) {
            pFavorite.setAttribute('dislike', post.uuid)
        } else {
            pFavorite.setAttribute('like', post.uuid)
        }

        heart.classList.add('fa', 'fa-heart')
        likes.classList.add('text2')

        pFavorite.append(heart, likes)
        divBtnsAcoes.append(abrirPost, pFavorite)

        const author = this.renderUser(post.author)
        article.append(author, title, text, divBtnsAcoes)


            /*if (user == post.author.uuid) {

                abrirPost.id = 
            }*/


        return article
    }

   
    static renderUser(user) {

        const idUser = localStorage.getItem('@redeSocial:User_id')

        const figure = document.createElement('figure')
        const imgPerfil = document.createElement('img')
        const figcaption = document.createElement('figcaption')
        const titulo = document.createElement('p')
        const seguidores = document.createElement('em')
        const ocupacao = document.createElement('p')

        imgPerfil.src = user.image
        titulo.innerText = user.username
        ocupacao.innerText = user.work_at
        seguidores.innerText = `${user.followers_amount} seguidores`

        figure.classList.add('d-flex', 'figurePerfil')
        titulo.classList.add('title2')
        ocupacao.classList.add('text2')
        seguidores.classList.add('text3')

        if(idUser == user.uuid) {
            titulo.append(seguidores)
        }

        figcaption.append(titulo, ocupacao)
        figure.append(imgPerfil, figcaption)

        return figure
    }

    static checkForUser (arr) {
        const idUser = localStorage.getItem('@redeSocial:User_id')

        for (let index = 0; index < arr.length; index++) {
            if (arr[index].user.uuid == idUser) {
                return true
            }
            
        }

        return false
    }
}

                               