<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>科研项目信息录入</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="form">
        <el-form size="mini" label-width="150px" :rules="rules" :model="formObj" ref="ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目编号" prop="pSeriesNum">
                <el-input v-model="formObj.pSeriesNum" placeholder="必填项', '如无项目编号则填写：无"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="pName">
                <el-input v-model="formObj.pName" placeholder="必填项', '请填写项目名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目负责人" prop="pCharge">
                <el-input v-model="formObj.pCharge" placeholder="必填项', '请填写项目负责人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目级别" prop="pLevel">
                <el-select v-model="formObj.pLevel" filterable default-first-option placeholder="请选择项目类别">
                  <el-option v-for="item in levelList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目类别" prop="pType">
                <el-input v-model="formObj.pType" placeholder="必填项', '请填写项目类别"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="承担单位" prop="pOrg">
                <el-select v-model="formObj.pOrg" filterable default-first-option placeholder="请选择承担单位">
                  <el-option v-for="item in orgList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
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
                        type="date"
                        placeholder="选择开始日期"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="研究结束日期" prop="pEndDate">
                <el-date-picker
                        v-model="formObj.pEndDate"
                        type="date"
                        placeholder="选择结束日期"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="经费（万元）" prop="pMoney">
                <el-input v-model="formObj.pMoney" placeholder="请填写该项目的研究经费"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="参加人员">
                <el-input v-model="formObj.pMembers" placeholder="请填写参加该项目的人员名称，以逗号分隔"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否有合作单位" prop="pOtherCompanyFlag">
                <el-radio-group v-model="formObj.pOtherCompanyFlag">
                  <el-radio :label="true" border>有</el-radio>
                  <el-radio :label="false" border>无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合作单位名称">
                <el-input :disabled="formObj.pOtherCompanyFlag === false" placeholder="选填，填写合作单位的名称" v-model="formObj.pOtherCompanyName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否验收" prop="pCheckFlag">
                <el-radio-group v-model="formObj.pCheckFlag">
                  <el-radio :label="true" border>已验收</el-radio>
                  <el-radio :label="false" border>未验收</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="验收时间">
                <el-date-picker :disabled="formObj.pCheckFlag === false" v-model="formObj.pCheckTime" value-format="yyyy-MM-dd" placeholder="请选择验收时间"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否获奖" prop="pPrideFlag">
                <el-radio-group v-model="formObj.pPrideFlag">
                  <el-radio :label="true" border>是</el-radio>
                  <el-radio :label="false" border>否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="获奖情况">
                <el-input :disabled="formObj.pPrideFlag === false" v-model="formObj.pPrideContent" placeholder="选填，描述获奖情况"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="项目简介" prop="pDes">
                <el-input type="textarea" v-model="formObj.pDes" rows="6" placeholder="必填，填写项目简介" resize="none"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="任务书">
                <input type="file"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="验收材料">
                <input type="file"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn_area">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-button type="primary" :disabled="saveDisabled" @click="saveInfo('ruleForm')">保存</el-button>
            <el-button @click="goBack">返回</el-button>
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
          if (new Date(`${pEndDate} 23:59:59`).getTime() <= new Date(`${value} 00:00:00`).getTime()) {
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
          if (new Date(`${pStartDate} 00:00:00`).getTime() >= new Date(`${value} 23:59:59`).getTime()) {
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
        orgList: ['市局办公室', '应急与减灾处', '科技与预报处', '观测与网络处', '计划财务处', '人事处', '政策法规处', '机关党办', '党组纪检组', '离退办', '气象台', '气候中心', '信息中心', '保障中心', '气象服务中心', '气象科学研究所', '气象安全技术中心', '人工影响天气办公室', '防雷中心', '预警发布中心', '机关服务中心', '财务结算中心', '气象学会', '华云公司', '莱霆公司', '万州区气象局', '黔江区气象局', '涪陵区气象局', '沙坪坝区气象局', '北碚区气象局', '渝北区气象局', '巴南区气象局', '长寿区气象局', '江津区气象局', '合川区气象局', '永川区气象局', '南川区气象局', '綦江区气象局', '大足区气象局', '璧山区气象局', '铜梁区气象局', '潼南区气象局', '荣昌区气象局', '开州区气象局', '梁平区气象局', '武隆区气象局', '城口县气象局', '丰都县气象局', '垫江县气象局', '忠县气象局', '云阳县气象局', '奉节县气象局', '巫山县气象局', '巫溪县气象局', '石柱县气象局', '秀山县气象局', '酉阳县气象局', '彭水县气象局', '万盛经开区气象局'],
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
          pOtherCompanyFlag: false,
          pOtherCompanyName: '',
          pMoney: '',
          pMembers: '',
          pCheckFlag: false,
          pCheckTime: '',
          pPrideFlag: false,
          pPrideContent: '',
          pDes: ''
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
            { required: true, message: '请选择承担单位', trigger: 'change' }
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
          ],
          pOtherCompanyFlag: [
            { required: true, message: '请选择是否有合作单位', trigger: 'change' }
          ],
          pCheckFlag: [
            { required: true, message: '请选择是否验收', trigger: 'change' }
          ],
          pPrideFlag: [
            { required: true, message: '请选择是否获奖', trigger: 'change' }
          ],
          pDes: [
            { required: true, message: '请输入项目简介', trigger: 'blur' }
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
      saveInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveDisabled = true
            const {
              pStartDate,
              pEndDate
            } = this.formObj
            const params = Object.assign({}, this.formObj, {
              pStartDate: new Date(`${pStartDate} 00:00:00`).getTime() / 1000,
              pEndDate: new Date(`${pEndDate} 23:59:59`).getTime() / 1000
            })
            this.$db.insertOne(params, (err, doc) => {
              this.saveDisabled = false
              if (err) {
                this.$message({
                  type: 'error',
                  message: '信息录入失败，请稍后重试'
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '信息录入成功'
                })
              }
              console.log(err, doc)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      goBack () {
        this.$router.go(-1)
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
      }
      .btn_area{
        width:100%;
        text-align: center;
        margin-top:20px;
      }
    }
  }
</style>
