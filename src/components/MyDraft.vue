
<template>
  <div id="back">
  <div id="mydraft" ref="mydraft" class="MyDraft">
    <Layout style="height:100%">
      <Sider style="background:#66ccff;" width="75">
      </Sider>
      <Layout style="height:100%;background:#000000;width:600px">
      </Layout>
      <Layout style="height:100%;background:#ffffff;">
      </Layout>
    </Layout>
  </div>
  </div>
</template>
<script>
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
};
</script>

<style scoped>
#back {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
}
.MyDraft {
  position: absolute;
    left: 7%;
    right: 7%;
    top: 4%;
    bottom: 10%;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 2px 20px 1px;
}
</style>
