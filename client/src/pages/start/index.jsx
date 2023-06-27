import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { startChat } from '../../storage/reducers/conversation';
import './App.css';
import demoVideo from './demo-video.mp4';

export const StartPage = () => {
  const userId = uuidv4();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(startChat({ userId }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to EveryoneArtist!</h1>
        <div className="App-content">
          <div className="App-text">
            <p>
              Create stunning images by answering questions. <br/> 
              Interact with our system in a quiz-like manner to generate and refine your image. Perfect for beginners learning generative image creation.
            </p>
            <Link
              className="App-link"
              to={`/users/${userId}`}
              onClick={handleClick}>
              Start Your Journey
            </Link>
          </div>
          <div className="App-video">
            <video className="App-demo" autoPlay loop muted>
              <source src={demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </header>
    </div>
  );
};
