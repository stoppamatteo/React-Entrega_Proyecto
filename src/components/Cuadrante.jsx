// Importamos los componentes que vamos a utilizar
import Celda from "./Celda"


// Componente de un cuadrante del sudoku
const Cuadrante = ({cuad,valInicial,valUsuario}) => {
    let srow=3*Math.floor((cuad-1)/3);                  // Calculamos la línea de sudoku inicial a partir del número de cuadrante
    let scol=3*((cuad-1)%3);                            // Calculamos la columnade sudoku inicial a partir del número de cuadrante
    let valorIn = valInicial||[0,0,0,0,0,0,0,0,0];      // Si el array del sudoku inicial no está definido lo cambiamos por uno de ceros
    let valorUs = valUsuario||[0,0,0,0,0,0,0,0,0];      // Si el array del sudoku usuario no está definido lo cambiamos por uno de ceros
    return (
        <div className="cuadrante border-box border-2 border-solid border-black grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,1fr)]">
            <Celda row={srow+1} col={scol+1} cuad={cuad} valorIn={valorIn[0]} valorUs={valorUs[0]} />
            <Celda row={srow+1} col={scol+2} cuad={cuad} valorIn={valorIn[1]} valorUs={valorUs[1]} />
            <Celda row={srow+1} col={scol+3} cuad={cuad} valorIn={valorIn[2]} valorUs={valorUs[2]} />
            <Celda row={srow+2} col={scol+1} cuad={cuad} valorIn={valorIn[3]} valorUs={valorUs[3]} />
            <Celda row={srow+2} col={scol+2} cuad={cuad} valorIn={valorIn[4]} valorUs={valorUs[4]} />
            <Celda row={srow+2} col={scol+3} cuad={cuad} valorIn={valorIn[5]} valorUs={valorUs[5]} />
            <Celda row={srow+3} col={scol+1} cuad={cuad} valorIn={valorIn[6]} valorUs={valorUs[6]} />
            <Celda row={srow+3} col={scol+2} cuad={cuad} valorIn={valorIn[7]} valorUs={valorUs[7]} />
            <Celda row={srow+3} col={scol+3} cuad={cuad} valorIn={valorIn[8]} valorUs={valorUs[8]} />
        </div>
    )
}

export default Cuadrante