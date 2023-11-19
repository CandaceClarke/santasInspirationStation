"use strict";

//Countdown----------------------------------------------------------
let today = new Date();
let christmasYear = today.getFullYear();

if (today.getMonth() == 11 && today.getDate() > 24) {
    christmasYear = christmasYear + 1;
};

let christmasDate = new Date(christmasYear, 11, 24);
let dayMilliseconds = 1000 * 60 * 60 * 24;
let remainingDays = Math.ceil((christmasDate.getTime() - today.getTime()) / (dayMilliseconds));

document.getElementById('countdownDiv').innerHTML = remainingDays;

//Cargo Converter----------------------------------------------------
let kgbutton = document.getElementById('kg');
let lbbutton = document.getElementById('pound');

kgbutton.addEventListener('click', function() {
    let input = document.getElementById('cargoInput').value;
    document.getElementById('cargoOutput').value = input / 2.205 + " Kg";
});

lbbutton.addEventListener('click', function(){
    let input = document.getElementById('cargoInput').value;
    document.getElementById('cargoOutput').value = input * 2.205 + " lb";
});

//Creation Station---------------------------------------------------
//Doodle pad via canvas element
const canvas = document.querySelector("#doodlepad");
const ctx = canvas.getContext("2d");

// const image = new Image(955, 1280);
// image.onload = drawImageActualSize;
// image.src = "images/christmas-tree-plain.png";

// function drawImageActualSize() {
//     doodle.width = this.naturalWidth;
//     doodle.height = this.naturalHeight;
//     ctx.drawImage(this, 0, 0);
//     ctx.drawImage(this, 0, 0, this.width, this.height);
// }
//  canvas.width = window.innerWidth;
//  canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = '4';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if(!isDrawing) return;
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX, lastY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    if(ctx.lineWidth >=15|| ctx.lineWidth <= 3) {
        direction = !direction;
    }
    if(direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
};

//for mouse, touch, stylus
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerdown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; //figure this out somehow
});

canvas.addEventListener('pointerup', () => isDrawing = false);
canvas.addEventListener('pointerout', () => isDrawing = false);

let lights = true;
const clearDrawing = document.getElementById('clearDrawingbtn');

clearDrawing.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (clearDrawing) {
        draw();
    } else {
        draw();
    } 
    lights = !lights;
});

//API-----------------------------------------------------------------
let yesnobtn = document.getElementById('yesornobtn');

yesnobtn.addEventListener('click', function () {
    fetch('https://api.quotable.io/quotes/random')
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then(data => {
        console.log(data);
        displayInspo(data)
    })
    .catch(error => console.error("FETCH ERROR:", error));
});
    
function displayInspo(data) {
    const inspoQuote = data[0];
    const yesornoDiv = document.getElementById('inspoQuotes');

    yesornoDiv.innerHTML = `${inspoQuote.content} </br> ${inspoQuote.author}`;
};

//Cookie Sorting Drag and Drop ---MAKE THIS TOUCH/POINT EVENT COMPATIBLE!!!!
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
};

//Reindeer Games Sleigh Roster---------------------------------------
const stablesSelect = document.getElementById("stablesList");
const sleighSelect = document.getElementById("sleighDuty");
const sleighBtn = document.getElementById("toSleigh");
const stablesBtn = document.getElementById("toStables");

sleighBtn.addEventListener("click", () => {
    const selectedTransferOptions = 
        document.querySelectorAll("#stablesList option:checked");
    const existingSleighOptions = document.querySelectorAll("#sleighDuty option");
    sleighSelect.replaceChildren(...selectedTransferOptions, ...existingSleighOptions);
});

stablesBtn.addEventListener("click", () => {
    const selectedTransferOptions = 
        document.querySelectorAll("#sleighDuty option:checked");
    const existingStablesOptions = document.querySelectorAll("#stablesList option");
    stablesSelect.replaceChildren(...selectedTransferOptions, ...existingStablesOptions);
});