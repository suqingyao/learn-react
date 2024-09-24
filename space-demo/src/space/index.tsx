import clsx from 'clsx';
import React, { Fragment, useContext } from 'react';
import './index.scss';
import { ConfigContext } from './config-provider';

export type SizeType = 'small' | 'medium' | 'large' | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: React.ReactNode;
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  medium: 16,
  large: 24
};

function getNumberSize(size: SizeType) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

export const Space = (props: SpaceProps) => {
  const { space } = useContext(ConfigContext);
  const {
    className,
    style,
    size = space?.size || 'small',
    direction = 'horizontal',
    align,
    split,
    wrap = false,
    children,
    ...rest
  } = props;

  const childNodes = React.Children.toArray(children);

  const mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align;

  const otherStyles: React.CSSProperties = {};

  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      (Array.isArray(size) ? size : ([size, size] as [SizeType, SizeType])).map((item) =>
        getNumberSize(item)
      ),
    [size]
  );

  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  if (wrap) {
    otherStyles.flexWrap = 'wrap';
  }

  const cn = clsx(
    'space',
    `space-${direction}`,
    {
      [`space-${mergedAlign}`]: mergedAlign
    },
    className
  );

  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`;
    return (
      <Fragment key={key}>
        <div className="space-item">{child}</div>
        {i < childNodes.length - 1 && split && (
          <span
            className={`${className}-split`}
            style={style}
          >
            {split}
          </span>
        )}
      </Fragment>
    );
  });

  return (
    <div
      className={cn}
      style={{
        ...otherStyles,
        ...style
      }}
      {...rest}
    >
      {nodes}
    </div>
  );
};
