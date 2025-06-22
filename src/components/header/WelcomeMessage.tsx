import React from 'react';

interface WelcomeMessageProps {
  textShadow: React.CSSProperties;
}

function WelcomeMessage({ textShadow }: WelcomeMessageProps) {
  return (
    <section className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
      <h1 className="text-4xl md:text-6xl font-bold text-red-anbu" style={textShadow}>
        Bienvenido de nuevo,
        <br />
        Agente.
      </h1>
    </section>
  );
}

export default WelcomeMessage; 