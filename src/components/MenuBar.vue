
<template>
    <div id="menubar">
        <Layout>
            <Header :style="{height: '5.6vh', padding: '0'}">
            <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0vh">
                <Button type="primary" style="min-width: 9vh" height='3.6vh'>
                    文件
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh">
                    <DropdownItem>新建文件</DropdownItem>
                    <DropdownItem>豆汁儿</DropdownItem>
                    <Dropdown placement="right-start" transfer style="min-width: 20vh">
                        <DropdownItem>
                            北京烤鸭
                            <Icon type="ios-arrow-forward" style="float: right"></Icon>
                        </DropdownItem>
                        <DropdownMenu slot="list">
                            <DropdownItem>挂炉烤鸭</DropdownItem>
                            <DropdownItem>焖炉烤鸭</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0vh">
                <Button type="primary" style="min-width: 9vh" height='3.6vh'>
                    编辑
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh; overflow:hidden">
                    <DropdownItem>撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem>重做<span style="float: right">Ctrl+Y</span></DropdownItem>
                    <DropdownItem divided>拷贝<span style="float: right">Ctrl+C</span></DropdownItem>
                    <DropdownItem>剪切<span style="float: right">Ctrl+X</span></DropdownItem>
                    <DropdownItem>粘贴<span style="float: right">Ctrl+V</span></DropdownItem>
                    <DropdownItem divided>查找<span style="float: right">Ctrl+F</span></DropdownItem>
                    <DropdownItem>替换<span style="float: right">Ctrl+H</span></DropdownItem>
                    <DropdownItem>全局查找<span style="float: right">Ctrl+Shift+F</span></DropdownItem>
                    <DropdownItem>全局替换<span style="float: right">Ctrl+Shift+H</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 9vh">
                    代码操作
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh">
                    <DropdownItem>撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem>重做</DropdownItem>
                    <DropdownItem divided>拷贝</DropdownItem>
                    <DropdownItem>剪切</DropdownItem>
                    <DropdownItem>粘贴</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 9vh">
                    运行
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh">
                    <DropdownItem >撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem >重做</DropdownItem>
                    <DropdownItem divided>拷贝</DropdownItem>
                    <DropdownItem >剪切</DropdownItem>
                    <DropdownItem >粘贴</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 9vh">
                    视图
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh">
                    <DropdownItem>撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem>重做</DropdownItem>
                    <DropdownItem divided>拷贝</DropdownItem>
                    <DropdownItem>剪切</DropdownItem>
                    <DropdownItem>粘贴</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 9vh">
                    帮助
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh">
                    <DropdownItem>撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem>重做</DropdownItem>
                    <DropdownItem divided>拷贝</DropdownItem>
                    <DropdownItem>剪切</DropdownItem>
                    <DropdownItem>粘贴</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Button type="primary" style="min-width: 9vh; float: right" @click="exitproject">
                退出项目{{ this.projectname }}
            </Button>
            </Header>
        </Layout>
    </div>
</template>

<script>
import api from '../assets/js/api.js';
export default {
    props: {
        projectid:{
            type:Number,
            required:true
        },
        projectname:{
            type:String,
            required:true
        }
    },
    watch: {
        projectid: function(newVal, oldVal){
            this.projectId = newVal;
            console.log("已更新projectid")
        }
    },
    data() {
        return {
            projectId:0
        }
    },
    methods: {
        exitproject() {
            if (this.projectId != 0){
                var _this=this
                this.$Spin.show()
                console.log("退出id为"+this.projectId)
                api.project_exit(this.projectId, function(response){
                    _this.$Spin.hide()
                    console.log("response.code:" + response.code);
                    if(response.code==0){
                        console.log("退出项目成功");
                    }else if(response.code==-101){
                        _this.$Message.error('cookie验证失败')
                        _this.$router.push('/')
                    }else if(response.code==-102){
                        _this.$Message.error('权限不足')
                    }else{
                        _this.$Message.error('未知错误')
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
    .ivu-btn{
        border-radius: 0px;
        color:#f5f7f9;background-color:#464e57;border-color:#464e57;
        margin: 0px;
        border: 0px solid transparent;
        padding: 6px 16px 6px;
        margin:-3px;
    }
    .ivu-layout-header{
        height:4vh;
        line-height:4vh;
        padding:0;
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
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
	  .ivu-btn:hover{
      background-color: dimgrey;
    }
    .ivu-dropdown{
        height: 3.6vh;
    }
    .ivu-dropdown-rel{
        height: 3.6vh;
    }
    .ivu-dropdown-menu{
        max-height: 500px;
        overflow: hidden;
    }
    .ivu-dropdown-item{
     padding: 0px 5px 0px 8px;
      height: 3.6vh;
        float: none;
    }
    .ivu-dropdown-item-divided{
      height: 3.6vh;
      margin-top: 0px;
      margin-bottom: 2px;
      padding: 0px 5px 0px 8px;
      line-height: 20px;
      border-top: 1px solid #e8eaec;
        float: none;
    }
    .ivu-layout-header{
        height:36px;
        line-height:36px;
        padding:0;
        background-color: #464e57;
        margin: 0;
    }
	.ivu-select-dropdown {
      border-radius: 0px;
      margin-top: 2px;
      max-height: 400px;
      padding: 0px;
      z-index: 20000;
      overflow: hidden;
    }
    .ivu-tree-title{
      border-radius:0px;
      color:#fff;
    }
</style>