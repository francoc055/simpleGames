const pongCanvas = document.getElementById('pongCanvas');
const context = pongCanvas.getContext('2d');


let paletaUno = [
    {x:0 , y:200},
    {x:0 , y:210},
    {x:0 , y:220},
    {x:0 , y:230},
    {x:0 , y:240},
];

let paletaDos = [
    {x:390 , y:200},
    {x:390 , y:210},
    {x:390 , y:220},
    {x:390 , y:230},
    {x:390 , y:240},
];

let pelota = {x:20, y:220};
let direccionPelota = 'right';
let puntosP1 = 0;
let puntosP2 = 0;
const $asignarPuntoP1 = document.getElementById('puntosPlayerUno'); 
const $asignarPuntoP2 = document.getElementById('puntosPlayerDos'); 


const dibujar = ()=>{


    context.clearRect(0, 0, pongCanvas.width, pongCanvas.height);

    context.fillStyle = 'lightblue';
    context.fillRect(0, 0, pongCanvas.width, pongCanvas.height);


    context.fillStyle = 'white';
    context.fillRect(199.5, 0, 2, 400);



    context.fillStyle = 'black';
    for(let i = 0; i < paletaUno.length; i++)
    {
        context.fillRect(paletaUno[i].x, paletaUno[i].y, 10, 10);
    }
    
    for(let i = 0; i < paletaDos.length; i++)
    {
        context.fillRect(paletaDos[i].x, paletaDos[i].y, 10, 10);
    }
}

const moverPelota = ()=>{
    context.clearRect(pelota.x, pelota.y, 10, 10);
    let flag = true;


    // if(pelota.x == 0)
    // {
    //     console.log(pelota.y);

    // }

    for (let i = 0; i < 5; i++) {
        if (pelota.x == 380 && 
            (
            (paletaDos[i].y <= Math.floor(pelota.y) &&
            paletaDos[i].y + 10 > Math.floor(pelota.y)) ||
            (paletaDos[i].y >= Math.floor(pelota.y) &&
            paletaDos[i].y - 10 <= Math.floor(pelota.y))) 
            ){
            flag = false;
            // console.log(`p2 ${i}`);
            switch(i)
            {
                case 0:
                    direccionPelota = 'leftTop';
                break;
                case 1:
                    direccionPelota = 'leftMiddleTop';
                break;
                case 2:
                    direccionPelota = 'left';
                break;
                case 3:
                    direccionPelota = 'leftMiddleDown';
                break;
                case 4:
                    direccionPelota = 'leftDown';
                break;
            }
            break;
        } 
        else if (pelota.x == 12 && 
                (
                (paletaUno[i].y <= Math.floor(pelota.y) &&
                paletaUno[i].y + 10 > Math.floor(pelota.y)) ||
                (paletaUno[i].y >= Math.floor(pelota.y) &&
                paletaUno[i].y - 10 <= Math.floor(pelota.y)))
                ) {
            flag = false;
            // console.log(`p1 ${i}`);
            switch(i)
            {
                case 0:
                    direccionPelota = 'rightTop';
                break;
                case 1:
                    direccionPelota = 'rightMiddleTop';
                break;
                case 2:
                    direccionPelota = 'right';
                break;
                case 3:
                    direccionPelota = 'rightMiddleDown';
                break;
                case 4:
                    direccionPelota = 'rightDown';
                break;
            }
            break;
        }
    }

    //cuando al pelota toca la parte superior o inferior.
    
    direccionPelota = siNoTocanLaPelota(flag, direccionPelota);
    moverSegunDireccion(direccionPelota);
    

    context.fillStyle = 'red';
    context.fillRect(pelota.x, pelota.y, 10, 10);
}

const siNoTocanLaPelota = (flag, direccionPelota)=>{
    if(flag)
    {
        if(Math.round(pelota.y) == 0 || Math.round(pelota.y) == 390)
        {
            switch(direccionPelota)
            {
                //cuando pega arriba
                case 'rightTop':
                case 'rightMiddleTop':
                    direccionPelota =  'rightDown';
                break;
                case 'leftTop':
                case 'leftMiddleTop':
                    direccionPelota = 'leftDown';
                break;
                //cuando pega abajo
                case 'rightDown':
                case 'rightMiddleDown':
                    direccionPelota = 'rightTop';
                break;
                case 'leftDown':
                case 'leftMiddleDown':
                    direccionPelota = 'leftTop';
                break;               
            }
        }
        else 
        {
            if(Math.round(pelota.x) == 0)
            {
                puntosP2++;
                $asignarPuntoP2.textContent =  `player 2: ${puntosP2}`;
                direccionPelota = resetGame();
            }
            else if(Math.round(pelota.x) == 400)
            {
                puntosP1++;
                $asignarPuntoP1.textContent =  `player 1: ${puntosP1}`;
                direccionPelota = resetGame();
            }

        }

        return direccionPelota;
    }
    return direccionPelota;  
}

const moverSegunDireccion = (direccionPelota) =>{
    switch(direccionPelota)
    {
        case 'left':
            pelota.x -= 4;
            break;
        case 'right':
            pelota.x += 4;
        break;
        case 'rightMiddleTop':
            pelota.x += 4;
            pelota.y -= 0.2;
        break;
        case 'leftMiddleTop':
            pelota.x -= 4;
            pelota.y -= 0.2;
        break;
        case 'rightMiddleDown':
            pelota.x += 4;
            pelota.y += 0.2;
        break;
        case 'leftMiddleDown':
            pelota.x -= 4;
            pelota.y += 0.2;
        break;
        case 'rightDown':
            pelota.x += 4;
            pelota.y += 0.5;
        break;
        case 'leftDown':
            pelota.x -= 4;
            pelota.y += 0.5;
        break;
        case 'rightTop':
            pelota.x += 4;
            pelota.y -= 0.5;
        break;
        case 'leftTop':
            pelota.x -= 4;
            pelota.y -= 0.5;
        break;
    }
}

const resetGame = ()=>{
    paletaUno = [
        {x:0 , y:200},
        {x:0 , y:210},
        {x:0 , y:220},
        {x:0 , y:230},
        {x:0 , y:240},
    ];
    
    paletaDos = [
        {x:390 , y:200},
        {x:390 , y:210},
        {x:390 , y:220},
        {x:390 , y:230},
        {x:390 , y:240},
    ];

    pelota = {x:20, y:220};
    return 'right';
}

function init()
{
    moverPaletaDos();
    dibujar(); 
    moverPelota();
}

document.addEventListener('keydown', function(event){
    let newPP = {};
    switch (event.key) {
        case 'ArrowUp':
            // newPP = {x:0 , y:paletaUno[0].y - 10};
            // paletaUno.unshift(newPP);
            // paletaUno.pop();
            paletaUno.forEach((bloque) => {
                bloque.y -= 10;
            });
        break;
        case 'ArrowDown':
            newPP = {x:0 , y:paletaUno[paletaUno.length - 1].y + 10};
            paletaUno.push(newPP);
            paletaUno.shift();
        break;
        case 'w':
            newPP = {x:390 , y:paletaDos[0].y - 10};
            paletaDos.unshift(newPP);
            paletaDos.pop();
        break;
        case 's':
            newPP = {x:390 , y:paletaDos[paletaDos.length - 1].y + 10};
            paletaDos.push(newPP);
            paletaDos.shift();
        break;
    }
})

const moverPaletaDos = () => {
    let velocidadPaletaDos;
    let flag = false;

    switch(direccionPelota) {
        case 'leftTop':
        case 'rightTop':

            velocidadPaletaDos = -getRandomNumber(0.10, 1.1);
            flag = true;
            break;
        case 'rightMiddleTop':
        case 'leftMiddleTop':
            velocidadPaletaDos = -getRandomNumber(0.10, 0.80);
            flag = true;
        break;

        case 'rightDown':
        case 'leftDown':
            velocidadPaletaDos = getRandomNumber(0.25, 1.1);
            flag = true;
        break;
        case 'rightMiddleDown':
        case 'leftMiddleDown':
            velocidadPaletaDos = getRandomNumber(0.25, 0.80);
            flag = true;
        break;

    }

    if(flag) {
        paletaDos.forEach((bloque) => {
            bloque.y += velocidadPaletaDos;
        });
    }
};






function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


const animacion = ()=>{

    init();

    requestAnimationFrame(animacion);
}


requestAnimationFrame(animacion);





