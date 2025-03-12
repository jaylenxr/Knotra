import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '100vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: '#f1f0e6',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          color: '#ff6f61',
          fontFamily: '"Helvetica Neue", sans-serif',
          fontWeight: 'bold',
        }}
      >
        Knotra
      </h1>
      <p
        style={{
          color: '#6a7f49',
          marginBottom: '20px',
        }}
      >
        Your Hair Health Journey Starts Here
      </p>
      <Button
        type="button"
        size="lg"
        className="copy-btn"
        onClick={signIn}
        style={{
          backgroundColor: '#ff6f61',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '5px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px',
          transition: 'background-color 0.3s ease',
        }}
      >
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
