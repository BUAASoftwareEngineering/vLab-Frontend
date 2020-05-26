
<template>
  <div id="back">
    <div class="MyLightDraft">
      <Layout style="height:100%">
        <!--左侧菜单栏-->
        <Sider width="75">
          <Button
            type="primary"
            style="background-color:inherit;margin: 0;border:none;color:#ffffff;width:100%;float:bottom;height:10vh;"
            @click="toHomePage"
            title = "退回主页"
          ><Icon type="android-exit"></Icon>quit</Button>
        </Sider>
        <!--编辑器-->
        <Layout style="height:100%;background:#000000;width:600px"></Layout>
        <!--输入输出框-->
        <Layout style="height:100%;background:#ffffff;"></Layout>
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
      username: ""
    };
  },
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].className = "MyLightDraft";
  },
  methods: {
    toHomePage() {
      var _this = this;
      _this.$router.push("/home");
    }
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
  },
  beforeDestroy() {
    document.body.removeAttribute("class", "MyLightDraft");
  }
};
</script>

<style scoped>
#back {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
}
.MyLightDraft {
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
<style>
.myLightDraft .ivu-select-dropdown {
  overflow: hidden;
  max-height: 1000px;
}
</style>
