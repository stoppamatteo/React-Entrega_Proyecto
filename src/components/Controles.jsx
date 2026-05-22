// Importamos los componentes que vamos a utilizar
import BotonExtend from "./BotonExtend"

// Importamos la funciones de React que vamos a utilizar
import { useContext } from "react"

// Importamos los contextos que vamos a utilizar
import { GlobalStateInfo, GlobalTimeInfo, GlobalTimerControl, GlobalNavigatorInfo } from "./Contestos"

//Importamos las funciones JavaScript que vamos a utilizar
import {validaTablero} from './validaciones'
import {solucionSudoku} from './juego'
import {aplanaArray,restableceArray2d} from './utilidades'
import {tablero2Array} from './tablero' 
import { checkPartida } from "./persistencia"


// Componente de la sección de controles
const Controles = () => {
    const [fase,setFase] = useContext(GlobalStateInfo);                     // Recuperamos fase y setFase desde el contexto de Fase de juego
    const [timeData] = useContext(GlobalTimeInfo);                          // Recuperamos el estado del tiempo del temporizador
    // eslint-disable-next-line no-unused-vars
    const [comandoTimer,setComandoTimer] = useContext(GlobalTimerControl);  // Recuperamos el estado del control del temporizador
    const [navInfo] = useContext(GlobalNavigatorInfo);                      // Recuperamos navInfo desde el contexto de Información de navegación
    //console.log(fase,setFase,timeData,setTimeData,comandoTimer,setComandoTimer);

    // Función que soluciona el sudoku, si éste tiene solución 
    const resolver = () => {
        let solucion = solucionSudoku([...document.querySelectorAll("[data-mark")],aplanaArray(tablero2Array()[0])); // Se calcula el array de la posible solución del sudoku, si existe
        //console.log(solucion, solucion[0], solucion[1], restableceArray2d([...solucion[1]]));
        if (solucion[0]) {                                                  // Si el sudoku tiene solución
            setComandoTimer("pausar");                                          // Se actualiza el estado del comando del temporizador, para detenerlo
            navInfo.current[0]=timeData;                                        // Se almacena el valor de timeData en navInfo
            navInfo.current[2]=restableceArray2d([...solucion[1]]);             // Se almacena la solución del sudoku en el apartado del array de usuario de navInfo 
            //console.log(restableceArray2d([...solucion[1]]));
            if (checkPartida()) {                                               // Si existe un juego guardado (éste mismo juego)
                localStorage.removeItem("sudokuGuardado");                           //Se elimina
            };
            setFase("resolver");                                                // Se actualiza el estado de Fase de juego a "resolver"
        } else {                                                            // Si el sudoku no tiene solución, se lanza una alerta
            alert('El sudoku no tiene solución');
        }
        
    }

    // Función que valida el tablero con el sudoku introducido por el usuario para comprobar si tiene solución o no
    const validar = () => {
        alert(`validando tablero...\nEata operación puede tardar hasta unos minutos`) 
        if (validaTablero()&&solucionSudoku([...document.querySelectorAll("[data-mark")],aplanaArray(tablero2Array()[1]))[0]){  // Si no hay repeticiones en líneas, columnas y cuadrantes y además el sudoku introducido tiene solución
            //console.log('validando tablero');
            navInfo.current[1]=navInfo.current[2];                                                                                  // Se copia el sudoku introducido por el usuario al sudoku inicial
            navInfo.current[2]=[];                                                                                                  // Se reinicia el sudoku de usuario a cero
            {setFase("jugar")};                                                                                                     // Se actualiza el estado de la Fase de juego a "jugar"
        } else if(!validaTablero()){                                                                                            //Si no, diferenciamos entre si el sudoku no es correcto 
            alert("El sudoku introducido no es correcto.\nPor favor, revíselo y vuela a validar!");
        } else {                                                                                                                // O si no se puede solucionar
            alert("El sudoku introducido no tiene solución");
        }
    }

    return (
        <section id="controles" className="flex justify-around">
            <BotonExtend id="validarCargar" texto="Valida & Inicia" accion={validar} ensena={fase=="cargar"} />
            <BotonExtend id="resolver" texto="Resolver" accion={resolver} ensena={fase=="jugar"} />
        </section>
    )
}

export default Controles