// Importamos los componentes que vamos a utilizar
import CuadriculaJuego from "./CuadriculaJuego"
import Timer from "./TimerAlt"


// Componente de la sección tablero de juego
const Tablero = () => {

    return (
        <section id="tablero">
            <Timer />
            <CuadriculaJuego />
        </section>
        
    )
}

export default Tablero