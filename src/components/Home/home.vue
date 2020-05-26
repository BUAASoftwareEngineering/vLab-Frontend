<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  height: 100vh;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #2c9b92;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-layout-header {
  background: #515a6e;
  padding: 0;
}
.layer {
  position: absolute;
  background: transparent;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid transparent;
  z-index: 1;
}
.title {
  float: right;
  margin-right: 100px;
  color: #ffffff;
}
a {
  color: #7ed4fc;
}
</style>
<template>
  <div class="layout">
    <Modal v-model="modal_message" title="项目分享消息" :footer-hide="true">
    <p v-if="share_message.length==0">
      暂无项目分享消息
    </p>
    <ul v-if="share_message.length != 0">
        <div v-for="item in share_message">
            <Card style="width:100%">
              <p slot="title">
                  <Icon type="md-contacts"></Icon>
                  未处理的共享请求
              </p>
              <div>
                有人向您发送了项目共享请求，您是否同意接收该项目？
                <ul>
                  <li style="margin-left:20px">项目名称：{{ item.name }}</li>
                  <li style="margin-left:20px">项目类型：{{ item.imageType }}</li>
                  <!--<li style="margin-left:20px">共享权限：{{ item.writeable ? "可写共享" : "可读共享" }}</li>-->
                </ul>
              </div>
              <br>
              <div>
                <Button type="text" @click="refuse_share(item)" style="position:absolute;right:100px;bottom:10px">拒绝</Button>
                <Button type="primary" @click="accept_share(item)" style="position:absolute;right:10px;bottom:10px">接收</Button>
              </div>
            </Card>
            <br>
        </div>
    </ul>
      
    </Modal>

    <Layout style="height:100%">
      <Header>
        <div class="title">
          <Tooltip content="您有未处理的项目分享消息" :always="share_message.length!=0" :disabled="share_message.length==0">
            <a @click="handle_message">
              <Icon ref="message" size="20" type="ios-chatboxes" color="message_color" />
            </a>
          </Tooltip>
          &emsp;&emsp;&emsp;&emsp;    
          <Dropdown>
            <a href="javascript:void(0)" style="color: #f3f3f3;">
              新草稿
              <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list">
              <Dropdown-item @click.native="newDraft('cpp')">cpp草稿</Dropdown-item>
              <Dropdown-item @click.native="newDraft('python')">python草稿</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
          &emsp;&emsp;&emsp;欢迎&ensp; {{username}} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <a @click="quit">注销</a>
        </div>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <div style="margin-top:200px;">
            <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
              <MenuItem name="1-1" @click.native="ToNotebooks">
                <Icon size="20" type="ios-book" />My Notebooks
              </MenuItem>
              <MenuItem name="1-2" @click.native="ToAccount">
                <Icon size="20" type="ios-person" />Account
              </MenuItem>
              <!-- <MenuItem name="1-3">Preferences</MenuItem>-->
            </Menu>
          </div>
        </Sider>
        <Content>
          <MyNotebooks
            :fc_books="c_books"
            :fcpp_books="cpp_books"
            :fp2_books="p2_books"
            :fp3_books="p3_books"
            :fj_books="j_books"
            :username="username"
            v-show="showNotebooks"
          ></MyNotebooks>
          <Account :username="username" :newusername="[username]" v-show="showAccount"></Account>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import api from "../../assets/js/api.js";
import MyNotebooks from "./MyNotebooks.vue";
import Account from "./Account.vue";
export default {
  data() {
    return {
      username: "",
      modal_message: false,
      message_color: "#00FF00",
      showNotebooks: true,
      showAccount: false,
      c_books: [],
      cpp_books: [],
      p2_books: [],
      p3_books: [],
      j_books: [],

      share_message: []
    };
  },
  components: {
    MyNotebooks,
    Account
  },

  mounted() {
    this.$Spin.show();
    var _this = this;
    
    // setInterval(function () {
    //   if (_this.$refs.message.color == "#00FF00")
    //     _this.$refs.message.color = "#C0C0C0"
    //   else 
    //     _this.$refs.message.color = "#00FF00"
    // }, 2000)
    api.user_info(function(response) {
      _this.$Spin.hide();
      if (response.code != 0) {
        _this.$router.push("/");
      } else {
        _this.username = response.data.name;
        _this.update_tables()
      }
    });
    api.share_info(function(obj) {
      console.log(obj)

      if (obj.code == 0) {
        _this.share_message = obj.data
      } else {
        _this.$Message.error("查询项目分享消息失败")
      }
    })
  },
  methods: {
    update_tables() {
      let _this = this
      _this.$Spin.show();
      api.project_info(function(response) {
        _this.$Spin.hide();
        console.log(response)
        if (response.code == 0) {
          _this.c_books.splice(0, _this.c_books.length)
          _this.cpp_books.splice(0, _this.cpp_books.length)
          _this.p2_books.splice(0, _this.p2_books.length)
          _this.p3_books.splice(0, _this.p3_books.length)
          _this.j_books.splice(0, _this.j_books.length)
          console.log('1')
          var projects = response.data;
          for (var i = 0; i < projects.length; i++) {
            if (projects[i].imageType == api.C) {
              _this.c_books.push(projects[i]);
            } else if (projects[i].imageType == api.CPP) {
              _this.cpp_books.push(projects[i]);
            } else if (projects[i].imageType == api.PYTHON2) {
              _this.p2_books.push(projects[i]);
            } else if (projects[i].imageType == api.PYTHON3) {
              _this.p3_books.push(projects[i]);
              console.log('2')
              console.log(_this.p3_books)
            } else if (projects[i].imageType == api.JAVA) {
              _this.j_books.push(projects[i]);
            }
          }
        } else if (response.code == -101) {
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else {
          _this.$Message.error("未知错误");
        }
      });
    },
    handle_message() {
      this.modal_message = true
    },
    refuse_share(item) {
      // this.modal_message = false
      console.log(item)
      let _this = this
      this.$Modal.confirm({
          title: '项目拒绝确认',
          content: '<p>您确定拒绝接收该项目吗？</p>',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            console.log('ok')
            api.share_refuse(item.projectId, function(obj) {
              _this.update_tables()
              if (obj.code == 0) {
                for (let i = 0; i < _this.share_message.length; i = i + 1) {
                  if (_this.share_message[i].projectId == item.projectId) {
                    _this.$Message.success("拒绝成功")
                    _this.share_message.splice(i, 1)
                    return
                  }
                }
              } else {
                _this.$Message.error("拒绝失败：" + obj.message)
                return
              }
            })
          },
          onCancel: () => {
            console.log('cancel')
          }
      });
    },
    accept_share(item) {
      console.log(item)
      let _this = this
      this.$Modal.confirm({
          title: '项目接收确认',
          content: '<p>您确定接收该项目吗？</p>',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            console.log('ok')
            api.share_accept(item.projectId, function(obj) {
              _this.update_tables()
              if (obj.code == 0) {
                for (let i = 0; i < _this.share_message.length; i = i + 1) {
                  if (_this.share_message[i].projectId == item.projectId) {
                    _this.$Message.success("接收成功")
                    _this.share_message.splice(i, 1)
                    
                    return
                  }
                }
              } else {
                _this.$Message.error("接收失败：" + obj.message)
                return
              }
            })
          },
          onCancel: () => {
            console.log('cancel')
          }
      });
    },
    ToNotebooks() {
      this.showNotebooks = true;
      this.showAccount = false;
    },
    ToAccount() {
      this.showNotebooks = false;
      this.showAccount = true;
    },

    quit() {
      this.$Spin.show();

      var _this = this;
      api.user_logout(function(response) {
        _this.$Spin.hide();
        if (response.code == 0) {
          _this.$Message.success("注销成功");
          _this.$router.push("/");
        }
      });
    },
    newDraft(draftLanguage) {
      var _this = this;
      _this.$router.push({
        name: "Draft",
        query: {
          language: draftLanguage,
        }
      });
    }
  }
};
</script>