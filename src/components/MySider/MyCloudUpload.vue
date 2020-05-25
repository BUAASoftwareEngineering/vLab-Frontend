<template>
  
  <Layout style="background-color: inherit; color: inherit;">
    <Modal v-model="modal1" draggable scrollable title="以下文件与已存在的文件或文件名重名" @on-ok="modal1_ok" @on-cancel="modal1_ok">
      <div v-for="(data,index) in files_conflict" :key="index">
        {{data}}</div>
    </Modal>
    <Row type="flex" justify="center" align="middle">
      <Col span="24">
        <p style="padding:4px 4px 4px 15px;width:250px;height:23px;font-size:15px;">上传与导入</p>
      </Col>
    </Row>
    <Divider style="margin:10px auto" />

    <br />


    <Row type="flex" justify="center" align="middle">
      <Col :span="24" style="text-align:center">
        <Upload :before-upload="handleFiles" action="http" multiple ref="uploadFiles">
          <Button
            type="primary"
            style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          >上传文件到根目录...</Button>
        </Upload>
      </Col>
    </Row>
    <br />
    <Row type="flex" justify="center" align="middle">
      <Col :span="24" style="text-align:center">
        <uploader @file-success="handleFolder" duplicate="true" ref="uploadFolder">
          <uploader-drop>
            <uploader-btn :directory="true">
              上传文件夹到根目录...
            </uploader-btn>
          </uploader-drop>
        </uploader>
      </Col>
    </Row>
    <br />
    <Row type="flex" justify="center" align="middle">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="gitUrlModal = true"
        >从GitHub导入到Notebook...</Button>
      </Col>
      <Modal v-model="gitUrlModal" title="请输入git仓库的url">
        <Input v-model="gitUrl" icon="logo-github" placeholder="Enter url..." style="width: 100%" />
        <div slot="footer">
          <Button type="primary" @click="gitUrlModalOk">确定</Button>
        </div>
      </Modal>
    </Row>
    <br>
    <Row type="flex" justify="center" align="middle">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="download"
        >下载项目到本地...</Button>
      </Col>
    </Row>
    <!--
        <Row type="flex" justify="center" align="middle">
            <Col :span="24" style="text-align:center">
                <Button type="primary" style="border-radius: 0.4vh; margin: 0 auto; width:200px">从网盘导入Notebook...</Button>
            </Col>
        </Row>
        <br>
        <Row type="flex" justify="center" align="middle">
            <Col :span="24" style="text-align:center">
                <Button type="primary" style="border-radius: 0.4vh; margin: 0 auto; width:200px">从GitHub导入到Notebook...</Button>
            </Col>
    </Row>-->
  </Layout>
</template>

<script>
import { GiturlIsleagal } from "../../assets/js/checking.js";
import terminal from "../Terminal";
import api from "../../assets/js/api";
import bridge from "../bridge";
export default {
  data() {
    return {
      gitUrlModal: false,
      gitUrl: "",
      files_number:0,
      files_conflict:[],
      modal1:false
    };
  },
  props: {
    username: {
      type: String,
      required: true
    },
    projectid: {
      type: Number,
      required: true
    },
    projectname: {
      type: String,
      required: true
    }
  },
  methods: {
    download() {
      api.file_download(this.projectid);
    },
    modal1_ok(){
      this.files_conflict=[]
      this.modal1=false      
      // window.location.reload()
      this.$refs.uploadFiles.clearFiles()
      this.$refs.uploadFolder.uploader.cancel()
      bridge.$emit('FleshFilesTree')
    },
    handleFiles(file) {
       if(this.files_number==0)this.$Spin.show()
      this.files_number++
      var filename = file.name;
      var filecontent = "";
      //  console.log(this.file)
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = e => {
        filecontent = e.target.result;
      };
      var _this = this;
      this.$Spin.show();
      api.file_new(this.projectid, "/code/" + filename, function(response) {
        if (response.code == 0) {
          api.file_update(
            _this.projectid,
            "/code/" + filename,
            new Buffer(filecontent),
            function(response) {
               _this.files_number--;
              if(_this.files_number==0){
                if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                bridge.$emit('FleshFilesTree')
              }
              }
              if (response.code == 0) {
                
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else {
                _this.$Message.error("未知错误");
              }
            }
          );
        } else if (response.code == -101) {
          _this.files_number--;
              if(_this.files_number==0){
                if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                bridge.$emit('FleshFilesTree')
              }
              }
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
          _this.files_number--;
              if(_this.files_number==0){
                if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                bridge.$emit('FleshFilesTree')
              }
              }
          _this.$Message.error("权限不足");
        } else if (response.code == -301) {
            _this.files_number--;
            _this.files_conflict.push(filename)
              if(_this.files_number==0){
               if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                bridge.$emit('FleshFilesTree')
              }
                 
              }
          } else {
          _this.files_number--;
              if(_this.files_number==0){
               if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                bridge.$emit('FleshFilesTree')
              }
                 
              }
          _this.$Message.error("未知错误");
        }
        return true;
      });
    },
    async gitUrlModalOk() {
      console.log(this.gitUrl);
      if (GiturlIsleagal(this.gitUrl)) {
        this.gitUrlModal = false;
        this.$Message.info("Url OK");
        var temp = "cd /code/ && git clone " + this.gitUrl;
        terminal.ctrlc();
        terminal.runcommand(temp);
        bridge.$emit("uploadFile", "");
      } else {
        this.$Message.error("Url illegal!");
      }
    },
    handleFolder(rootFile1, file1, response, chunk) {
      
      if(this.files_number==0){
        this.$Spin.show()
        this.up_folder=true
      }
      this.files_number++
      var file = file1.file;
   
      var rootFile = file1.relativePath;
      var folder = "";
      for (var i = rootFile.lenth - 1; i >= 0; i--) {
        if (rootFile[i] == '/') {
          folder = rootFile.substring(0, i + 1);
          break;
        }
      }
 
      var filename = file.name;
      var filecontent = "";
      //  console.log(this.file)
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = e => {
        filecontent = e.target.result;
      };
      var _this = this;
      api.file_new(_this.projectid, "/code/"+rootFile, function(response) {

        if (response.code == 0) {
          api.file_update(
            _this.projectid,
            "/code/" + rootFile,
            new Buffer(filecontent),
            function(response) {
              _this.files_number--;
              if(_this.files_number==0){
                
                if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                _this.$refs.uploadFolder.uploader.cancel()

                bridge.$emit('FleshFilesTree')
              }
              }
              if (response.code == 0) {                
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else {
                _this.$Message.error("未知错误");
              }
            }
          );
        } else if (response.code == -101) {
           _this.files_number--;
              if(_this.files_number==0){
                if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                _this.$refs.uploadFolder.uploader.cancel()
                bridge.$emit('FleshFilesTree')
              }
              }  
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
           _this.files_number--;
              if(_this.files_number==0){
                if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                _this.$refs.uploadFolder.uploader.cancel()
                bridge.$emit('FleshFilesTree')
              }
              }
          _this.$Message.error("权限不足");
        } else if (response.code == -301) {
          _this.files_number--
          _this.files_conflict.push(rootFile)
          if(_this.files_number==0){
               if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                _this.$refs.uploadFolder.uploader.cancel()
                bridge.$emit('FleshFilesTree')
              }
                }
          } else {
           _this.files_number--;
             if(_this.files_number==0){
                if(_this.files_conflict.length!=0){
                  _this.$Spin.hide()
                  _this.modal1=true
                }
                else{
                // window.location.reload()
                _this.$refs.uploadFiles.clearFiles()
                _this.$refs.uploadFolder.uploader.cancel()
                bridge.$emit('FleshFilesTree')
              }
              }
          _this.$Message.error("未知错误");
        }
      });
        
      
      
    }
  }
};
</script>

<style scoped>
.center-in-center {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.uploader >>> .uploader-drop {
  text-align: center;
}
.uploader {
  text-align: center;
}
.uploader-drop {
  width: 200px;
  height: 33px;
  background-color: #464e57;
  border: #464e57;
  padding: 0;
  margin-left: 25px;
  border-radius: 2px;
}
.uploader-btn {
  width: 200px;
  height: 33px;
  color: #f5f7f9;
  text-align: center;
}
.uploader-btn:hover {
  background-color: dimgrey;
}

.my-setting .ivu-tabs-bar {
  margin-bottom: 0vh;
}
.ivu-card-head {
  padding: 0.4vh;
}
.ivu-card-body {
  padding: 0vh;
  height: 2.4vh;
  background: #363e4f;
  margin: -0.1vh;
}
.ivu-btn {
  border-radius: 0px;
  color: #f5f7f9;
  background-color: #464e57;
  border-color: #464e57;
  margin: 0px;
  border: 0px solid transparent;
  padding: 6px 16px 6px;
  margin: -3px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
}
.ivu-btn:hover {
  background-color: dimgrey;
}
.ivu-layout-header {
  height: 36px;
  line-height: 36px;
  padding: 0;
  background-color: #464e57;
  margin: 0;
}
.ivu-tree-title {
  border-radius: 0px;
  color: #fff;
}
</style> 