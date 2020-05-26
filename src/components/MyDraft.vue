
<template>
  <div id="mydraft" ref="mydraft" class="MyDraft">
    <Layout>
      hello world!
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
    };
  },
  mounted() {
    var _this = this;
    api.user_info(function(response) {
      if (response.code != 0) {
        _this.$router.push("/");
      } else {
        _this.username = response.data.name;
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
