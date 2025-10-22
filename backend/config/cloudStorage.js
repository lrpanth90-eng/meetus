const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

const initGridFS = () => {
  const conn = mongoose.connection;
  conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('GridFS initialized for cloud storage');
  });
};

const getGFS = () => gfs;

module.exports = { initGridFS, getGFS };
