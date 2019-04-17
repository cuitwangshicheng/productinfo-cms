<template>
    <el-upload
            class="upload-demo"
            action="/"
            :limit="1"
            :auto-upload="false"
            :file-list="newFile"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="handleChange">
        <el-button type="primary">点击上传</el-button>
    </el-upload>
</template>

<script>
  export default {
    props: {
      oldFile: {
        type: Array,
        default: () => {}
      }
    },
    data () {
      return {
        newFile: this.oldFile
      }
    },
    watch: {
      oldFile () {
        this.newFile = this.oldFile
      }
    },
    methods: {
      // 上传文件
      handleChange (file, fileList) {
        this.newFile = fileList
      },
      handleExceed (files, fileList) {
        this.$message({
          type: 'warning',
          message: '只能上传一个文件'
        })
      },
      handleRemove (file, fileList) {
        this.newFile = fileList
      },
      getFile () {
        return this.newFile
      }
    }
  }
</script>

<style scoped lang="less">

</style>