<template>
    <div>
        <img src="../assets/logo.png">
       
        <div class="login-wrap" v-show="showLogin">
        
            <h3>登录</h3>
            <br>
            
            <Input type="text" placeholder="请输入用户名" v-model="username" style="width: 200px"/>
            <br><br>
            <Input type="password" placeholder="请输入密码" v-model="password" style="width: 200px"/>
            <br><br>
            <Button type="success"  v-on:click="login">登录</Button>
            <br><br>
            <span v-on:click="ToRegister">没有账号？马上注册</span>
            <br><br>
           <!-- <span v-on:click="ToUpdate">修改密码</span>-->
        </div>
 
        <div class="register-wrap" v-show="showRegister">
            <h3>注册</h3>
            <br>
          
            <Input type="text" placeholder="请输入用户名" v-model="newUsername" style="width: 200px"/>
            <br><br>
            <Input type="password" placeholder="请输入密码" v-model="newPassword" style="width: 200px"/>
            <br><br>
           <Button type="success"  v-on:click="register">注册</Button>
           <br><br>
            <span v-on:click="ToLogin">已有账号？马上登录</span>
        </div>
    <!--
        <div class="update-wrap" v-show="showUpdate">
            <h3>修改密码</h3>
            <br>
            <p v-show="showTishi">{{tishi}}</p>
            <Input type="text" placeholder="请输入用户名" v-model="username" style="width: 200px"/>
            <br><br>
            <Input type="password" placeholder="请输入现有密码" v-model="password" style="width: 200px"/>
            <br><br>
            <Input type="password" placeholder="请输入新密码" v-model="newPassword" style="width: 200px"/>
            <br><br>
            <Button type="error"  v-on:click="update">修改密码</Button>
            <br><br>
            <span v-on:click="ToLogin">返回登录</span>
        </div>
-->
    </div>
</template>
 
<style>
    .login-wrap{text-align:center;}
    .register-wrap{text-align:center;}
    p{color:red;}
    span{cursor:pointer;}
    span:hover{color:#41b883;}
</style>
 

<script>
import {PassIsleagal}from '../assets/js/checking.js'
import api from '../assets/js/api.js'
export default{

    data(){
            return{
                showLogin: true,
                showRegister: false,
                showUpdate:false,
               
                
               
                username: '',
                password: '',
                newUsername: '',
                newPassword: ''
            }
    },

  mounted(){
       var _this=this
 
    api.user_info(function(response){
            if(response.code==0){
                _this.$router.push('/home')
            }
    })
       
    
  },
  methods:{
      
    ToRegister(){
        this.showRegister = true
        this.showLogin = false
        
    },
    ToLogin(){
        this.showRegister = false
        this.showLogin = true
        
    },
   
    login(){
        
        if(this.username == "" || this.password == ""){
            this.$Message.warning("请输入用户名或密码")
        }else{
            this.$Spin.show();
            setTimeout(() => {
                this.$Spin.hide();
            }, 800);
            var _this=this
           api.user_login(this.username,this.password,function(response){
              
                if(response.code==0){
                    _this.$Message.success('登录成功')
                   _this.$router.push('/home')
                }
                else if(response.code==-101){
                     _this.$Message.error("用户名或密码不正确")
                     
                }else{
                    _this.$Message.error('未知错误')
                }
           })
                  
              
          }
      
    },
    
    register(){
    if(this.newUsername == "" || this.newPassword == ""){
        this.$Message.warning("请输入用户名或密码")
    }else{
        if(!PassIsleagal(this.newPassword)){
            this.$Message.warning('密码格式错误')
        }else{
             this.$Spin.show();
            setTimeout(() => {
                this.$Spin.hide();
            }, 800);
             var _this=this
            api.user_register(this.newUsername,this.newPassword,function(response){
                        if(response.code==0){
                           _this.$Message.success('注册成功')
                            
                        }else if(response.code==-103){
                           _this.$Message.error('用户名重复')
                        }else{
                            _this.$Message.error('未知错误')
                        }
                    })
        }
    }
    },
    /*
    update(){
        if(this.username==""||this.password == ""|| this.newPassword == ""){
            alert("请输入用户名或密码")
        }else{
           
        }
    }
    */
}
  }

</script>