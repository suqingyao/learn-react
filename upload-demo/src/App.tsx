import { UploadOutlined } from '@ant-design/icons';

import { Button } from 'antd';
import Upload, { UploadProps } from './components/Upload';
import './App.css';

const props: UploadProps = {
  name: 'file',
  action: 'http://127.0.0.1:8888/upload',
  headers: {},
  beforeUpload(file) {
    if (file.name.includes('1.image')) {
      return false;
    }
    return true;
  },
  onSuccess(ret) {
    console.log('onSuccess', ret);
  },
  onError(err) {
    console.log('onError', err);
  },
  onProgress(percentage) {
    console.log('onProgress', percentage);
  },
  onChange(file) {
    console.log('onChange', file);
  }
};

function App() {
  return (
    <Upload
      {...props}
      drag>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
}

export default App;
