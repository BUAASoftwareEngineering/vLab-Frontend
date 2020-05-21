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
        ><Icon type="md-arrow-dropright-circle" />&nbsp;&nbsp;&nbsp;Start</Button>
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
      terminal.ctrlc();
      if (this.pythonMark == false) {
        terminal.runcommand("run");
        terminal.runcommand("y");
      } else {
        terminal.runcommand("continue");
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
      terminal.ctrlc();
      if (this.pythonMark == false) {
        terminal.runcommand("continue");
      } else {
        terminal.runcommand("continue");
      }
      //console.log("debugContinue");
    },
    async click_debugStepOver() {
      terminal.ctrlc();
      if (this.pythonMark == false) {
        terminal.runcommand("next");
      } else {
        terminal.runcommand("next");
      }
      //console.log("debugStepOver");
    },
    async click_debugStepInto() {
      terminal.ctrlc();
      if (this.pythonMark == false) {
        terminal.runcommand("step");
      } else {
        terminal.runcommand("step");
      }
      //console.log("debugStepInto");
    },
    async click_debugStepOut() {
      terminal.ctrlc();
      if (this.pythonMark == false) {
        terminal.runcommand("finish");
      } else {
        terminal.runcommand("return");
      }
      //console.log("debugStepOut");
    },
    async click_debugShow() {
      terminal.ctrlc();
      if (this.pythonMark == false) {
        terminal.runcommand("info locals");
      } else {
        terminal.runcommand("showLocalVars(locals())");
      }
      //console.log("debugShow");
    },
    async click_debugStop() {
      terminal.ctrlc();
      if (this.pythonMark == false) {
        terminal.runcommand("quit");
        terminal.runcommand("y");
      } else {
        terminal.runcommand("quit");
        terminal.runcommand("y");
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