<template>
    <Layout style="background-color: #808695">
        <Row>
            <Col span="24">
            <Card style="border-radius: 0vh">
                <p slot="title">构建设置</p>
                <p style="height:2.4vh;padding-left:0.4vh;color:white">My first notebook</p>
            </Card>
                
            </Col>
        </Row>

        
        <Checkbox>
            <label style="color:white">My first notebook</label>
        </Checkbox>
        
        <Checkbox>
            <label style="color:white">My second notebook</label>
        </Checkbox>
        
        <Checkbox>
            <label style="color:white">My third notebook</label>
        </Checkbox><br>
         
    </Layout>
</template>
<script>
    export default {
        
    }
</script>

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