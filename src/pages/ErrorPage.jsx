import React from 'react';
import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <h1>404 - Not Found!</h1>
      <Link to="/">Go to Home with Link</Link>
    </div>
  );
}
