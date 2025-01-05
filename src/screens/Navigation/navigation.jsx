import React, { useState, useEffect } from 'react';
import './navigation.css';

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Home</li>
          <li>Perfil</li>
          <li>Filmes</li>
        </ul>
      </aside>
      <main className="content">
        <header className="header">
          <h1>CineHouse</h1>
        </header>
        <section className="main-content">
          <p>Colocar uma caixa para os filmes aq </p>
        </section>
      </main>
    </div>
  );
}

export default App;
