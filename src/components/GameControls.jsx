import React from 'react';

export const GameControls = ({
  isPlaying,
  iniciarJuego,
  detenerJuego,
  reiniciarJuego,
  velocidad,
  cambiarVelocidad,
  vozActiva,
  toggleVoz,
}) => {
  return (
    <>
      {/* Controles principales */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center mb-4 sm:mb-6 md:mb-8 px-4">
        <button
          onClick={iniciarJuego}
          disabled={isPlaying}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isPlaying ? "🔄 Jugando..." : "▶️ Iniciar Juego"}
        </button>

        <button
          onClick={detenerJuego}
          disabled={!isPlaying}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          ⏹️ Detener
        </button>

        <button
          onClick={reiniciarJuego}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
        >
          🔄 Reiniciar
        </button>
      </div>

      {/* Controles adicionales */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-4 sm:mb-6 md:mb-8 px-4">
        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-gray-700/50 rounded-lg p-2 sm:p-3">
          <label className="text-xs sm:text-sm font-semibold text-gray-300 whitespace-nowrap">
            ⚡ Velocidad:
          </label>
          <select
            value={velocidad}
            onChange={(e) => cambiarVelocidad(Number(e.target.value))}
            disabled={isPlaying}
            className="px-2 sm:px-3 py-1 rounded bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs sm:text-sm"
          >
            <option value={1000}>Rápida (1s)</option>
            <option value={2000}>Normal (2s)</option>
            <option value={3000}>Lenta (3s)</option>
          </select>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-gray-700/50 rounded-lg p-2 sm:p-3">
          <label className="text-xs sm:text-sm font-semibold text-gray-300 whitespace-nowrap">
            🎤 Voz:
          </label>
          <button
            onClick={toggleVoz}
            className={`px-3 sm:px-4 py-1 rounded transition-all duration-300 text-xs sm:text-sm ${
              vozActiva
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {vozActiva ? "🔊 Activada" : "🔇 Desactivada"}
          </button>
        </div>
      </div>
    </>
  );
}; 