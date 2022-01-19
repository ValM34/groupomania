const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
/*
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
*/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'images')
  },
  filename: function (req, file, cb) {

      var getFileExt = function(fileName){
          var fileExt = fileName.split(".");
          if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
              return "";
          }
          return fileExt.pop();
      }
      cb(null, Date.now() + '.' + getFileExt(file.originalname))
  }
})


module.exports = multer({storage: storage}).single('image');