import './home.js'
import './not-found.js'
import './image-classifier-mlp.js'
import './image-classifier-cnn.js'
import { Router } from './vaadin-router.js'


const outlet = document.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes([
  {path: '/',     component: 'home-page'},
  {path: '/image-classifier-mlp', component: 'image-classifier-mlp'},
  {path: '/image-classifier-cnn', component: 'image-classifier-cnn'},
  {path: '(.*)', component: 'not-found'},
]);