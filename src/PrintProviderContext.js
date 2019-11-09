
import React, { useContext } from 'react';

const PrintProviderContext = React.createContext();

export const usePrintProvider = () => {
  const { regPrintable, unregPrintable } = useContext(PrintProviderContext);

  return {
    regPrintable,
    unregPrintable
  };
};

export default PrintProviderContext;