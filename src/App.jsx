import React from 'react';
import { useLoteria } from './hooks/useLoteria';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { GameControls } from './components/GameControls';
import { CurrentCard } from './components/CurrentCard';
import { Progress } from './components/Progress';
import { CalledCards } from './components/CalledCards';
import { GameCompletedModal } from './components/GameCompletedModal';

function App() {
  const {
    gameState,
    cartas,
    iniciarJuego,
    detenerJuego,
    reiniciarJuego,
    cambiarVelocidad,
    toggleVoz,
    toggleInstrucciones,
    cerrarModalJuegoCompletado,
  } = useLoteria();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header 
          showInstructions={gameState.showInstructions}
          toggleInstrucciones={toggleInstrucciones}
        />

        <Instructions showInstructions={gameState.showInstructions} />

        <GameControls
          isPlaying={gameState.isPlaying}
          iniciarJuego={iniciarJuego}
          detenerJuego={detenerJuego}
          reiniciarJuego={reiniciarJuego}
          velocidad={gameState.velocidad}
          cambiarVelocidad={cambiarVelocidad}
          vozActiva={gameState.vozActiva}
          toggleVoz={toggleVoz}
        />

        <CurrentCard
          cartaActual={gameState.cartaActual}
          cartaAnimada={gameState.cartaAnimada}
          vozActiva={gameState.vozActiva}
        />

        <Progress
          cartasLlamadas={gameState.cartasLlamadas}
          totalCartas={cartas.length}
        />

        <CalledCards
          cartasLlamadas={gameState.cartasLlamadas}
          cartas={cartas}
        />
      </div>

      <GameCompletedModal
        showGameCompleted={gameState.showGameCompleted}
        cerrarModalJuegoCompletado={cerrarModalJuegoCompletado}
      />
    </div>
  );
}

export default App;
