import React from 'react';
import { useAppContext } from './context/App.context';

const Home = () => {
  const { keycloakInstance, isAuthenticated } = useAppContext();

  if (!keycloakInstance) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated && (
        <div>
          <div className="App">Welcome to Keycloak World!</div>
          <button onClick={() => keycloakInstance.logout()}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
