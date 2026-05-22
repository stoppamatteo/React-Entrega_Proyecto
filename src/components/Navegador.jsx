// Importamos los componentes que vamos a utilizar
import BotonExtend from "./BotonExtend"

// Importamos la funciones de React que vamos a utilizar
import { useContext } from "react"

// Importamos los contextos que vamos a utilizar
import { GlobalStateInfo, GlobalNavigatorInfo } from "./Contestos"

//Importamos las funciones JavaScript que vamos a utilizar
import { checkPartida, recargaTableroReact } from "./persistencia"
import { sudokuAleatorio } from "./tablero"


// Componente Sección de navegación
 const Navegador = () => {

    const [fase,setFase] = useContext(GlobalStateInfo)                          // Recuperamos fase y setFase desde el contexto de Fase de juego
    const [navInfo] = useContext(GlobalNavigatorInfo)                           // Recuperamos navInfo desde el contexto de Información de navegación
    //console.log(navInfo.current);

    // Función que lanza la introdución de un sudoku personalizado
    const cargarSdk = () => {
      //console.log("Cargando Sudoku")
		  {setFase("cargar")}                                                       // Cambia el estado de Fase de juego a "cargar"
	  }

    // Función que lanza un sudoku perdeterminado con el nivel de dificultad elegido
    const jugarSdk = () => {
      //console.log("Jugando al sudoku")
      let seleccion = document.getElementById("selector");                      // Seleccionamos el elemento HTML del selector del nivel de dificultad
      //console.log(seleccion);
      if(seleccion.value){                                                      // Si se ha elegido un nivel de dificultad
        //console.log(seleccion.value)
        navInfo.current = [[0,0,0], sudokuAleatorio(seleccion.value), []];        // Se modifica navInfo con un tiempo a cero, el sudoku aleatorio como valores iniciales del sudoku y un array vacío como valores introducidos por el usuario
        //console.log(sudokuAleatorio(seleccion.value));
        {setFase("preparar")};                                                    // Cambiamo el estado de Fase de juego a "preparar"
        //console.log(navInfo.current)
      } else {                                                                  // En caso de no haber elegido un nivel de dificultad
        alert("Se necesita configurar un nivel de dificultad desde el selector"); //Lanzamos una alerta
      }
    }

    // Función que lanza el proceso para reanudar un sudoku guardado en local storage
    const reanudarSdk = () => {
      //console.log("reanudando el juego guardado")
      if (fase==="inicio") {                                                    // Si el estado de la FAse de juego es "inicio"
          if (checkPartida()) {                                                   // Si existe un partido guardado
              let arraysDatos = recargaTableroReact();                              // Se recupera la información guardada organizándola en array
              navInfo.current = [arraysDatos[0], arraysDatos[1], arraysDatos[2]];   // Se pasa la información extraída a navInfo
              setFase("preparar");                                                  // Se cambia el estado de la Fase de juego a "preparar"
          } else {                                                                // Si no existe un partido guardado
            alert("Esto es muy lamentable!!! Este mensaje no debería salir en ningún caso");//Se lanza una alerta (opción, a priori, imposible. Si no existe un partido en memoria no saldrá el botón que lanza esta función)
          }
      }
    }


    if (fase=="inicio") {                                                       // Sólo si la Fase de juego es "inicio" se enseña el menú de navegación
      return (
          <section id="seccionInicio">
            <h2 className="text-2xl font-bold text-bold text-center pt-5">¿Como empezamos?</h2>
            <nav className="flex justify-around mt-5">
              <BotonExtend id="cargar" texto="Carga tu sudoku" accion={cargarSdk} ensena={true} />                        {/* Botón de cargar un Sudoku personalizado */}
              <article id="nuevoSudoku">
                <BotonExtend id="nuevo" texto="Empieza uno nuevo" accion={jugarSdk} ensena={true} />                      {/* Botón de empezar un nuevo juego */}
                <label htmlFor="selector" className="mx-1">Nivel:</label>
                <select name="selector" id="selector" required className="bg-gray-300 py-0.5 px-4 border rounded-lg">   {/* Selector del nivel de dificultad*/}
                  <option value="">-</option>
                  <option value="easy">Fácil</option>
                  <option value="medium">Medio</option>
                  <option value="hard">Difícil</option>
                </select>
              </article>
              <BotonExtend id="restaurar" texto="Reanudar" accion={reanudarSdk} ensena={checkPartida()} />                {/* Botón de reanudar el juego. Sólo se enseña si existe un juego guardado en memoria */}
            </nav>
          </section>
      )
    } else {                                                                    // Si la Fase de juego NO es "inicio", NO se enseña el menú de navegación
      return (
        <section id="seccionInicio" className="hidden"></section>
      )
    }
 }

 export default Navegador