import { createIntl, defineMessages } from 'react-intl';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

const messages: Record<string, any> = {
  'en-US': enUS,
  'zh-CN': zhCN,
};

const locale = 'zh-CN';
const intl = createIntl({
  locale,
  messages: messages[locale],
});

const defines = defineMessages({
  inputYourUserName: {
    id: 'inputYourUserName',
    defaultMessage: '请输入用户名！',
  },
});

export default function () {
  return intl.formatMessage(defines.inputYourUserName);
}
