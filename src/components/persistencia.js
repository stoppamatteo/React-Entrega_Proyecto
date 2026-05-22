// En este módulo se encuentran todas las funciones relacionadas con la persistencia en memoria

// [X]
//Importamos las funciones que se necesitan desde el módulo tablero.js
import { tablero2Array } from "./tablero.js";


// Función que guarda el estado del tiempo y del tablero en localStorage
// Admite como entrada al elemento tablero
function guardaTablero(elementoTablero=document.getElementById("tablero")){
    let tiempo = elementoTablero.querySelector("#timer>p");                 //Selecciona el elemento que enseña el tiempo
    let arrayElementos = elementoTablero.querySelectorAll("[data-cuad]");   //Selecciona todos los elementos del tablero de juego
    let arraysTablero = tablero2Array(arrayElementos)                       //Transforma el tablero actual en los arrays de elementos iniciales y usuario
    let datosJuego=JSON.stringify([tiempo.textContent, arraysTablero]);     //Convierte lo anterior a string
    localStorage.setItem("sudokuGuardado",datosJuego);                      //Guarda en localStorage
}

// Función que recupera los datos de memoria y los escribe en el juego 
// Devuelve un array con los array de tirmpo, sudoku inicial y sudoku usuario
function recargaTableroReact(){
    if(localStorage.getItem("sudokuGuardado")) {                            //Si en localStorage se encuentra la clave "sudokuGuardado"
        let datosJuego = JSON.parse(localStorage.getItem("sudokuGuardado"));    //Recupera los datos de memoria y los devuelve a su formato original
        let timing  = datosJuego[0];                                    //Escribe el tiempo en el elemento del juego correspondiente
        let arrayTirempo = [parseInt(timing.split(":")[0]),parseInt(timing.split(":")[1]),parseInt(timing.split(":")[2])];  //Transforma el tiempo en array
        let arraysTablero = datosJuego[1];                                      //Recupera los arrays de valores iniciales y del usuario
        return [arrayTirempo, arraysTablero[0], arraysTablero[1]];   //Devuelve los datos
    }
}

// Función que actualiza el tiempo en los datos guardados en localStorage
// Admite como parámetro de entrada el elemento HTML que enseña el tiempo transcurrido
function actualizaTiempo(reloj = document.getElementById("tiempoTimer")){
    if (localStorage.getItem("sudokuGuardado")) {                           //Si hay un juego guardado
        let datosJuego = JSON.parse(localStorage.getItem("sudokuGuardado"));    //Recupera los datos de memoria y los devuelve a su formato original
        datosJuego[0]=reloj.textContent;                                        //Actualiza el tiempo
        localStorage.setItem("sudokuGuardado",JSON.stringify(datosJuego));      //Guardar los datos actualizados en localStorage 
    }
}

// Función que comprueba si hay un juego guardado en memoria y devuelve true si lo encuentra y false en caso de no encontrarlo
function checkPartida() {
    if(localStorage.getItem("sudokuGuardado")) {
        //console.log("hay datos guardados");
        return true;
    } else {
        //console.log("NO hay datos guardados");
        return false;
    }
}

// Función que guarda los tiempos finales del los juegos anteriores en localStorage
// Admite como parámetro de entrada el elemento que contiene el tiempo de juego
function guardaTiempos(reloj = document.getElementById("tiempoTimer")){
    if (localStorage.getItem("tiemposJuego")){                          //Si ya existe en memoria una clave "tiemposJuego"
        let tiempos = JSON.parse(localStorage.getItem("tiemposJuego"));     //La recupera y la convierte en su formato original 
        tiempos.push(reloj.textContent);                                    //Añade el tiempo actuall al array de tiempos totales
        localStorage.setItem("tiemposJuego",JSON.stringify(tiempos));       //Vuelve a convertir el array en stringa y guardarlo en memoria
    } else {                                                            //Si no
        let tiempos = [reloj.textContent];                                  //Crea un array con el tiempo actual
        localStorage.setItem("tiemposJuego",JSON.stringify(tiempos));       //Convierte el array en strringa y lo guarda en memoria
    }
}

// Función que recupera los tiempos finales de memoria y si existen, devuelve el array de los tiempos, si no devuelve un array vacío
function recargaTiempos(){
    if (localStorage.getItem("tiemposJuego")){                  //Si existe en localStorage una clave "tiemposJuego"
        return JSON.parse(localStorage.getItem("tiemposJuego"));    //Recupera su valor, lo convierte a su formato original y lo devuelve
    } else {                                                    //Si no
        return [];                                                  //Devuelve un array vacío
    }
}

// Función que enseña los tiempos finales de todos los juegos, almacenados en localStorage 
// Admite como parámetros de entrada el array de tiempos finales y el elemento de la página donde se visualizan los mensajes
function muestraTiempos(tiempos, textMensaje = document.getElementById("mensaje")){
    if (tiempos){                                                   //Si el array de los tiempos no es vacío
        textMensaje.classList.remove("hidden");                         //Enseña el elemento de los mensajes
        textMensaje.textContent="Tiempos de juego:"                     //Cambia su contenido
        for (let i = tiempos.length - 1; i >= 0; i--){                  //Iteramos por todo el array de tiempos, al revés (para enseñar los tiempos finales de los juegos, del más reciente al más antiguo)
            let nuevoElemento = document.createElement("p");                //Creamos un nuevo elemento p
            nuevoElemento.textContent = `Juego ${i + 1}: ${tiempos[i]}`;    //Introducimos en el nuevo elemento el númeo de juego y el tiempo final
            textMensaje.append(nuevoElemento);                              //Colgamos el nuevo elemento al de mensajes
        }
    }
}

// Exportamos todas las funciones del módulo
export {guardaTablero, recargaTableroReact, checkPartida, muestraTiempos, guardaTiempos, recargaTiempos, actualizaTiempo};