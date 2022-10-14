export class Api {

    static url = "https://m2-rede-social.herokuapp.com/api"
    static token = localStorage.getItem("@redeSocial:token") || ""
    static user_id = localStorage.getItem("@redeSocial:User_id") || ""
    static headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`
    });
  
    static async createUser(body) {
  
      const newUser = await fetch(`${this.url}/users/`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: this.headers
        })
        .then(res => res.json())
        .then(res => {
              setTimeout(() => {
                window.location.assign('../../index.html')
              }, 2000)
              
              this.mensagem("Cadastrado com sucesso! Agora faça o login.")
  
          return res
        })
        .catch(err => this.mensagem(err))
  
      return newUser
    }
  
    static async login(body) {
  
      const userLogin = await fetch(`${this.url}/users/login/`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: this.headers
        })
        .then(res => res.json())
        .then(res => {

          if(res.user_uuid) {
            localStorage.setItem("@redeSocial:token",   res.token)
            localStorage.setItem("@redeSocial:User_id", res.user_uuid)

            window.location.assign('./src/pages/dashboard.html')
          }
  
          return res
        })
        .catch(err => {  
          this.mensagem("Essa conta não existe, logo não pode acessar a página dos posts", "Acesso não autorizado")
        })
  
  
      return userLogin
    }
  
    static async getAllPosts() {
  
      const posts = await fetch(`${this.url}/posts/`, {
          method: "GET",
          headers: this.headers
        })
        .then(res => res.json())
        .catch(err => {  
          console.log(err)
        }
        )
  
      return posts
    }
  
    static async findUser(idUser) {
  
      const activeUser = await fetch(`${this.url}/users/${idUser}/`, {
          method: "GET",
          headers: this.headers
        })
        .then(res => res.json())
        .catch(err => console.log(err))
  
      return activeUser
    }
  
    static async createPost(contentPost) {
      
      const posts = await fetch(`${this.url}/posts/`, {
          method: "POST",
          body: JSON.stringify(contentPost),
          headers: this.headers
        })
        .then(res => res.json())
        .then(this.mensagem("Post criado com sucesso!"))
        .catch(err => console.log(err))

        return posts
  
    }

    static async getUsers() {
      const users = await fetch(`${this.url}/users/`, {
        method: "GET",
        headers: this.headers
      })
      .then(res => res.json())
      .catch(err => console.log(err))

      return users.results
    }

    static async follow(user) {
      const follow = await fetch(`${this.url}/users/follow/`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(
            {
              following_users_uuid: user
            }
          )
        })
        .then(res => res.json())
        .catch(err => this.mensagem(err))

      return follow
    }

    static async unfollow(user) {
      const unfollow = await fetch(`${this.url}/users/unfollow/${user}/`, {
          method: "DELETE",
          headers: this.headers
        })
        .then(res => res.json())
        .catch(err => this.mensagem(err))

      return unfollow
    }

    static async like(post) {
      const like = await fetch(`${this.url}/likes/`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(
            {
              post_uuid: post
            }
          )
        })
        .then(res => res.json())
        .catch(err => this.mensagem(err))

      return like
    }

    static async dislike(post) {
      const dislike = await fetch(`${this.url}/likes/${post}/`, {
          method: "DELETE",
          headers: this.headers
        })
        .then(res => res.json())
        .catch(err => this.mensagem(err))

      return dislike
    }
  
    /* ESTA É A FUNÇÃO QUE IRÁ ADICIONAR AS MENSAGENS DE AVISO NO SITE
    ELA RECEBE COMO PARÂMETRO UM Titulo, texto (obrigatório) e valor para o botao, A MENSAGEM QUE DESEJA DAR AO USUÁRIO*/
    static mensagem (text, title = 'Atenção!', button = 'Entendi') {
  
      const body = document.querySelector('body')
  
      if(!document.querySelector('#mensagem__aviso')) {
        const fundo = document.createElement('div')
        const conteudo = document.createElement('div')
        const titulo = document.createElement('h3')
        const texto = document.createElement('p')
        const botao = document.createElement('button')

        botao.id = 'closeMensagem'
        botao.classList.add('btn', 'btn-white-fixed', 'float-right')
        fundo.id = "mensagem_aviso"

        titulo.innerText = title
        texto.innerText = text
        botao.innerText = button

        conteudo.append(titulo, texto, botao)
        fundo.append(conteudo)
        body.append(fundo)
        
        setTimeout(() => {
           document.getElementById('mensagem_aviso').remove();
        }, "7000")

        let closeMensagem = document.getElementById('closeMensagem')
        closeMensagem.addEventListener("click", () => {
            document.getElementById('mensagem_aviso').remove();
        })
      }
    }
  
}