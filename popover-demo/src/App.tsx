import './App.css';
import Popover from './Popover';

function App() {
  const popoverContent = (
    <div>
      <p>Popover content</p>
      <p>Popover content</p>
      <p>Popover content</p>
    </div>
  );

  return (
    <>
      <Popover
        content={popoverContent}
        placement="bottom"
        trigger="hover"
        style={{ margin: '200px' }}
      >
        <button>Click me</button>
      </Popover>
    </>
  );
}

export default App;
