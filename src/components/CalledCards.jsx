import React from 'react';

export const CalledCards = ({ cartasLlamadas, cartas }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-700 mx-4">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-200">
        📋 Cartas Llamadas
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-300">
        {cartasLlamadas.map((id) => {
          const carta = cartas.find((c) => c.id === id);
          if (!carta) {
            return null;
          }
          return (
            <div
              key={id}
              className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center shadow-lg border border-gray-600 hover:scale-105 transition-all duration-300"
            >
              <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">{carta.imagen}</div>
              <div className="text-xs sm:text-xs font-semibold mb-1 text-white leading-tight">
                {carta.nombre}
              </div>
              <div className="text-xs text-gray-400">#{carta.id}</div>
            </div>
          );
        })}
      </div>
      {cartasLlamadas.length === 0 && (
        <div className="text-center text-gray-400 py-6 sm:py-8">
          <div className="text-3xl sm:text-4xl mb-2">🎰</div>
          <p className="text-sm sm:text-base">¡Presiona "Iniciar" o "Llamar Carta" para comenzar!</p>
        </div>
      )}
    </div>
  );
}; 