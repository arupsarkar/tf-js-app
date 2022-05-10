class Home extends HTMLElement {
    connectedCallback() {
        console.log('home')
        this.innerText = 'Home'
    }
}

customElements.define('home-page', Home)