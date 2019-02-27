<template>
    <div class="page">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>科研项目信息检索</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="search-bar">
                <el-form size="mini"
                         :inline="true"
                         :model="formObj">
                    <el-form-item>
                        <el-input v-model="formObj.pSeriesNum"
                                  placeholder="请输入项目编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formObj.pName"
                                  placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formObj.pType" placeholder="请输入项目类别"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formObj.pCharge"
                                  placeholder="请输入项目负责人"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formObj.pLevel"
                                   filterable
                                   clearable
                                   default-first-option
                                   placeholder="请选择项目级别">
                            <el-option v-for="item in levelList"
                                       :key="item"
                                       :value="item"
                                       :label="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formObj.pOrg"
                                   filterable
                                   clearable
                                   default-first-option
                                   placeholder="请选择承担单位">
                            <el-option v-for="item in orgList"
                                       :key="item"
                                       :label="item"
                                       :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formObj.pYear"
                                   filterable
                                   clearable
                                   default-first-option
                                   placeholder="请选择立项年份">
                            <el-option v-for="item in yearList"
                                       :key="item"
                                       :label="item"
                                       :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="formObj.pStartDate" placeholder="请选择研究起始日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="formObj.pEndDate" placeholder="请选择研究结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formObj.pCheckYear"
                                   clearable
                                   filterable
                                   default-first-option
                                   placeholder="请选择验收年份">
                            <el-option v-for="item in yearList"
                                       :key="item"
                                       :label="item"
                                       :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchInfo">查询</el-button>
                        <el-button @click="resetSearch">重置</el-button>
                    </el-form-item>
                </el-form>
                <div class="suffix">

                </div>
            </div>
            <el-form class="operate-bar" size="mini" :inline="true">
                <el-form-item>
                    <el-button @click="exportExcel" type="primary">导出excel</el-button>
                </el-form-item>
                <el-form-item>
                    <el-upload
                            ref="upload"
                            action="/wm/upload/"
                            :show-file-list="false"
                            :on-change="importExcel"
                            :auto-upload="false">
                        <el-button
                                type="primary"
                                :disabled="importExcelDisabled"
                                slot="trigger"
                                size="mini">
                            导入excel
                        </el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="main">
                <el-table
                        :data="tableData"
                        v-loading="tableLoading"
                        style="width: 100%"
                >
                    <el-table-column
                            label="序号"
                            type="index"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="pYear"
                            label="立项年份"
                            sortable
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            prop="pSeriesNum"
                            label="项目编号"
                            sortable
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            prop="pName"
                            label="项目名称"
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="pCharge"
                            label="项目负责人"
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="pOrg"
                            label="承担单位"
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="150">
                    </el-table-column>
                    <el-table-column
                            prop="pMoney"
                            label="经费（万元）"
                            sortable
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="150">
                    </el-table-column>
                    <el-table-column
                            prop="pLevel"
                            label="项目级别"
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="150">
                    </el-table-column>
                    <el-table-column
                            prop="pStartDate"
                            label="研究开始日期"
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="150">
                    </el-table-column>
                    <el-table-column
                            prop="pEndDate"
                            label="研究结束日期"
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="150">
                    </el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="pageSizes"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
  import XLSX from 'js-xlsx'
  export default {
    data () {
      return {
        // 查询
        formObj: {
          pSeriesNum: '',
          pName: '',
          pLevel: '',
          pType: '',
          pOrg: '',
          pCharge: '',
          pYear: '',
          pStartDate: '',
          pEndDate: '',
          pCheckYear: ''
        },
        levelList: ['司局级', '省部级', '国家级', '其他'],
        orgList: ['市局办公室', '应急与减灾处', '科技与预报处', '观测与网络处', '计划财务处', '人事处', '政策法规处', '机关党办', '党组纪检组', '离退办', '气象台', '气候中心', '信息中心', '保障中心', '气象服务中心', '气象科学研究所', '气象安全技术中心', '人工影响天气办公室', '防雷中心', '预警发布中心', '机关服务中心', '财务结算中心', '气象学会', '华云公司', '莱霆公司', '万州区气象局', '黔江区气象局', '涪陵区气象局', '沙坪坝区气象局', '北碚区气象局', '渝北区气象局', '巴南区气象局', '长寿区气象局', '江津区气象局', '合川区气象局', '永川区气象局', '南川区气象局', '綦江区气象局', '大足区气象局', '璧山区气象局', '铜梁区气象局', '潼南区气象局', '荣昌区气象局', '开州区气象局', '梁平区气象局', '武隆区气象局', '城口县气象局', '丰都县气象局', '垫江县气象局', '忠县气象局', '云阳县气象局', '奉节县气象局', '巫山县气象局', '巫溪县气象局', '石柱县气象局', '秀山县气象局', '酉阳县气象局', '彭水县气象局', '万盛经开区气象局'],
        yearList: [],
        startYear: 1949,
        lastParams: {},
        // 表格
        tableLoading: false,
        tableData: [],
        page: 1,
        pageSizes: [20, 40, 60, 80, 100],
        pageSize: 20,
        total: 0,
        // excel
        importExcelDisabled: false,
        sheetFilterArr: ['pSeriesNum', 'pName', 'pCharge', 'pLevel', 'pType', 'pOrg', 'pYear', 'pStartDate', 'pEndDate', 'pMoney', 'pMembers', 'pOtherCompanyFlag', 'pOtherCompanyName', 'pCheckFlag', 'pCheckTime', 'pPrideFlag', 'pPrideContent', 'pDes'],
        sheetHeaderArr: ['项目编号', '项目名称', '项目负责人', '项目级别', '项目类别', '承担单位', '立项年份', '研究起始日期', '研究结束日期', '经费（万元）', '参加人员', '是否有合作单位', '合作单位名称', '是否验收', '验收时间', '是否获奖', '获奖情况', '项目简介']
      }
    },
    mounted () {
      const currentYear = new Date().getFullYear()
      for (let i = currentYear; i >= this.startYear; i--) {
        this.yearList.push(i + '年度')
      }
      this.searchInfo()
    },
    methods: {
      // 查询
      searchInfo () {
        this.tableLoading = true
        let {
          pSeriesNum,
          pName,
          pLevel,
          pType,
          pOrg,
          pCharge,
          pYear,
          pStartDate,
          pEndDate,
          pCheckYear
        } = this.formObj
        let params = {
          pSeriesNum: {$regex: pSeriesNum},
          pName: {$regex: pName},
          pLevel: {$regex: pLevel},
          pType: {$regex: pType},
          pOrg: {$regex: pOrg},
          pCharge: {$regex: pCharge},
          pYear: {$regex: pYear},
          pCheckTime: {$regex: pCheckYear}
        }
        pStartDate = pStartDate === null ? '' : pStartDate
        pEndDate = pEndDate === null ? '' : pEndDate
        if (pStartDate !== '') {
          Object.assign(params, {
            pStartDate: {$gte: new Date(`${pStartDate} 00:00:00`).getTime() / 1000}
          })
        }
        if (pEndDate !== '') {
          Object.assign(params, {
            pEndDate: {$lte: new Date(`${pEndDate} 23:59:59`).getTime() / 1000}
          })
        }
        this.lastParams = params
        this.$db.findByPages({
          ...params
        }, this.pageSize, this.page, (err, doc) => {
          this.tableLoading = false
          console.log(err, doc)
          if (!err) {
            const {
              data,
              totalRows,
              pageSize,
              pageNo
            } = doc
            this.tableData = data
            this.total = totalRows
            this.pageSize = pageSize
            this.page = pageNo
          } else {
            this.$message({
              type: 'error',
              message: '查询失败，请稍后重试'
            })
          }
        })
      },
      resetSearch () {
        Object.assign(this.formObj, {
          pSeriesNum: '',
          pName: '',
          pLevel: '',
          pType: '',
          pOrg: '',
          pCharge: '',
          pYear: '',
          pStartDate: '',
          pEndDate: '',
          pCheckYear: ''
        })
      },
      // 导出excel
      exportExcel () {
        this.$confirm('将导出最近一次查询出的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$db.find(this.lastParams, (err, r) => {
            if (err) {
              alert('查询数据异常，请稍后再试')
              return false
            }
            let option = {}
            option.fileName = '项目信息汇总' + new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
            let datas = []
            r.map(item => {
              if (item.pOtherCompanyFlag === true) {
                item.pOtherCompanyFlag = '有'
              } else {
                item.pOtherCompanyFlag = '无'
              }
              if (item.pPrideFlag === true) {
                item.pPrideFlag = '获奖'
              } else {
                item.pPrideFlag = '未获奖'
              }
              if (item.pCheckFlag === true) {
                item.pCheckFlag = '已验收'
              } else {
                item.pCheckFlag = '未验收'
              }
              if (item.pStartDate) {
                item.pStartDate = this.formatDate(new Date(item.pStartDate * 1000), 'yyyy-MM-dd')
              }
              if (item.pEndDate) {
                item.pEndDate = this.formatDate(new Date(item.pEndDate * 1000), 'yyyy-MM-dd')
              }
            })
            datas.push({
              sheetData: r,
              sheetFilter: this.sheetFilterArr,
              sheetHeader: this.sheetHeaderArr,
              columnWidths: [4, 6, 4, 3, 4, 10, 4, 6, 6, 4, 10, 8, 10, 5, 6, 5, 10, 20]
            })
            option.datas = datas
            console.log(option)
            const ExportJsonExcel = require('js-export-excel')
            new ExportJsonExcel(option).saveExcel()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导出'
          })
        })
      },
      // 导入excel
      importExcel (file) {
        const fileReader = new FileReader()
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result
            const workbook = XLSX.read(data, {
              type: 'binary'
            })
            let sheetArray = []
            for (let sheet in workbook.Sheets) {
              sheetArray.push(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            }
            console.log(sheetArray.flat(Infinity), this.formatJson(sheetArray.flat(Infinity)))
            this.addMultiInfo(this.formatJson(sheetArray.flat(Infinity)))
          } catch (e) {
            this.$message.warning('文件类型不正确, 只支持上传excel文件')
            return false
          }
        }
        fileReader.readAsBinaryString(file.raw) // 读文件
      },
      // 格式化excel数据
      formatJson (jsonData) {
        return jsonData.map(v => {
          let obj = {}
          for (let k in v) {
            let headerIndex = this.sheetHeaderArr.indexOf(k)
            if (headerIndex >= 0) {
              let key = this.sheetFilterArr[headerIndex]
              obj[key] = this.formatItemValue(key, v[k])
            }
          }
          return obj
        })
      },
      formatItemValue (key, value) {
        let newValue
        switch (key) {
          case 'pOtherCompanyFlag':
            if (value === '有') {
              newValue = true
            } else if (value === '无') {
              newValue = false
            }
            break
          case 'pPrideFlag':
            if (value === '获奖') {
              newValue = true
            } else if (value === '未获奖') {
              newValue = false
            }
            break
          case 'pCheckFlag':
            if (value === '已验收') {
              newValue = true
            } else if (value === '未验收') {
              newValue = false
            }
            break
          case 'pStartDate':
            newValue = new Date(`${value} 00:00:00`).getTime() / 1000
            break
          case 'pEndDate':
            newValue = new Date(`${value} 23:59:59`).getTime() / 1000
            break
          default:
            newValue = value
            break
        }
        return newValue
      },
      addMultiInfo (arr) {
        this.importExcelDisabled = true
        this.$db.insertMany(arr, (err, doc) => {
          this.importExcelDisabled = false
          if (err) {
            this.$message({
              type: 'error',
              message: '导入excel失败，请稍后重试'
            })
          } else {
            console.log(doc)
            this.$message({
              type: 'success',
              message: '导入excel成功'
            })
            this.handleCurrentChange(1)
          }
        })
      },
      // 表格
      formatter (row, column, cellValue, index) {
        if (cellValue === undefined || cellValue === null || cellValue === '') {
          return '--'
        } else {
          let returnValue
          switch (column.property) {
            case 'pStartDate':
            case 'pEndDate':
              returnValue = this.formatDate(new Date(cellValue * 1000), 'yyyy-MM-dd')
              break
            default:
              returnValue = cellValue
              break
          }
          return returnValue
        }
      },
      formatDate (date, fmt) {
        var o = {
          'M+': date.getMonth() + 1, // 月份
          'd+': date.getDate(), // 日
          'h+': date.getHours(), // 小时
          'm+': date.getMinutes(), // 分
          's+': date.getSeconds(), // 秒
          'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
          'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      },
      // 删除
      handleDelete (index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDeleteSure(index, row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleDeleteSure (index, row) {
        this.$db.deleteOne(row, (err, doc) => {
          console.log(err, doc)
          if (!err) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.handleCurrentChange(1)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败，请稍后重试'
            })
          }
        })
      },
      // 编辑
      handleEdit (index, row) {
        this.$router.push(`/edit/${row._id.toString()}`)
      },
      // 分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.page = 1
        this.pageSize = val
        this.searchInfo()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.page = val
        this.searchInfo()
      }
    }
  }
</script>

<style scoped lang="scss">
    .page {
        padding: 20px;
        .content {
            margin-top: 20px;
            .search-bar {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            .operate-bar {
                font-size: 0;
                padding-top: 18px;
                border: 1px solid #ebebeb;
                border-bottom: none;
                padding-left: 10px;
            }
            .main {
                border: 1px solid #ebebeb;
                .el-pagination {
                    float: right;
                    padding: 20px;
                }
                &:after {
                    display: block;
                    content: '';
                    clear: both;
                    width: 0;
                    height: 0;
                    visibility: hidden;
                }
            }
        }
    }
</style>