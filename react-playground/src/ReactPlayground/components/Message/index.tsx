import classnames from 'classnames';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

export interface MessageProps {
  type: 'error' | 'warn';
  content: string;
}

export const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!visible);
  }, [content]);

  return (
    <div className={classnames(styles.msg, styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button
        className={styles.dismiss}
        onClick={() => setVisible(false)}
      >
        ×
      </button>
    </div>
  );
};
