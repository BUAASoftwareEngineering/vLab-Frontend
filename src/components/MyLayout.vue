
<template>
  <div id="mylayout" ref="mylayout" class="layout">
    <Layout>
      <MenuBar class="mymenu" :projectid="projectid" :projectname="projectname"></MenuBar>
      <ControlPanel
        class="mycontrol"
        :username="username"
        :projectid="projectid"
        :projectname="projectname"
      ></ControlPanel>
    </Layout>
  </div>
</template>
<script>
import ControlPanel from "./ControlPanel";
import MenuBar from "./MenuBar";
import { initEditor } from "../editor/app";
import bridge from "./bridge.js";
import api from "../assets/js/api";
export default {
  data() {
    return {
      username: "",
      projectid: 0,
      projectname: ""
    };
  },
  components: {
    MenuBar,
    ControlPanel
  },
  mounted() {
    // this.username=this.$route.params.username
    // this.projectid=this.$route.params.projectId
    // this.projectname=this.$route.params.projectName
    //this.username=this.$route.query.username;
    this.projectid = Number(this.$route.query.projectId);
    this.projectname = this.$route.query.projectName;
    if (
      (this.$route.query.projectId == undefined) |
      (this.$route.query.projectName == undefined)
    ) {
      this.$router.push("/");
    }
    var _this = this;

    api.user_info(function(response) {
      if (response.code != 0) {
        _this.$router.push("/");
      } else {
        _this.username = response.data.name;
      }
    });

    api.project_enter(this.projectid, function(response) {
      // console.log(response.code)
      if (response.code != 0) {
        _this.$router.push("/");
      }
    });
  }
  /*
          destroyed(){     
              var _this=this
              this.$Spin.show()
              api.project_exit(this.projectid,function(response){
                  _this.$Spin.hide()
                  if(response.code==0){
                    //   console.log('exit_sucess')
                      _this.$Message.success('退出成功')
                  }
              })
          }*/
};
</script>


<style scoped>
.mycontrol >>> .ivu-tabs-content {
  height: 100%;
}

.mycontrol >>> .ivu-tabs-bar {
  margin-bottom: 0px;
}

.mycontrol >>> .ivu-tabs-content-animated {
  height: 100%;
}
.mycontrol >>> .ivu-layout-sider-trigger {
  visibility: hidden;
}
.mycontrol >>> .ivu-menu-dark.ivu-menu {
  background: #3f3f3f;
}

.mycontrol
  >>> .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  color: #ffffff;
}
.mycontrol
  >>> .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):hover,
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover {
  background: #5d5d5d;
}
.mycontrol >>> .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #ffffff;
  background: #5d5d5d75;
}

.mycontrol >>> .ivu-menu-light.ivu-menu {
  background: #c0c0c0;
  border: none;
}

.mycontrol >>> .ivu-menu-item-active {
  border: none;
}
.mymenu >>> .ivu-dropdown-rel {
  height: 5vh;
  text-align: middle;
}
.mymenu >>> .ivu-btn {
  height: 4vh;
  margin-top: 0vh;
  margin-bottom: 0vh;
}
.mymenu >>> .ivu-dropdown {
  height: 3.6vh;
  z-index: 999;
}
.mymenu >>> .ivu-menu-dark.ivu-menu-horizontal {
  color: #ececec;
  background: #4b4b4d;
}
.mymenu >>> .ivu-menu-light.ivu-menu-horizontal {
  background: #e2e2e2;
}
</style> 