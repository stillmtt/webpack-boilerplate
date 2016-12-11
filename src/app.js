import $ from 'jquery';
import './index.css';

const loadMod = () => {
  System.import('./bootstrap').then((methods) => {
    console.log('methods', methods);
    console.log(methods.increment()());
  });
};

$('#load').on('click', loadMod);
