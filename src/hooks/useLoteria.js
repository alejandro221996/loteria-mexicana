import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cartas } from '../data/cartas.js';

export const useLoteria = () => {
  // Estado principal unificado para evitar condiciones de carrera
  const [gameState, setGameState] = useState({
    cartasLlamadas: [], // Array de IDs de cartas ya llamadas
    cartaActual: null,
    isPlaying: false,
    intervalId: null,
    velocidad: 2000,
    vozActiva: true,
    showInstructions: false,
    cartaAnimada: false,
    showGameCompleted: false,
  });

  // Usar ref para synthesis para evitar cambios de referencia
  const synthesisRef = useRef(null);
  const cartaParaCantarRef = useRef(null);

  // Memoizar cartas disponibles basándose en las llamadas
  const cartasDisponibles = React.useMemo(() => {
    return cartas.filter(
      (carta) => !gameState.cartasLlamadas.includes(carta.id)
    );
  }, [gameState.cartasLlamadas]);

  // Log de estado inicial
  useEffect(() => {
    console.log("📊 Array de cartas:", cartas.length, "elementos");
    console.log(
      "📊 IDs disponibles:",
      cartas.map((c) => c.id).sort((a, b) => a - b)
    );
  }, []);

  // Inicializar la síntesis de voz
  useEffect(() => {
    if ("speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis;
    }
  }, []);

  // Effect para cantar cuando cambia cartaParaCantarRef
  useEffect(() => {
    if (cartaParaCantarRef.current) {
      const carta = cartaParaCantarRef.current;
      cartaParaCantarRef.current = null; // Limpiar inmediatamente
      
      // Cantar directamente sin depender del callback
      if (synthesisRef.current && gameState.vozActiva) {
        // Cancelar cualquier síntesis anterior
        synthesisRef.current.cancel();

        // Crear el utterance
        const utterance = new SpeechSynthesisUtterance(carta.canto);
        utterance.lang = "es-MX";
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.volume = 1;

        // Intentar usar una voz mexicana si está disponible
        const voices = synthesisRef.current.getVoices();
        const mexicanVoice = voices.find(
          (voice) =>
            voice.lang.includes("es-MX") || voice.lang.includes("es-419")
        );
        if (mexicanVoice) {
          utterance.voice = mexicanVoice;
        }

        synthesisRef.current.speak(utterance);
      }
    }
  }, [gameState.cartasLlamadas, gameState.vozActiva]);

  // Función para iniciar el juego
  const iniciarJuego = useCallback(() => {
    if (cartasDisponibles.length === 0) {
      setGameState((prevState) => ({
        ...prevState,
        showGameCompleted: true,
      }));
      return;
    }

    const id = setInterval(() => {
      // Usar una función que capture el estado más reciente
      setGameState((currentState) => {
        const disponibles = cartas.filter(
          (carta) => !currentState.cartasLlamadas.includes(carta.id)
        );

        if (disponibles.length === 0) {
          console.log("🛑 Deteniendo juego - no hay más cartas disponibles");
          // Limpiar el intervalo y detener el juego
          clearInterval(id);
          return {
            ...currentState,
            isPlaying: false,
            intervalId: null,
            showGameCompleted: true, // Mostrar modal en lugar de alert
          };
        }

        const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
        const cartaSeleccionada = disponibles[indiceAleatorio];

        console.log(
          "🎯 Auto-seleccionada:",
          cartaSeleccionada.nombre,
          cartaSeleccionada.id
        );

        // Programar el canto usando el ref
        cartaParaCantarRef.current = cartaSeleccionada;

        return {
          ...currentState,
          cartaActual: cartaSeleccionada,
          cartasLlamadas: [
            ...currentState.cartasLlamadas,
            cartaSeleccionada.id,
          ],
          cartaAnimada: true,
        };
      });
    }, gameState.velocidad);

    setGameState((prevState) => ({
      ...prevState,
      isPlaying: true,
      intervalId: id,
    }));
  }, [cartasDisponibles.length, gameState.velocidad]);

  // Función para detener el juego
  const detenerJuego = useCallback(() => {
    if (gameState.intervalId) {
      clearInterval(gameState.intervalId);
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }

    setGameState((prevState) => ({
      ...prevState,
      isPlaying: false,
      intervalId: null,
      cartaAnimada: false,
    }));

    console.log("🛑 Juego detenido");
  }, [gameState.intervalId]);

  // Función para reiniciar el juego
  const reiniciarJuego = useCallback(() => {
    // Primero detener el juego actual
    if (gameState.intervalId) {
      clearInterval(gameState.intervalId);
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }

    // Reiniciar estado
    setGameState((prevState) => ({
      ...prevState,
      cartasLlamadas: [],
      cartaActual: null,
      isPlaying: false,
      intervalId: null,
      cartaAnimada: false,
    }));

    console.log("🔄 Juego reiniciado");
  }, [gameState.intervalId]);

  // Actualizar velocidad
  const cambiarVelocidad = useCallback((nuevaVelocidad) => {
    setGameState((prevState) => ({
      ...prevState,
      velocidad: nuevaVelocidad,
    }));
  }, []);

  // Toggle voz
  const toggleVoz = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      vozActiva: !prevState.vozActiva,
    }));
  }, []);

  // Toggle instrucciones
  const toggleInstrucciones = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      showInstructions: !prevState.showInstructions,
    }));
  }, []);

  // Cerrar modal de juego completado
  const cerrarModalJuegoCompletado = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      showGameCompleted: false,
    }));
  }, []);

  // Limpiar recursos al desmontar
  useEffect(() => {
    return () => {
      if (gameState.intervalId) {
        clearInterval(gameState.intervalId);
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [gameState.intervalId]);

  return {
    gameState,
    cartasDisponibles,
    cartas,
    iniciarJuego,
    detenerJuego,
    reiniciarJuego,
    cambiarVelocidad,
    toggleVoz,
    toggleInstrucciones,
    cerrarModalJuegoCompletado,
  };
}; 