class NotFound extends HTMLElement {
    connectedCallback() {
        console.log('page not found')
        this.innerText = 'Page Not Found'
    }
}

customElements.define('not-found', NotFound)