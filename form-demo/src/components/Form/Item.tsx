import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { FormContext } from './FromContext';
import clsx from 'clsx';
import Schema from 'async-validator';

export interface ItemProps {
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  name?: string;
  valuePropName?: string;
  rules?: Record<string, any>[];
  children?: React.ReactElement;
}

const getValueFormEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = e;
  if (target.type === 'checkbox') {
    return target.checked;
  } else if (target.type === 'radio') {
    return target.value;
  }

  return target.value;
};

const Item = (props: ItemProps) => {
  const { className, label, children, style, name, valuePropName, rules } = props;

  if (!name) {
    return children;
  }

  const [value, setValue] = useState<string | number | boolean>();
  const [error, setError] = useState('');

  const { onValueChange, values, validateRegister } = useContext(FormContext);

  useEffect(() => {
    if (value !== values?.[name]) {
      setValue(values?.[name]);
    }
  }, [values, values?.[name]]);

  const handleValidate = (value: any) => {
    let errorMsg = null;

    if (Array.isArray(rules) && rules.length > 0) {
      const validator = new Schema({
        [name]: rules.map((rule) => ({
          type: 'string',
          ...rule
        }))
      });
      validator.validate({ [name]: value }, (errors) => {
        if (errors) {
          if (errors?.length) {
            setError(errors[0].message!);
            errorMsg = errors[0].message;
          }
        } else {
          setError('');
          errorMsg = null;
        }
      });
    }
    return errorMsg;
  };

  useEffect(() => {
    validateRegister?.(name, () => handleValidate(value));
  }, [value]);

  const propsName: Record<string, any> = {};
  if (valuePropName) {
    propsName[valuePropName] = value;
  } else {
    propsName.value = value;
  }

  const childEle =
    React.Children.toArray(children).length > 1
      ? children
      : React.cloneElement(children!, {
          ...propsName,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = getValueFormEvent(e);
            setValue(value);
            onValueChange?.(name, value);

            handleValidate(value);
          }
        });

  const cls = clsx('ant-form-item', className);

  return (
    <div
      className={cls}
      style={style}>
      <div>{label && <label>{label}</label>}</div>
      <div>
        {childEle}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default Item;
