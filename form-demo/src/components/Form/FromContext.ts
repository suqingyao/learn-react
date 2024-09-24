import { createContext } from 'react';

export interface FormContextProps {
  values?: Record<string, any>;
  setValues?: (values: Record<string, any>) => void;
  onValueChange?: (key: string, value: any) => void;
  validateRegister?: (name: string, cb: Function) => void;
}

export const FormContext = createContext<FormContextProps>({});
