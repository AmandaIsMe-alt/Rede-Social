import {Api} from "./models/api.js"
import {Header} from "./models/header.js"

export class Register {

    static createNewUser() {
  
      const inputName     = document.getElementById('inputName')
      const inputMail     = document.getElementById('inputMail')
      const inputPhoto    = document.getElementById('inputPhoto')
      const inputJob      = document.getElementById('inputJob')
      const inputPassword = document.getElementById('inputPassword')
      const btnRegister   = document.getElementById('btnRegister')
  
      btnRegister.addEventListener('click', async event => {
        event.preventDefault()
  
        const data = {
          username:  inputName.value,
          email:     inputMail.value,
          password:  inputPassword.value,
          work_at: inputJob.value,
          image: inputPhoto.value
        }
  
        if (
          inputName.value.trim()      == "" ||
          inputMail.value.trim()      == "" ||
          inputPhoto.value.trim()     == "" ||
          inputJob.value.trim()     == "" ||
          inputPassword.value.trim()  == ""
        ) {
          Api.mensagem("Preencha todos os campos! Não deixe campos vazios.")
  
        } else {
  
          const erro = await Api.createUser(data)  
          console.log(erro)
        }
      })
    }
}
  
Register.createNewUser()

Header.renderizarHeader('cadastro')