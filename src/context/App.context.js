import { useEffect, createContext, useState, useContext } from 'react';
import Keycloak from 'keycloak-js';

const Context = createContext(null);

export const AppContextProvider = (props) => {
  const [keycloakInstance, setKeycloakInstance] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const keycloakInstance = Keycloak('/keycloak.json');

    (async function () {
      const authenticated = await keycloakInstance.init({
        onLoad: 'login-required',
      });

      setIsAuthenticated(authenticated);
      setKeycloakInstance(keycloakInstance);

      setInterval(() => {
        keycloakInstance.updateToken(70).then((refreshed) => {
          refreshed && setKeycloakInstance(keycloakInstance);
        });
      }, 6000);

      if (authenticated) {
        localStorage.setItem('keycloakToken', keycloakInstance.token);
      }
    })();
  }, []);

  return (
    <Context.Provider value={{ keycloakInstance, isAuthenticated }}>
      {props.children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);

  if (!context)
    throw Error('useAppContext must be used within AppContextProvider');

  return context;
};
