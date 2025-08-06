import React, { useState, useEffect, useRef, useCallback } from "react";

// Cartas de la lotería mexicana
const cartas = [
  { id: 1, nombre: "El Gallo", imagen: "🐓", canto: "El Gallo" },
  { id: 2, nombre: "El Diablito", imagen: "👹", canto: "El Diablito" },
  { id: 3, nombre: "La Dama", imagen: "👸", canto: "La Dama" },
  { id: 4, nombre: "El Catrín", imagen: "🎩", canto: "El Catrín" },
  { id: 5, nombre: "El Paraguas", imagen: "☂️", canto: "El Paraguas" },
  { id: 6, nombre: "La Sirena", imagen: "🧜‍♀️", canto: "La Sirena" },
  { id: 7, nombre: "La Escalera", imagen: "🪜", canto: "La Escalera" },
  { id: 8, nombre: "La Botella", imagen: "🍾", canto: "La Botella" },
  { id: 9, nombre: "El Barril", imagen: "🛢️", canto: "El Barril" },
  { id: 10, nombre: "El Árbol", imagen: "🌳", canto: "El Árbol" },
  { id: 11, nombre: "El Melón", imagen: "🍈", canto: "El Melón" },
  { id: 12, nombre: "El Valiente", imagen: "⚔️", canto: "El Valiente" },
  { id: 13, nombre: "El Gorrito", imagen: "🎪", canto: "El Gorrito" },
  { id: 14, nombre: "La Muerte", imagen: "💀", canto: "La Muerte" },
  { id: 15, nombre: "La Pera", imagen: "🍐", canto: "La Pera" },
  { id: 16, nombre: "La Bandera", imagen: "🏁", canto: "La Bandera" },
  { id: 17, nombre: "El Bandolón", imagen: "🎸", canto: "El Bandolón" },
  { id: 18, nombre: "El Violoncello", imagen: "🎻", canto: "El Violoncello" },
  { id: 19, nombre: "La Garza", imagen: "🦢", canto: "La Garza" },
  { id: 20, nombre: "El Pájaro", imagen: "🐦", canto: "El Pájaro" },
  { id: 21, nombre: "La Mano", imagen: "✋", canto: "La Mano" },
  { id: 22, nombre: "La Bota", imagen: "👢", canto: "La Bota" },
  { id: 23, nombre: "La Luna", imagen: "🌙", canto: "La Luna" },
  { id: 24, nombre: "El Cotorro", imagen: "🦜", canto: "El Cotorro" },
  { id: 25, nombre: "El Borracho", imagen: "🍺", canto: "El Borracho" },
  { id: 26, nombre: "El Negrito", imagen: "👶", canto: "El Negrito" },
  { id: 27, nombre: "El Corazón", imagen: "❤️", canto: "El Corazón" },
  { id: 28, nombre: "La Sandía", imagen: "🍉", canto: "La Sandía" },
  { id: 29, nombre: "El Tambor", imagen: "🥁", canto: "El Tambor" },
  { id: 30, nombre: "El Camarón", imagen: "🦐", canto: "El Camarón" },
  { id: 31, nombre: "Las Jaras", imagen: "🏹", canto: "Las Jaras" },
  { id: 32, nombre: "El Músico", imagen: "🎵", canto: "El Músico" },
  { id: 33, nombre: "La Araña", imagen: "🕷️", canto: "La Araña" },
  { id: 34, nombre: "El Soldado", imagen: "🎖️", canto: "El Soldado" },
  { id: 35, nombre: "La Estrella", imagen: "⭐", canto: "La Estrella" },
  { id: 36, nombre: "El Cazo", imagen: "🍳", canto: "El Cazo" },
  { id: 37, nombre: "El Mundo", imagen: "🌍", canto: "El Mundo" },
  { id: 38, nombre: "El Apache", imagen: "🦅", canto: "El Apache" },
  { id: 39, nombre: "El Nopal", imagen: "🌵", canto: "El Nopal" },
  { id: 40, nombre: "El Alacrán", imagen: "🦂", canto: "El Alacrán" },
  { id: 41, nombre: "La Rosa", imagen: "🌹", canto: "La Rosa" },
  { id: 42, nombre: "La Calavera", imagen: "☠️", canto: "La Calavera" },
  { id: 43, nombre: "La Campana", imagen: "🔔", canto: "La Campana" },
  { id: 44, nombre: "El Cantarito", imagen: "🏺", canto: "El Cantarito" },
  { id: 45, nombre: "El Venado", imagen: "🦌", canto: "El Venado" },
  { id: 46, nombre: "El Sol", imagen: "☀️", canto: "El Sol" },
  { id: 47, nombre: "La Corona", imagen: "👑", canto: "La Corona" },
  { id: 48, nombre: "La Chalupa", imagen: "🚣", canto: "La Chalupa" },
  { id: 49, nombre: "El Pino", imagen: "🌲", canto: "El Pino" },
  { id: 50, nombre: "El Pescado", imagen: "🐟", canto: "El Pescado" },
  { id: 51, nombre: "La Palma", imagen: "🌴", canto: "La Palma" },
  { id: 52, nombre: "La Maceta", imagen: "🪴", canto: "La Maceta" },
  { id: 53, nombre: "El Arpa", imagen: "🎼", canto: "El Arpa" },
  { id: 54, nombre: "La Rana", imagen: "🐸", canto: "La Rana" },
];

function App() {
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
    showGameCompleted: false, // Nuevo estado para modal
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
  }, [gameState.cartasLlamadas, gameState.vozActiva]); // Agregar vozActiva a las dependencias

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header mejorado */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
            <h1 className="text-white text-6xl md:text-7xl font-bold mb-4 text-transparent animate-pulse">
              🎰 Lotería Mexicana 🎰
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            ¡El juego más tradicional de México!
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={toggleInstrucciones}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {gameState.showInstructions ? "📖 Ocultar" : "📖 Instrucciones"}
            </button>
          </div>
        </div>

        {/* Instrucciones expandibles */}
        {gameState.showInstructions && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 transform transition-all duration-500 ease-out animate-in slide-in-from-top-2 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">
              🎮 Cómo Jugar
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-300 mb-2">
                  🎯 Objetivo:
                </h4>
                <p className="text-gray-400">
                  Marca todas las cartas en tu tabla cuando sean llamadas. El
                  primero en completar un patrón gana.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-300 mb-2">
                  🎪 Controles:
                </h4>
                <ul className="space-y-1 text-gray-400">
                  <li>
                    ▶️ <strong>Iniciar:</strong> Juego automático
                  </li>
                  <li>
                    🎯 <strong>Llamar Carta:</strong> Una por una
                  </li>
                  <li>
                    🔄 <strong>Reiniciar:</strong> Nuevo juego
                  </li>
                  <li>
                    🔊 <strong>Voz:</strong> Activar/desactivar
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Controles principales */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={iniciarJuego}
            disabled={gameState.isPlaying}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {gameState.isPlaying ? "🔄 Jugando..." : "▶️ Iniciar Juego"}
          </button>

          <button
            onClick={detenerJuego}
            disabled={!gameState.isPlaying}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⏹️ Detener
          </button>

          <button
            onClick={reiniciarJuego}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            🔄 Reiniciar
          </button>
        </div>

        {/* Controles adicionales */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-3">
            <label className="text-sm font-semibold text-gray-300">
              ⚡ Velocidad:
            </label>
            <select
              value={gameState.velocidad}
              onChange={(e) => cambiarVelocidad(Number(e.target.value))}
              disabled={gameState.isPlaying}
              className="px-3 py-1 rounded bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value={1000}>Rápida (1s)</option>
              <option value={2000}>Normal (2s)</option>
              <option value={3000}>Lenta (3s)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-3">
            <label className="text-sm font-semibold text-gray-300">
              🎤 Voz:
            </label>
            <button
              onClick={toggleVoz}
              className={`px-4 py-1 rounded transition-all duration-300 ${
                gameState.vozActiva
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {gameState.vozActiva ? "🔊 Activada" : "🔇 Desactivada"}
            </button>
          </div>
        </div>

        {/* Carta Actual mejorada */}
        {gameState.cartaActual && (
          <div
            className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 text-center shadow-2xl border border-gray-700 transition-all duration-500 ${
              gameState.cartaAnimada
                ? "scale-110 shadow-yellow-400/50"
                : "scale-100"
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">
              Carta Actual
            </h2>
            <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl p-8 inline-block shadow-xl border border-gray-600">
              <div
                className={`text-9xl mb-6 transition-all duration-500 ${
                  gameState.cartaAnimada ? "animate-bounce" : ""
                }`}
              >
                {gameState.cartaActual.imagen}
              </div>
              <div className="text-3xl font-bold mb-2 text-white">
                {gameState.cartaActual.nombre}
              </div>
              <div className="text-xl text-gray-300 mb-4">
                #{gameState.cartaActual.id}
              </div>
              {gameState.vozActiva && (
                <div className="text-lg text-gray-300 bg-gray-700/50 rounded-lg p-3">
                  🔊 "{gameState.cartaActual.canto}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progreso mejorado */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-2xl border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-200">📊 Progreso</h3>
            <span className="text-xl font-semibold text-gray-300">
              {gameState.cartasLlamadas.length} / {cartas.length} cartas
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-6 shadow-inner">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-6 rounded-full transition-all duration-700 shadow-lg"
              style={{
                width: `${
                  (gameState.cartasLlamadas.length / cartas.length) * 100
                }%`,
              }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-400 text-center">
            {gameState.cartasLlamadas.length === cartas.length
              ? "🎉 ¡Juego completado!"
              : `${Math.round(
                  (gameState.cartasLlamadas.length / cartas.length) * 100
                )}% completado`}
          </div>
        </div>

        {/* Cartas Llamadas mejoradas */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-gray-200">
            📋 Cartas Llamadas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-300">
            {gameState.cartasLlamadas.map((id) => {
              const carta = cartas.find((c) => c.id === id);
              if (!carta) {
                return null;
              }
              return (
                <div
                  key={id}
                  className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl p-4 text-center shadow-lg border border-gray-600 hover:scale-105 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{carta.imagen}</div>
                  <div className="text-xs font-semibold mb-1 text-white">
                    {carta.nombre}
                  </div>
                  <div className="text-xs text-gray-400">#{carta.id}</div>
                </div>
              );
            })}
          </div>
          {gameState.cartasLlamadas.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <div className="text-4xl mb-2">🎰</div>
              <p>¡Presiona "Iniciar" o "Llamar Carta" para comenzar!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Juego Completado */}
      {gameState.showGameCompleted && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl border-4 border-white/20 animate-scale-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              ¡Juego Completado!
            </h2>
            <p className="text-lg text-white/90 mb-6">
              ¡Felicidades! Has llamado todas las 54 cartas de la Lotería Mexicana.
            </p>
            <div className="text-2xl font-bold text-white mb-6">
              🏆 ¡Victoria! 🏆
            </div>
            <button
              onClick={cerrarModalJuegoCompletado}
              className="bg-white text-yellow-600 font-bold py-3 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              🎯 Jugar de Nuevo
            </button>
          </div>
        </div>
      )}

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
