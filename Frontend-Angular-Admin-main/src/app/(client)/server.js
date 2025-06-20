const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Cấu hình multer để lưu file vào thư mục uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(cors());
app.use('/uploads', express.static('uploads')); // để truy cập ảnh
app.use(express.json()); // chỉ dùng cho JSON request (không phải form-data)

let users = [];

app.post('/users', upload.single('avatar'), (req, res) => {
  try {
    const { fullName, phone, dob, email, password } = req.body;

    if (!fullName || !phone || !dob || !email || !password) {
      return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
    }

    const avatar = req.file?.filename || null;

    const newUser = {
      id: Date.now(),
      fullName,
      phone,
      dob,
      email,
      password,
      avatar
    };

    users.push(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Lỗi server:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
