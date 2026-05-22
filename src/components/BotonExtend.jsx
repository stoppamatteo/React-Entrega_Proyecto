/* Componente BotonExtend
Parámetros de entrada:
texto - texto del botón
accion - acción del botón
ensena - booleano que define si el botón se ve (true) o si tiene que permanecer escondido (false)
 */
const BotonExtend = ({texto,accion,ensena}) => {
    if (ensena) {
        return (
            <button className="bg-gray-300 py-0.5 px-4 border rounded-lg hover:bg-gray-400" onClick={accion}>{texto}</button>
        )
    } else {
        return (
            <button className="hidden"></button>
        )
    }
}

export default BotonExtend