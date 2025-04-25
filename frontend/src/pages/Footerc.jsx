import { createContext, useContext, useState } from 'react';

const FooterContext = createContext();

const FooterProvider = ({ children }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  return (
    <FooterContext.Provider value={{ isFooterVisible, setIsFooterVisible }}>
      {children}
    </FooterContext.Provider>
  );
};

const useFooter = () => useContext(FooterContext);

export { FooterProvider, useFooter };