import {TRAINING_DATA} from 'https://storage.googleapis.com/jmstore/TensorFlowJS/EdX/TrainingData/mnist.js';

let ANSWER = ''
let DIGIT = ''

console.log('Starting mlp training')
// Grab a reference to the MNIST input values (pixel data).
const INPUTS = TRAINING_DATA.inputs;
// Grab reference to the MNIST output values.
const OUTPUTS = TRAINING_DATA.outputs;
// Shuffle the two arrays in the same way so inputs still match outputs indexes.
tf.util.shuffleCombo(INPUTS, OUTPUTS);
// Input feature Array is 1 dimensional.
const INPUTS_TENSOR = tf.tensor2d(INPUTS);
// Output feature Array is 1 dimensional.
const OUTPUTS_TENSOR = tf.oneHot(tf.tensor1d(OUTPUTS, 'int32'), 10);

// Now actually create and define model architecture.
const model = tf.sequential();
model.add(tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}));
model.add(tf.layers.dense({units: 16, activation: 'relu'}));
model.add(tf.layers.dense({units: 10, activation: 'softmax'}));
model.summary();


train();



async function train() { 
    // Compile the model with the defined optimizer and specify our loss function to use.
    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  
  
    let results = await model.fit(INPUTS_TENSOR, OUTPUTS_TENSOR, {
      shuffle: true,        // Ensure data is shuffled again before using each epoch.
      validationSplit: 0.2,
      batchSize: 512,       // Update weights after every 512 examples.      
      epochs: 50,           // Go over the data 50 times!
      onTrainStart: console.log("Starting Training..."),      
      callbacks: {          
            onEpochEnd: (epoch, logs) => {
                console.log(epoch, logs);
            }
        },        
        onTrainEnd: console.log("Training Finished!"),
    });
  
    // function logProgress() {
    //     console.log(JSON.stringify(results))
    // }    
  
    OUTPUTS_TENSOR.dispose();
    INPUTS_TENSOR.dispose();
    evaluate(); // Once trained we can evaluate the model.
  }


const PREDICTION_ELEMENT = document.getElementById('prediction');
// const PREDICTION_ELEMENT = this.shadowRoot.getElementById('prediction')

function evaluate() {
    const OFFSET = Math.floor((Math.random() * INPUTS.length)); // Select random from all example inputs. 
    let answer = tf.tidy(function() {
        let newInput = tf.tensor1d(INPUTS[OFFSET]).expandDims();
        let output = model.predict(newInput);
        output.print();
        return output.squeeze().argMax();
    })

    console.log('---> Output = ', `${answer}`)
    ANSWER = answer
    answer.array().then(function(index) {
        try{
            console.log('---> Output Index = ', `${index}`)
            PREDICTION_ELEMENT.innerText = index;
            PREDICTION_ELEMENT.setAttribute('class', (index === OUTPUTS[OFFSET]) ? 'correct' : 'wrong');
            answer.dispose();
            drawImage(INPUTS[OFFSET]);
        }catch(err) {
            console.log('no data found', err)
        }

    })
}

// const CANVAS = document.getElementById('canvas');
// const CANVAS = this.shadowRoot.getElementById('canvas');

function drawImage(digit) {
    digit = tf.tensor(digit, [28, 28]);   
    DIGIT = digit
    console.log('---> DIGIT = ', `${DIGIT}`)
    //tf.browser.toPixels(digit, CANVAS);
     // Perform a new classification after a certain interval.
     setTimeout(evaluate, 2000);
   }

console.log('MLP training completed')

export {ANSWER, DIGIT}