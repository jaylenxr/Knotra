/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="signin-wrapper">
      <img alt="knotra-background" src="knotrabackground.png" className="signin-background" />

      <div className="signin-content">
        <Button type="button" size="lg" onClick={signIn} className="signin-button">
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
