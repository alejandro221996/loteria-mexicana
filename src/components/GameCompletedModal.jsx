import React from 'react';

export const GameCompletedModal = ({ showGameCompleted, cerrarModalJuegoCompletado }) => {
  if (!showGameCompleted) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md mx-auto text-center shadow-2xl border-4 border-white/20 animate-in zoom-in duration-400">
        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
          ¡Juego Completado!
        </h2>
        <p className="text-base sm:text-lg text-white/90 mb-4 sm:mb-6">
          ¡Felicidades! Has llamado todas las 54 cartas de la Lotería Mexicana.
        </p>
        <div className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
          🏆 ¡Victoria! 🏆
        </div>
        <button
          onClick={cerrarModalJuegoCompletado}
          className="bg-white text-yellow-600 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
        >
          🎯 Jugar de Nuevo
        </button>
      </div>
    </div>
  );
}; 