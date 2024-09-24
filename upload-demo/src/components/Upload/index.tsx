import { useRef, useState } from 'react';
import axios from 'axios';
import './index.css';
import UploadList, { UploadFile } from './UploadList';
import Dragger from './Dragger';

export interface UploadProps {
  action: string;
  headers?: Record<string, any>;
  name?: string;
  data?: Record<string, any>;
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  drag?: boolean;
}

const Upload = (props: UploadProps) => {
  const {
    action,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    drag
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prev) => {
      return prev.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => {
      return prev.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  const post = (file: File) => {
    const uploadFile: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    };

    setFileList((prev) => [...prev, uploadFile]);

    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total!) || 0;
          if (percentage < 100) {
            updateFileList(uploadFile, { status: 'uploading', percent: percentage });

            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        }
      })
      .then((res) => {
        updateFileList(uploadFile, { status: 'success', response: res.data });

        onSuccess?.(res.data, file);
        onChange?.(file);
      })
      .catch((err) => {
        updateFileList(uploadFile, { status: 'error', error: err });

        onError?.(err, file);
        onChange?.(file);
      });
  };

  return (
    <div className="upload-wrapper">
      <div
        className="upload-input"
        onClick={handleClick}>
        {drag ? <Dragger onFile={(files) => uploadFiles(files)}>{children}</Dragger> : children}
        <input
          type="file"
          className="upload-file-input"
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          hidden
        />
      </div>
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default Upload;
