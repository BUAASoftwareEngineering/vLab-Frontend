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
        background:#515a6e;
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
.title{
   float:right;
    margin-right:100px;
    color:#ffffff
}
a{
    color:#7ed4fc
}
</style>
<template>
    <div class="layout">
        <Layout  :style="{minHeight: '100vh'}">
            <Header >
                <div class='title'>
                     欢迎&ensp;	{{username}} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 
                      

                     <a  @click="quit">注销</a>
                </div>
                    
                
               
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
                        <MyNotebooks :c_books='c_books' :cpp_books='cpp_books' :p2_books='p2_books' 
                        :p3_books='p3_books' :j_books='j_books'
                        v-show="showNotebooks"></MyNotebooks>
                        <Account :username='username' :newusername='[username]' 
                        v-show="showAccount"></Account>
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
                username: '',
               
                showNotebooks:true,
                showAccount:false,
                c_books: [{projectId:1,name:'C1'},{projectId:2,name:'C2'}],
                cpp_books:[{projectId:3,name:'CPP1'}],
                p2_books:[],
                p3_books:[],
                j_books:[]

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
                _this.username=response.data.name
                _this.$Spin.show()
                api.project_info(function(response){
              _this.$Spin.hide()
             if(response.code==0){                
                 
                 var projects=response.data
                 for(var i=0;i<projects.length;i++){
                     if(projects[i].imageType==api.C){
                         _this.c_books.push(
                             {projectId:projects[i].projectId,
                             name:projects[i].name})
                        
                     }else if(projects[i].imageType==api.CPP){
                         _this.cpp_books.push(
                             {projectId:projects[i].projectId,
                             name:projects[i].name})
                        
                     }else if(projects[i].imageType==api.PYTHON2){
                         _this.p2_books.push( {projectId:projects[i].projectId,
                             name:projects[i].name})
                     }else if(projects[i].imageType==api.PYTHON3){
                         _this.p3_books.push( {projectId:projects[i].projectId,
                             name:projects[i].name})
                     }else if(projects[i].imageType==api.JAVA){
                         _this.j_books.push( {projectId:projects[i].projectId,
                             name:projects[i].name})
                     }
                 }
             }else if(response.code==-101){
                 _this.$Message.error('cookie验证失败')
                 _this.$router.push('/')
             }else{
                 _this.$Message.error('未知错误')
             }
         })
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
