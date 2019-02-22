<template>
    <div class="page">
        <div class="content">
            <div class="search-bar">
                <el-form :inline="true"
                         :model="formInline">
                    <el-input v-model="formInline.pSeriesNum"
                              placeholder="请输入项目编号"></el-input>
                    <el-select v-model="formInline.pLevel"
                               filterable
                               placeholder="请选择项目类别">
                        <el-option v-for="item in levelList"
                                   :key="item"
                                   :value="item"
                                   :label="item">
                        </el-option>
                    </el-select>
                    <el-button type="primary">查询</el-button>
                    <el-button>重置</el-button>
                </el-form>
                <div class="suffix">

                </div>
            </div>
            <div class="main">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                >
                    <el-table-column
                            prop="pSeriesNum"
                            label="项目编号"
                            sortable
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="pLevel"
                            label="项目类别"
                            sortable
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="150">
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="pageSizes"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </div>
        <div class="btn-area">
            <el-button @click="goBack">返回</el-button>
            <el-button @click="exportExcel" type="primary">导出excel</el-button>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        // 查询
        formInline: {
          pSeriesNum: '',
          pLevel: ''
        },
        levelList: ['司局级', '省部级', '国家级', '其他'],
        // 表格
        tableData: [
          {
            id: 1,
            pSeriesNum: '001',
            pLevel: '司局级'
          },
          {
            id: 2,
            pSeriesNum: '002',
            pLevel: '省部级'
          }
        ],
        currentPage: 1,
        pageSizes: [100, 200, 300, 400],
        pageSize: 100
      }
    },
    methods: {
      // 表格
      formatter (row, column, cellValue, index) {
        if (cellValue === undefined || cellValue === null || cellValue === '') {
          return '--'
        } else {
          return cellValue
        }
      },
      // 分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      // 返回
      goBack () {
        this.$router.go(-1)
      },
      // 导出excel
      exportExcel () {
        this.$db.find({}, (err, r) => {
          if (err) {
            alert('查询数据异常，请稍后再试')
            return false
          }
          let option = {}
          option.fileName = '项目信息汇总' + new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
          let datas = []
          let rowDatas = []
          r.map(item => {
            delete item._id
            let colDatas = []
            for (let i in item) {
              console.log(i)
              console.log('--------')
              if (i === 'pCheckFlag') {
                if (item[i] === false) {
                  colDatas.push('未验收')
                } else if (item[i] === true) {
                  colDatas.push('已验收')
                } else {
                  colDatas.push('')
                }
              } else if (i === 'pPrideFlag') {
                if (item[i] === false) {
                  colDatas.push('未获奖')
                } else if (item[i] === true) {
                  colDatas.push('获奖')
                } else {
                  colDatas.push('')
                }
              } else if (i === 'pOtherCompanyFlag') {
                if (item[i] === false) {
                  colDatas.push('有')
                } else if (item[i] === true) {
                  colDatas.push('无')
                } else {
                  colDatas.push('')
                }
              } else {
                colDatas.push(item[i])
              }
            }
            rowDatas.push(colDatas)
          })
          datas.push({
            sheetData: rowDatas,
            sheetHeader: ['项目编号', '项目名称', '项目负责人', '项目级别', '项目类别', '承担单位', '立项年份', '研究起始日期', '研究结束日期', '经费（万元）', '参加人员', '是否有合作单位', '合作单位名称', '是否验收', '验收时间', '是否获奖', '获奖情况', '项目简介']
          })
          option.datas = datas
          console.log(option)
          const ExportJsonExcel = require('js-export-excel')
          new ExportJsonExcel(option).saveExcel()
        })
      },
      // 格式化excel数据
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }
</script>

<style scoped lang="scss">
    .page {
        padding: 20px;
        .content {
            .search-bar {
                .el-form {
                    float: left;
                    font-size: 0;
                    .el-input,
                    .el-select {
                        width: 200px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
                .suffix {
                    float: right;
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
            .main {
                border: 1px solid #ebebeb;
                margin-top: 20px;
                .el-table {
                    min-height: 500px;
                }
                .el-pagination {
                    float: right;
                    padding: 20px 0;
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
        .btn-area {
            text-align: center;
            margin-top: 20px;
        }
    }
</style>