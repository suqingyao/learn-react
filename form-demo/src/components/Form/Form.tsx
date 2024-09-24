import { FormEvent, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { FormContext } from './FromContext';
import clsx from 'clsx';

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  style?: React.CSSProperties;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
}

export interface FormRefApi {
  getFieldsValue: () => Record<string, any>;
  setFieldsValue: (values: Record<string, any>) => void;
}

const Form = forwardRef<FormRefApi, FormProps>((props: FormProps, ref) => {
  const { className, style, children, onFinish, onFinishFailed, initialValues, ...restProps } = props;

  useImperativeHandle(ref, () => {
    return {
      getFieldsValue() {
        return values;
      },
      setFieldsValue(fieldsValues) {
        setValues({ ...values, ...fieldsValues });
      }
    };
  });

  const [values, setValues] = useState<Record<string, any>>(initialValues || {});

  const validatorMap = useRef(new Map<string, Function>());

  const errors = useRef<Record<string, any>>({});

  const onValueChange = (key: string, value: any) => {
    values[key] = value;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    for (const [key, callbackFunc] of validatorMap.current) {
      if (typeof callbackFunc === 'function') {
        errors.current[key] = callbackFunc();
      }
    }

    const errorList = Object.keys(errors.current)
      .map((key) => {
        return errors.current[key];
      })
      .filter(Boolean);

    if (errorList.length) {
      onFinishFailed?.(errors.current);
    } else {
      onFinish?.(values);
    }
  };

  const handleValidateRegister = (name: string, cb: Function) => {
    validatorMap.current.set(name, cb);
  };

  const cls = clsx('ant-form', className);

  return (
    <FormContext.Provider
      value={{
        onValueChange,
        values,
        setValues: (v) => setValues(v),
        validateRegister: handleValidateRegister
      }}>
      <form
        {...restProps}
        className={cls}
        style={style}
        onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
});

export default Form;
