<template>
  <Layout style="background-color: inherit; color: inherit;">
    <Row type="flex" justify="center" align="middle">
      <Col span="24">
        <p style="padding:4px 4px 4px 15px;width:250px;height:23px;font-size:15px;">上传与导入</p>
      </Col>
    </Row>
    <Divider style="margin:10px auto"/>
    <Row type="flex" justify="center" align="middle">
      <Col :span="24" style="text-align:center">
        <Upload :before-upload="handleBeforeUpload" action="" >
          <Button
            type="primary"
            style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          >上传文件到Notebook...</Button>
        </Upload>
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
      <Modal
        v-model="gitUrlModal"
        title="请输入git仓库的url"
      >
        <Input v-model="gitUrl" icon="logo-github" placeholder="Enter url..." style="width: 100%" />
        <div slot="footer">
          <Button type="primary" @click="gitUrlModalOk">确定</Button>
        </div>
      </Modal>
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
      gitUrl: ''

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
    handleBeforeUpload(files) {
     // this.files = files;
      for(var i=0;i<files.length;i++){
        var file=files[i]
        var filename = file.name;
        var filecontent = "";
        //  console.log(this.file)
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = e => {
          filecontent = e.target.result;
           console.log(filecontent )
        };
        var _this = this;
        this.$Spin.show();
        api.file_new(this.projectid, "/code/" + filename, function(response) {
          if (response.code == 0) {
            api.file_update(
              _this.projectid,
              "/code/" + filename,
              filecontent,
              function(response) {
                _this.$Spin.hide();
                if (response.code == 0) {
                  console.log('上传成功')
                  bridge.$emit("uploadFile", filename);
                  bridge.$emit("changeTree");
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
            _this.$Spin.hide();
            _this.$Message.error("cookie验证失败");
            _this.$router.push("/");
          } else if (response.code == -102) {
            _this.$Spin.hide();
            _this.$Message.error("权限不足");
          } else if (response.code == -301) {
            _this.$Spin.hide();
            _this.$Message.error("文件重名");
          } else {
            _this.$Spin.hide();
            _this.$Message.error("未知错误");
          }
          return true;
        });
      }
    },
    async gitUrlModalOk() { 
      console.log(this.gitUrl);
      if (GiturlIsleagal(this.gitUrl)) {
        this.gitUrlModal = false;
        this.$Message.info('Url OK');
        var temp = "git clone " + this.gitUrl;
        terminal.ctrlc();
        terminal.runcommand(temp);
        bridge.$emit("uploadFile", '');
      } else {
        this.$Message.error('Url illegal!');
      }
    },
  }
};
</script>

<style scoped>
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