import React from 'react';

export const Progress = ({ cartasLlamadas, totalCartas }) => {
  const porcentaje = (cartasLlamadas.length / totalCartas) * 100;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8 shadow-2xl border border-gray-700 mx-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-4 gap-2">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-200">📊 Progreso</h3>
        <span className="text-lg sm:text-xl font-semibold text-gray-300">
          {cartasLlamadas.length} / {totalCartas} cartas
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4 sm:h-6 shadow-inner">
        <div
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 sm:h-6 rounded-full transition-all duration-700 shadow-lg"
          style={{
            width: `${porcentaje}%`,
          }}
        ></div>
      </div>
      <div className="mt-2 text-xs sm:text-sm text-gray-400 text-center">
        {cartasLlamadas.length === totalCartas
          ? "🎉 ¡Juego completado!"
          : `${Math.round(porcentaje)}% completado`}
      </div>
    </div>
  );
}; 