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
  this.insertOne = function (file, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      let dbo = db.db(dbname)
      let bucket = new MongoDB.GridFSBucket(dbo)
      fs.createReadStream(path.resolve(file.path))
        .pipe(bucket.openUploadStream(file.name))
        .on('error', (error) => {
          callback(error)
        }).on('finish', (res) => {
          const error = false
          callback(error, res)
        })
    })
  }
}

module.exports = filedbModel
