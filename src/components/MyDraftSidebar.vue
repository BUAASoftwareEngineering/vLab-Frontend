<template>
  <Menu
    active-name="mySideMenu"
    style="background-color:inherit;margin: 0;border:none;color:#ffffff;width:100%;height:100%;font-size:20px;"
  >
    <MenuItem name="quit" @click.native="toHomePage" title="退回主页">
      <Icon type="md-exit" />
    </MenuItem>
    <Dropdown placement="right-start" width="200px">
      <MenuItem name="edit" title="编辑" :style="{'pointer-events':'none'}">
        <Icon type="ios-create" />
      </MenuItem>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="undo()">撤销</DropdownItem>
        <DropdownItem @click.native="redo()">恢复</DropdownItem>
        <DropdownItem @click.native="cut()">剪切</DropdownItem>
        <DropdownItem @click.native="copy()">复制</DropdownItem>
        <DropdownItem @click.native="search()">查找</DropdownItem>
        <DropdownItem @click.native="replace()">替换</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown placement="right-start">
      <MenuItem name="code-working" title="代码操作" :style="{'pointer-events':'none'}">
        <Icon type="ios-code-working" />
      </MenuItem>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="fold()">折叠当前位置</DropdownItem>
        <DropdownItem @click.native="unfold()">展开当前位置</DropdownItem>
        <DropdownItem @click.native="foldRecursively()">从当前位置递归折叠</DropdownItem>
        <DropdownItem @click.native="unfoldRecursively()">从当前位置递归展开</DropdownItem>
        <DropdownItem @click.native="foldAll()">折叠全部</DropdownItem>
        <DropdownItem @click.native="unfoldAll()">展开全部</DropdownItem>
        <DropdownItem @click.native="revealDefinition()">转到声明/定义</DropdownItem>
        <DropdownItem @click.native="referenceSearch()">转到引用</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown placement="right-start">
      <MenuItem name="list-type" title="视图" :style="{'pointer-events':'none'}">
        <Icon type="ios-list" />
      </MenuItem>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="setLineNumberOnOff()">显示/隐藏&ensp;行号</DropdownItem>
        <DropdownItem @click.native="setMinimapOnOff()">显示/隐藏&ensp;迷你地图</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown placement="right-start">
      <MenuItem name="help" title="帮助" :style="{'pointer-events':'none'}">
        <Icon type="ios-help-circle" />
      </MenuItem>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="toDocs()">发布说明</DropdownItem>
        <DropdownItem @click.native="toHelp()">帮助文档</DropdownItem>
        <DropdownItem @click.native="toIssue()">问题反馈</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Menu>
</template>

<script>
import bridge from "./bridge";
import { bus } from "./bus.js";
import * as Editor from "../editor/Appearances.js";
export default {
  data() {
    return {
      draftEditor: "",
      LineNumberOnOff: true,
      MinimapOnOff: true,
    };
  },
  created() {
    bus.$on("draftEditor", draftEditor => {
      this.draftEditor = draftEditor;
    });
  },
  methods: {
    toHomePage() {
      var _this = this;
      _this.$router.push("/home");
    },
    undo() {
      this.draftEditor.getModel().undo();
    },
    redo() {
      this.draftEditor.getModel().redo();
    },
    cut() {
      this.draftEditor.getAction("editor.action.clipboardCutAction").run();
    },
    copy() {
      this.draftEditor.getAction("editor.action.clipboardCopyAction").run();
    },
    paste() {
      this.draftEditor.getAction("editor.action.clipboardPasteAction").run();
    },
    search() {
      this.draftEditor.getAction("actions.find").run();
    },
    replace() {
      this.draftEditor.getAction("editor.action.startFindReplaceAction").run();
    },
    setLineNumberOnOff() {
      this.LineNumberOnOff = !this.LineNumberOnOff;
      if (this.LineNumberOnOff) {
        Editor.setLineNumberOnOff(this.draftEditor, "on");
      } else {
        Editor.setLineNumberOnOff(this.draftEditor, "off");
      }
    },
    setMinimapOnOff() {
      this.MinimapOnOff = !this.MinimapOnOff;
      if (this.MinimapOnOff) {
        Editor.setMinimapOnOff(this.draftEditor, "on");
      } else {
        Editor.setMinimapOnOff(this.draftEditor, "off");
      }
    },
    fold() {
      this.draftEditor.getAction("editor.fold").run();
    },
    unfold() {
      this.draftEditor.getAction("editor.unfold").run();
    },
    foldRecursivelyr() {
      this.draftEditor.getAction("editor.foldRecursively").run();
    },
    unfoldRecursively() {
      this.draftEditor.getAction("editor.unfoldRecursively").run();
    },
    foldAll() {
      this.draftEditor.getAction("editor.foldAll").run();
    },
    unfoldAll() {
      this.draftEditor.getAction("editor.unfoldAll").run();
    },
    revealDefinition() {
      this.draftEditor.getAction("editor.action.revealDefinition").run();
    },
    referenceSearch() {
      this.draftEditor.getAction("editor.action.referenceSearch.trigger").run();
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
  },
  beforeDestroy() {
    bridge.$off("draftEditor");
  }
};
</script>