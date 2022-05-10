const template = document.createElement('template')

template.innerHTML = `

<body>
    <link rel="stylesheet" href="./css/image-classifier-mlp.css" />
    <h1>TensorFlow.js MNIST classifier</h1>
    <p>See console for even more outputs.</p>

    <section class="box">
      <h2>Input Image</h2>
      <p>Input image is a 28x28 pixel greyscale image from MNIST dataset - a real hand drawn digit!</p>
      <canvas id="canvas" width="28" height="28"></canvas>
    </section>

    <section class="box">
      <h2>Prediction</h2>
      <p>Below you see what number the trained TensorFlow.js model has predicted from the input image.</p>
      <p>Red is a wrong prediction, Green is a correct one.</p>
      <p id="prediction">Training model. Please wait...</p>
    </section>    
</body>
`

let initCalled = false;
let customInitCalled = false;

function loadCustomScript() {
    console.log(`Before : Value of customInitCalled ${customInitCalled}`)

    if(!customInitCalled) {
        const script = document.createElement('script');
        script.type = 'module';
        script.async = true;
        script.onload = function () {
            customInitCalled = true;
            console.log(`After : Value of customInitCalled ${customInitCalled}`)
        }        
        
        script.src = '/js/image-classifier-mlp-script.js'
        document.head.appendChild(script);
    }
}

function loadTf() {
    console.log(`Before : Value of initCalled ${initCalled}`)
    if (!initCalled) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = function () {
            initCalled = true;
            console.log(`After : Value of initCalled ${initCalled}`)
        }        
        
        script.src = '//cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js'
        document.head.appendChild(script);
    }        
}

class ImageClassifierMultiLayerPerception extends HTMLElement {
 
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
      }

    connectedCallback() {
        console.log('mlp')
        loadTf()
        loadCustomScript()
        // this.innerText = 'Image Classifier - MLP'
    }    
}

customElements.define('image-classifier-mlp', ImageClassifierMultiLayerPerception)