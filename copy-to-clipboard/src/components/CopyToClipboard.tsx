import React, { ReactElement, cloneElement } from 'react';
import copy from 'copy-to-clipboard';

type CopyToClipboardProps = {
  text: string;
  onCopy?: (text: string, result: boolean) => void;
  children?: ReactElement;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string;
  };
};

const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { text, onCopy, children, options } = props;

  const ele = React.Children.only(children)!;

  const onClick = (event: MouseEvent) => {
    const result = copy(text, options);

    onCopy?.(text, result);

    if (typeof ele?.props?.onClick === 'function') {
      ele.props.onClick(event);
    }
  };
  return cloneElement(ele, {
    onClick
  });
};

export default CopyToClipboard;
