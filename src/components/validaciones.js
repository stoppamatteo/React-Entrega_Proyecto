// En este módulo se encuentran todas las funciones de validación que se utilizan


// Función que comprueba si en el número de línea pasada por parámetro hay más de una vez el mismo número
// Devuelve true si la línea es correcta y false en caso contrario
function validaLinea(numero) {
    let resultado=true;
    let valoresLinea=[];
    let elementosLinea=document.querySelectorAll(`[data-row="${numero}"]`); //Seleccionamos todos los elementos con el número de línea proporcionado
    for (const element of elementosLinea) {                                 //y por cada uno de los elementos
        valoresLinea.push(parseInt(element.value)||0);                          //extraemos el campo valor y lo pasamos al array de valores
    }
    let valor;
    while(valoresLinea.length>1){                                           // Hasta que el array de valores tien más de un elemento
        valor=valoresLinea.shift();                                         //Le quitamos el primer elemento y nos quedamos con él
        if ((valor)&&(valoresLinea.includes(valor))) {                          //Si el valor no es nulo o en blanco y está incluido en el array de valores que quedan
            return resultado=false;                                                 //Devolvemos un false en cuanto por lo menos un valor se repite
        }
    }
    return resultado;                                                       // Si no se ha devuelto un false, devolvemos un true
}

// Función que comprueba, en tiempo real, si en el número introducido es úniclo en la línea
// Devuelve true si la línea es correcta y false en caso contrario
function validaLineaRT(e) {
    let resultado=true;
    let elementosLinea=[...document.querySelectorAll(`[data-row="${e.target.dataset.row}"]`)];  //Seleccionamos todos los elementos de la misma línea de la celda seleccionada, excluyendo al mismo elemento
    let otrosElementosLinea=elementosLinea.filter(el=>el.dataset.col!=e.target.dataset.col);    //Excluymos la celda que estamos modificando
    let elementosLineaFilt = otrosElementosLinea.filter(el=>el.value!=0);                       //Filtramos sólo los elementos con valor definido
    if (elementosLineaFilt.map(el=>el.value).includes(e.target.value)) {                        //Si el valor introducido se encuentra entre los valores de los otros elementos de la línea
        return resultado=false;                                                                     //Devolvemos un false en cuanto por lo menos un valor se repite
    }
    return resultado;                                                                           // Si no se ha devuelto un false, devolvemos un true
}

// Función validaLineaRT, comprimida en una sóla línes de código
// Se lee peor, pero da el mismo resultado
function validaLineaRTmin(e) {
    return !([...document.querySelectorAll(`[data-row="${e.target.dataset.row}"]`)].filter(el=>el.dataset.col!=e.target.dataset.col).filter(el=>el.value!=0).map(el=>el.value).includes(e.target.value));
}

// Función que comprueba si en el número de columna pasada por parámetro hay más de una vez el mismo número
// Devuelve true si la columna es correcta y false en caso contrario
function validaColumna(numero) {
    let resultado=true;
    let valoresColumna=[];
    let elementosColumna=document.querySelectorAll(`[data-col="${numero}"]`);   //Seleccionamos todos los elementos con el número de línea proporcionado
    for (const element of elementosColumna) {                                   //y por cada uno de los elementos
        valoresColumna.push(parseInt(element.value)||0);                            //extraemos el campo valor y lo pasamos al array de valores
    }
    let valor;
    while(valoresColumna.length>1){                                             // Hasta que el array de valores tien más de un elemento
        valor=valoresColumna.shift();                                           //Le quitamos el primer elemento y nos quedamos con él
        if ((valor)&&(valoresColumna.includes(valor))) {                            //Si el valor no es nulo o en blanco y está incluido en el array de valores que quedan
            return resultado=false;                                                     //Devolvemos un false en cuanto por lo menos un valor se repite
        }
    }
    return resultado;                                                           // Si no se ha devuelto un false, devolvemos un true
}

// Función que comprueba, en tiempo real, si en el número introducido es úniclo en la columna
// Devuelve true si la columna es correcta y false en caso contrario
function validaColumnaRT(e) {
    let resultado=true;
    let elementosColumna=[...document.querySelectorAll(`[data-col="${e.target.dataset.col}"]`)];    //Seleccionamos todos los elementos de la misma columna de la celda seleccionada, excluyendo al mismo elemento
    let otrosElementosColumna=elementosColumna.filter(el=>el.dataset.row!=e.target.dataset.row);    //Excluymos la celda que estamos modificando
    let elementosColumnaFilt = otrosElementosColumna.filter(el=>el.value!=0);                       //Filtramos sólo los elementos con valor definido
    if (elementosColumnaFilt.map(el=>el.value).includes(e.target.value)) {                          //Si el valor introducido se encuentra entre los valores de los otros elementos de la línea
        return resultado=false;                                                                         //Devolvemos un false en cuanto por lo menos un valor se repite
    }
    return resultado;                                                                               // Si no se ha devuelto un false, devolvemos un true
}

// Función validaColumnaRT, comprimida en una sóla línes de código
// Se lee peor, pero da el mismo resultado
function validaColumnaRTmin(e) {
    return !([...document.querySelectorAll(`[data-col="${e.target.dataset.col}"]`)].filter(el=>el.dataset.row!=e.target.dataset.row).filter(el=>el.value!=0).map(el=>el.value).includes(e.target.value));
}

// Función que comprueba si en el número de cuadricula pasada por parámetro hay más de una vez el mismo número
// Devuelve true si la cuadricula es correcta y false en caso contrario
function validaCuadricula(numero) {
    let resultado=true;
    let valoresCuadricula=[];
    let elementosCuadricula=document.querySelectorAll(`[data-cuad="${numero}"]`);   //Seleccionamos todos los elementos con el número de línea proporcionado
    for (const element of elementosCuadricula) {                                    //y por cada uno de los elementos
        valoresCuadricula.push(parseInt(element.value)||0);                             //extraemos el campo valor y lo pasamos al array de valores
    }
    let valor;
    while(valoresCuadricula.length>1){                                              // Hasta que el array de valores tien más de un elemento
        valor=valoresCuadricula.shift();                                            //Le quitamos el primer elemento y nos quedamos con él
        if ((valor)&&(valoresCuadricula.includes(valor))) {                             //Si tiene valor y está incluido en el array de valores que quedan
            return resultado=false;                                                         //Devolvemos un false en cuanto por lo menos un valor se repite
        }
    }
    return resultado;                                                               // Si no se ha devuelto un false, devolvemos un true
}

// Función que comprueba, en tiempo real, si en el número introducido es úniclo en la cuadrícula
// Devuelve true si la línea es correcta y false en caso contrario
function validaCuadriculaRT(e) {
    let resultado=true;
    let elementosCuadricula=[...document.querySelectorAll(`[data-cuad="${e.target.dataset.cuad}"]`)];                                               //Seleccionamos todos los elementos de la misma cuadrícula de la celda seleccionada, excluyendo al mismo elemento
    let otrosElementosCuadricula=elementosCuadricula.filter(el=>(el.dataset.col!=e.target.dataset.col)&&(el.dataset.row!=e.target.dataset.row));    //Excluymos la celda que estamos modificando
    let elementosCuadriculaFilt = otrosElementosCuadricula.filter(el=>el.value!=0);                                                                 //Filtramos sólo los elementos con valor definido
    if (elementosCuadriculaFilt.map(el=>el.value).includes(e.target.value)) {                                                                       //Si el valor introducido se encuentra entre los valores de los otros elementos de la línea
        return resultado=false;                                                                                                                         //Devolvemos un false en cuanto por lo menos un valor se repite
    }
    return resultado;                                                                                                                               // Si no se ha devuelto un false, devolvemos un true
}

// Función validaCuadriculaRT, comprimida en una sóla línes de código
// Se lee peor, pero da el mismo resultado
function validaCuadriculaRTmin(e) {
    return!([...document.querySelectorAll(`[data-cuad="${e.target.dataset.cuad}"]`)].filter(el=>(el.dataset.col!=e.target.dataset.col)&&(el.dataset.row!=e.target.dataset.row)).filter(el=>el.value!=0).map(el=>el.value).includes(e.target.value));
}

// Función que valida todo el tablero
function validaTablero(){
    for (let i = 1; i <=9; i++){    // Para todos los valores entre 1 y 9
        if (!validaColumna(i)){         // Si la columna no es correcta
            return false;                   //Devolvemos un false
        }
        if (!validaLinea(i)){       // Si la línea no es correcta
            return false;               //Devolvemos un false
        }
        if (!validaCuadricula(i)){  // Si la línea no es correcta
            return false;               //Devolvemos un false
        }
    }
    return true;                    // Si no se ha devuelto un false, devolvemos un true
}

// Función que comprueba si el tablero ha sido rellenado por completo y si es correcto
// Admite en HTMLCollection con los elemento del tablero como entrada y devuelve true si el tablero ha sido rellenado por completo y es correcto o false en caso contrario
function compruebaJuego(elementosCuadricula=document.querySelectorAll("[data-cuad]")){
    //console.log('Comprobando Juego');
    let arrayElementos = [...elementosCuadricula];              //Transformamos la HTMLCollection en array
    if((arrayElementos.every(elem=>elem.value!=""))&&(arrayElementos.length>0)){             //Si el tablero ha sido rellenado por completo
        if (validaTablero()) {                                      //Si el tablero es correcto (no tiene repeticiones en líneas, columnas y cuadrículas)
            //alert("El sudoku es correcto!");                            //Avisamos
            return true;                                                //Devolvemos true
        } else {                                                    //Si no
            alert("el sudoku no es correcto, por favor revíselo");      //Avisamos
            return false;                                               //Devolvemos false
        }
    } else {                                                    //Si el tablero no ha sido rellenado por completo
        return false;                                               //Devolvemos false
    }
}

// Exportamos todas las funciones para que se puedan importar y usar en otros módulos o ficheros 
export {validaLinea, validaColumna, validaCuadricula, validaTablero, compruebaJuego, validaLineaRT, validaLineaRTmin, validaColumnaRT, validaColumnaRTmin, validaCuadriculaRT, validaCuadriculaRTmin};