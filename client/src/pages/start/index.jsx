import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { startChat } from '../../storage/reducers/conversation';
import './App.css';

export const StartPage = () => {
  const userId = uuidv4();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(startChat({ userId }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to EveryoneArtist!</p>
        <Link
          className="App-link"
          to={`/users/${userId}`}
          onClick={handleClick}>
          Start
        </Link>
      </header>
    </div>
  );
};
