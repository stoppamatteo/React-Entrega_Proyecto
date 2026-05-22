// En este módulo se encuentran todas las funciones relacionadas con el tablero


// Importamos el objeto sudoku con los Sudokus predefinidos
import { sudokus } from "./data.js";


// Función que transforma el tablero actual en 2 arrays sudoku con la estructura de array de 9 arrays de valores de cuadrícula.
// Admite como entrada un HTMLCollection con los elementos del tablero y devuelve el array de valores iniciales fijo y el de los introducidos por el usuario
function tablero2Array(elementosCuadricula=document.querySelectorAll("[data-mark]")){
    let arrayElementos=[...elementosCuadricula];                        //Transformamos el HTMLCollection en array (un array de 81 elementos)
    let arrayValores=arrayElementos.map(elem=>parseInt(elem.value)||0); //Extramos los valores de los elementos
    let arrayJuego=[];                                                  //Declaramos e inicializamos el array de valores iniciales
    let arrayUsuario=[];                                                //Declaramos e inicializamos el array de valores del usuario
    for (let cu = 0; cu < 9; cu++){                                     //Iteramos entre 0 y 8 (índice de cuadrículas)
        let arrayCuadrante =[];
        let arrayCuadranteUsuario =[];
        let indiceInicial = cu*9;                                       //Calculamos el índice inicial
        for (let i = indiceInicial; i < indiceInicial + 9; i++){        //Por cada elemento entre el índice inicial y el final
            if (arrayElementos[i].dataset.mark=="0"){                   //Si el atributo data-mark es igual a cero "0" (celda editable, pues valor del usuario)
                arrayCuadrante.push(0);                                     //Añadimmos un 0 al array de la cuadrícula del array de valores iniciales 
                arrayCuadranteUsuario.push(arrayValores[i]);                //Añadimmos el valor al array de la cuadrícula del array de valores del usuario
            } else {                                                    //En caso contrario (celda no editable, pues valor inicial)
                arrayCuadrante.push(arrayValores[i]);                       //Añadimmos el valor al array de la cuadrícula del array de valores iniciales
                arrayCuadranteUsuario.push(0);                              //Añadimmos un 0 al array de la cuadrícula del array de valores del usuario
            }
        }
        arrayJuego.push(arrayCuadrante);                            //Añadimos el array al array total de valores iniciales
        arrayUsuario.push(arrayCuadranteUsuario);                   //Añadimos el array al array total de valores introducidos por el usuario
    }
    return [arrayJuego, arrayUsuario];                          //Devolvemos los dos arrays
}


// Función para elegir aleatoriamente un sudoku desde el objeto sudokus en base al nivel de dificultad
function sudokuAleatorio(dificultad){
    let indiceAleatorio = Math.floor(Math.random() * 10); //De 0 a 9
    return sudokus[dificultad][indiceAleatorio];
}

// Exportamos todas las funciones del módulo
export {tablero2Array, sudokuAleatorio}; 