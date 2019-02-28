function mongodbModel (dbname) {
  let MongoClient
  let DB_CONN_STR
  let fileDB
  this.init = function () {
    MongoClient = require('mongodb').MongoClient
    DB_CONN_STR = 'mongodb://localhost:27017/'
    const FileDB = require('./filedb')
    fileDB = new FileDB('fileDB')
    fileDB.init()
  }
  /* 这里是插入单条数据 */
  this.insertOne = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      if (data.pTaskBook.length > 0) {
        fileDB.insertOne(data.pTaskBook[0].raw, (err, res) => {
          console.log(err, res)
          data.pTaskBook.push(res._id.toString())
          collection.insertOne(data, (err, result) => {
            callback(err, result)
          })
        })
      } else {
        collection.insertOne(data, (err, result) => {
          callback(err, result)
        })
      }
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
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      collection.find(data).toArray(function (err, data) {
        callback(err, data)
      })
    })
  }
  /* 这里是查询指定条数 */
  /* data-查询条件；num-需要返回的条数 */
  this.findLimitNum = function (data, num, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      collection.find(data).limit(num).toArray(function (err, data) {
        callback(err, data)
      })
    })
  }
  /* 分页查询 */
  /* queryStr-查询条件；pageNo-当前页数；-pageSize-每页条数 */
  this.findByPages = function (queryStr, pageSize = 10, pageNo = 1, callback) {
    MongoClient.connect(DB_CONN_STR, (err, db) => {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      collection.find(queryStr).skip((pageNo - 1) * pageSize).limit(pageSize).toArray((err, data) => {
        let res = {
          data: data
        }
        this.find(queryStr, (error, list) => {
          if (error) {
            throw error
          }
          res.pageNo = pageNo
          res.pageSize = pageSize
          res.totalRows = list.length
          res.totalPages = Math.ceil(list.length / pageSize)
          callback(err, res)
        })
      })
    })
  }
  /* 查询总条数 */
  /* data-查询条件 */
  this.findCount = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, (err, db) => {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      collection.find(data).count().toArray((err, data) => {
        callback(err, data)
      })
    })
  }
}

module.exports = mongodbModel
