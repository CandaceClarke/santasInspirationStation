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

//document.getElementById('countdownOutput').value = remainingDays;
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

//for mouse
// canvas.addEventListener('mousemove', draw);
// canvas.addEventListener('mousedown', (e) => {
//     isDrawing = true;
//     [lastX, lastY] = [e.offsetX, e.offsetY];
// });

// canvas.addEventListener('mouseup', () => isDrawing = false);
// canvas.addEventListener('mouseout', () => isDrawing = false);

//for touch screens
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerdown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; //figure this out somehow
});

canvas.addEventListener('pointerup', () => isDrawing = false);
canvas.addEventListener('pointerout', () => isDrawing = false);


//API-----------------------------------------------------------------
let yesnobtn = document.getElementById('yesornobtn');
//let yesornoimage = document.getElementById('yesornoimage');
//let input = document.getElementById('yesornotext').value;

// yesnobtn.addEventListener('click', function () {
//     fetch('https://yesno.wtf/api/')
//     .then(res => res.json())
//     .then(result => {
//         console.log(result)
//         yesornoimage.src = result.image
//         // trying to get the text to display
//         yesornotext.src = result.answer
//     })
//     .catch(err=>console.log(err))
// });


    //document.getElementById('yesornotext').value = yesornotext;
//food inspo api (works)
    // yesnobtn.addEventListener('click', function () {
    //     fetch('https://biriyani.anoram.com/get')
    //     .then(res => res.json())
    //     .then(result => {
    //         console.log(result)
    //         yesornoimage.src = result.image
    //     })
    //     .catch(err=>console.log(err))
    // });


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
    })
    

    

    function displayInspo(data) {
        const inspoQuote = data[0];
        const yesornoDiv = document.getElementById('yesorno');

        const inspoContent = inspoQuote.content;
        const quoteText = document.createElement("p");
        quoteText.innerHTML = inspoContent;

        yesornoDiv.appendChild(quoteText);

        const inspoAuth = inspoQuote.author;
        const authName = document.createElement("p");
        authName.innerHTML = inspoAuth;

        yesornoDiv.appendChild(authName);
    }