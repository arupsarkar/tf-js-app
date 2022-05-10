class ImageClassifierConvulationalNeuralNetwork extends HTMLElement {
    connectedCallback() {
        console.log('cnn')
        this.innerText = 'Image Classifier - CNN'
    }
}

customElements.define('image-classifier-cnn', ImageClassifierConvulationalNeuralNetwork)