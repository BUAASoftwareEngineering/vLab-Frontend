
<template>
    <div id='mylayout' ref='mylayout' class="layout">
        <Layout>
            <MenuBar class="mymenu" :projectid="projectid" :projectname="projectname"></MenuBar>
            <ControlPanel class="mycontrol" :username="username" :projectid="projectid" :projectname="projectname"></ControlPanel>
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
                projectid:0,
                projectname:''
            }
        },
        components: {
            MenuBar, ControlPanel
        },
        mounted(){
            // this.username=this.$route.params.username
            // this.projectid=this.$route.params.projectId
            // this.projectname=this.$route.params.projectName
            // this.username=this.$route.query.username
            this.projectid=Number(this.$route.query.projectId)
            this.projectname=this.$route.query.projectName
            if(this.$route.query.projectId == undefined|this.$route.query.projectName == undefined){
                this.$router.push('/')
            }
            var _this = this;
            api.project_enter(this.projectid,function(response){
                // console.log(response.code)
                if(response.code!=0){
                    _this.$router.push('/')
                }
            })
          },
          beforedestroyed(){     
              var _this=this
              this.$Spin.show()
              api.project_exit(this.projectid,function(response){
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
        height: 3.6vh;
        margin-top: 0vh;
        margin-bottom: 0vh;
    }
    .mymenu >>> .ivu-dropdown{
        height: 3.6vh;
    }
    .mymenu >>> .ivu-select-dropdown{ 
    overflow: hidden; 
    border-radius: 0vh; 
    max-height: 400px; 
    padding-bottom: 0px; 
    } 
</style> 