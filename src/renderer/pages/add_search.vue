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