
<template>
  <div id="back">
    <div class="MyLightDraft">
      <Layout style="height:100%">
        <!--左侧菜单栏-->
        <Sider width="75">
          <Button
            type="primary"
            style="background-color:inherit;margin: 0;border:none;color:#ffffff;width:100%;float:bottom;height:2vh;"
            @click="toHomePage"
            title="退回主页"
          >
            <Icon type="android-exit"></Icon>quit
          </Button>
        </Sider>
        <!--编辑器-->
        <Layout style="height:100%;border-right:2px inset #ababab;width:600px"></Layout>

        <Layout style="height:100%;">
          <Layout style="border-bottom:2px inset #ababab;width:100%;">
            <Row type="flex" justify="center" align="middle">
              <Col :span="12" style="text-align:center">
                <Button type="primary" style="margin-top:5px;" @click title="运行">运行</Button>
              </Col>
              <Col :span="12" style="text-align:center">
                <Button type="primary" style="margin-top:5px;" @click title="保存到项目">保存到项目</Button>
              </Col>
            </Row>
          </Layout>
          <Layout style="height:45%;width:100%;border-bottom:2px inset #ababab;">
            <!--输入框-->
            <Layout style="height:80%;"></Layout>
            <Layout>
              <Row type="flex" justify="center" align="middle">
                <Col :span="24" style="text-align:center;">
                  <Button type="primary" style="margin-top:5px;" @click title="提交输入">提交输入</Button>
                </Col>
              </Row>
            </Layout>
          </Layout>
          <!--输入框-->
          <Layout style="height:45%;width:100%"></Layout>
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
      username: ""
    };
  },
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].className = "MyLightDraftBody";
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
    document.body.removeAttribute("class", "MyLightDraftBody");
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
.MyLightDraftBody .ivu-select-dropdown {
  overflow: hidden;
  max-height: 1000px;
}
.MyLightDraftBody .ivu-btn {
  border-radius: 3px;
  color: #f5f7f9;
  background-color: #515a6eec;
  border-color: #515a6e;
  border: 0px solid transparent;
}
</style>
