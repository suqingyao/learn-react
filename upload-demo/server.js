import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import process from 'process';

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'));
    } catch (error) {
      console.log(error);
    }

    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ dest: 'uploads/', storage });

app.post('/upload', upload.single('file'), function (req, res) {
  console.log('req.file', req.file);
  console.log('req.body', req.body);

  res.send(
    JSON.stringify({
      message: 'success'
    })
  );
});

app.listen(8888);
