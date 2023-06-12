import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export const StartPage = () => {
  const userId = '1';

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to EveryoneArtist!</p>
        <Link className="App-link" to={`/users/${userId}`}>
          Start
        </Link>
      </header>
    </div>
  );
};
