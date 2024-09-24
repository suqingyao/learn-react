import { useEffect, useRef } from 'react';
import Portal from './components/Portal';

function App() {
  const ref = useRef();
  const content = (
    <div className="btn">
      <button>on click</button>
    </div>
  );

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return <Portal ref={ref}>{content}</Portal>;
}

export default App;
