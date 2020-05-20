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
        ><Icon type="md-arrow-dropright-circle" />start</Button>
      </Col>
    </Row>

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

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugContinue"
          :disabled = "!debugCanNext"
        ><Icon type="md-play" />continue</Button>
      </Col>
    </Row>  

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStepOver"
          :disabled = "!debugCanNext"
        ><Icon type="ios-skip-forward" />stepOver</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStepInto"
          :disabled = "!debugCanNext"
        ><Icon type="ios-fastforward" />stepInto</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStepOut"
          :disabled = "!debugCanNext"
        ><Icon type="ios-redo" />stepOut</Button>
      </Col>
    </Row>

    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
      <Col :span="24" style="text-align:center">
        <Button
          type="primary"
          style="border-radius: 0.4vh; margin: 0 auto; width:200px"
          @click="click_debugStop"
          :disabled = "debugCanBegin"
        ><Icon type="ios-square" />stop</Button>
      </Col>
    </Row>
  </Layout>
</template>

<script>
import api from "../../assets/js/api";
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
      debugCanNext: false,
      debugCanPause: false,
    };
  },
  methods: {
    async click_debugStart() {
      this.debugCanBegin = false;
      this.debugCanNext = false;
      this.debugCanPause = true;
      console.log("debugStart");
    },
    async click_debugPause() {
      this.debugCanBegin = false;
      this.debugCanNext = true;
      this.debugCanPause = false;
      console.log("debugPause");
    },
    async click_debugContinue() {
      console.log("debugContinue");
    },
    async click_debugStepOver() {
      console.log("debugStepOver");
    },
    async click_debugStepInto() {
      console.log("debugStepInto");
    },
    async click_debugStepOut() {
      console.log("debugStepOut");
    },
    async click_debugStop() {
      this.debugCanBegin = true;
      this.debugCanNext = false;
      this.debugCanPause = false;
      console.log("debugContinue");
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
  }
};

</script>

<style scoped>

</style> 