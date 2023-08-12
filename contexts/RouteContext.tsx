import React, { createContext, useState, useContext, ReactNode } from 'react';

type RouteContextType = {
  label: string,
  setLabel: React.Dispatch<React.SetStateAction<string>>,
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [label, setLabel] = useState<string>("");
  
  return (
    <RouteContext.Provider value={{ label, setLabel }}>
      {children}
    </RouteContext.Provider>
  );
};

export const usePageInfo = (): RouteContextType => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('usePageInfo must be used within a RouteProvider');
  }
  return context;
};
