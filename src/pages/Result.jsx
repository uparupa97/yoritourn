import React from 'react';

const Result = ({userName}) => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h2>{userName}이 뽑은 최고의 요리는?</h2>
      <span>page</span>
    </div>
  );
};

export default Result;
