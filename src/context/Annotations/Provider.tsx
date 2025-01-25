import React, { useReducer } from 'react';
import { initialState, AnnotationsContext, AnnotationsReducer } from '@context/Annotations';

const AnnotationsProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(AnnotationsReducer, initialState);

  return (
    <AnnotationsContext.Provider value={{ state, dispatch }}>
      {children}
    </AnnotationsContext.Provider>
  );
};


export { AnnotationsProvider }