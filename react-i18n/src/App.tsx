import React, { useEffect } from 'react';
import type { FormProps, ValidateErrorEntity } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useIntl, defineMessages } from 'react-intl';
import getMessage from './getMessage';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: ValidateErrorEntity<FieldType>) => {
  console.log('Failed:', errorInfo);
};

const messages = defineMessages({
  username: {
    id: 'username',
    defaultMessage: '用户名',
    description: '用户名',
  },
  password: {
    id: 'password',
    defaultMessage: '密码',
    description: '密码',
  },
  rememberMe: {
    id: 'rememberMe',
    defaultMessage: '记住我',
    description: '记住我',
  },
  submit: {
    id: 'submit',
    defaultMessage: '提交',
    description: '提交',
  },
  inputYourUsername: {
    id: 'inputYourUsername',
    defaultMessage: '请输入用户名！',
    description: '请输入用户名！',
  },
  inputYourPassword: {
    id: 'inputYourPassword',
    defaultMessage: '请输入密码！',
    description: '请输入密码！',
  },
});

const App: React.FC = () => {
  const intl = useIntl();

  // useEffect(() => {
  //   setTimeout(() => {
  //     alert(getMessage());
  //   }, 2000);
  // }, []);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<FieldType>
        label={intl.formatMessage(messages.username)}
        name="username"
        rules={[{ required: true, message: intl.formatMessage(messages.inputYourUsername) }]}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label={intl.formatMessage(messages.password)}
        name="password"
        rules={[{ required: true, message: intl.formatMessage(messages.inputYourPassword) }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>{intl.formatMessage(messages.rememberMe)}</Checkbox>
      </Form.Item>

      <div>
        日期：
        <div>{intl.formatDate(new Date(), { weekday: 'long' })}</div>
        <div>{intl.formatDate(new Date(), { weekday: 'short' })}</div>
        <div>{intl.formatDate(new Date(), { weekday: 'narrow' })}</div>
        <div>{intl.formatDate(new Date(), { dateStyle: 'full' })}</div>
        <div>{intl.formatDate(new Date(), { dateStyle: 'long' })}</div>
      </div>
      <div>
        相对时间：
        <div>{intl.formatRelativeTime(200, 'hour')}</div>
        <div>{intl.formatRelativeTime(-10, 'minute')}</div>
      </div>
      <div>
        数字：
        <div>
          {intl.formatNumber(200000, {
            style: 'currency',
            currency: intl.locale.includes('en') ? 'USD' : 'CNY',
          })}
        </div>
        <div>
          {intl.formatNumber(10000, {
            style: 'unit',
            unit: 'meter',
          })}
        </div>
      </div>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit">
          {intl.formatMessage(messages.submit)}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
