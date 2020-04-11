<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #2c9b92;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
   
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-layout-header {
		padding: 0;
	}

.layer {
    position: absolute;
    background: transparent;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid transparent;
    z-index: 1;

}
</style>
<template>
    <div class="layout">
        <Layout  :style="{minHeight: '100vh'}">
            <Header >
                <Menu mode="horizontal" theme="dark" active-name="1">
                    
                    <div class="layout-nav">
                        <MenuItem name="1">
                        
                           欢迎  {{name}}
                        </MenuItem>
                       
                        
                    </div>
                    <a href="#" @click="quit">注销登录</a>
                </Menu>
               
            </Header>
            <Layout  >
                <Sider hide-trigger :style="{background: '#fff'}">
                    <div style="margin-top:200px;">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        
                            <MenuItem name="1-1">My Notebooks</MenuItem>
                            <MenuItem name="1-2">Account</MenuItem>
                            <MenuItem name="1-3">Preferences</MenuItem>
                      
                    </Menu>
                    </div>
                </Sider>
                <Content>
                    <div style="margin-top:80px;">
                        <Input search  placeholder=" Search for Notebooks..." style="width: 800px" />                  
                    </div>
                    <Footer>
                    <div style="margin-top:20px;">
                        <Tabs value="name1">
                            <TabPane label="C/C++ Notebooks" name="name1"></TabPane>
                            <TabPane label="Python Notebooks" name="name2"></TabPane>
                            <TabPane label="Java Notebooks" name="name3"></TabPane>
                        </Tabs>
                        <Card style="width:130px ">
                            <div style="text-align:center">
                               <img src="../assets/new.png"/>
                               <br>
                                <a >New</a>
                                <br><br>
                                
                            </div>
                            <div style="text-align:left">
                                <img src="../assets/import.png" width=20px height=20px>
                                <a >Import ...</a>
                            </div>
                        </Card>
                    </div>
                </Footer>
                </Content>
                
            </Layout>
            
        </Layout>
    </div>
</template>
<script>
import api from '../assets/js/api.js'
    export default {
        data(){
            return{
                name: ''
            }
        },
      
        mounted(){
			api.user_info(function(response){
            if(response.code!=0){
                this.$router.push('/')
            }
        })
		},
		methods:{
			quit(){
				api.user_logout(function(response){
                    if(response.code==0){
                        this.$router.push('/')
                    }
                })
			}
		}

    }
</script>
