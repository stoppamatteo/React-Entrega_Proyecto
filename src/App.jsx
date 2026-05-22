// Importamos los componentes que vamos a utilizar
import Navegador from "./components/Navegador"
import Title from "./components/Title"
import Mensaje from "./components/Mensaje"
import Tablero from "./components/Tablero.jsx"
import Controles from "./components/Controles"

// Importamos la funciones de React que vamos a utilizar
import { useState,useRef } from "react"

// Importamos los contextos que vamos a utilizar
import { GlobalStateInfo, GlobalNavigatorInfo, GlobalTimeInfo, GlobalTimerControl } from "./components/Contestos.jsx"


// Funición Principal
function App() {

	const [fase,setFase] = useState("inicio");					/* Fase del juego, es un string y puede tener uno de los siguientes valores: {"inicio", "cargar", "preparar", "jugar", "resolver", "resultados"} */
	const [timeData,setTimeData] = useState([0,0,0]); 			/* Tiempo de juego, es un array que contiene horas, minutos y segundos de juego */
	const [comandoTimer,setComandoTimer] = useState("iniciar") 	/* Control del temporizador. Es un string y puede tener uno de los siguientes valores {"iniciar", "pausar", "resetear"} */
	const navInfo = useRef([[0,0,0],[],[]]) 					/* Informaciones de la sección de navegación. Es un array de 3 arrays uno para el tiempo y los otros dos para los valores iniciales y los introducidos por el usuario: [[h,m,s], SudokuInicial, SudokuUsuario] */

	
	return (
		<GlobalStateInfo value={[fase,setFase]}>								{/*Pasamos el contexto de Fase de juego con sus parámetros*/}
			<GlobalTimeInfo value={[timeData,setTimeData]}>						{/*Pasamos el contexto de Tiempo de juego con sus parámetros*/}
				<GlobalTimerControl value={[comandoTimer,setComandoTimer]}>		{/*Pasamos el contexto de Control del temporizador con sus parámetros*/}
					<GlobalNavigatorInfo value={[navInfo]}>						{/*Pasamos el contexto de Informaciones de la sección de navegación con sus parámetros*/}
						<div className="w-full min-h-screen bg-sky-200">
							<Title title="Resolución de Sudoku" />				{/* Sección del título */}
							<Navegador />										{/* Sección de navegación */}
							<Mensaje />											{/* Sección del mensaje */}
							<Tablero />											{/* Sección del tablero de juego */}
							<Controles />										{/* Sección de los controles de juego */}
						</div>
					</GlobalNavigatorInfo>
				</GlobalTimerControl>
			</GlobalTimeInfo>
		</GlobalStateInfo>
	)
}

export default App
