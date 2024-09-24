// import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyToClipboard from './components/CopyToClipboard';

function App() {
  return (
    <>
      <CopyToClipboard
        text="我也算好过"
        onCopy={() => {
          console.log('复制成功');
        }}
      >
        <div>Copy</div>
      </CopyToClipboard>
    </>
  );
}

export default App;
