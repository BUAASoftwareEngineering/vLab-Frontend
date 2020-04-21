
<template>
    <div id='mylayout' ref='mylayout' class="layout">
        <Layout>
            <MenuBar class="mymenu"></MenuBar>
            <ControlPanel class="mycontrol"></ControlPanel>
        </Layout>
    </div>
</template>
<script>
import ControlPanel from "./ControlPanel"
import MenuBar from "./MenuBar"
import {initEditor} from '../editor/app'
import bridge from './bridge.js'
import api from '../assets/js/api'
    export default{
        data(){
            return{
                username:'',
                projectId:0,
                projectName:''
            }
        },
        components: {
            MenuBar, ControlPanel
        },
        mounted(){  
            this.username=this.$route.params.username
            this.projectId=this.$route.params.projectId
            this.projectName=this.$route.params.projectName
         },
        beforedestroyed(){     
                
            var _this=this
            this.$Spin.show()
            api.project_exit(this.projectId,function(response){
                _this.$Spin.hide()
                
                if(response.code==0){
                    console.log('exit_sucess')
                }
            })
        }
    }
</script>


<style scoped>
    .mycontrol >>> .ivu-tabs-content{
        height: 100%;
    }

    .mycontrol >>> .ivu-tabs-bar{
        margin-bottom: 0px;
    }

    .mycontrol >>> .ivu-tabs-content-animated{
        height: 100%;
    }
    .mycontrol >>> .ivu-layout-sider-trigger{
        visibility: hidden;
    }
    .mymenu >>> .ivu-dropdown-rel{
        height: 5vh;
        text-align: middle;
    }
    .mymenu >>> .ivu-btn{
        height: 5vh;
        margin-top: 0vh;
        margin-bottom: 0vh;
    }
    .mymenu >>> .ivu-dropdown{
        height: 5vh;
    }
    .mymenu >>> .ivu-select-dropdown{ 
    overflow: hidden; 
    border-radius: 0vh; 
    max-height: 400px; 
    padding-bottom: 0px; 
    } 
</style> 