import styles from './index.module.scss';

import logoSvg from './icons/logo.svg';
import { useContext } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { DownOutlined, MoonOutlined, ShareAltOutlined, SunOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { message } from 'antd';
import { downloadFiles } from '../../utils';

export default function Header() {
  const { theme, setTheme, files } = useContext(PlaygroundContext);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img
          alt="logo"
          src={logoSvg}
        />
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
        {theme === 'light' && (
          <MoonOutlined
            title="切换为暗黑模式"
            className={styles.theme}
            onClick={() => setTheme('dark')}
          />
        )}
        {theme === 'dark' && (
          <SunOutlined
            title="切换为亮色模式"
            className={styles.theme}
            onClick={() => setTheme('light')}
          />
        )}
        <ShareAltOutlined
          style={{ marginLeft: '10px' }}
          onClick={() => {
            copy(window.location.href);
            message.success('链接已复制到剪贴板');
          }}
        />
        <DownOutlined
          style={{ marginLeft: '10px' }}
          onClick={async () => {
            await downloadFiles(files);
            message.success('文件已下载');
          }}
        />
      </div>
    </div>
  );
}
