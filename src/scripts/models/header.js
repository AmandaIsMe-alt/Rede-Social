export class Header {
    static renderizarHeader (pagina = 'login') {
        const user          = localStorage.getItem('@redeSocial:User_id')

        let body = document.querySelector('body')

        let header = document.createElement('header')
        let div = document.createElement('div')
        let img = document.createElement('img')
        let divBtns = document.createElement('div')
        let aLogin = document.createElement('a')
        let aCadastro = document.createElement('a')
        let aSair = document.createElement('a')

        header.classList.add('headerMenu')
        header.id = "headerMenu"
        div.classList.add('container', 'd-flex', 'justify-content-space-between')
        divBtns.classList.add('divBtnAcoes', 'd-flex')
        aSair.classList.add('btn', 'btn-grey1')
        img.src = "../../src/assets/img/logo.svg"

        aLogin.innerText = "Login"
        aCadastro.innerText = "Cadastro"
        aSair.innerText = "Sair"

        if (pagina == 'login') {
            aLogin.classList.add('btn', 'btn-grey2')
            aCadastro.classList.add('btn', 'btn-grey1')
            aLogin.href = "#"
            aCadastro.href = "./src/pages/cadastro.html"
        } else{
            aLogin.classList.add('btn', 'btn-grey1')
            aCadastro.classList.add('btn', 'btn-grey2')
            aLogin.href = "../../index.html"
            aCadastro.href = "#"
        }

        if(!user || user == 'undefined') {
            divBtns.append(aLogin, aCadastro)
        } else {
            divBtns.append(aSair)
        }


        div.append(img, divBtns)
        header.append(div)

        body.insertAdjacentElement('afterbegin', header);

        window.onscroll = function() {Header.scroll()};
    }

    static scroll() {
        var header = document.getElementById("headerMenu");
        var distanciaTop = header.offsetTop;
        
        if (window.pageYOffset > distanciaTop) {
            header.classList.add("fixo");
        } else {
            header.classList.remove("fixo");
        }
    }
}