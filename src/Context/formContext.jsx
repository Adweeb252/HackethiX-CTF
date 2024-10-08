// src/context/FormDataContext.js
import React, { createContext, useState } from "react";

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
  const resetFormData = () => {
    setFormData(null); // Reset to null or to initial state
  };

  return (
    <FormDataContext.Provider value={{ formData, setFormData, resetFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
