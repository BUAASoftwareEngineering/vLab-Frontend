<template>
    <div>
        <img src="../assets/logo.png">
        <div class="login-wrap" v-show="showLogin">
            <h3>登录</h3>
            <br>
            <p v-show="showTishi">{{tishi}}</p>
            <Input type="text" placeholder="请输入用户名" v-model="username" style="width: 200px"/>
            <br><br>
            <Input type="password" placeholder="请输入密码" v-model="password" style="width: 200px"/>
            <br><br>
            <Button type="success"  v-on:click="login">登录</Button>
            <br><br>
            <span v-on:click="ToRegister">没有账号？马上注册</span>
            <br><br>
            <span v-on:click="ToUpdate">修改密码</span>
        </div>
 
        <div class="register-wrap" v-show="showRegister">
            <h3>注册</h3>
            <br>
            <p v-show="showTishi">{{tishi}}</p>
            <Input type="text" placeholder="请输入用户名" v-model="newUsername" style="width: 200px"/>
            <br><br>
            <Input type="password" placeholder="请输入密码" v-model="newPassword" style="width: 200px"/>
            <br><br>
           <Button type="success"  v-on:click="register">注册</Button>
           <br><br>
            <span v-on:click="ToLogin">已有账号？马上登录</span>
        </div>

        <div class="update-wrap" v-show="showUpdate">
            <h3>修改密码</h3>
            <br>
            <p v-show="showTishi">{{tishi}}</p>
            <Input type="text" placeholder="请输入用户名" v-model="Username" style="width: 200px"/>
            <br><br>
            <Input type="password" placeholder="请输入现有密码" v-model="Password" style="width: 200px"/>
            <br><br>
            <Input type="password" placeholder="请输入新密码" v-model="newPassword" style="width: 200px"/>
            <br><br>
            <Button type="error"  v-on:click="update">修改密码</Button>
            <br><br>
            <span v-on:click="ToLogin">返回登录</span>
        </div>

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
import {setCookie,getCookie} from '../assets/js/cookie.js'
export default{

    data(){
            return{
                showLogin: true,
                showRegister: false,
                showUpdate:false,
                showTishi: false,
                tishi: '',
                username: '',
                password: '',
                newUsername: '',
                newPassword: ''
            }
    },

  mounted(){
  /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if(getCookie('username')){
       this.$router.push('/home')
    }
  },
  methods:{
      
    ToRegister(){
        this.showRegister = true
        this.showLogin = false
        
    },
    ToLogin(){
        this.showRegister = false
        this.showLogin = true
        this.showUpdate=false
    },
    ToUpdate(){
        this.showUpdate=true
        this.showLogin = false

    },
    login(){
        if(this.username == "" || this.password == ""){
            alert("请输入用户名或密码")
        }else{
           
                  this.tishi = "登录成功"
                  this.showTishi = true
                  setCookie('username',this.username,1000*60)
                  this.$router.push('/home')
                  
              
          }
      
    },
    register(){
    if(this.newUsername == "" || this.newPassword == ""){
        alert("请输入用户名或密码")
    }else{
        let data = {'username':this.newUsername,'password':this.newPassword}
        this.$http.post('http://localhost/vueapi/index.php/Home/user/register',data).then((res)=>{
            console.log(res)
            if(res.data == "ok"){
                this.tishi = "注册成功"
                this.showTishi = true
                this.username = ''
                this.password = ''
                 /*注册成功之后再跳回登录页*/
                setTimeout(function(){
                    this.showRegister = false
                    this.showLogin = true
                    this.showTishi = false
                }.bind(this),1000)
            }
        })
    }
    },
    update(){
        if(this.username==""||this.password == ""|| this.newPassword == ""){
            alert("请输入用户名或密码")
        }else{

        }
    }
}
  }

</script>