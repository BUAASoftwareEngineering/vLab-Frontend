<template>
  <Layout style="background-color: inherit;width:250px;color: inherit;">
    <Row type="flex" justify="center" align="middle">
      <Col span="24">
        <p style="padding:4px 4px 4px 15px;width:250px;height:23px;font-size:15px;float:left;">构建设置
          <Poptip trigger="hover" title="选中单个py文件运行/调试" content="结果在右下方调试控制台中显示" v-if="pythonMark==true" transfer>
            <Icon type="md-help-circle" />
          </Poptip>
          <Poptip trigger="hover" title="选中文件编译/运行/调试" content="结果在右下方调试控制台中显示" v-if="pythonMark==false" transfer>
            <Icon type="md-help-circle" />
          </Poptip>
        </p>
      </Col>
    </Row>
    <Divider style="margin:10px auto" />

    <template v-for="file in Files">
      <Checkbox
        :id="file"
        :key="file"
        @on-change="changeState(file)"
        :value="Show[file]"
        style="margin-left:10%;"
      >
        <label style="line-height:30px;font-family: Consolas, 'Lucida Console', monospace, sans-serif;">{{file.split('/').reverse()[0]}}</label>

        <div style="font-size:12px;font-family: Consolas, 'Lucida Console', monospace, sans-serif;" :title="file">{{file | ellipsis}}</div>
      </Checkbox>
    </template>

    <Row
      type="flex"
      justify="center"
      align="middle"
      style="margin-top: 10px;"
      v-if="pythonMark==false"
    >
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_compile_run"
        >编译并运行</Button>
      </Col>
    </Row>

    <Row
      type="flex"
      justify="center"
      align="middle"
      style="margin-top: 10px;"
      v-if="pythonMark==false"
    >
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_compile"
        >编译</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_run"
        >运行</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debug"
          :disabled="debugRuning"
        >调试</Button>
      </Col>
    </Row>  

  </Layout>
</template>
<script>
import bridge from "../bridge";
import terminal from "../Terminal";
import api from "../../assets/js/api";
import Terminal from '../Terminal';
export default {
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
    },
    isWriteable: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      Files: [],
      Show: {},
      pythonMark: false,
      debugRuning : false,
    };
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 27) {
        return value.slice(0, 27) + "...";
      }
      return value;
    }
  },
  methods: {
    changeState(data) {
      // console.log(data, this.Show[data]);
      this.Show[data] = !this.Show[data];
      // console.log(data, this.Show[data]);
    },
    openSetting() {
      bridge.$emit("openSetting");
    },
    async click_debug() {
      terminal.ctrlc()
      this.debug()
    },
    async click_compile() {
      terminal.ctrlc();
      this.compile();
    },
    async click_run() {
      terminal.ctrlc();
      this.run();
    },
    async click_compile_run() {
      terminal.ctrlc();
      this.compileAndRun();
    },
    async compile() {
      let ret = "compile";
      if (this.pythonMark) {
        this.$Message.error("python类工程下请直接选择一个python类型文件运行");
        this.openSetting();
      } else {
        let temp = {};
        temp.sources = [];
        for (var key in this.Show) {
          if (this.Show[key] == true) {
            temp.sources.push("/code/" + key);
          }
        }
        if (temp.sources.length == 0) {
          this.$Message.error(
            "请在侧边栏的构建选项中选择至少一个cpp类型文件及相关依赖文件"
          );
          this.openSetting();
          return false;
        } else {
          ret = await terminal.compile(temp);
        }
      }
      return ret;
    },
    async run() {
      let ret = "run";
      if (this.pythonMark) {
        let temp = {};
        temp.exec = "";
        let count = 0;
        for (var key in this.Show) {
          if (this.Show[key] == true) {
            count++;
            temp.exec = "/code/" + key;
          }
        }
        if (count == 0) {
          this.$Message.error("请在侧边栏的构建选项中选择一个python类型文件");
          this.openSetting();
        } else if (count == 1) {
          ret = await terminal.run(temp);
        } else if (count > 1) {
          this.$Message.error("Python类型工程只能有一个入口，请取消多余勾选");
          this.openSetting();
        }
      } else {
        let temp = {};
        ret = await terminal.run(temp);
      }
      return ret;
    },
    async compileAndRun() {
      if (this.pythonMark) {
        this.$Message.error("python类工程下请直接选择一个python类型文件运行");
        this.openSetting();
      } else {
        let ret = "compile";
        if (this.pythonMark) {
          this.$Message.error("python类工程下请直接选择一个python类型文件运行");
          this.openSetting();
        } else {
          let temp = {};
          temp.sources = [];
          for (var key in this.Show) {
            if (this.Show[key] == true) {
              temp.sources.push("/code/" + key);
            }
          }
          if (temp.sources.length == 0) {
            this.$Message.error(
              "请在侧边栏的构建选项中选择至少一个cpp类型文件及相关依赖文件"
            );
            this.openSetting();
            return false;
          } else {
            terminal.compile_and_run(temp);
          }
        }
      }
    },
    async debug() {
      if (this.pythonMark) {
        let filepath = "";
        let count = 0;
        for (var key in this.Show) {
          if (this.Show[key] == true) {
            count++;
            filepath = "/code/" + key;
          }
        }
        if (count == 0) {
          this.$Message.error("请在侧边栏的构建选项中选择一个python类型文件");
          this.openSetting();
        } else if (count == 1) {
          terminal.runcommand("");
          let command = "python3 -m pdb " + filepath;
          terminal.runcommand(command);
          //terminal.runcommand("from debugger import showLocalVars");
          //terminal.setShowable(false);
          //console.log("debug beigin");
          terminal.setMatch("Running 'cont'", (obj) => {
            terminal.runcommand("cont");
          });
          terminal.setMatch("The program finished and will be restarted", (obj) => {
            terminal.setShowable(false);
            terminal.runcommand("import types");
            terminal.runcommand("def showLocalVars(__locals_call): __exclude_keys = ['copyright', 'credits', 'False','True', 'None', 'Ellipsis', 'quit'];__exclude_valuetypes = [types.BuiltinFunctionType, types.BuiltinMethodType, types.ModuleType, types.FunctionType];return {k: v for k, v in __locals_call.items() if not (k in __exclude_keys or type(v) in __exclude_valuetypes) and k[:2] != '__'};");
            terminal.runcommand("okForDebug");
            terminal.setMatch("is not", (obj) => {
              terminal.setShowable(true);
              terminal.disposeMatch("is not");
            });
          });
          terminal.setMatch("->", (obj) => {
            //console.log(obj);
            terminal.disposeMatch("->");
            terminal.setShowable(false);
            terminal.setMatch("is not", (obj) => {
              terminal.setShowable(true);
              terminal.disposeMatch("is not");
              bridge.$emit("beginDebug");
            });
            terminal.runcommand("import types")
            terminal.runcommand("def showLocalVars(__locals_call): __exclude_keys = ['copyright', 'credits', 'False','True', 'None', 'Ellipsis', 'quit'];__exclude_valuetypes = [types.BuiltinFunctionType, types.BuiltinMethodType, types.ModuleType, types.FunctionType];return {k: v for k, v in __locals_call.items() if not (k in __exclude_keys or type(v) in __exclude_valuetypes) and k[:2] != '__'};");
            bridge.$emit("readyForDebug", filepath);
          });
          this.debugRuning = true;
        } else if (count > 1) {
          this.$Message.error("Python类型工程只能有一个入口，请取消多余勾选");
          this.openSetting();
        }
      } else {
        let filepath = "";
        let count = 0;
        for (var key in this.Show) {
          if (this.Show[key] == true) {
            count++;
            filepath = "/code/" + key;
          }
        }
        if (count == 0) {
          this.$Message.error("请在侧边栏的构建选项中选择一个cpp类型文件");
          this.openSetting();
        } else if (count == 1) {
          terminal.runcommand("");
          let command = "g++ -g " + filepath + " -o /code/fordebug";
          terminal.runcommand(command);
          terminal.runcommand("gdb /code/fordebug");

          terminal.setMatch("GNU gdb", (obj) => {
            //console.log(obj);
            terminal.disposeMatch("GNU gdb");
            terminal.setShowable(false);
            terminal.setMatch("Undefined command", (obj) => {
              terminal.setShowable(true);
              terminal.runcommand("run");
              terminal.disposeMatch("Undefined command");
              bridge.$emit("beginDebug");
            });
            bridge.$emit("readyForDebug", filepath);
          });
          this.debugRuning = true;
        } else if (count > 1) {
          this.$Message.error("cpp类型debug调试目前只支持一个入口，请取消多余勾选");
          this.openSetting();
        }
      }
      setTimeout(function() {
        terminal.openSend()
      }, 1000)
    }
  },
  mounted() {
    bridge.$on("ReturnAllFile", Files => {
      this.Files = [];
      // console.log(this.Files);
      this.$nextTick(function() {
        this.Show = {};
        for (let i = 0; i < Files.length; i++) {
          var end = Files[i].split(".").reverse()[0];
          //console.log(Files[i] + "    " + end);
          if (this.pythonMark) {
            if (end == "py") {
              this.Show[Files[i]] = false;
              this.Files.push(Files[i]);
            }
          } else {
            if (end == "c" || end == "cpp" || end == "h" || end == "hpp") {
              this.Show[Files[i]] = false;
              this.Files.push(Files[i]);
            }
          }
        }
        // console.log(this.Files);
      });
    }),
      bridge.$on("settingProject", Project => {
        // console.log(Project.imageType)
        if (Project.imageType == "PYTHON3") {
          this.pythonMark = true;
        }
      }),
      bridge.$on("tocompile", val => {
        this.compile();
      }),
      bridge.$on("torun", val => {
        this.run();
      }),
      bridge.$on("tocompilerun", val => {
        this.compileAndRun();
      }),
      bridge.$on("toDebug", val => {
        this.debug();
      }),
      bridge.$on("debugStop", val => {
        this.debugRuning = false;
      });
  },

  beforeDestroy() {
    bridge.$off("ReturnAllFile");
    bridge.$off("settingProject");
    bridge.$off("tocompile");
    bridge.$off("torun");
    bridge.$off("tocompilerun");
    bridge.$off("toDebug");
    bridge.$off("readyForDebug");
    bridge.$off("debugStop");
    bridge.$off("beginDebug");
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