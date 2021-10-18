import React from 'react';
import { useAppContext } from './context/App.context';

const Home = () => {
  const { keycloakInstance, isAuthenticated } = useAppContext();

  if (!keycloakInstance) return <div>Loading...</div>;

  return (
    <div className="App">
      {isAuthenticated && (
        <div>
          <h1>Welcome to Keycloak World!</h1>
          <button onClick={() => keycloakInstance.logout()}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
