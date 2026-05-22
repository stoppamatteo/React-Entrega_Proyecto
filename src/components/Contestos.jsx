import { createContext } from "react"

export const GlobalStateInfo = createContext(null);         // Contexto para la fase del juego
export const GlobalTimeInfo = createContext(null);          // Contexto para el tiempo de juego
export const GlobalTimerControl = createContext(null);      // Contexto para el control del temporizador
export const GlobalNavigatorInfo = createContext(null);     // Contexto para la información de la sección de navegación
export const SudokuUsuarioContext = createContext(null);    // Contexto para la las celdas de sudoku introducidas por el usuario

export default {GlobalStateInfo, GlobalTimeInfo, GlobalTimerControl, GlobalNavigatorInfo, SudokuUsuarioContext};