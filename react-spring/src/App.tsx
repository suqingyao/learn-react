import { animated, useSpringValue, useSpring } from '@react-spring/web';

import './App.css';
import { useEffect } from 'react';
import Demo from './Demo';
import Grid from './Grid';

function App() {
  const width = useSpringValue(0, {
    config: {
      // duration: 2000
      mass: 2,
      friction: 10,
      tension: 200
    }
  });

  const styles = useSpring({
    from: {
      width: 0,
      height: 0
    },
    to: {
      width: 200,
      height: 200
    },
    config: {
      duration: 2000
    }
  });

  useEffect(() => {
    width.start(300);
  }, []);

  const [styles2, api] = useSpring(() => {
    return {
      from: {
        width: 100,
        height: 100
      },
      config: {
        // duration: 2000
        mass: 2,
        friction: 10,
        tension: 100
      }
    };
  });

  function clickHandler() {
    api.start({
      width: 300,
      height: 300
    });
  }

  return (
    <>
      <animated.div
        className="box"
        style={{ width }}
      ></animated.div>

      <animated.div
        className="box"
        style={styles}
      ></animated.div>

      <animated.div
        className="box"
        style={styles2}
        onClick={clickHandler}
      ></animated.div>
      <Demo />

      <Grid />
    </>
  );
}

export default App;
