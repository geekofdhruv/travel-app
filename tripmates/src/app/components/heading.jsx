import React from 'react';

const Heading = ({ text }) => {
  return (
    <div className="text-center my-8 mx-16 px-4">
      <h1 className="text-5xl font-bold">{text}</h1>
    </div>
  );
};

export default Heading;
