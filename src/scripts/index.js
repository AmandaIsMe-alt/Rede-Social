import {Api} from "./models/api.js"
import {Header} from "./models/header.js"

class Login {

    static realizarLogin(){
  
      const token = localStorage.getItem("@redeSocial:token")
  
      if (!token || token == 'undefined') {
  
        const emailInput    = document.getElementById('inputMailLogin')
        const passwordInput = document.getElementById('inputPassLogin')
        const btnLogin      = document.getElementById('btnLogin')
  
        btnLogin.addEventListener("click", async event => {
          event.preventDefault()
  
          if (emailInput.value.trim() == "" || passwordInput.value.trim() == "") {
  
            Api.mensagem("Preencha todos os campos! Não deixe campos vazios.")
  
          } else {
  
            const data = {
              email:    emailInput.value,
              password: passwordInput.value
            }
  
            const erro = await Api.login(data)

            if(erro.non_field_errors) {
              Api.mensagem("Essa conta não existe, logo não pode acessar a página dos posts", "Acesso não autorizado")
            }

            console.log(erro)
          }
  
        })
  
      }else{
        window.location.assign("./src/pages/dashboard.html")
      }
    }
}
  
Login.realizarLogin()

Header.renderizarHeader('login')