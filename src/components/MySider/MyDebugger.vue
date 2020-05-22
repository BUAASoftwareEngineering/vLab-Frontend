<template>
  <Layout style="background-color: inherit; color: inherit;">
    <Row type="flex" justify="center" align="middle">
      <Col span="24">
        <p style="padding:4px 4px 4px 15px;width:250px;height:23px;font-size:15px;">调试程序</p>
      </Col>
    </Row>
    <Divider style="margin:10px auto"/>
    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStart"
          :disabled = "!debugCanBegin || !debugCanNext"
        ><Icon type="md-arrow-dropright-circle" />&nbsp;&nbsp;&nbsp;(Re)Start</Button>
      </Col>
    </Row>

    <!--
    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugPause"
          :disabled = "!debugCanPause"
        ><Icon type="ios-pause" />pause</Button>
      </Col>
    </Row>
    -->

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugContinue"
          :disabled = "!debugCanBegin || !debugCanNext"
        ><Icon type="md-play" />&nbsp;&nbsp;&nbsp;Continue</Button>
      </Col>
    </Row>  

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStepOver"
          :disabled = "!debugCanBegin || !debugCanNext"
        ><Icon type="ios-skip-forward" />&nbsp;&nbsp;&nbsp;Step over</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStepInto"
          :disabled = "!debugCanBegin || !debugCanNext"
        ><Icon type="ios-fastforward" />&nbsp;&nbsp;&nbsp;Step into</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStepOut"
          :disabled = "!debugCanBegin || !debugCanNext"
        ><Icon type="ios-redo" />&nbsp;&nbsp;&nbsp;Step out</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugShow"
          :disabled = "!debugCanBegin || !debugCanNext"
        ><Icon type="ios-eye" />&nbsp;&nbsp;&nbsp;Local variables</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStop"
          :disabled = "!debugCanBegin || !debugCanNext"
        ><Icon type="ios-square" />&nbsp;&nbsp;&nbsp;Stop</Button>
      </Col>
    </Row>
  </Layout>
</template>

<script>
import api from "../../assets/js/api";
import bridge from "../bridge";
import terminal from "../Terminal";
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
    }
  },
  data() {
    return {
      debugCanBegin: false,
      debugCanNext: true,
      pythonMark: false,
    };
  },
  methods: {
    async click_debugStart() {
      //this.debugCanBegin = false;
      //this.debugCanNext = false;
      //this.debugCanPause = true;
      if (this.pythonMark == false) {
        terminal.setMatch("Start it from the beginning", (obj) => {
          terminal.runcommand("y");
          terminal.disposeMatch("Start it from the beginning");
        });
        terminal.setShowable(false);
        terminal.setMatch("Quit", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Quit");
          terminal.runcommand("run");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      } else {
        terminal.setShowable(false);
        terminal.setMatch("Key", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Key");
          terminal.runcommand("restart");
          terminal.setMatch("->", (obj) => {
            console.log(obj);
            terminal.disposeMatch("->");
            terminal.setShowable(false);
            terminal.setMatch("is not", (obj) => {
              terminal.setShowable(true);
              terminal.disposeMatch("is not");
              this.debugCanBegin = true;
            });
            terminal.runcommand("import types")
            terminal.runcommand("def showLocalVars(__locals_call): __exclude_keys = ['copyright', 'credits', 'False','True', 'None', 'Ellipsis', 'quit'];__exclude_valuetypes = [types.BuiltinFunctionType, types.BuiltinMethodType, types.ModuleType, types.FunctionType];return {k: v for k, v in __locals_call.items() if not (k in __exclude_keys or type(v) in __exclude_valuetypes) and k[:2] != '__'};");
            terminal.runcommand("okForDebug")
          });
        });
        this.debugCanBegin = false;
        await terminal.ctrlc();
        //terminal.runcommand("restart");
      }
      //console.log("debugStart");
    },
    //async click_debugPause() {
    //  this.debugCanBegin = false;
    //  this.debugCanNext = true;
    //  this.debugCanPause = false;
    //  console.log("debugPause");
    //},
    async click_debugContinue() {
      if (this.pythonMark == false) {
        terminal.setShowable(false);
        terminal.setMatch("Quit", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Quit");
          terminal.runcommand("continue");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      } else {
        //await terminal.ctrlc();
        //terminal.runcommand("continue");
        terminal.setShowable(false);
        terminal.setMatch("Key", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Key");
          terminal.runcommand("continue");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      }
      //console.log("debugContinue");
    },
    async click_debugStepOver() {
      if (this.pythonMark == false) {
        terminal.setShowable(false);
        terminal.setMatch("Quit", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Quit");
          terminal.runcommand("next");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      } else {
        //await terminal.ctrlc();
        //terminal.runcommand("next");
        terminal.setShowable(false);
        terminal.setMatch("Key", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Key");
          terminal.runcommand("next");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      }
      //console.log("debugStepOver");
    },
    async click_debugStepInto() {
      if (this.pythonMark == false) {
        terminal.setShowable(false);
        terminal.setMatch("Quit", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Quit");
          terminal.runcommand("step");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      } else {
        //await terminal.ctrlc();
        //terminal.runcommand("step");
        terminal.setShowable(false);
        terminal.setMatch("Key", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Key");
          terminal.runcommand("step");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      }
      //console.log("debugStepInto");
    },
    async click_debugStepOut() {
      if (this.pythonMark == false) {
        terminal.setShowable(false);
        terminal.setMatch("Quit", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Quit");
          terminal.runcommand("finish");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      } else {
        //await terminal.ctrlc();
        //terminal.runcommand("return");
        terminal.setShowable(false);
        terminal.setMatch("Key", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Key");
          terminal.runcommand("return");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      }
      //console.log("debugStepOut");
    },
    async click_debugShow() {
      if (this.pythonMark == false) {
        terminal.setShowable(false);
        terminal.setMatch("Quit", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Quit");
          terminal.runcommand("info locals");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      } else {
        //await terminal.ctrlc();
        //terminal.runcommand("showLocalVars(locals())");
        terminal.setShowable(false);
        terminal.setMatch("Key", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Key");
          terminal.runcommand("showLocalVars(locals())");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      }
      //console.log("debugShow");
    },
    async click_debugStop() {
      if (this.pythonMark == false) {
        terminal.setShowable(false);
        terminal.setMatch("Quit anyway", (obj) => {
          terminal.runcommand("y");
          terminal.disposeMatch("Quit anyway");
        });
        terminal.setMatch("Quit", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Quit");
          terminal.runcommand("quit");
        });
        await terminal.ctrlc();
      } else {
        //await terminal.ctrlc();
        //terminal.runcommand("quit");
        terminal.setShowable(false);
        terminal.setMatch("Key", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("Key");
          terminal.runcommand("quit");
          this.debugCanNext = false;
        });
        await terminal.ctrlc();
      }
      this.debugCanBegin = false;
      bridge.$emit("debugStop");
    },
    /*
    upDateButtonDisalbe() {
      this.startButtonDisable = this.debugBeginStatus;
      this.stopButtonDisable = !this.debugBegintatus;
      this.stepintoButtonDisable = !this.debugBegintatus || !this.debugPauseStatus;
      this.pauseButtonDisable = !this.debugBegintatus || !this.debugPauseStatus;
      this.continueButtonDisable = !this.debugBegintatus || !this.debugRunStatus;
      this.stepoutButtonDisable= !this.debugBegintatus || !this.debugPauseStatus;
      this.stepoverButtonDisable= !this.debugBegintatus || !this.debugPauseStatus;  
    },
    */
  },
  mounted () {
    bridge.$on("settingProject", Project => {
      console.log(Project.imageType)
      if (Project.imageType == "PYTHON3") {
        this.pythonMark = true;
      }
    }),
    bridge.$on("beginDebug", Project => {
      this.debugCanBegin = true;
      terminal.setMatch("[(]Pdb[)]|[(]gdb[)]", (obj)=> {
        this.debugCanNext = true;
      });
    });
  },
  beforeDestroy() {
    bridge.$off("settingProject");
    bridge.$off("debugStop");
    bridge.$off("beginDebug");
  }
};

</script>

<style scoped>

</style> 