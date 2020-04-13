<template>
    <Layout style="background-color: #808695">
        <Row>
            <Col span="24">
                <Card style="border-radius: 0vh">
                    <p slot="title">下载与导出</p>
                    <p style="height:2.4vh;padding-left:0.4vh;color:white">My first notebook</p>
                </Card>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 3.04vh">
                    <Button type="primary" style="border-radius: 0.4vh; margin: 0 3vh 0 3vh; width: 25vh; height: 4vh">从Notebook下载文件...</Button>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 3.04vh">
                <Button type="primary" style="border-radius: 0.4vh; margin: 0 3vh 0 3vh; width: 25vh; height: 4vh">导出Notebook到网盘...</Button>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 3.04vh">
                <Button type="primary" style="border-radius: 0.4vh; margin: 0 3vh 0 3vh; width: 25vh; height: 4vh">保存Notebook到GitHub...</Button>
            </Col>
        </Row>
    </Layout>
</template>

<style scoped>
    .my-setting .ivu-tabs-bar{
        margin-bottom: 0vh;
    }
    .ivu-card-head{
        padding: 0.4vh;
    }
    .ivu-card-body{
    padding: 0vh;
    height: 2.4vh;
    background: #363e4f;;
    margin: -0.1vh;
    }
    .ivu-btn{
        border-radius: 0px;
        color:#f5f7f9;background-color:#464e57;border-color:#464e57;
        margin: 0px;
		    border: 0px solid transparent;
        padding: 6px 16px 6px;
        margin:-3px;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
    }
	.ivu-btn:hover{
      background-color: dimgrey;
    }
    .ivu-layout-header{
        height:36px;
        line-height:36px;
        padding:0;
    background-color: #464e57;
        margin: 0;
    }
    .ivu-tree-title{
      border-radius:0px;
      color:#fff;
    }
</style>