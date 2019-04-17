function mongodbModel (dbname) {
  let MongoClient
  let DB_CONN_STR
  let MongoDB = require('mongodb')
  let fs = require('fs')
  let path = require('path')
  this.init = function () {
    MongoClient = MongoDB.MongoClient
    DB_CONN_STR = 'mongodb://localhost:27017/'
  }
  // 插入文件
  const insertFile = function (file) {
    const dbname = 'fileDB'
    return new Promise((resolve, reject) => {
      MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
        if (err) {
          throw err
        }
        let dbo = db.db(dbname) // 文件表
        let bucket = new MongoDB.GridFSBucket(dbo)
        fs.createReadStream(path.resolve(file.path))
          .pipe(bucket.openUploadStream(file.name))
          .on('error', (error) => {
            reject(error)
          }).on('finish', (res) => {
            resolve({
              code: 0,
              msg: res
            })
          })
      })
    })
  }
  // 删除文件
  const removeFile = function (file) {
    const dbname = 'fileDB'
    return new Promise((resolve, reject) => {
      MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
        if (err) {
          throw err
        }
        let dbo = db.db(dbname) // 数据库
        dbo.collection('fs.chunks').deleteOne({files_id: file._id}, function (err, result) {
          if (err) {
            reject(err)
          } else {
            dbo.collection('fs.files').deleteOne({_id: file._id}, function (err, result) {
              if (err) {
                reject(err)
              } else {
                resolve({
                  code: 0,
                  msg: result
                })
              }
            })
          }
        })
      })
    })
  }
  /* 这里是插入单条数据 */
  this.insertOne = async function (data, callback) {
    if (data.pTaskBook.length > 0) {
      const res = await insertFile(data.pTaskBook[0].raw)
      let {
        code,
        msg
      } = res
      if (code === 0) {
        console.log('上传任务书成功')
        Object.assign(data.pTaskBook[0], {
          _id: msg._id
        })
      } else {
        throw res
      }
    }
    if (data.pCheckData.length > 0) {
      const res = await insertFile(data.pCheckData[0].raw)
      let {
        code,
        msg
      } = res
      if (code === 0) {
        console.log('上传验收材料成功')
        Object.assign(data.pCheckData[0], {
          _id: msg._id
        })
      } else {
        throw res
      }
    }
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
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
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
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
  this.deleteOne = async function (data, callback) {
    const dataTaskBook = data.pTaskBook
    const dataCheckData = data.pCheckData
    // 删除任务书
    if (dataTaskBook.length > 0) {
      const res = await removeFile({_id: dataTaskBook[0]._id})
      const {
        code,
        msg
      } = res
      if (code === 0) {
        console.log('删除任务书成功', msg)
      } else {
        throw res
      }
    }
    // 删除验收材料
    if (dataCheckData.length > 0) {
      const res = await removeFile({_id: dataCheckData[0]._id})
      const {
        code,
        msg
      } = res
      if (code === 0) {
        console.log('删除验收材料成功', msg)
      } else {
        throw res
      }
    }
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
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
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
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
  this.updateOne = async function (data, updata, callback) {
    const dataTaskBook = data.pTaskBook
    const updataTaskBook = updata.pTaskBook
    // 需要删除旧任务书
    if (dataTaskBook.length > 0 && (updataTaskBook.length === 0 || updataTaskBook[0]._id === undefined)) {
      const res = await removeFile({_id: dataTaskBook[0]._id})
      const {
        code,
        msg
      } = res
      if (code === 0) {
        console.log('删除任务书成功', msg)
      } else {
        throw res
      }
    }
    // 需要上传新任务书
    if (updataTaskBook.length > 0 && updataTaskBook[0]._id === undefined) {
      const res = await insertFile(updataTaskBook[0].raw)
      let {
        code,
        msg
      } = res
      if (code === 0) {
        console.log('上传任务书成功')
        Object.assign(updataTaskBook[0], {
          _id: msg._id
        })
      } else {
        throw res
      }
    }
    const dataCheckData = data.pCheckData
    const updataCheckData = updata.pCheckData
    // 需要删除旧验收材料
    if (dataCheckData.length > 0 && (updataCheckData.length === 0 || updataCheckData[0]._id === undefined)) {
      const res = await removeFile({_id: dataCheckData[0]._id})
      const {
        code,
        msg
      } = res
      if (code === 0) {
        console.log('删除验收材料成功', msg)
      } else {
        throw res
      }
    }
    // 需要上传新验收材料
    if (updataCheckData.length > 0 && updataCheckData[0]._id === undefined) {
      const res = await insertFile(updataCheckData[0].raw)
      let {
        code,
        msg
      } = res
      if (code === 0) {
        console.log('上传验收材料成功')
        Object.assign(updataCheckData[0], {
          _id: msg._id
        })
      } else {
        throw res
      }
    }
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
      if (err) {
        throw err
      }
      const dbo = db.db(dbname)
      const collection = dbo.collection(dbname)
      const updateStr = {$set: updata}
      collection.updateOne({_id: data._id}, updateStr, function (err, data) {
        callback(err, data)
      })
    })
  }
  /* 这里是修改多条数据 */
  this.update = function (data, updata, callback) {
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
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
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
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
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, function (err, db) {
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
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, (err, db) => {
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
    MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true}, (err, db) => {
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
