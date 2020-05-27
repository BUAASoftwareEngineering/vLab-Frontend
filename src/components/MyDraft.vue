
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
        <Sider width="75">
          <Button
            type="primary"
            style="background-color:inherit;margin: 0;border:none;color:#ffffff;width:100%;float:bottom;height:2vh;"
            @click="toHomePage"
            title="退回主页"
          >
            <Icon type="android-exit"></Icon>quit
          </Button>
        </Sider>
        <!--编辑器-->
        <Layout style="height:100%;border-right:2px inset #ababab;width:600px"></Layout>

        <Layout style="height:100%;">
          <Layout style="border-bottom:2px inset #ababab;width:100%;">
            <Row type="flex" justify="center" align="middle">
              <Col :span="12" style="text-align:center">
                <Button type="primary" style="margin-top:5px;" @click title="运行">运行</Button>
              </Col>
              <Col :span="12" style="text-align:center">
                <Button
                  type="primary"
                  style="margin-top:5px;"
                  @click="saveDraft"
                  title="保存到项目"
                  :disabled = "saving"
                >保存到项目</Button>
              </Col>
            </Row>
          </Layout>
          <Layout style="height:45%;width:100%;border-bottom:2px inset #ababab;">
            <!--输入框-->
            <Layout style="height:80%;"></Layout>
            <Layout>
              <Row type="flex" justify="center" align="middle">
                <Col :span="24" style="text-align:center;">
                  <Button type="primary" style="margin-top:5px;" @click title="提交输入">提交输入</Button>
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
import api from "../assets/js/api";
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
      projects: []
    };
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
    },
    saveDraft() {
      this.draftName = "";
      this.saveDraftModal = true;
    },
    saveToProject() {
      var _this = this;
      var fileContent = "";
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
                            _this.$Notice.open({
                              title: '保存成功',
                              desc: ''
                            });
                            _this.saveDraftModal = false;
                            _this.saving = false;
                            console.log("exitOK");
                          } else if (response.code == -101) {
                            console.log("cookie验证失败");
                          } else if (response.code == -102) {
                            console.log("权限不足");
                          } else {
                            console.log("未知错误");
                          }
                        });
                      } else if (response.code == -101) {
                        _this.$Message.error("cookie验证失败");
                        _this.notLogin = true;
                      } else if (response.code == -102) {
                        _this.$Message.error("权限不足");
                      } else {
                        _this.$Message.error("未知错误");
                      }
                    }
                  );
                } else if (response.code == -101) {
                  _this.$Message.error("cookie验证失败");
                  _this.notLogin = true;
                } else if (response.code == -102) {
                  _this.$Message.error("权限不足");
                } else if (response.code == -301) {
                  console.log("exist");
                  _this.$Message.error("文件名已存在");
                } else if (response.code == 500) {
                } else {
                  _this.$Message.error("未知错误");

                }
              }
            );
          }, 3000);
        } else if (response.code == -101) {
          _this.$Message.error("cookie验证失败");
        } else if (response.code == -102) {
          _this.$Message.error("权限不足");
        } else {
          _this.$Message.error("未知错误");
        }
      });
    }
  },
  mounted() {
    var _this = this;
    this.language = this.$route.query.language;
    api.user_info(function(response) {
      if (response.code != 0) {
        _this.notLogin = true;
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
  border-radius: 3px;
  color: #f5f7f9;
  background-color: #515a6eec;
  border-color: #515a6e;
  border: 0px solid transparent;
}
.MyLightDraftBody .ivu-btn:disabled {
  border-radius: 3px;
  color: #f5f7f9;
  background-color: #515a6e62;
  border-color: #515a6e60;
  border: 0px solid transparent;
}
</style>
