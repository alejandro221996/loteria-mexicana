import React from 'react';

export const Header = ({ showInstructions, toggleInstrucciones }) => {
  return (
    <div className="text-center mb-4 sm:mb-6 md:mb-8 px-4">
      <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 text-transparent animate-pulse">
          🎰 Lotería Mexicana 🎰
        </h1>
      </div>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium px-2">
        ¡El juego más tradicional de México!
      </p>
      <div className="mt-3 sm:mt-4 flex justify-center gap-2">
        <button
          onClick={toggleInstrucciones}
          className="px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105"
        >
          {showInstructions ? "📖 Ocultar" : "📖 Instrucciones"}
        </button>
      </div>
    </div>
  );
}; 