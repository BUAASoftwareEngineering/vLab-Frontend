
<template>
  <div :id="myDropTheme">
    <Layout>
      <Header style="height: '4vh', padding: '0'" width="80%">
        <!--
        <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0vh">
          <Button type="primary" style="min-width: 9vh">文件</Button>
          <DropdownMenu slot="list" style="min-width: 20vh; overflow:hidden">
            <DropdownItem @click.native="newFile()">新建文件</DropdownItem>
            <DropdownItem @click.native="newFolder()">新建文件夹</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0vh">
          <Button type="primary" style="min-width: 9vh">编辑</Button>
          <DropdownMenu slot="list" style="min-width: 20vh; overflow:hidden">
            <DropdownItem @click.native="undo(editorMap[currentTab])">
              撤销
              <span style="float: right">Ctrl+Z</span>
            </DropdownItem>
            <DropdownItem @click.native="redo(editorMap[currentTab])">
              恢复
              <span style="float: right">Ctrl+Shift+Z</span>
            </DropdownItem>
            <DropdownItem divided @click.native="cut(editorMap[currentTab])">
              剪切
              <span style="float: right">Ctrl+X</span>
            </DropdownItem>
            <DropdownItem @click.native="copy(editorMap[currentTab])">
              复制
              <span style="float: right">Ctrl+C</span>
            </DropdownItem>
            <DropdownItem divided @click.native="search(editorMap[currentTab])">
              查找
              <span style="float: right">Ctrl+F</span>
            </DropdownItem>
            <DropdownItem @click.native="replace(editorMap[currentTab])">
              替换
              <span style="float: right">Ctrl+H</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0vh">
          <Button type="primary" style="min-width: 9vh">代码操作</Button>
          <DropdownMenu slot="list" style="min-width: 40vh overflow: hidden">
            <DropdownItem @click.native="fold(editorMap[currentTab])">
              折叠当前位置
              <span style="float: right">Ctrl+-</span>
            </DropdownItem>
            <DropdownItem @click.native="unfold(editorMap[currentTab])">
              展开当前位置
              <span style="float: right">Ctrl+=</span>
            </DropdownItem>
            <DropdownItem @click.native="foldRecursively(editorMap[currentTab])">
              从当前位置递归折叠
              <span style="float: right">Alt+Ctrl+-</span>
            </DropdownItem>
            <DropdownItem @click.native="unfoldRecursively(editorMap[currentTab])">
              从当前位置递归展开
              <span style="float: right">Alt+Ctrl+=</span>
            </DropdownItem>
            <DropdownItem @click.native="foldAll(editorMap[currentTab])">
              折叠全部
              <span style="float: right">Ctrl+Shift+-</span>
            </DropdownItem>
            <DropdownItem @click.native="unfoldAll(editorMap[currentTab])">
              展开全部
              <span style="float: right">Ctrl+Shift+=</span>
            </DropdownItem>
            <DropdownItem divided @click.native="revealDefinition(editorMap[currentTab])">
              转到声明/定义
              <span style="float: right">Ctrl+D</span>
            </DropdownItem>
            <DropdownItem @click.native="referenceSearch(editorMap[currentTab])">
              转到引用
              <span style="float: right">Ctrl+Alt+D</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-start" transfer trigger="click">
          <Button type="primary" style="min-width: 9vh">运行</Button>
          <DropdownMenu slot="list" style="min-width: 20vh">
            <DropdownItem @click.native="compile" v-if="pythonMark==false">编译</DropdownItem>
            <DropdownItem @click.native="run">运行</DropdownItem>
            <DropdownItem @click.native="compilerun" v-if="pythonMark==false">编译并运行</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-start" transfer trigger="click">
          <Button type="primary" style="min-width: 9vh">视图</Button>
          <DropdownMenu slot="list" style="min-width: 20vh">
            <DropdownItem @click.native="setLineNumberOnOff(editorMap[currentTab])">显示/隐藏&ensp;行号</DropdownItem>
            <DropdownItem @click.native="setMinimapOnOff(editorMap[currentTab])">显示/隐藏&ensp;迷你地图</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-start" transfer trigger="click">
          <Button type="primary" style="min-width: 9vh">帮助</Button>
          <DropdownMenu slot="list" style="min-width: 20vh">
            <DropdownItem @click.native="toDocs">发布说明</DropdownItem>
            <DropdownItem @click.native="toHelp">帮助文档</DropdownItem>
            <DropdownItem @click.native="toIssue">问题反馈</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        -->
        <Menu
          mode="horizontal"
          :theme="Menutheme"
          active-name="1"
          style="height:100%;line-height:45px;padding: 0px;"
        >
          <MenuItem name="10" style="pointer-events:none;font-family: Consolas;">
            <Icon type="ios-cloudy" />
            {{ this.projectname }}
          </MenuItem>

          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-document" />文件
            </template>
            <MenuGroup title="新建" :style="{'width': '150px'}">
              <MenuItem name="1-1" @click.native="newFile()" :disabled="!isWriteable">新建文件</MenuItem>
              <MenuItem name="1-2" @click.native="newFolder()" :disabled="!isWriteable">新建文件夹</MenuItem>
            </MenuGroup>
            <MenuItem name="1-9" :style="{'height':'1px', 'pointer-events':'none'}"></MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-create" />编辑
            </template>
            <MenuGroup title="修改" :style="{'width': '200px'}">
              <MenuItem name="2-1" @click.native="undo(editorMap[currentTab])" :disabled="!isWriteable">
                撤销
                <span style="float: right">Ctrl+Z</span>
              </MenuItem>
              <MenuItem name="2-2" @click.native="redo(editorMap[currentTab])" :disabled="!isWriteable">
                恢复
                <span style="float: right">Ctrl+Shift+Z</span>
              </MenuItem>
              <MenuItem name="2-3" @click.native="cut(editorMap[currentTab])" :disabled="!isWriteable">
                剪切
                <span style="float: right">Ctrl+X</span>
              </MenuItem>
              <MenuItem name="2-4" @click.native="copy(editorMap[currentTab])">
                复制
                <span style="float: right">Ctrl+C</span>
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="查找" :style="{'width': '200px'}">
              <MenuItem name="2-5" @click.native="search(editorMap[currentTab])">
                查找
                <span style="float: right">Ctrl+F</span>
              </MenuItem>
              <MenuItem name="2-6" @click.native="replace(editorMap[currentTab])" :disabled="!isWriteable">
                替换
                <span style="float: right">Ctrl+H</span>
              </MenuItem>
            </MenuGroup>
            <MenuItem name="2-9" :style="{'height':'1px', 'pointer-events':'none'}"></MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-code-working" />代码操作
            </template>
            <MenuGroup title="折叠" :style="{'width': '300px'}">
              <MenuItem name="3-1" @click.native="fold(editorMap[currentTab])">
                折叠当前位置
                <span style="float: right">Ctrl+-</span>
              </MenuItem>
              <MenuItem name="3-2" @click.native="unfold(editorMap[currentTab])">
                展开当前位置
                <span style="float: right">Ctrl+=</span>
              </MenuItem>
              <MenuItem name="3-3" @click.native="foldRecursively(editorMap[currentTab])">
                从当前位置递归折叠
                <span style="float: right">Alt+Ctrl+-</span>
              </MenuItem>
              <MenuItem name="3-4" @click.native="unfoldRecursively(editorMap[currentTab])">
                从当前位置递归展开
                <span style="float: right">Alt+Ctrl+=</span>
              </MenuItem>
              <MenuItem name="3-5" @click.native="foldAll(editorMap[currentTab])">
                折叠全部
                <span style="float: right">Ctrl+Shift+-</span>
              </MenuItem>
              <MenuItem name="3-6" @click.native="unfoldAll(editorMap[currentTab])">
                展开全部
                <span style="float: right">Ctrl+Shift+=</span>
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="跳转" :style="{'width': '300px'}">
              <MenuItem name="3-7" @click.native="revealDefinition(editorMap[currentTab])">
                转到声明/定义
                <span style="float: right">Ctrl+D</span>
              </MenuItem>
              <MenuItem name="3-8" @click.native="referenceSearch(editorMap[currentTab])">
                转到引用
                <span style="float: right">Ctrl+Alt+D</span>
              </MenuItem>
            </MenuGroup>
            <MenuItem name="3-9" :style="{'height':'1px', 'pointer-events':'none'}"></MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-play" />运行
            </template>
            <MenuGroup title="编译" v-if="pythonMark==false" :style="{'width': '200px'}">
              <MenuItem name="4-1" @click.native="compile">编译</MenuItem>
              <MenuItem name="4-2" @click.native="compilerun">编译并运行</MenuItem>
            </MenuGroup>
            <MenuGroup title="运行" :style="{'width': '200px'}">
              <MenuItem name="4-3" @click.native="run">运行</MenuItem>
            </MenuGroup>
            <MenuItem name="4-9" :style="{'height':'1px', 'pointer-events':'none'}"></MenuItem>
          </Submenu>
          <Submenu name="5" theme="dark">
            <template slot="title">
              <Icon type="ios-list" />视图
            </template>
            <MenuGroup title="编辑器" :style="{'width': '200px'}">
              <MenuItem
                name="5-1"
                @click.native="setLineNumberOnOff(editorMap[currentTab])"
              >显示/隐藏&ensp;行号</MenuItem>
              <MenuItem
                name="5-2"
                @click.native="setMinimapOnOff(editorMap[currentTab])"
              >显示/隐藏&ensp;迷你地图</MenuItem>
            </MenuGroup>
            <MenuItem name="5-9" :style="{'height':'1px', 'pointer-events':'none'}"></MenuItem>
          </Submenu>
          <Submenu name="6">
            <template slot="title">
              <Icon type="ios-help-circle" />帮助
            </template>
            <MenuGroup title="使用" :style="{'width': '200px'}">
              <MenuItem name="6-1" @click.native="toDocs">发布说明</MenuItem>
              <MenuItem name="6-2" @click.native="toHelp">帮助文档</MenuItem>
            </MenuGroup>
            <MenuGroup title="反馈" :style="{'width': '200px'}">
              <MenuItem name="6-3" @click.native="toIssue">问题反馈</MenuItem>
            </MenuGroup>
            <MenuItem name="6-9" :style="{'height':'1px', 'pointer-events':'none'}"></MenuItem>
          </Submenu>
          <MenuItem name="110" style="float:right;color:#ff4949;" @click.native="exitproject">
            <Icon type="ios-exit" />退出项目
          </MenuItem>
          <MenuItem name="111" style="float:right;">
            <i-switch v-model="themeSwitch" @on-change="changeTheme" true-color="#5b5b5b" />
          </MenuItem>
        </Menu>
      </Header>
    </Layout>
  </div>
</template>

<script>
import api from "../assets/js/api.js";
import { bus } from "./bus.js";
import * as Editor from "../editor/Appearances.js";
import bridge from "./bridge.js";
import terminal from "./Terminal.js"
export default {
  props: {
    projectid: {
      type: Number,
      required: true
    },
    projectname: {
      type: String,
      required: true
    },
    isWriteable: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    projectid: function(newVal, oldVal) {
      this.projectId = newVal;
      // console.log("已更新projectid")
    },
    currentTab: function() {
      if (
        this.currentTab != undefined &&
        this.editorMap[this.currentTab] != undefined
      ) {
        if (this.LineNumberOnOff) {
          Editor.setLineNumberOnOff(this.editorMap[this.currentTab], "on");
        } else {
          Editor.setLineNumberOnOff(this.editorMap[this.currentTab], "off");
        }
        if (this.MinimapOnOff) {
          Editor.setMinimapOnOff(this.editorMap[this.currentTab], "on");
        } else {
          Editor.setMinimapOnOff(this.editorMap[this.currentTab], "off");
        }
      }
    }
    /*
    themeSwitch: function (val, oldVal) {
      if (val == true) {
        bridge.$emit("changeAllTheme", "dark");
      } else {
        bridge.$emit("changeAllTheme", "light");
      }
    },
    */
  },
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].className = "myLightDrop";
  },
  data() {
    return {
      projectId: 0,
      Menutheme: "light",
      myDropTheme: "myLightDrop",
      themeSwitch: false,
      editorMap: {},
      currentTab: "",
      LineNumberOnOff: true,
      MinimapOnOff: true,
      pythonMark: false,
      helpModal: false,
      dropmenuColor: "#ececec",
      dropmenuBack: "#4b4b4d",
      terminal: terminal
    };
  },
  created() {
    bus.$on("editorMap", editorMap => {
      this.editorMap = editorMap;
    }),
      bus.$on("currentTab", currentTab => {
        this.currentTab = currentTab;
      });
    // console.log(this.editorMap),
    // console.log(this.currentTab)
    bridge.$on("settingProject", Project => {
      // console.log(Project.imageType)
      if (Project.imageType == "PYTHON3") {
        this.pythonMark = true;
      }
    });
  },
  methods: {
    newFile() {
      bridge.$emit("newRootFile");
    },
    newFolder() {
      bridge.$emit("newRootFolder");
    },
    exitproject() {
      if (this.projectId != 0) {
        var _this = this;
        this.$Spin.show();
        console.log("退出id为" + this.projectId);
        terminal.beforeDestroy()
        api.project_exit(this.projectId, function(response) {
          _this.$Spin.hide();
          console.log("response.code:" + response.code);
          if (response.code == 0) {
            // console.log("退出项目成功");
            _this.$router.push("/home");
          } else if (response.code == -101) {
            _this.$Message.error("cookie验证失败");
            _this.$router.push("/");
          } else if (response.code == -102) {
            _this.$Message.error("权限不足");
            _this.$router.push("/home");
          } else {
            _this.$Message.error("未知错误");
            _this.$router.push("/home");
          }
        });
      }
    },
    undo(editor) {
      editor.getModel().undo();
    },
    redo(editor) {
      editor.getModel().redo();
    },
    cut(editor) {
      editor.getAction("editor.action.clipboardCutAction").run();
    },
    copy(editor) {
      editor.getAction("editor.action.clipboardCopyAction").run();
    },
    paste(editor) {
      editor.getAction("editor.action.clipboardPasteAction").run();
    },
    search(editor) {
      editor.getAction("actions.find").run();
    },
    replace(editor) {
      editor.getAction("editor.action.startFindReplaceAction").run();
    },
    setLineNumberOnOff(editor) {
      this.LineNumberOnOff = !this.LineNumberOnOff;
      if (this.LineNumberOnOff) {
        Editor.setLineNumberOnOff(editor, "on");
      } else {
        Editor.setLineNumberOnOff(editor, "off");
      }
    },
    setMinimapOnOff(editor) {
      this.MinimapOnOff = !this.MinimapOnOff;
      if (this.MinimapOnOff) {
        Editor.setMinimapOnOff(editor, "on");
      } else {
        Editor.setMinimapOnOff(editor, "off");
      }
    },
    fold(editor) {
      editor.getAction("editor.fold").run();
    },
    unfold(editor) {
      editor.getAction("editor.unfold").run();
    },
    foldRecursively(editor) {
      editor.getAction("editor.foldRecursively").run();
    },
    unfoldRecursively(editor) {
      editor.getAction("editor.unfoldRecursively").run();
    },
    foldAll(editor) {
      editor.getAction("editor.foldAll").run();
    },
    unfoldAll(editor) {
      editor.getAction("editor.unfoldAll").run();
    },
    revealDefinition(editor) {
      editor.getAction("editor.action.revealDefinition").run();
    },
    referenceSearch(editor) {
      editor.getAction("editor.action.referenceSearch.trigger").run();
    },
    compile() {
      bridge.$emit("tocompile");
    },
    run() {
      bridge.$emit("torun");
    },
    compilerun() {
      bridge.$emit("tocompilerun");
    },
    toHelp() {
      window.open(
        "https://github.com/BUAASoftwareEngineering/vLab-Frontend/blob/master/Welcome.md"
      );
    },
    toDocs() {
      window.open("https://www.cnblogs.com/--undefined/p/12804624.html");
    },
    toIssue() {
      window.open(
        "https://github.com/BUAASoftwareEngineering/vLab-Frontend/issues/53"
      );
    },
    changeTheme(status) {
      if (status) {
        this.Menutheme = "dark";
        this.myDropTheme = "myDarkDrop";
        this.childSiderColor = "#333333";
        this.childFontColor = "#ececec";
        document.getElementsByTagName("body")[0].className = "myDarkDrop";
        bridge.$emit("changeAllTheme", "dark");
        this.$Message.info("dark");
      } else {
        this.Menutheme = "light";
        this.myDropTheme = "myLightDrop";
        this.childSiderColor = "#fafafa";
        this.childFontColor = "#4b4b4d";
        document.getElementsByTagName("body")[0].className = "myLightDrop";
        bridge.$emit("changeAllTheme", "light");
        this.$Message.info("light");
      }
    }
  },
  /*
  mounted() {
    bridge.$on("changeAllTheme", themeName => {
      if (themeName == "light") {
          this.menuTheme = "light";
          this.childSiderColor = "#fafafa";
          this.childFontColor="#4b4b4d";
        } else {
          this.menuTheme = "dark";
          this.childSiderColor= "#333333";
          this.childFontColor="#ececec";
        }
      });
  },
  */
  beforeDestroy() {
    bridge.$off("editorMap");
    bridge.$off("settingProject");
    bridge.$off("currentTab");
    bridge.$off("changeAllTheme");
    document.body.removeAttribute("class", this.myDropTheme);
  }
};
</script>
<style>
.myDarkDrop .ivu-select-dropdown {
  background-color: #4b4b4d;
  color: #f3f3f3;
}
.myDarkDrop .ivu-dropdown-item:hover {
  background: #5b5b5d;
}
.myDarkDrop .ivu-dropdown-item {
  color: #f3f3f3;
}

.myDarkDrop .myContentClass {
  background-color:#4b4b4d;
}
.myDarkDrop .ivu-poptip-inner {
  background-color:#4b4b4d;
  color: #f3f3f3;
}
.myDarkDrop .ivu-poptip-title-inner  {
  color: #f3f3f3;
}
.myDarkDrop .ivu-poptip-body-content-inner  {
  color: #f3f3f3;
}
.myLightDrop
  .ivu-menu-horizontal
  .ivu-menu-submenu
  .ivu-select-dropdown
  .ivu-menu-item-selected,
.ivu-menu-horizontal
  .ivu-menu-submenu
  .ivu-select-dropdown
  .ivu-menu-item-selected:hover {
  color: #4b4b4d;
}
</style>
<style scoped>
.ivu-btn {
  border-radius: 0px;
  color: #f5f7f9;
  background-color: #464e57;
  border-color: #464e57;
  margin: 0px;
  border: 0px solid transparent;
  /* padding: 6px 16px 6px; */
  padding: 0px 0px 0px;
  /* margin:-3px; */
  margin: -3px;
}

.demo-split {
  height: 200px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
.ivu-btn:hover {
  background-color: dimgrey;
}
.ivu-dropdown {
  height: 3.6vh;
}
.ivu-dropdown-rel {
  height: 3.6vh;
}
.ivu-dropdown-menu {
  max-height: 500px;
  overflow: hidden;
}
.ivu-dropdown-item {
  padding: 0px 5px 0px 8px;
  height: 3.6vh;
  float: none;
}
.ivu-dropdown-item-divided {
  height: 3.6vh;
  margin-top: 0px;
  margin-bottom: 2px;
  padding: 0px 5px 0px 8px;
  line-height: 20px;
  border-top: 1px solid #e8eaec;
  float: none;
}
.ivu-layout-header {
  height: 45px;
  line-height: 45px;
  padding: 0;
  background-color: #464e57;
  margin: 0;
}

.ivu-tree-title {
  border-radius: 0px;
  color: #fff;
}
.ivu-menu-dark.ivu-menu-horizontal
  .ivu-menu-submenu
  .ivu-select-dropdown
  .ivu-menu-item:hover {
  background: #5b5b5d;
}
.ivu-menu-dark.ivu-menu-horizontal
  .ivu-menu-submenu
  .ivu-select-dropdown
  .ivu-menu-item-group {
  background: #4b4b4d;
  color: #f3f3f3;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown {
  background: #4b4b4d;
  color: #f3f3f3;
}
.ivu-menu-dark.ivu-menu-horizontal
  .ivu-menu-submenu
  .ivu-select-dropdown
  .ivu-menu-item {
  background: #4b4b4d;
  color: #f3f3f3;
  font-family: Consolas;
}
</style>