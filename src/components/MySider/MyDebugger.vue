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
          :disabled = "!debugCanBegin"
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
          :disabled = "!debugCanNext"
        ><Icon type="md-play" />&nbsp;&nbsp;&nbsp;Continue</Button>
      </Col>
    </Row>  

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStepOver"
          :disabled = "!debugCanNext"
        ><Icon type="ios-skip-forward" />&nbsp;&nbsp;&nbsp;Step over</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStepInto"
          :disabled = "!debugCanNext"
        ><Icon type="ios-fastforward" />&nbsp;&nbsp;&nbsp;Step into</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStepOut"
          :disabled = "!debugCanNext"
        ><Icon type="ios-redo" />&nbsp;&nbsp;&nbsp;Step out</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugShow"
          :disabled = "!debugCanNext"
        ><Icon type="ios-eye" />&nbsp;&nbsp;&nbsp;Local variables</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStop"
          :disabled = "!debugCanBegin"
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
      debugCanBegin: true,
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
        });
        await terminal.ctrlc();
      } else {
        await terminal.ctrlc();
        terminal.setShowable(false);
        terminal.setMatch("python", (obj) => {
          terminal.setShowable(true);
          terminal.disposeMatch("python");
        });
        terminal.runcommand("quit");
        bridge.$emit("todebug");
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
        });
        await terminal.ctrlc();
      }      
      //console.log("debugContinue");
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
    });
  },
  beforeDestroy() {
    bridge.$off("settingProject");
  }
};

</script>

<style scoped>

</style> 