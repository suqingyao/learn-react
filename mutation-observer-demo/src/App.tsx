import { useEffect, useState } from 'react';
import MutationObserver from './components/MutationObserver';

function App() {
  const [className, setClassName] = useState('aaa');

  useEffect(() => {
    setTimeout(() => {
      setClassName('bbb');
    }, 3000);
  }, []);

  const callback = (mutations: MutationRecord[]) => {
    console.log(mutations);
  };

  return (
    <div>
      <MutationObserver onMutate={callback}>
        <div id="container">
          {className === 'aaa' ? (
            <div>aaa</div>
          ) : (
            <div>
              <p>bbb</p>
            </div>
          )}
        </div>
      </MutationObserver>
    </div>
  );
}

export default App;
