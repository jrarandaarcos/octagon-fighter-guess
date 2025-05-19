
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // This page will now redirect to the Male Fighters game
  return <Navigate to="/" replace />;
};

export default Index;
