import React from 'react';

export const CurrentCard = ({ cartaActual, cartaAnimada, vozActiva }) => {
  if (!cartaActual) return null;

  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 text-center shadow-2xl border border-gray-700 transition-all duration-500 mx-4 ${
        cartaAnimada
          ? "scale-105 sm:scale-110 shadow-yellow-400/50"
          : "scale-100"
      }`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-yellow-400">
        Carta Actual
      </h2>
      <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 inline-block shadow-xl border border-gray-600">
        <div
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 sm:mb-6 transition-all duration-500 ${
            cartaAnimada ? "animate-bounce" : ""
          }`}
        >
          {cartaActual.imagen}
        </div>
        <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-white">
          {cartaActual.nombre}
        </div>
        <div className="text-lg sm:text-xl text-gray-300 mb-3 sm:mb-4">
          #{cartaActual.id}
        </div>
        {vozActiva && (
          <div className="text-sm sm:text-lg text-gray-300 bg-gray-700/50 rounded-lg p-2 sm:p-3">
            🔊 "{cartaActual.canto}"
          </div>
        )}
      </div>
    </div>
  );
}; 