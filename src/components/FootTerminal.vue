<template>
  <Layout style="background-color: inherit; color: inherit;">
    <div id="footDiv" style="height:100%;bordor:none;padding:0px;margin:0px;">
      <div style="padding-top:5px;width:100%;height:25px;font-size:15px;text-align:center;">调试控制台</div>
      <div id="myFoot" style="width: 100%;height:calc(100% - 25px);"></div>
    </div>
  </Layout>
</template>
<script>
import terminal from "./Terminal";
import api from "../assets/js/api";
import bridge from "./bridge";
export default {
  props: {
    projectid: {
      type: Number,
      required: true
    }
  },
  watch: {
    projectid: function(newVal, oldVal) {
      if (this.count == 0) {
        this.count++;
        this.projectId = newVal;
        var _this = this;
        api.project_info(function(response) {
          if (response.code == 0) {
            var project_info = response;
            // var project_now = project_info.data[0];
            for (let i = 0; i < project_info.data.length; i++) {
              if (_this.projectId == project_info.data[i].projectId) {
                _this.project_now = project_info.data[i];
                break;
              }
            }
            _this.project_now.theme = 'light';
            terminal.mounted(_this.project_now, "myFoot");
            bridge.$emit("settingProject", _this.project_now);
          }
        });
      }
    }
  },
  data() {
    return {
      projectId: 0,
      project_now: undefined,
      count: 0
    };
  }
};
</script>