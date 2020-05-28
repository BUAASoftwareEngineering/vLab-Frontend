<template>
  <div id="back">
    <div class="MyLightDraft">
      <Layout style="height:100%">
        <Modal
          v-model="notLogin"
          :closable="false"
          :mask-closable="false"
          title="请登陆后使用"
          width="350"
        >
          <div style="text-align:center">
            <Input type="text" placeholder="请输入用户名" v-model="loginUsername" style="width: 300px;" />
            <br />
            <br />
            <Input
              password
              type="password"
              placeholder="请输入密码"
              v-model="loginPassword"
              style="width: 300px"
              @on-enter="login"
            />
            <br />
            <br />
            <span v-on:click="cancelLogin">没有账号？前往主页注册</span>
          </div>
          <div slot="footer" style="text-align:center">
            <Button type="success" v-on:click="login">登录</Button>
          </div>
        </Modal>
        <!--左侧菜单栏-->
        <Sider width="68">
          <MyDraftSidebar></MyDraftSidebar>
        </Sider>
        <!--编辑器-->
        <Layout style="height:100%;border-right:2px inset #ababab;width:600px; overflow:hidden">
          <div id="editorRoot" style="height:100%;width:100%"></div>
        </Layout>

        <Layout style="height:100%;">
          <Layout style="border-bottom:2px inset #ababab;width:100%;">
            <Row type="flex" justify="center" align="middle">
              <Col :span="12" style="text-align:center">
                <Button  style="margin-top:5px;" title="运行">运行</Button>
              </Col>
              <Col :span="12" style="text-align:center">
                <Button style="margin-top:5px;"  title="保存到项目">保存到项目</Button>
              </Col>
            </Row>
          </Layout>
          <Layout style="height:45%;width:100%;border-bottom:2px inset #ababab;">
            <!--输入框-->
            <Layout style="height:80%;">
              <p>Input</p>
              <Divider style="margin:0"/>
              
              <textarea ref="input" v-model="input"   />
              
            </Layout>
            <Layout>
              <Row type="flex" justify="center" align="middle">
                <Col :span="24" style="text-align:center;">
                  <Button  style="margin-top:5px;"  title="提交输入">提交输入</Button>
                </Col>
              </Row>
            </Layout>
          </Layout>
          <!--输入框-->
          <Layout style="height:45%;width:100%">
            <p>Output</p>
            <Divider style="margin:0"/>
            <textarea readonly v-model="output"   />
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>
<script>
import bridge from "./bridge.js";
import { bus } from "./bus.js";
import api from "../assets/js/api";
import * as editor from "../editor/app";
import MyDraftSidebar from "./MyDraftSidebar";
export default {
  data() {
    return {
      username: "",
      notLogin: false,
      loginUsername: "",
      loginPassword: "",
      output:"",
      input:"",
      draftEditor: "",
      draftLanguage: ""

    };
  },
  components: {
    MyDraftSidebar
  },
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].className = "MyLightDraftBody";
  },
  methods: {
   
    toHomePage() {
      var _this = this;
      _this.$router.push("/home");
    },
    login() {
      if (this.loginUsername == "" || this.loginPassword == "") {
        this.$Message.warning("请输入用户名或密码");
      } else {
        this.$Spin.show();
        var _this = this;
        api.user_login(this.loginUsername, this.loginPassword, function(
          response
        ) {
          _this.$Spin.hide();
          if (response.code == 0) {
            _this.$Message.success("登录成功");
            _this.notLogin = false;
            _this.username = this.loginUsername;
          } else if (response.code == -101) {
            _this.$Message.error("用户名或密码不正确");
          } else {
            _this.$Message.error("未知错误");
          }
        });
      }
    },
    cancelLogin() {
      var _this = this;
      _this.$router.push("/");
    }
  },
  mounted() {
    var _this = this;

    _this.draftLanguage = _this.$route.query.language;
    api.user_info(function(response) {
      if (response.code != 0) {
        _this.$router.push("/");
      } else {
        _this.username = response.data.name;
        let scratchapp = new editor.MonacoAppScratch(
          _this.draftLanguage,
          true,
          _this.username
        );
        _this.draftEditor = scratchapp.getEditorInstance();
        bus.$emit("draftEditor", _this.draftEditor);
      }
    });
    this.$refs.input.onkeydown=(e)=>{
     
      console.log('asds')
      if(e.keyCode == 9){
        this.input+="\t"
         e.preventDefault()
      }
    }

  },
  beforeDestroy() {
    document.body.removeAttribute("class", "MyLightDraftBody");
  }
};
</script>

<style scoped>
#back {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
}
.MyLightDraft {
  position: absolute;
  left: 7%;
  right: 7%;
  top: 4%;
  bottom: 10%;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 2px 20px 1px;
}
span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
}
</style>
<style>
.MyLightDraftBody .ivu-select-dropdown {
  overflow: hidden;
  max-height: 1000px;
}
.MyLightDraftBody .ivu-btn {
  border-radius: 3px;
  color: #f5f7f9;
  background-color: #515a6eec;
  border-color: #515a6e;
  border: 0px solid transparent;
}
textarea.ivu-input{
    border-radius:0;
    min-height:100%
}
.ivu-input-wrapper{
  height: 100%;
}
textarea{
  resize: none;
  height: 100%;
  border-radius:0;
  -webkit-appearance:none;
  outline:none
}
</style>
