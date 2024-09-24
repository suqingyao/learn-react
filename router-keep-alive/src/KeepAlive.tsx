import { createContext, useContext } from 'react';
import { matchPath, useLocation, useOutlet } from 'react-router-dom';

interface KeepAliveProps {
  keepPaths: Array<string | RegExp>;
  keepElements: Record<string, React.ReactNode>;
  dropByPath?: (path: string) => void;
  children?: React.ReactNode;
}

type KeepAliveContext = Omit<Required<KeepAliveProps>, 'children'>;

const keepElements: KeepAliveContext['keepElements'] = {};

export const KeepAliveContext = createContext<KeepAliveContext>({
  keepPaths: [],
  keepElements,
  dropByPath(path) {
    keepElements[path] = null;
  }
});

const isKeepPath = (keepPaths: string[] | RegExp[], path: string) => {
  let isKeep = false;
  for (let i = 0; i < keepPaths.length; i++) {
    const item = keepPaths[i];
    if (item === path) {
      isKeep = true;
    }
    if (item instanceof RegExp && item.test(path)) {
      isKeep = true;
    }

    if (typeof item === 'string' && item.toLowerCase() === path) {
      isKeep = true;
    }
  }
  return isKeep;
};

export function useKeepOutlet() {
  const location = useLocation();
  const element = useOutlet();

  const { keepElements, keepPaths } = useContext(KeepAliveContext);
  const isKeep = isKeepPath(keepPaths, location.pathname);

  if (isKeep) {
    keepElements[location.pathname] = element;
  }

  return (
    <>
      {Object.entries(keepElements).map(([pathname, element]) => (
        <div
          key={pathname}
          style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' }}
          className="keep-alive-page"
          hidden={!matchPath(location.pathname, pathname)}>
          {element}
        </div>
      ))}

      {!isKeep && element}
    </>
  );
}

const KeepAlive = (props: KeepAliveProps) => {
  const { keepPaths, ...restProps } = props;

  const { keepElements, dropByPath } = useContext(KeepAliveContext);
  return (
    <KeepAliveContext.Provider
      value={{ keepPaths, keepElements, dropByPath }}
      {...restProps}
    />
  );
};

export default KeepAlive;
