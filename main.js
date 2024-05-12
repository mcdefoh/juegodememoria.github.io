//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = timer;
let tiempoRegresivoId = null;
let winAudio = new Audio('./audio/win.mp3');
let loseAudio = new Audio('./audio/lose.mp3');
let rightAudio = new Audio('./audio/right.mp3');
let clickAudio = new Audio('./audio/click.mp3');
let wrongAudio = new Audio('./audio/wrong.mp3');
let cancionAudio = new Audio('./audio/cancion')


//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-restante')
//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros)

//Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer}segundos`
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000)
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`;;
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas ++;
    
    if(tarjetasDestapadas == 1){
        //Mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;
        clickAudio.play();

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        //Mostrar segundo numero
        tarjeta2 = document.getElementById(id)
        segundoResultado = numeros[id]
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;
        clickAudio.play();
        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado){
            //Encerar el contador de tarjetas destapadas
            tarjetasDestapadas = 0;
            
            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            if (aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} Lo lograste compa` ;
                mostrarTiempo.innerHTML = `Bien perrin solo demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} Patadas en las nalgas`;
                winAudio.play();
            }
        }else{
            //Mostrar momentaneamente valores y volver a girar
            setTimeout(()=>{
            tarjeta1.innerHTML = '';
            tarjeta2.innerHTML = '';
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
            wrongAudio.play();
            },800);       
        }
    }
}