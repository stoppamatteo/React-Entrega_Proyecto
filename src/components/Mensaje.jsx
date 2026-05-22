// Importamos la funciones de React que vamos a utilizar
import { useContext, useEffect } from "react"

// Importamos los contextos que vamos a utilizar
import {GlobalStateInfo} from "./Contestos"

//Importamos las funciones JavaScript que vamos a utilizar
import { recargaTiempos,muestraTiempos } from "./persistencia";

// Componente Sección del mensaje
const Mensaje = () => {
    const [fase] = useContext(GlobalStateInfo);             // Recuperamos el estado de la Fase de juego del contexto

    // Hook que detecta los cambios en el estado de la Fase de juego 
    // y si ésta ha pasado a "resultados", enseña los tiempos de todos los juegos resueltos.
    useEffect(()=>{
        if (fase==="resultados") {
            muestraTiempos(recargaTiempos());
        }
    },[fase]);

    switch (fase) {                                         // Según el valor de fase enseña un texto distinto
        case "cargar":
            return (
                <p id="mensaje" className="text-center" >Inserta tu sudoku:</p>
            );
        case "resultados":
            return (
                <p id="mensaje" className="text-2xl text-center pt-5" >Todos los tiempos:</p>
            );
        default:
            return (
                <p className="hidden"></p>
            );
    }
}

export default Mensaje