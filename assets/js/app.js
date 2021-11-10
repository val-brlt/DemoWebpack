import * as obj from '@js/log.js';
import * as css from '@css/style.css';
import img from '@img/pic.jpg';
console.log(img);
let a = "aaaasssbcvbvcxsssssssssaaa";

document.getElementById('button').addEventListener('click', () => {
    import ( /* webpackChunkName: "jquery" */ 'jquery').then(({ default: $ }) => {
        if ($('body').css('background-color') === 'rgb(255, 0, 0)') {
            $('body').css('background-color', 'black');
        } else {
            $('body').css('background-image', 'url(' + img + ')');
        }
    });
});
let d;
let [b, , c] = [1, 2, 3, 4];
obj.log(c);