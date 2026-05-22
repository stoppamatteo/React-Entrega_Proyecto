// Importamos los componentes que vamos a utilizar
import Cuadrante from "./Cuadrante";

// Importamos la funciones de React que vamos a utilizar
import { useContext,useState, /*useCallback,*/ useEffect } from "react";

// Importamos los contextos que vamos a utilizar
import { GlobalStateInfo, GlobalTimeInfo, GlobalTimerControl, GlobalNavigatorInfo, SudokuUsuarioContext } from "./Contestos";

// Importamos los estilos CSS que vamos a utilizar
import './cuadriculaJuego.css';


// Componente de la sección de la cuadrícula de juego
const CuadriculaJuego = () => {

    const [sudokuInicial,setSudokuInicial] = useState([]);                          // Creamos el estado sudokuInicial
    const [sudokuUsuario,setSudokuUsuario] = useState([]);                          // Creamos el estado sudokuUsuario

    const [fase] = useContext(GlobalStateInfo);                                     // Recuperamos el valor de Fase de juego
    // eslint-disable-next-line no-unused-vars
    const [timeData,setTimeData] = useContext(GlobalTimeInfo);                      // Recuperamos el valor del tiempo
    const [navInfo] = useContext(GlobalNavigatorInfo);                              // Recuperamos los valores almacenados en navInfo
    //console.log(fase,setFase,timeData,setTimeData,navInfo);

    // Hook que sigue las variaciones de navInfo y fase para actualizar los estados de tiempo y sudokus
    useEffect(()=>{
        if (["inicio", "cargar", "preparar", "jugar", "resolver"].includes(fase)) { // Si fase está entre los valores del array
            {setTimeData(navInfo.current[0])};                                          // Se pasa el valor de tiempo de navInfo al estado correspondieente
            {setSudokuInicial(navInfo.current[1])};                                     // Se pasa el sudoku inicial de navInfo al estado correspondieente
            {setSudokuUsuario(navInfo.current[2])};                                     // Se pasa el sudoku usuario de navInfo al estado correspondieente
            //console.log("Este mensaje está dentro de useEffect");
            //console.log(navInfo.current[1],navInfo.current[2]);
            //console.log(sudokuInicial,sudokuUsuario);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[navInfo.current,fase]);

    /*useCallback(()=>{
        {setTimeData(navInfo.current[0])};
        {setSudokuInicial(navInfo.current[1])};
        {setSudokuUsuario(navInfo.current[2])};
        console.log("Este mensaje está dentro de useCallback");
        console.log(navInfo.current[1],navInfo.current[2]);
        console.log(sudokuInicial,sudokuUsuario);
    },[navInfo.current]);*/


    if (["cargar", "preparar", "jugar", "resolver"].includes(fase)) {               // Si fase está entre los valores del array se enseña la cuadrícula de juego
        return (
            <SudokuUsuarioContext value={[sudokuUsuario,setSudokuUsuario]}>
                <div id="cuadriculaJuego" className="border-box border-2 border-solid border-black max-w-[600px] mx-auto my-5 grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,1fr)]">
                    <Cuadrante cuad={1} valInicial={sudokuInicial[0]} valUsuario={sudokuUsuario[0]} />
                    <Cuadrante cuad={2} valInicial={sudokuInicial[1]} valUsuario={sudokuUsuario[1]} />
                    <Cuadrante cuad={3} valInicial={sudokuInicial[2]} valUsuario={sudokuUsuario[2]} />
                    <Cuadrante cuad={4} valInicial={sudokuInicial[3]} valUsuario={sudokuUsuario[3]} />
                    <Cuadrante cuad={5} valInicial={sudokuInicial[4]} valUsuario={sudokuUsuario[4]} />
                    <Cuadrante cuad={6} valInicial={sudokuInicial[5]} valUsuario={sudokuUsuario[5]} />
                    <Cuadrante cuad={7} valInicial={sudokuInicial[6]} valUsuario={sudokuUsuario[6]} />
                    <Cuadrante cuad={8} valInicial={sudokuInicial[7]} valUsuario={sudokuUsuario[7]} />
                    <Cuadrante cuad={9} valInicial={sudokuInicial[8]} valUsuario={sudokuUsuario[8]} />
                </div>
            </SudokuUsuarioContext>
        )
    } else {                                                                        // En caso contrario, se esconde
        return (
            <div id="cuadriculaJuego" className="hidden"></div>
        )
    }
    
}

export default CuadriculaJuego