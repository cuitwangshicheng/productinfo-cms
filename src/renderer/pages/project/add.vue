<template>
    <div class="page">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>科研项目信息录入</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="form">
                <el-form size="mini" label-width="150px" :rules="rules" :model="formObj" ref="ruleForm">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="项目编号" prop="pSeriesNum">
                                <el-input v-model="formObj.pSeriesNum" placeholder="必填项，请填写项目编号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="项目名称" prop="pName">
                                <el-input v-model="formObj.pName" placeholder="必填项，请填写项目名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="项目负责人" prop="pCharge">
                                <el-input v-model="formObj.pCharge" placeholder="必填项，请填写项目负责人"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="项目级别" prop="pLevel">
                                <el-select v-model="formObj.pLevel" filterable default-first-option placeholder="请选择项目级别">
                                    <el-option v-for="item in levelList" :key="item" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="项目类别" prop="pType">
                                <el-input v-model="formObj.pType" placeholder="必填项，请填写项目类别"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="承担单位" prop="pOrg">
                                <el-input v-model="formObj.pOrg" placeholder="必填项，请填写承担单位"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="立项年份" prop="pYear">
                                <el-select v-model="formObj.pYear" clearable filterable default-first-option placeholder="请选择立项年份">
                                    <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="研究开始日期" prop="pStartDate">
                                <el-date-picker
                                        v-model="formObj.pStartDate"
                                        type="month"
                                        placeholder="选择开始日期"
                                        value-format="yyyy-MM">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="研究结束日期" prop="pEndDate">
                                <el-date-picker
                                        v-model="formObj.pEndDate"
                                        type="month"
                                        placeholder="选择结束日期"
                                        value-format="yyyy-MM">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="经费（万元）" prop="pMoney">
                                <el-input v-model="formObj.pMoney" placeholder="必填项，请填写该项目的研究经费"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="参加人员">
                                <el-input v-model="formObj.pMembers" placeholder="选填，请填写参加该项目的人员名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="合作单位名称">
                                <el-input placeholder="选填，填写合作单位名称" v-model="formObj.pOtherCompanyName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="验收时间">
                                <el-date-picker v-model="formObj.pCheckTime" value-format="yyyy-MM-dd" placeholder="请选择验收时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="获奖情况">
                                <el-input v-model="formObj.pPrideContent" placeholder="选填，描述获奖情况"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="项目简介" prop="pDes">
                                <el-input type="textarea" v-model="formObj.pDes" rows="6" placeholder="选填，填写项目简介" resize="none"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注" prop="pMark">
                                <el-input type="textarea" v-model="formObj.pMark" rows="6" placeholder="选填，填写备注" resize="none"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="任务书">
                                <el-upload
                                        class="upload-demo"
                                        action="/"
                                        :limit="1"
                                        :auto-upload="false"
                                        :on-remove="handleRemove_taskBook"
                                        :on-exceed="handleExceed_taskBook"
                                        :on-change="handleChange_taskBook">
                                    <el-button type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="验收材料">
                                <el-upload
                                        class="upload-demo"
                                        action="/"
                                        :limit="1"
                                        :auto-upload="false"
                                        :on-remove="handleRemove_checkData"
                                        :on-exceed="handleExceed_checkData"
                                        :on-change="handleChange_checkData">
                                    <el-button type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="btn_area">
                <el-form :inline="true" size="mini">
                    <el-form-item>
                        <el-button type="primary" :disabled="saveDisabled" @click="saveInfo('ruleForm')">保存</el-button> <i>*号是必填项</i>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'add-info',
    data () {
      var validatePStartDate = (rule, value, callback) => {
        const pEndDate = this.formObj.pEndDate
        if (pEndDate !== '' && pEndDate !== null) {
          if (new Date(pEndDate).getTime() <= new Date(value).getTime()) {
            callback(new Error('开始日期必须小于等于结束日期'))
          } else {
            this.$refs.ruleForm.clearValidate('pEndDate')
          }
        }
        callback()
      }
      var validatePEndDate = (rule, value, callback) => {
        const pStartDate = this.formObj.pStartDate
        if (pStartDate !== '' && pStartDate !== null) {
          if (new Date(pStartDate).getTime() >= new Date(value).getTime()) {
            callback(new Error('开始日期必须小于等于结束日期'))
          } else {
            this.$refs.ruleForm.clearValidate('pStartDate')
          }
        }
        callback()
      }
      return {
        yearList: [],
        startYear: 1949,
        levelList: ['司局级', '省部级', '国家级', '其他'],
        formObj: {
          pSeriesNum: '',
          pName: '',
          pCharge: '',
          pType: '',
          pLevel: '',
          pOrg: '',
          pYear: new Date().getFullYear() + '年度',
          pStartDate: '',
          pEndDate: '',
          pOtherCompanyName: '',
          pMoney: '',
          pMembers: '',
          pCheckTime: '',
          pPrideContent: '',
          pDes: '',
          pMark: '',
          pTaskBook: [],
          pCheckData: []
        },
        rules: {
          pSeriesNum: [
            { required: true, message: '请输入项目编号', trigger: 'blur' }
          ],
          pName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          pCharge: [
            { required: true, message: '请输入项目负责人', trigger: 'blur' }
          ],
          pLevel: [
            { required: true, message: '请选择项目级别', trigger: 'change' }
          ],
          pType: [
            { required: true, message: '请输入项目类别', trigger: 'blur' }
          ],
          pOrg: [
            { required: true, message: '请输入承担单位', trigger: 'blur' }
          ],
          pYear: [
            { required: true, message: '请选择立项年份', trigger: 'change' }
          ],
          pStartDate: [
            { required: true, message: '请选择研究开始日期', trigger: 'blur' },
            { validator: validatePStartDate, trigger: 'blur' }
          ],
          pEndDate: [
            { required: true, message: '请选择研究结束日期', trigger: 'blur' },
            { validator: validatePEndDate, trigger: 'blur' }
          ],
          pMoney: [
            { required: true, message: '请输入经费（万元）', trigger: 'blur' }
          ]
        },
        saveDisabled: false
      }
    },
    mounted () {
      const currentYear = new Date().getFullYear()
      for (let i = currentYear; i >= this.startYear; i--) {
        this.yearList.push(i + '年度')
      }
    },
    methods: {
      // 上传任务书
      handleChange_taskBook (file, fileList) {
        this.formObj.pTaskBook = fileList
        console.log(this.formObj.pTaskBook)
      },
      handleExceed_taskBook (files, fileList) {
        this.$message({
          type: 'warning',
          message: '只能上传一个文件'
        })
      },
      handleRemove_taskBook (file, fileList) {
        this.formObj.pTaskBook = fileList
      },
      // 上传验收材料
      handleChange_checkData (file, fileList) {
        this.formObj.pCheckData = fileList
      },
      handleExceed_checkData (files, fileList) {
        this.$message({
          type: 'warning',
          message: '只能上传一个文件'
        })
      },
      handleRemove_checkData (file, fileList) {
        this.formObj.pCheckData = fileList
      },
      // 保存
      saveInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveDisabled = true
            const {
              pStartDate,
              pEndDate,
              pCheckTime
            } = this.formObj
            const params = Object.assign({}, this.formObj, {
              pStartDate: new Date(pStartDate).getTime(),
              pEndDate: new Date(pEndDate).getTime(),
              pCheckTime: pCheckTime === null ? '' : pCheckTime
            })
            this.$db.insertOne(params, (err, doc) => {
              if (err) {
                this.saveDisabled = false
                this.$message({
                  type: 'error',
                  message: '信息录入失败，请稍后重试'
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '信息录入成功',
                  onClose: () => {
                    this.$router.replace('/project')
                  }
                })
              }
              console.log(err, doc)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang='scss' scoped>
    .page{
        padding: 20px;
        .content{
            margin-top: 20px;
            .form{
                text-align: left;
                .el-radio{
                    margin-right: 0;
                }
                .el-form-item__content {
                    .el-select,
                    .el-date-editor {
                        width: 100%;
                    }
                }
            }
            .btn_area{
                width:100%;
                text-align: center;
                margin-top:20px;
            }
        }
    }
</style>
