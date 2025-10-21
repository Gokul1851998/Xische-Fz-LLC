import { createContext, useState, useContext, useEffect } from "react";

const FormContext = createContext();

export const UseFormData = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  const updateFormData = (values) => setData({ ...data, ...values });

  return (
    <FormContext.Provider value={{ data, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
