"use strict";

//Countdown
let today = new Date();
let christmasYear = today.getFullYear();

if (today.getMonth() == 11 && today.getDate() > 24) {
    christmasYear = christmasYear + 1;
};

let christmasDate = new Date(christmasYear, 11, 24);
let dayMilliseconds = 1000 * 60 * 60 * 24;
let remainingDays = Math.ceil((christmasDate.getTime() - today.getTime()) / (dayMilliseconds));

document.getElementById('countdownOutput').value = remainingDays;

//Cargo Converter
let kgbutton = document.getElementById('kg');
let lbbutton = document.getElementById('pound');

kgbutton.addEventListener('click', function() {
    let input = document.getElementById('input').value;
    document.getElementById('cargoOutput').value = input / 2.205 + " Kg";
});

lbbutton.addEventListener('click', function(){
    let input = document.getElementById('input').value;
    document.getElementById('cargoOutput').value = input * 2.205 + " lb";
});