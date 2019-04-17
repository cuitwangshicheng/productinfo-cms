function filedbModel (dbname) {
  let MongoClient
  let DB_CONN_STR
  let MongoDB = require('mongodb')
  let fs = require('fs')
  let path = require('path')
  this.init = function () {
    MongoClient = MongoDB.MongoClient
    DB_CONN_STR = 'mongodb://localhost:27017/'
  }
  /* 这里是插入单条数据 */
  this.insertOne = function (file) {
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
      if (err) {
        throw err
      }
      let dbo = db.db(dbname)
      let bucket = new MongoDB.GridFSBucket(dbo)
      fs.createReadStream(path.resolve(file.path))
        .pipe(bucket.openUploadStream(file.name))
        .on('error', (error) => {
          return {
            code: -1,
            msg: error
          }
        }).on('finish', (res) => {
          return {
            code: 0,
            msg: res
          }
        })
    })
  }
  /* 这里是根据文件id查找 */
  this.findById = function (file, filepath, callback) {
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
      if (err) {
        throw err
      }
      let dbo = db.db(dbname)
      let bucket = new MongoDB.GridFSBucket(dbo)
      bucket.openDownloadStream(file._id)
        .pipe(fs.createWriteStream(path.resolve(filepath, file.name)))
        .on('error', (error) => {
          let obj = {
            code: -1,
            res: error
          }
          callback(obj)
        }).on('finish', (res) => {
          let obj = {
            code: 0,
            res
          }
          callback(obj)
        })
    })
  }
}

module.exports = filedbModel
