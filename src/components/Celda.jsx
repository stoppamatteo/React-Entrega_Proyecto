// Importamos la funciones de React que vamos a utilizar
import { useContext, useState, useEffect, useRef } from "react";

// Importamos los contextos que vamos a utilizar
import {  SudokuUsuarioContext,GlobalStateInfo,GlobalTimerControl } from "./Contestos";

//Importamos las funciones JavaScript que vamos a utilizar
import {validaLineaRTmin, validaColumnaRTmin, validaCuadriculaRTmin, compruebaJuego} from './validaciones';
import { guardaTiempos, checkPartida, guardaTablero} from "./persistencia";

// Componente celda del sudoku
const Celda = ({row,col,cuad,valorIn,valorUs}) => {

    const [valor,setValor] = useState('');                                      // Creamos el estado valor
    const [sudokuUsuario,setSudokuUsuario] = useContext(SudokuUsuarioContext);  //Recuperamos las informaciones del sudoku del contexto
    const [fase,setFase] = useContext(GlobalStateInfo);                         // Recuperamos el estado de Fase de juegos del contexto
    // eslint-disable-next-line no-unused-vars
    const [comandoTimer,setComandoTimer] = useContext(GlobalTimerControl);      // Recuperamos el estado de comandoTimer
    const cargado = useRef(false);                                              // Creamos las referencia de cargado para saber cuando termina la fase de preparación
    //console.log(comandoTimer);

    let crow = row%3||3;                // Convertimos la línea del sudoku en línea del cuadrante
    let ccol = col%3||3;                // Convertimos la columna del sudoku en columna del cuadrante
    let cpos = 3*(crow-1)+ccol;         // Calculamos la posición de la celda en al cuadrante

    // Función que maneja la entrada validando el dato introducido
    // Admite como parámetro de entrada al evento que determina el lanzamiento de la función
    // Añadida las validaciones de línea, columna y cuadrícula a la hora de introducir el número
    const insertar = (e) => {
        //console.log(e.target);
        //console.log([...document.querySelectorAll(`[data-row="${e.target.dataset.row}"]`)].filter(el=>el.dataset.col!=e.target.dataset.col));
        if (e.target.validity['patternMismatch']) {                             // Si el valor introducido no respeta al pattern del input, lanzamos un alert
            alert('el valor introducido no es correcto.\nPor favor, introduzca un número entre 1 y 9.');
        } else {                                                                // Si lo respeta procedemos
            if (validaLineaRTmin(e)) {                                              // Si el valor es único en la línea
                if (validaColumnaRTmin(e)) {                                            // Si el valor es único en la columna
                    if (validaCuadriculaRTmin(e)){                                          // Si el valor es único en el cuadrante
                        setValor(e.target.value);                                               // Actualizamos el estado de valor con el valor introducido
                    } else {                                                                // Si el valor NO es único en el cuadrante, lanzamos alerta
                        alert('el valor introducido "'+e.target.value+'" se repite en la misma cuadrícula');
                    }
                } else {                                                                // Si el valor NO es único en la columna, lanzamos alerta
                    alert('el valor introducido "'+e.target.value+'" se repite en la misma columna');
                }
            } else {                                                            // Si el valor NO es único en la línea, lanzamos alerta
                alert('el valor introducido "'+e.target.value+'" se repite en la misma línea');
            }
        }
    }

    // Función de inicialización del array de relleno del sudoku inicial y del estado de valor
    // Admite como parámetro de entrada el evento que determina el lanzamiento de la función
    const inicializar = (e) => {
        //console.log(e.target);
        setValor(e.target.value)                                                // Actualizamos el estado de valor con el valor inicial
    }

    // Función que se encarga de comprobar si el sudoku se ha llenado por completo o no, actuando en consecuencia
    const comprobaciones = () => {
        if ((fase==="jugar")) {                                 // Si la fase es "jugar"
            //console.log('Estamos jugando', compruebaJuego());
            if (compruebaJuego()) {                                 // Si el sudoku es cmpleto y correcto
                alert('¡Enhorabuena! El sudoku es correcto');           // Felicitamos al jugador
                guardaTiempos();                                        // Guardamos el tiempo de resolución en localStorage
                if (checkPartida()) {                                   // Si existe un juego guardado (el que se acaba de completar)
                    localStorage.removeItem("sudokuGuardado");              // Lo elimina de localStorage
                };
                {setComandoTimer("pausar")};                            // Actualiza el estado del control del temporizador para pararlo
                {setFase("resultados")};                                // Actualiza el estado de la fase de juego a "resultados"
            } else {                                                // Si el sudoku no es completo 
                guardaTablero();                                        // Se actualiza en localStorage
            }
        }
        if ((fase==="preparar"&&(cargado.current))) {           // Si la fase es "preparar" y el sudoku ha sido cargado
            setFase("jugar");                                       // Actualizamos el estado de la fase de juego a "jugar"
        }
    }

    // Hook que sigue las variaciones del estado de valor y actualiza las variables correspondientes
    useEffect(()=>{
        //console.log('Sudoku Usuario: ',sudokuUsuario);
        let nuevoSudokuUsuario = sudokuUsuario;                 //Crea e inicializa un nuevo array con los valores del estado de sudokuUsuario
        if (nuevoSudokuUsuario.length===0) {                    // Si el nuevo array está vacío, lo rellena (sólo se ejecutará al primer renderizado)
            for (let i=0; i<9; i++) {
                nuevoSudokuUsuario.push(['','','','','','','','','']);
            }
        }
        //console.log('Nuevo Sudoku Usuario: ',nuevoSudokuUsuario,'cuad: ',cuad, 'row: ',row, 'col: ',col);
        nuevoSudokuUsuario[cuad-1][3*(crow-1)+ccol-1]=valor;    // Actualiza la posición correspondiente del array del sudoku con el valor introducido
        //console.log("Rellenos: ",rellenoSudokuInicial.current,rellenoSudokuUsuario.current);
        //console.log("Sudokus: ", sudokuUsuario);
        setSudokuUsuario(nuevoSudokuUsuario);                   // Actualiza el estado del sudokuUsuario con el valor del nuevo array
        //console.log(sudokuUsuario);
        if ((fase==="preparar")&&(col===9)&&(row===9)){         // Si la fgase de juego es "preparar" y la columna de al celda es la 9, así como la línea de la celda (es decir es la última celda del sudoku)
            cargado.current=true;                                   // Cambiamos el valor de cargado a true
        }
        return comprobaciones();                                // Al demontar la celda, lanzamos la función de validaciones
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[valor]);

    
    
    if (valorIn) {
        //console.log('vaolor Inicial: ', valorIn);
        return (
            <input id={"celda"+cuad+cpos} type="text" pattern="[1-9]" maxLength={1} value={valorIn} data-mark={1} data-row={row} data-col={col} data-cuad={cuad} disabled onChange={inicializar} /*onChange={e=>setValor(e.target.value)}*/ className="border-box w-full aspect-square text-center text-[40px] font-medium border border-solid border-black m-0"></input>
        )
    } else if (((valor)||(valorUs))&&(!valorIn)) {
        //console.log('valores usuario: ', valor, valorUs, valor||valorUs);
        return (
            <input id={"celda"+cuad+cpos} type="text" pattern="[1-9]" maxLength={1} value={valor||valorUs} data-mark={0} data-row={row} data-col={col} data-cuad={cuad} onChange={insertar} className="border-box w-full aspect-square text-center text-[40px] font-medium border border-solid border-black m-0"></input>
        )
    } else {
        return (
            <input id={"celda"+cuad+cpos} type="text" pattern="[1-9]" maxLength={1} value={""} data-mark={0} data-row={row} data-col={col} data-cuad={cuad} onChange={insertar} className="border-box w-full aspect-square text-center text-[40px] font-medium border border-solid border-black m-0"></input>
        )
    }
    
}

export default Celda