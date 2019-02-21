<template>
  <div class="page">
    <div class="content">
      <div class="title">科研项目信息录入</div>
      <div class="form">
        <el-form size="mini" label-width="120px" style="width:1100px;">
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目编号" required>
                <el-input v-model="formObj.pSeriesNum" placeholder="必填项', '如无项目编号则填写：无"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" required>
                <el-input v-model="formObj.pName" placeholder="必填项', '请填写项目名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目负责人" required>
                <el-input v-model="formObj.pCharge" placeholder="必填项', '请填写项目负责人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目类别" required>
                <el-select v-model="formObj.pLevel" filterable default-first-option placeholder="请选择项目类别">
                  <el-option v-for="item in levelList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目类别" required>
                <el-input v-model="formObj.pType" placeholder="必填项', '请填写项目类别"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="承担单位" required>
                <el-select v-model="formObj.pOrg" filterable default-first-option placeholder="请选择项目类别">
                  <el-option v-for="item in orgList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="立项年份" required>
                <el-select v-model="formObj.pYear" filterable default-first-option placeholder="请选择立项年份">
                  <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="研究起始日期" required>
                <el-date-picker v-model="formObj.pStartDate" placeholder="请选择研究起始日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="研究结束日期" required>
                <el-date-picker v-model="formObj.pEndDate" placeholder="请选择研究结束日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="经费（万元）" required>
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
              <el-form-item label="是否有合作单位" required label-width="125px">
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
              <el-form-item label="是否验收" required>
                <el-radio-group v-model="formObj.pCheckFlag">
                  <el-radio :label="true" border>已验收</el-radio>
                  <el-radio :label="false" border>未验收</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="验收时间">
                <el-date-picker :disabled="formObj.pCheckFlag === false" v-model="formObj.pCheckTime" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否获奖" required>
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
              <el-form-item label="项目简介" required>
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
        <el-button type="primary" @click="saveInfo">保存</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'add-info',
  data () {
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
        pMemebers: '',
        pCheckFlag: false,
        pCheckTime: '',
        pPrideFlag: false,
        pPrideContent: '',
        pDes: ''
      }
    }
  },
  mounted () {
    const currentYear = new Date().getFullYear()
    for (let i = this.startYear; i <= currentYear; i++) {
      this.yearList.push(i + '年度')
    }
  },
  methods: {
    saveInfo () {
      this.$db.insertOne(this.formObj, function (err, doc) {
        console.log(err, doc)
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
    width:100%;
    height:100%;
    .content{
      width:1120px;
      text-align:center;
      margin-left:auto;
      margin-right:auto;
      .title{
        font-size:20px;
        font-size:bold;
        height:70px;
        line-height: 70px;
      }
      .form{
        border:1px solid #ccc;
        padding-top:20px;
        padding-bottom:20px;
        width:1118px;
        text-align: left;
      }
      .btn_area{
        width:100%;
        text-align: center;
        margin-top:20px;
      }
    }
  }
</style>
