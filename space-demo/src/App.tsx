import './App.css';
import { Space } from './space';
import { ConfigProvider } from './space/config-provider';

function App() {
  return (
    <>
      <ConfigProvider space={{ size: 20 }}>
        <Space direction="horizontal">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
        <Space direction="vertical">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </ConfigProvider>
    </>
  );
}

export default App;
