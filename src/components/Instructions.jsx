import React from 'react';

export const Instructions = ({ showInstructions }) => {
  if (!showInstructions) return null;

  return (
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
  );
}; 