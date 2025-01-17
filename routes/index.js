var express = require('express');
const multer = require("multer");
const path = require("path");
const { exec } = require('child_process');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Elektropolnilnice i-+' });
});

router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' })
});

// set up storage engine and file validation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directory where the images will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
})

// POST route to handle the upload
router.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  if (req.file) {
    //Path to the uploaded image file
    const imagePath = req.file.path;
    const pyScript = `python ./python/test.py "${imagePath}"`
    // Execute the Python script
    exec(pyScript, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return res.status(500).json({
          message: 'Error processing image',
        });
      }

      if (stderr) {
        console.error(`Python script stderr: ${stderr}`);
      }

      console.log(`Python script stdout: ${stdout}`);

      res.status(200).json({
        message: 'Image uploaded and processed successfully',
        pythonOutput: stdout, // Output from the Python script
        file: req.file,
      });
    });
    // res.status(200).json({
    //   message: 'Image uploaded successfully',
    //   file: req.file,
    // });
  } else {
    res.status(400).json({
      message: 'Failed to upload image',
    });
  }
});


module.exports = router;
