<template>
  <div id="back">
    <div class="MyLightDraft">
      <Layout style="height:100%;border-radius:100;">
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
        <Modal
          v-model="saveDraftModal"
          title="将草稿保存到项目"
          width="350"
        >
          <div style="text-align:center">
            <Select
              v-model="selectProjectID"
              style="width:300px;text-align:left"
              placeholder="请选择已有项目"
            >
              <Option
                v-for="item in projects"
                :value="item.projectId"
                :key="item.projectId"
              >{{ item.name }}</Option>
            </Select>
            <!--
            <br />
            <br />
            <Input type="text" placeholder="新建项目" v-model="newProjectame" style="width: 300px;" />
            -->
            <br />
            <br />
            <Input type="text" placeholder="请输入文件名" v-model="draftName" style="width: 300px" />
          </div>
          
          <div slot="footer" style="text-align:center">
            <Button v-on:click="saveToProject">保存</Button>
          </div>
          
        </Modal>
        <!--左侧菜单栏-->
        <Sider width="68">
          <MyDraftSidebar></MyDraftSidebar>
        </Sider>
        <!--编辑器-->
        <Layout style="height:100%;width:600px; overflow:hidden">
          <div style="height:2%;width:100%;background-color:#ffffff;border:none;"> </div>
          <div id="editorRoot" style="height:95%;width:100%"></div>
          <div style="height:3%;width:100%;background-color:#ececec;">
            <div id="footLeftBar">{{draftName ? draftName :"untitled"}}({{draftLanguage}})</div>
            <div id="footRightBar">line:{{myLineNumber}},column:{{myColNumber}}</div>
          </div>
        </Layout>
        <Layout style="height:100%;width:200px;">
          <Layout style="border-bottom:2px inset #ababab;width:100%;">
            <Row type="flex" justify="center" align="middle">
              <Row type="flex" justify="center" align="middle">
                <Col :span="24" style="text-align:center;">
                  <Button type="primary" style="margin-top:5px;margin-right:2px;" @click title="运行">运行</Button>
                  <Button
                    type="primary"
                    style="margin-top:5px;margin-left:2px;"
                    @click="saveDraft"
                    title="保存到项目"
                    :disabled = "saving"
                  >保存到项目</Button>
                </Col>
              </Row>
            </Row>
          </Layout>
          <Layout style="height:45%;width:100%;border-bottom:2px inset #ababab;">
            <!--输入框-->
            <Layout style="height:80%;"></Layout>
            <Layout>
              <Row type="flex" justify="center" align="middle">
                <Col :span="24" style="text-align:center;">
                  <Button type="primary" style="margin-top:5px;margin-right:2px;" @click title="清空输入">清空输入</Button>
                  <Button type="primary" style="margin-top:5px;margin-left:2px;" @click title="提交输入">提交输入</Button>
                </Col>
              </Row>
            </Layout>
          </Layout>
          <!--输入框-->
          <Layout style="height:45%;width:100%"></Layout>
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
import { getCursorPosition } from '../editor/Editor';
export default {
  data() {
    return {
      username: "",
      language: "",
      notLogin: false,
      loginUsername: "",
      loginPassword: "",
      saveDraftModal: false,
      draftName: "",
      saving: false,
      selectProjectID: "",
      projects: [],
      draftEditor: "",
      draftLanguage: "",
    };
  },
  components: {
    MyDraftSidebar
  },
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].className = "MyLightDraftBody";
  },
  computed: {
    myLineNumber: function () {
      return this.draftEditor ? getCursorPosition(this.draftEditor.getEditorInstance())["ln"] : 0;
    },
    myColNumber: function () {
      return this.draftEditor ? getCursorPosition(this.draftEditor.getEditorInstance())["col"] : 0;
    },    
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
    },
    saveDraft() {
      this.draftName = "";
      this.saveDraftModal = true;
    },
    saveToProject() {
      var _this = this;
      var fileContent = _this.draftEditor.getCode();
      //console.log(fileContent);
      _this.$Notice.open({
        title: '正在保存中...',
        desc: '',
        name: "saveNotice",
        duration : 0
      });
      _this.saveDraftModal = false;
      _this.saving = true;
      console.log(_this.selectProjectID);
      console.log(_this.draftName);
      api.project_enter(_this.selectProjectID, function(response) {
        if (response.code == 0) {
          console.log("enterOk");
          var timer = setInterval(function() {
            api.file_new(
              _this.selectProjectID,
              "/code/" + _this.draftName,
              function(response) {
                if (response.code == 0) {
                  clearInterval(timer);
                  console.log("newok");
                  api.file_update(
                    _this.selectProjectID,
                    "/code/" + _this.draftName,
                    new Buffer(fileContent),
                    function(response) {
                      if (response.code == 0) {
                        console.log("saveOK");
                        api.project_exit(_this.selectProjectID, function(
                          response
                        ) {
                          if (response.code == 0) {
                            _this.$Notice.close(
                              "saveNotice"
                            );
                            _this.$Notice.open({
                              title: '保存成功',
                              desc: '',
                              duration: 2,
                            });
                            _this.saveDraftModal = false;
                            _this.saving = false;
                            console.log("exitOK");
                          } else {
                            _this.saving = false;
                            _this.$Notice.close(
                              "saveNotice"
                            );
                            if (response.code == -101) {
                              console.log("cookie验证失败");
                            } else if (response.code == -102) {
                              console.log("权限不足");
                            } else {
                              console.log("未知错误");
                            }
                          }
                        });
                      } else {
                        _this.saving = false;
                        _this.$Notice.close(
                          "saveNotice"
                        );
                        if (response.code == -101) {
                          _this.$Message.error("cookie验证失败");
                          _this.notLogin = true;
                        } else if (response.code == -102) {
                          _this.$Message.error("权限不足");
                        } else {
                          _this.$Message.error("未知错误");
                        }
                      }
                    }
                  );
                } else if (response.code == -301) {
                  console.log("exist");
                  _this.$Message.error("文件名已存在,保存失败");
                  _this.saving = false;
                  api.project_exit(_this.selectProjectID);
                  clearInterval(timer);
                  _this.$Notice.close(
                    "saveNotice"
                  );
                } else if (response.code == 500) {
                } else {
                  _this.saving = false;
                  clearInterval(timer);
                  if (response.code == -101) {
                    _this.$Message.error("cookie验证失败");
                    _this.notLogin = true;
                  } else if (response.code == -102) {
                    _this.$Message.error("权限不足");
                  } else {
                    _this.$Message.error("未知错误");
                  }
                }
              }
            );
          }, 3000);
        } else {
          _this.saving = false;
          _this.$Notice.close(
              "saveNotice"
          );
          if (response.code == -101) {
            _this.$Message.error("cookie验证失败");
          } else if (response.code == -102) {
            _this.$Message.error("权限不足");
          } else {
            _this.$Message.error("未知错误");
          }
        }
      });
    }
  },
  mounted() {
    var _this = this;
    this.language = this.$route.query.language;
    _this.draftLanguage = _this.$route.query.language;
    api.user_info(function(response) {
      if (response.code != 0) {
        _this.$router.push("/");
      } else {
        _this.username = response.data.name;

        api.project_info(function(response) {
          console.log(response);
          if (response.code == 0) {
            _this.projects.splice(0, _this.projects.length);
            var projects = response.data;
            for (var i = 0; i < projects.length; i++) {
              if (projects[i].imageType == api.CPP && _this.language == "cpp") {
                _this.projects.push(projects[i]);
              }
              if (
                projects[i].imageType == api.PYTHON3 &&
                _this.language == "python"
              ) {
                _this.projects.push(projects[i]);
              }
            }
          } else if (response.code == -101) {
            _this.$Message.error("cookie验证失败");
            _this.notLogin = true;
          } else {
            _this.$Message.error("未知错误");
          }
        });
        _this.draftEditor = new editor.MonacoAppScratch(
          _this.draftLanguage,
          true,
          _this.username
        );
        //_this.draftEditor = scratchapp.getEditorInstance();
        bus.$emit("draftEditor", _this.draftEditor.getEditorInstance());
      }
    });
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
  color: #fcfcfc;
  background-color: #515a6e;
  border-color: #515a6e;
  border: 0px solid transparent;
  padding: 6px 16px 6px;
  border-radius: 0.4vh; 
  margin: 0 auto; 
  width:120px;
}
.MyLightDraftBody .ivu-btn:disabled {
  color: #fcfcfc;
  background-color: #515a6e63;
  border-color: #515a6e6e;
  border: 0px solid transparent;
  padding: 6px 16px 6px;
  border-radius: 0.4vh; 
  margin: 0 auto; 
  width:120px;
}
#footRightBar {
  height:100%;
  width:80%;
  float:right;
  text-align:right;
  padding-right:30px;
  font-size:13px;
  font-family: Consolas, "Lucida Console", monospace, sans-serif;
}

#footLeftBar {
  height:100%;
  width:20%;
  float:left;
  text-align:left;
  padding-left:30px;
  font-size:13px;
  font-family: Consolas, "Lucida Console", monospace, sans-serif;
}
</style>
