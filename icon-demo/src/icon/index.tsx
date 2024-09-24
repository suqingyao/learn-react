import { PropsWithChildren, forwardRef } from 'react';
import clsx from 'clsx';
import './index.scss';

type BaseIconProps = {
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean;
};

export const getSize = (size: IconProps['size']) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[];
  }

  const width = (size as string) ?? '1em';
  const height = (size as string) ?? '1em';
  return [width, height];
};

export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGSVGElement>, keyof BaseIconProps>;

export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((props, ref) => {
  const { className, style, size, spin, children, ...rest } = props;

  const [width, height] = getSize(size);

  const cs = clsx(
    'icon',
    {
      'icon-spin': spin
    },
    className
  );

  return (
    <svg
      ref={ref}
      style={style}
      className={cs}
      width={width}
      height={height}
      fill="currentColor"
      {...rest}
    >
      {children}
    </svg>
  );
});
