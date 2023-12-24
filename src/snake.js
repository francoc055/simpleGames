const canvas = document.getElementById('snakeCanvas');
const context = canvas.getContext('2d');
const $score = document.getElementById('score');
let puntos = 1;
const boxSize = 20;
let snake = [{x: 10, y: 10}];
let comida = {x:15, y: 15};

let nextDirection = 'rigth';
let beforeDirection = 'rigth';

const imagen = new Image();
imagen.src = './../assets/manzana.png';
imagen.width = 20;
imagen.height = 20;


const pintar = ()=>{
   
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    for (let y = 0; y < canvas.height; y += boxSize) {

        for (let x = 0; x < canvas.width; x += boxSize) {
            // Calcular el índice del cuadrado en la cuadrícula
            const column = Math.floor(x / boxSize);
            const row = Math.floor(y / boxSize);
            // Asignar un color diferente a cada cuadrado
            context.fillStyle = (column + row) % 2 === 0 ? 'lightgrey' : 'rgba(200, 200, 200, 0.5)';
            // Dibujar el cuadrado
            context.fillRect(x, y, boxSize, boxSize);
        }
    }

    
    context.fillStyle = 'green';
    for(let i = 0; i < snake.length; i++)
    {
        context.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
    }

    context.drawImage(imagen,comida.x * boxSize, comida.y * boxSize, boxSize, boxSize);
}



document.addEventListener('keydown', function(event) {

    switch (event.key) {
        case 'ArrowUp':
            nextDirection = 'up';
            break;
        case 'ArrowDown':
            nextDirection = 'down';
            break;
        case 'ArrowLeft':
            nextDirection = 'left';
            break;
        case 'ArrowRight':
            nextDirection = 'right';
            break;
    }
});

const mover = () => {

    if((beforeDirection === 'up' && nextDirection === 'down') ||
    (beforeDirection === 'down' && nextDirection === 'up') ||
    (beforeDirection === 'left' && nextDirection === 'right') ||
    (beforeDirection === 'right' && nextDirection === 'left'))
    {
        nextDirection = beforeDirection;
    }
    beforeDirection = nextDirection;

    const newHead = { x: snake[0].x, y: snake[0].y };
    switch(nextDirection)
    {
        case 'up':
            newHead.y -= 1;
        break;
        case 'right':
            newHead.x += 1;
        break;
        case 'down':
            newHead.y += 1;
        break;
        case 'left':
            newHead.x -= 1;
        break;

    }

    const roundedX = Math.round(newHead.x);
    const roundedY = Math.round(newHead.y);



        
    if (roundedX >= canvas.width / boxSize || roundedX < 0 ||
        roundedY < 0 || roundedY >= canvas.height / boxSize ) {
            alert('Game Over!');
            resetGame();
            return;
    }

    if(snake.length !== 1)
    {
        if(VerificarColision(newHead))
        {
            alert('game over');
            resetGame();
            return;
        }
    }

    

    if (roundedX === comida.x && roundedY === comida.y) {
        $score.textContent = `score: ${puntos++}`;
        snake.unshift(newHead);
        comida = generarComida();
    } else {
        snake.pop();
        snake.unshift(newHead);
    }



};

function VerificarColision(newHead) {
    // Verificar si la nueva cabeza se cruza con el cuerpo de la serpiente
    for (let i = 0; i < snake.length; i++) {
        if (Math.round(newHead.x) === snake[i].x && Math.round(newHead.y) === snake[i].y) {
            return true; // Se cruza consigo misma
        }
    }
    return false;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

const generarComida = () => {
    return { x: getRandomNumber(1, 19), y: getRandomNumber(1, 19) };
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    nextDirection = 'right';
    beforeDirection = 'right';
    comida = generarComida();
    juegoEnPausa = true;
    $score.textContent = 'score: 0';
    puntos = 1;
}

const animacion = () => {
    if (juegoEnPausa) {
        mover();
        pintar();
        setTimeout(function() {
            requestAnimationFrame(animacion);
        }, 80);
    }
    
};


const animationId = requestAnimationFrame(animacion);
let juegoEnPausa = true;
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {

        if(juegoEnPausa)
        {
            juegoEnPausa = false;
        }
        else
        {
            juegoEnPausa = true;
            const animationId = requestAnimationFrame(animacion);
        }
        

        // Si el juego está en pausa, detén la animación
        if (!juegoEnPausa) {
            cancelAnimationFrame(animationId);
        }
        
    }
});










