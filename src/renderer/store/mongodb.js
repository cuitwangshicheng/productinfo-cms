function mongodbModel (dbname) {
  let MongoClient
  let DB_CONN_STR
  this.init = function () {
    MongoClient = require('mongodb').MongoClient
    DB_CONN_STR = 'mongodb://localhost:27017/'
  }
  /* 这里是插入单条数据 */
  this.insertOne = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      collection.insertOne(data, (err, result) => {
        callback(err, result)
      })
    })
  }
  /* 这里是插入多条数据 */
  this.insertMany = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      collection.insertMany(data, (err, result) => {
        callback(err, result)
      })
    })
  }
  /* 这里是删除一条数据 */
  this.deleteOne = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      collection.deleteOne(data, function (err, result) {
        callback(err, result)
      })
    })
  }
  /* 这里是删除多条数据 */
  this.deleteMany = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      collection.deleteMany(data, function (err, result) {
        callback(err, result)
      })
    })
  }
  /* 这里是修改一条数据 */
  this.updateOne = function (data, updata, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      const updateStr = {$set: updata}
      collection.updateOne(data, updateStr, function (err, data) {
        callback(err, data)
      })
    })
  }
  /* 这里是修改多条数据 */
  this.update = function (data, updata, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      const updateStr = {$set: updata}
      collection.updateMany(data, updateStr, function (err, data) {
        callback(err, data)
      })
    })
  }
  /* 这里是查询 */
  this.find = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      var collection = db.collection()
      collection.find(data).toArray(function (err, data) {
        callback(err, data)
      })
    })
  }
}

module.exports = mongodbModel
