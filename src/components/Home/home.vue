<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
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
                        
                           欢迎，{{name}}
                        </MenuItem>
                       
                        
                    </div>
                    <a  @click="quit">注销</a>
                </Menu>
               
            </Header>
            <Layout  >
                <Sider hide-trigger :style="{background: '#fff'}">
                    <div style="margin-top:200px;">
                    <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
                        
                            <MenuItem name="1-1" @click.native="ToNotebooks">My Notebooks</MenuItem>
                            <MenuItem name="1-2" @click.native="ToAccount">Account</MenuItem>
                            <MenuItem name="1-3">Preferences</MenuItem>
                      
                    </Menu>
                    </div>
                </Sider>
                <Content>
                        <MyNotebooks v-show="showNotebooks"></MyNotebooks>
                        <Account v-show="showAccount"></Account>
                </Content>
               
                
            </Layout>
            
        </Layout>
    </div>
</template>
<script>
import api from '../../assets/js/api.js'
import MyNotebooks from './MyNotebooks.vue'
import Account from './Account.vue'
    export default {
        data(){
            return{
                name: '',
                showNotebooks:true,
                showAccount:false
            }
        },
        components:{
            MyNotebooks,
            Account
        },
      
        mounted(){
            this.$Spin.show();
             var _this=this
			api.user_info(function(response){
                _this.$Spin.hide();
            if(response.code!=0){
                _this.$router.push('/')
            }else{
                _this.name=response.data.name
            }
            
        })
        
		},
		methods:{
            ToNotebooks(){
                this.showNotebooks=true
                this.showAccount=false
            },

            ToAccount(){
                this.showNotebooks=false
                this.showAccount=true
            },
            
			quit(){
                 this.$Spin.show();
               
                 var _this=this
				api.user_logout(function(response){
                    _this.$Spin.hide();
                    if(response.code==0){
                        _this.$Message.success('注销成功')
                        _this.$router.push('/')

                    }
                })
			}
		}

    }
</script>
