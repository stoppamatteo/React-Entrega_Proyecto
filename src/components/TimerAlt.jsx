// Importamos la funciones de React que vamos a utilizar
import { useContext, useEffect, useRef } from "react"

// Importamos los contextos que vamos a utilizar
import { GlobalStateInfo, GlobalTimeInfo, GlobalTimerControl, GlobalNavigatorInfo } from "./Contestos"

//Importamos las funciones JavaScript que vamos a utilizar
import { actualizaTiempo } from "./persistencia";


// Componente de la sección del temporizador
const Timer = () => {
    const [fase] = useContext(GlobalStateInfo);                                 // Recuperamos el estado de la Fase de juego
    const [timeData,setTimeData] = useContext(GlobalTimeInfo);                  // Recuperamos el estado del tiempo del temporizador
    const [comandoTimer] = useContext(GlobalTimerControl);                      // Recuperamos el estado del control del temporizador
    const [navInfo] = useContext(GlobalNavigatorInfo);                          // Recuperamos la información de la sección de navegación
    //console.log(fase,setFase,timeData,setTimeData,comandoTimer,setComandoTimer);
    const startTime = useRef(null);                                             // Creamos una referencia para el instante inicial
    const ahora = useRef(null);                                                 // Creamos una referencia para el instante actual
    //console.log(startTime.current);
    //console.log(Date.now());

    const runCounter = useRef(null);                                            // Creamos una referencia para la función de setInterval, de forma que no se cree una nueva en cada rendering

    // Función que convierte el array del tiempo [h,m,s] en string
    // Admite como entrada el array de tiempo y devuelve un string en formato HH:MM:SS
    const time2String = (timeData) => {
        //console.log("ejecutando time2string");
        //console.log(timeData,timeData.map(e=>e<10?"0"+e:`${e}`).join(":"));
        return timeData.map(e=>e<10?"0"+e:`${e}`).join(":");                    // Evalua cada elemento, si es < 10 añade un "0" delante y los junta con ":"
    }

    // Función que convierte el array del tiempo [h,m,s] en segundos
    // Admite como entrada el array de tiempo y devuelve el número de segundos
    const timeData2sec = (timeData) => {
        return timeData[0]*3600+timeData[1]*60+timeData[2];                     // Multiplicamos las horas por 3600, los minutos por 60, los segundos por uno y sumamos
    }

    // Función que convierte los millisegundos en el array de tiempo [h,m,s]
    // Adminte como entrada al número de milisegundos y devuelve el array de tiempo
    const millisec2timedata = (millisec) => {
        let array = [0,0,0];                                                    // Inicializamos el array
        let sec = Math.floor(millisec/1000);                                    // Calculamos los segundos a partir de los milisegundos
        array[2]=sec%60;                                                        // Calculamos los segundos
        array[1]=((sec-array[2])/60)%60;                                        // Calculamos los minutos
        array[0]=(sec-array[1]*60-array[2])/3600;                               // Calculamos las horas
        return array;
    }

    // Función que arranca el temporizador
    const iniciar = () => {
        //console.log("Lanzando iniciar()");
        //console.log(runCounter.current);
        startTime.current = (Date.now() - timeData2sec(navInfo.current[0])*1000);// Calculamos el tiempo inicial restando al tiempo actual el valor de navInfo[0] por si ha sido actualizado por la sección de navegación
        ahora.current = Date.now();                                              // Calculamos el tiempo actual
        //console.log(ahora,startTime,Date.now());

        if (runCounter.current==null){                                          // Si todavía no existe la función setInterval
            //console.log("creando setinterval");
            clearInterval(runCounter.current);                                      // Limpiamos runCounter (No necesario, pero útil por si hubiera algún fallo)
            runCounter.current = setInterval(() => {                                // Creamos setInterval
              ahora.current = Date.now();                                           // Calculamos el tiempo actual
              //console.log(ahora.current, typeof(ahora.current));
              //console.log(parseInt(ahora.current)-parseInt(startTime.current));
              let newTimeData = millisec2timedata(ahora.current-startTime.current); // Calculamos el tiempo pasado desde el tiempo inicial
              //console.log(newTimeData)
              {setTimeData(newTimeData)}                                            // Actualizamos el estado del tiempo
              let displayElement=document.getElementById("tiempoTimer");            // Seleccionamos el elemento HTML que enseña el tiempo
              //console.log(displayElement,time2String(timeData),timeData,newTimeData);
              displayElement.textContent=time2String(newTimeData);                  // Actualizamos su contenido con el nuevo tiempo transcurrido
              actualizaTiempo(displayElement);                                      // Actualizamos el tiempo transcurrido en los datos del juego guardado, si hay
            }, 500);                                                                // Vuelve a lanzar esta función cada 500 milisegundos
        }
    }

    // Función que para el temporizador
    const pausar = () => {
        //console.log(runCounter.current)
        if (runCounter.current!=null){                                          // Si runCounter no es null
            clearInterval(runCounter.current);                                      // Limpia setInterval    
            runCounter.current=null;                                                // Fuerza runCounter a null
        }
    }

    // Función que para el temporizador y lo reinicia a cero
    const reiniciar = () => {
        pausar();                                                               // Pausamos el temporizador
        if (timeData!=[0,0,0]){                                                 // Si timeData tiene un valor distinto distinto a cero
            {setTimeData([0,0,0])}                                                  // Restablecemos el estado a cero
        }
        let displayElement=document.getElementById("tiempoTimer");              // Seleccionamos el elemento HTML que enseña el tiempo 
        displayElement.textContent="00:00:00";                                  // Actualizamos su valor a cero
        
    }

    // Hook que sigue las varizaciones de comandoTimer y fase para iniciar, parar y reiniciar el temporizador
    useEffect(() => {
        if (fase==="preparar") {                                                // Si la fase es "preparar"
            setTimeData([...navInfo.current[0]]);                                   // Se actualiza el tiempo al valor establecido en la sección de navegación
            //console.log(timeData, navInfo.current[0]);
        }
        if (comandoTimer=="iniciar" && fase=="jugar") {                         // Si comandoTimer es "iniciar" y la fase es "jugar" 
            iniciar()                                                               // Arrancamos el temporizador
        } else if (comandoTimer=="pausar") {                                    // Si comandoTimer es "pausar"
            pausar()                                                                // Paramos el temporizador
        } else {                                                                // Alternativamente
            reiniciar()                                                             // Lo reiniciamos
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comandoTimer,fase])
    

    if ((fase=="jugar")||(fase=="preparar")) {                                  // Si la fase es preparar o jugar, enseñamos el temporizador
        return (
            <section id="timer" className="text-center">
                <h3 className="font-semibold text-xl">Tiempo total:</h3>
                <p id="tiempoTimer" className="text-2xl">00:00:00</p>
            </section>
        )
    } else {                                                                    // En otros casos, lo escondemos
        return (
            <section id="timer" className="hidden">
                <h3 className="font-semibold">Tiempo total:</h3>
                <p id="tiempoTimer">00:00:00</p>
            </section>
        )
    }
    
}

export default Timer