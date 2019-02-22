<template>
    <div class="page">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
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
                    <el-form size="mini" :inline="true">
                        <el-form-item>
                            <el-button @click="exportExcel" type="primary">导出excel</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="main">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                >
                    <el-table-column
                            prop="pYear"
                            label="立项年份"
                            sortable
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="pSeriesNum"
                            label="项目编号"
                            sortable
                            show-overflow-tooltip
                            :formatter="formatter"
                            min-width="100">
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
        // 表格
        tableData: [],
        page: 1,
        pageSizes: [20, 40, 60, 80, 100],
        pageSize: 20,
        total: 0
      }
    },
    mounted () {
      const currentYear = new Date().getFullYear()
      for (let i = this.startYear; i <= currentYear; i++) {
        this.yearList.push(i + '年度')
      }
    },
    methods: {
      // 查询
      searchInfo () {
        this.$db.findByPages(this.formObj, this.pageSize, this.page, function (err, doc) {
          console.log(err, doc)
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
        this.$db.find({}, (err, r) => {
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
              item.pPrideFlag = '已验收'
            } else {
              item.pPrideFlag = '未验收'
            }
          })
          datas.push({
            sheetData: r,
            sheetFilter: ['pSeriesNum', 'pName', 'pCharge', 'pLevel', 'pType', 'pOrg', 'pYear', 'pStartDate', 'pEndDate', 'pMoney', 'pMembers', 'pOtherCompanyFlag', 'pOtherCompanyName', 'pCheckFlag', 'pCheckTime', 'pPrideFlag', 'pPrideContent', 'pDes'],
            sheetHeader: ['项目编号', '项目名称', '项目负责人', '项目级别', '项目类别', '承担单位', '立项年份', '研究起始日期', '研究结束日期', '经费（万元）', '参加人员', '是否有合作单位', '合作单位名称', '是否验收', '验收时间', '是否获奖', '获奖情况', '项目简介'],
            columnWidths: [4, 6, 4, 3, 4, 10, 4, 6, 6, 4, 10, 8, 10, 5, 6, 5, 10, 20]
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
      },
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
            .main {
                border: 1px solid #ebebeb;
                .el-table {
                    min-height: 500px;
                }
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