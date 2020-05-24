<template>
  <Layout :style="{marginLeft: '0vh'}" :class="controlTheme">
    <Sider :style="{height: '94vh', overflow: 'hidden'}" width="60">
      <Menu
        :active-name="mySiderActive"
        :theme="menuTheme"
        width="50"
        :open-names="['1']"
        style="height:100%"
      >
        <MenuItem name="1-1" @click.native="changeTree">
          <Icon type="md-folder" />
        </MenuItem>
        <MenuItem name="2-1" @click.native="changeSetting">
          <Icon type="md-build" />
        </MenuItem>
        <MenuItem name="5-1" @click.native="changeDebugger">
          <Icon type="ios-bug" />
        </MenuItem>
        <MenuItem name="3-1" @click.native="changeUpload">
          <Icon type="ios-cloud" />
        </MenuItem>
       
      </Menu>
    </Sider>

    <Sider
      :style="{height: '94vh', overflow: 'auto'}"
      collapsible
      v-model="treemark"
      collapsed-width="0"
      width="250"
    >
      <MyTree class="mytree" :username="username" :projectid="projectid" :projectname="projectname"></MyTree>
    </Sider>
    <Sider
      :style="{height: '94vh', overflow: 'auto'}"
      collapsible
      v-model="settingmark"
      collapsed-width="0"
      width="250"
    >
      <MySetting
        class="mysetting"
        :username="username"
        :projectid="projectid"
        :projectname="projectname"
      ></MySetting>
    </Sider>
    <Sider
      :style="{height: '94vh', overflow: 'auto'}"
      collapsible
      v-model="debuggermark"
      collapsed-width="0"
      width="250"
    >
      <MyDebugger
        class="mydebugger"
        :username="username"
        :projectid="projectid"
        :projectname="projectname"
      ></MyDebugger>
    </Sider>
    <Sider
      :style="{height: '94vh', overflow: 'auto'}"
      collapsible
      v-model="uploadmark"
      collapsed-width="0"
      width="250"
    >
      <MyCloudUpload
        class="mycloudupload"
        :username="username"
        :projectid="projectid"
        :projectname="projectname"
      ></MyCloudUpload>
    </Sider>
    <Sider
      :style="{height: '94vh', overflow: 'auto'}"
      collapsible
      v-model="downloadmark"
      collapsed-width="0"
      width="250"
    >
      <MyCloudDownload
        class="myclouddownload"
        :username="username"
        :projectid="projectid"
        :projectname="projectname"
      ></MyCloudDownload>
    </Sider>
    <Sider
      :style="{height: '94vh', overflow: 'auto'}"
      collapsible
      v-model="preferencemark"
      collapsed-width="0"
      width="250"
    >
      <MyPreference
        class="mypreference"
        :username="username"
        :projectid="projectid"
        :projectname="projectname"
      ></MyPreference>
    </Sider>
    <Sider
      :style="{height: '94vh', overflow: 'auto'}"
      collapsible
      v-model="notebookmark"
      collapsed-width="0"
      width="250"
    >
      <MyNotebook
        class="mynotebook"
        :username="username"
        :projectid="projectid"
        :projectname="projectname"
      ></MyNotebook>
    </Sider>
    <Layout :style="{height: '94vh', overflow: 'hidden'}">
      <Split ref="sp" v-model="split2" mode="vertical" @on-moving="fit" @on-move-end="fit">
        <div slot="top" class="demo-split-pane" style="width: 100%; height: 100%">
          <Tabs
            type="card"
            :style="{'height': '100%'}"
            v-model="currentTab"
            @on-tab-remove="handleTabRemove"
          >
            <template v-for="key in tabs">
              <TabPane :id="'father'+key" :key="key" :label="tabsMap[key]" closable :name="key">
                <div :id="key" style="width:100%;height:100%"></div>
              </TabPane>
            </template>
          </Tabs>
        </div>
        <div slot="bottom" class="demo-split-pane" style="width:100%;height:100%;overflow:hidden;" >
          <FootTerminal :class="myFootTheme" :projectid="projectid" style="width:100%;height:100%;overflow: 'auto';"></FootTerminal>
        </div>
      </Split>
    </Layout>
  </Layout>
</template>
<script>
import FootTerminal from "./FootTerminal";
import MyTree from "./MySider/MyTree";
import MySetting from "./MySider/MySetting";
import MyCloudUpload from "./MySider/MyCloudUpload";
import MyCloudDownload from "./MySider/MyCloudDownload";
import MyPreference from "./MySider/MyPreference";
import MyNotebook from "./MySider/MyNotebook";
import MyDebugger from "./MySider/MyDebugger";
import * as editor from "../editor/app";
import { setTheme } from "../editor/Appearances"
import bridge from "./bridge";
import api from "../assets/js/api.js";
import { getBreakpointLines } from "../editor/Editor.js";
import terminal from "./Terminal";
import { bus } from "./bus.js";
export default {
  components: {
    FootTerminal,
    MyTree,
    MySetting,
    MyCloudUpload,
    MyCloudDownload,
    MyPreference,
    MyNotebook,
    MyDebugger
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
  data() {
    return {
      split2: 0.66,
      treemark: false,
      settingmark: true,
      uploadmark: true,
      downloadmark: true,
      preferencemark: true,
      notebookmark: true,
      isCollapsed: true,
      debuggermark: true,
      tabs: [],
      tabsMap: {},
      editorMap: {},
      count: 0,
      currentTab: "",
      firstInto: true,
      myEditor: undefined,
      menuTheme: "light",
      myFootTheme: "lightFoot",
      controlTheme: "lightcontrol",
      mySiderActive: "1-1",
    };
  },
  methods: {
    fit() {
      terminal.fit();
    },
    handleTabsAdd(id, label, BASE_DIR, overwrite = false, tempUse = false) {
      this.tabs.push(id);
      this.tabsMap[id] = label;
      // console.log(this.tabs);
      this.$nextTick(function() {
        let new_tabPane = document.createElement("DIV");
        new_tabPane.id = this.getIDEId(id);
        new_tabPane.style.height = "100%";
        new_tabPane.style.width = "100%";
        document.getElementById(id).appendChild(new_tabPane);
        var _this = this;
        this.$Spin.show();
        api.project_info(async function(response) {
          _this.$Spin.hide();
          if (response.code == 0) {
            var project_info = response;
            // console.log(project_info);
            var project_now = project_info.data[0];
            for (let i = 0; i < project_info.data.length; i++) {
              if (_this.projectid == project_info.data[i].projectId) {
                project_now = project_info.data[i];
                break;
              }
            }
            if (_this.firstInto) {
              _this.firstInto = false;
              _this.myEditor = editor.createMonacoApp(project_now, "/code/", _this.menuTheme);
            }
            //console.log(tempUse);
            var tempEditor = await _this.myEditor.addEditor(
              id,
              tempUse,
              new_tabPane.id
            );

            _this.currentTab = id;
            _this.editorMap[id] = tempEditor;
            if (overwrite == true) {
              bridge.$emit("overrideMonacoReturn", tempEditor);
            }
            bus.$emit("editorMap", _this.editorMap);
            bus.$emit("currentTab", _this.currentTab);
            //TODO
            /*
                            console.log(project_now);
                            console.log(BASE_DIR);
                            console.log(new_tabPane.id);
                            api.file_new(_this.projectid, id, function(newfile){
                                 var a
                                if(newfile.code == 0){
                                    // let myEditor = editor.createMonacoApp(project_now, BASE_DIR);
                                    a=_this.myEditor.addEditor(id, true, new_tabPane.id);
                                } else if(newfile.code == -301){
                                    // let myEditor = editor.createMonacoApp(project_now, BASE_DIR);
                                    a=_this.myEditor.addEditor(id, false, new_tabPane.id);
                                }
                                 a.then((result) =>{ 
                                   _this.currentTab = id;
                                   _this.editorMap[id]=result                                       
                                    bus.$emit('editorMap',_this.editorMap)
                                    bus.$emit('currentTab',_this.currentTab)
                                })
                            })*/
          } else if (response.code == -101) {
            _this.$Message.error("cookie验证失败");
            _this.$router.push("/");
          } else if (response.code == -102) {
            _this.$Message.error("权限不足");
          } else {
            _this.$Message.error("未知错误");
          }
        });
      });
    },
    handleTabRemove(name) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] == name) {
          this.tabs.splice(i, 1);
        }
      }
      delete this.tabsMap[name];
      this.myEditor.closeEditor(this.editorMap[name]);
      delete this.editorMap[name];
      //TODO
      // console.log(this.tabsMap);
      // console.log(this.editorMap);
      bus.$emit("editorMap", this.editorMap);
      bus.$emit("currentTab", this.currentTab);
    },
    getIDEId(Index) {
      return "editor_" + Index;
    },
    changeTree: function() {
      this.mySiderActive="1-1";
      this.treemark = !this.treemark;
      this.uploadmark = true;
      this.downloadmark = true;
      this.settingmark = true;
      this.debuggermark = true;
      this.preferencemark = true;
      this.notebookmark = true;
    },
    changeSetting: function() {
      if (this.settingmark) {
        bridge.$emit("AllFile");
      }
      this.mySiderActive="2-1";
      this.treemark = true;
      this.uploadmark = true;
      this.downloadmark = true;
      this.debuggermark = true;
      this.settingmark = !this.settingmark;
      this.preferencemark = true;
      this.notebookmark = true;
    },
    changeUpload: function() {
      this.mySiderActive="3-1";
      this.treemark = true;
      this.uploadmark = !this.uploadmark;
      this.downloadmark = true;
      this.debuggermark = true;
      this.settingmark = true;
      this.preferencemark = true;
      this.notebookmark = true;
    },
    changeDownload: function() {
      this.mySiderActive="4-1";
      this.treemark = true;
      this.uploadmark = true;
      this.downloadmark = !this.downloadmark;
      this.debuggermark = true;
      this.settingmark = true;
      this.preferencemark = true;
      this.notebookmark = true;
    },
    changeDebugger: function() {
      this.mySiderActive="5-1";
      this.treemark = true;
      this.uploadmark = true;
      this.downloadmark = true;
      this.debuggermark = !this.debuggermark;
      this.settingmark = true;
      this.preferencemark = true;
      this.notebookmark = true;
    },
    changePreference: function() {
      this.treemark = true;
      this.uploadmark = true;
      this.downloadmark = true;
      this.debuggermark = true;
      this.settingmark = true;
      this.preferencemark = !this.preferencemark;
      this.notebookmark = true;
    },
    changeNotebook: function() {
      this.treemark = true;
      this.uploadmark = true;
      this.downloadmark = true;
      this.settingmark = true;
      this.preferencemark = true;
      this.notebookmark = !this.notebookmark;
    }
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  mounted() {
    bridge.$on("changeTree", val => {
      this.treemark = false;
       this.uploadmark = true;
      this.downloadmark = true;
      this.settingmark = true;
      this.preferencemark = true;
      this.notebookmark = true;
    }),
      bridge.$on("add", path_label => {
        if (!this.tabsMap.hasOwnProperty(path_label[0])) {
          this.handleTabsAdd(path_label[0], path_label[1], path_label[2], false, path_label[3]);
        }
        this.currentTab = path_label[0];
      }),
      bridge.$on("deleteFile", path => {
        if (this.tabsMap.hasOwnProperty(path)) {
          this.handleTabRemove(path);
        }
      }),
      bridge.$on("deleteFloder", paths => {
        for (let i = 0; i < paths.length; i++) {
          if (this.tabsMap.hasOwnProperty(paths[i])) {
            this.handleTabRemove(paths[i]);
          }
        }
      }),
      bridge.$on("renameFile", IDmap => {
        // console.log(IDmap);
        for (var key in IDmap) {
          if (this.tabsMap.hasOwnProperty(key)) {
            this.handleTabRemove(key);
            this.handleTabsAdd(IDmap[key][0], IDmap[key][1], IDmap[key][2]);
          }
        }
      }),
      bridge.$on("renameFloder", IDmap => {
        // console.log(IDmap);
        for (var key in IDmap) {
          if (this.tabsMap.hasOwnProperty(key)) {
            this.tabsMap[IDmap[key][0]] = this.tabsMap[key];
            this.handleTabRemove(key);
            this.handleTabsAdd(
              IDmap[key][0],
              this.tabsMap[IDmap[key][0]],
              IDmap[key][1]
            );
          }
        }
      }),
      bridge.$on("overrideMonaco", path_label => {
        if (!this.tabsMap.hasOwnProperty(path_label[0])) {
          this.handleTabsAdd(path_label[0], path_label[1], "/code/", true);
        }
        this.currentTab = path_label[0];
      }),
      bridge.$on("openSetting", obj => {
        if (this.settingmark) {
          this.changeSetting();
        }
      }),
      bridge.$on("changeAllTheme", themeName => {
        if (themeName == "light") {
          this.menuTheme = "light";
          this.controlTheme = "lightcontrol";
          this.myFootTheme = "lightFoot";
          terminal.settheme("light");
          setTheme("xcode-default");
        } else {
          this.menuTheme = "dark";
          this.controlTheme = "darkcontrol"
          this.myFootTheme = "darkFoot";
          terminal.settheme("dark");
          setTheme("tomorrow-night");
        }
      }),
      bridge.$on("readyForDebug", filepath => {
        let breaklines = getBreakpointLines(this.editorMap[filepath]);
        for (let i = 0; i < breaklines.length; i++) {
          //let command = "b " + filepath + " " + breaklines[i];
          let command = "b " + breaklines[i];
          terminal.runcommand(command);
        }
        terminal.runcommand("okCanDebug");
        if (this.debuggermark == true) {
          this.changeDebugger();
        }
      });      

  },
  //TODO
  watch: {
    currentTab: function() {
      console.log(this.currentTab);
      bus.$emit("currentTab", this.currentTab);
    }
  },
  beforeDestroy() {
    bridge.$off("openSetting");
    bridge.$off("add");
    bridge.$off("deleteFile");
    bridge.$off("deleteFloder");
    bridge.$off("renameFile");
    bridge.$off("renameFloder");
    bridge.$off("overrideMonaco");
    bridge.$off("changeAllTheme");
    bridge.$off("readyForDebug");
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
  height: 0vh;
  background: #363e4f;
  margin: -0.1vh;
}
.lightcontrol >>> .ivu-btn {
  border-radius: 0px;
  color: #4b4b4d;
  background-color: #dddddd;
  border-color: #bbbbbb;
  margin: 0px;
  border: 0px solid transparent;
  padding: 6px 16px 6px;
  margin: -3px;
}

.lightcontrol >>> .uploader-drop{
  width: 200px;
  height: 33px;
  background-color:#dfdfdf;
  border:#4b4b4d;
  padding: 0;
  margin-left:25px;
  border-radius:2px;
}
.lightcontrol >>> .uploader-btn{
  border-radius: 0px;
  background-color: #dfdfdf;
  border-color: #bbbbbb;
  border: 0px solid transparent;
  padding: 6px 16px 6px;
  width: 200px;
  height: 33px;
  margin: 0px;
  color:#4b4b4d;
  text-align: center;
  
}
.lightcontrol >>> .uploader-btn:hover{
  background-color: #cccccc;
}
.lightcontrol >>> .ivu-tabs-content {
  background-color: #ffffff;
}

.lightcontrol >>> .ivu-layout-sider {
    background-color: #f5f5f5;
    color: #4b4b4d;
    overflow-x: hidden;
}

.lightcontrol >>> .ivu-tabs-bar {
    background-color: #f0f0f0;
    font-family: Consolas;
}

.lightcontrol >>> .ivu-layout {
   background-color: #eeeeee;
}




.darkcontrol >>> .ivu-btn {
  border-radius: 0px;
  color: #f5f7f9;
  background-color: #464e57;
  border-color: #464e57;
  margin: 0px;
  border: 0px solid transparent;
  padding: 6px 16px 6px;
  margin: -3px;
}
.lightcontrol >>> .ivu-btn:hover {
  background-color: #cccccc;
}
.lightcontrol >>> .ivu-btn:disabled {
  background-color: #dddddd1c;
  color: #9999997a;
}

.darkcontrol >>> .ivu-btn:hover {
  background-color: dimgrey;
}

.darkcontrol >>> .ivu-btn:disabled {
  background-color: #3333336c;
  color: #eeeeee7a;
}


.darkcontrol >>> .uploader-drop{
  width: 200px;
  height: 33px;
  background-color:#464e57;
  border:#464e57;
  padding: 0;
  margin-left:25px;
  border-radius:0px;

}
.darkcontrol >>> .uploader-btn{
  border-radius: 0px;
  border: 0px solid transparent;
  padding: 6px 16px 6px;
  width: 200px;
  height: 33px;
  margin: 0px;
  color:#f5f7f9;
  text-align: center;
  
}
.darkcontrol >>> .uploader-btn:hover{
  background-color:dimgrey
}


.darkcontrol >>> .ivu-layout-sider {
    background-color: #333333;
    color: #ececec;
    overflow-x: hidden;
}

.darkcontrol >>> .ivu-divider {
  background-color: #3f3f3f;
}

.darkcontrol >>> .ivu-tabs-content {
  background-color: #222222;
}

.darkcontrol >>> .ivu-tabs-bar {
    background-color: #404040;
    border-bottom:#222222;
    font-family: Consolas;
}

.darkcontrol >>> .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    background-color: #505050;
    color: #ececec;
    border: 1px solid #303030;
}
.darkcontrol >>> .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    background-color: #222222;
    color: #ffffff;
}
.darkcontrol >>> .ivu-tabs-nav-container:focus .ivu-tabs-tab-focused {
   border-color: #6d6d6d!important;
}
.darkcontrol >>> .ivu-layout {
   background: #333333;
   color: #ffffff;
}

.darkcontrol >>> .demo-split-pane >>> .ivu-layout {
   background: #ffffff;
}

.darkcontrol >>> .ivu-split-trigger-horizontal {
   background: #444444;
   height: 7px;
}
.darkcontrol >>> .ivu-split-trigger {
   border : 1px solid #777777;
}
.darkcontrol >>> .ivu-split-trigger-bar {
   background: #ffffff;
}
.lightcontrol >>> .ivu-split-trigger {
   border : 1px solid #c0c0c0;
}
.lightcontrol >>> .ivu-split-trigger-bar {
   background: #4b4b4d;
}

.lightFoot >>> #myFoot {
  background: #ffffff;
}

.darkFoot >>> #myFoot {
  background: #000000;
}


.layout-header-bar {
  background: #fff;
}

.ivu-tree-title {
  border-radius: 0px;
  color: #fff;
}
.mytree >>> .ivu-card-body {
  padding: 0vh;
  height: 0vh;
  background: #363e4f;
  margin: 0vh;
}
.mysetting >>> .ivu-card-body {
  padding: 0.3vh;
  height: 3.5vh;
  background: #363e4f;
  margin: -0.1vh;
}
.mypreference >>> .ivu-card-body {
  padding: 0.3vh;
  height: 3.5vh;
  background: #363e4f;
  margin: -0.1vh;
}
.myclouddownload >>> .ivu-card-body {
  padding: 0.3vh;
  height: 3.5vh;
  background: #363e4f;
  margin: -0.1vh;
}
.mycloudupload >>> .ivu-card-body {
  padding: 0.3vh;
  height: 3.5vh;
  background: #363e4f;
  margin: -0.1vh;
}
.mynotebook >>> .ivu-card-body {
  padding: 0.3vh;
  height: 3.5vh;
  background: #363e4f;
  margin: -0.1vh;
}
.mytree >>> .ivu-card-head {
  padding: 0.4vh;
}
.mysetting >>> .ivu-card-head {
  padding: 0.4vh;
}
.mypreference >>> .ivu-card-head {
  padding: 0.4vh;
}
.myclouddownload >>> .ivu-card-head {
  padding: 0.4vh;
}
.mycloudupload >>> .ivu-card-head {
  padding: 0.4vh;
}
.mynotebook >>> .ivu-card-head {
  padding: 0.4vh;
}
.mypreference >>> .br {
  display: inline;
  line-height: 5px;
}

</style> 