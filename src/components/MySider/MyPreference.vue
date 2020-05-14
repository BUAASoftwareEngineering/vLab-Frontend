<template>
  <Layout style="background-color: #808695">
    <Row>
      <Col span="24">
        <Card style="border-radius: 0vh">
          <p slot="title">偏好设置</p>
          <p style="height:2.4vh;padding-left:0.4vh;color:white">编辑器偏好设置</p>
        </Card>
      </Col>
    </Row>
    <br />
    <h2 style="margin-left:20px">主题</h2>
    <br />
    <Row>
      <Col :span="24" style="text-align:left">
        <Select v-model="model1" style="width:25vh; margin-left:30px">
          <Option v-for="item in themeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
    </Row>
    <br />

    <h2 style="margin-left:20px">行号</h2>
    <br />
    <Row>
      <Col :span="24" style="text-align:left">
        <RadioGroup v-model="openmark" style="margin-left:30px">
          <Radio label="yes" border></Radio>
          <Radio label="no" border></Radio>
        </RadioGroup>
      </Col>
    </Row>
    <br />

    <h2 style="margin-left:20px">字体</h2>
    <br />
    <Row>
      <Col :span="24" style="text-align:left">
        <Select v-model="model2" style="width:25vh; margin-left:30px">
          <Option v-for="item in fontList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
    </Row>
    <br />
  </Layout>
</template>
<script>
export default {
  data() {
    return {
      themeList: [
        {
          value: "dark",
          label: "dark"
        },
        {
          value: "light",
          label: "light"
        }
      ],
      model1: "dark",
      fontList: [
        {
          value: "Monaco",
          label: "Monaco"
        },
        {
          value: "Courier New",
          label: "Courier New"
        }
      ],
      model2: "Monaco",
      openmark: "yes"
    };
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