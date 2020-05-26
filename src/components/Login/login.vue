<template>
  <div class="center-in-center">
    <div style="text-align:center">
      <h1>Visual Lab Online</h1>
      <br />
      <br />
      <br />
        <Alert v-if="error1" type="error" show-icon >{{error_message1}}</Alert>
          <Alert v-if="error2" type="error" show-icon >{{error_message2}}</Alert>
          <Alert v-if="error3" type="error" show-icon >{{error_message3}}</Alert>
          <Alert v-if="error4" type="error" show-icon >{{error_message4}}</Alert>
          <Alert v-if="warning" type="warning" show-icon >我们使用vlab_team@163.com给您发送邮件，若未收到验证码，可能被您的邮箱视为垃圾邮件</Alert>

      <br>
    </div>
    <div class="login-wrap" v-show="showLogin">
      
      

      <Input type="text" placeholder="请输入用户名" v-model="username" style="width: 300px" />
      <br />
      <br />
      <Input
         password
        type="password"
        placeholder="请输入密码"
        v-model="password"
        style="width: 300px"
        @on-enter="login"
      />
      <br />
      <br />
      <Button type="success" v-on:click="login">登录</Button>
      <br />
      <br />
      <span v-on:click="ToRegister">没有账号？马上注册</span>
      <br><br>
      <span v-on:click="ToPassChange">忘记密码？</span>

    </div>

    <div class="register-wrap" v-show="showRegister">
      
        
      
      <Input  type="text" placeholder="请输入用户名" v-model="newUsername" style="width: 300px"
      @on-blur="check_username" />

      <br />
      <br />
      <Input type="text" placeholder="请输入邮箱" v-model="email" style="width:300px"
       @on-blur="check_email"/>
      <br />
      <br />
      <Tooltip content="至少6位，只能为字母数字.@#$-" placement="left" theme='light'>
        <Input
          type="password"
          placeholder="请输入密码"
          v-model="newPassword1"
          style="width: 300px"
          password
          @on-blur="check_password"
        />
      </Tooltip>
      <br />
      <br />
      <Input
          type="password"
          placeholder="确认密码"
          v-model="newPassword2"
          style="width: 300px"
          password
          @on-blur="check_password"

      />
      <br>
      <br>
      <Input type="text" placeholder="请输入收到的验证码" v-model="captcha" style="width:190px"
      @on-enter="register"/>
      <Button  v-if="butt1" type="info" style="width:110px" ghost @click="send_captcha" >发送验证码</Button>
      <Button  v-if="butt2" type="info" style="width:110px" ghost disabled>{{time_count}}秒后可重发</Button>
      <br>
      <br>
      <Button type="primary" v-on:click="register" >注册</Button>
      <br />
      <br />
      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div >
    <div class="register-wrap" v-show="showPassChange">
      <Input type="text" placeholder="请输入注册使用的邮箱" v-model="email" style="width:300px"
       @on-blur="check_email"/>
       <br>
       <br>
      <Tooltip content="至少6位，只能为字母数字.@#$-" placement="left" theme='light'>
        <Input
          type="password"
          placeholder="请输入新密码"
          v-model="newPassword1"
          style="width: 300px"
          password
          @on-blur="check_password"
        />
      </Tooltip>
      <br />
      <br />
      <Input
          type="password"
          placeholder="确认新密码"
          v-model="newPassword2"
          style="width: 300px"
          password
          @on-blur="check_password"

      />
      <br>
      <br>
      <Input type="text" placeholder="请输入收到的验证码" v-model="captcha" style="width:190px"
      @on-enter="reset"/>
      <Button  v-if="butt1" type="info" style="width:110px" ghost @click="send_captcha" >发送验证码</Button>
      <Button  v-if="butt2" type="info" style="width:110px" ghost disabled>{{time_count}}秒后可重发</Button>
      <br><br>      
      <Button type="primary" v-on:click="reset" >修改密码</Button>
      <br><br>
     <span v-on:click="ToLogin">返回登录</span>

    </div>
  </div>
</template>
 
 
 

<script>
import { PassIsleagal } from "../../assets/js/checking.js";
import api from "../../assets/js/api.js";
export default {
  data() {
    return {
      showLogin: true,
      showRegister: false,
      showPassChange:false,
      username: "",
      password: "",
      newUsername: "",
      newPassword1: "",
      newPassword2:"",
      error_message1:"",
      error1:false,
      email:"",
      error_message2:"",
      error2:false,
      error_message3:"",
      error3:false,
      error_message4:"",
      error4:false,
      captcha:"",
      time_count:60,
      butt1:true,
      butt2:false,
      warning:false,
      submit:false
    };
  },

  mounted() {
    this.$Spin.show();
    var _this = this;

    api.user_info(function(response) {
      _this.$Spin.hide();
      if (response.code == 0) {
        _this.$router.push("/home");
      }
    });
  },
  methods: {
    ToRegister() {
      this.email=""
      this.newPassword1=""
      this.newPassword2=""
       this.captcha="",
      this.time_count=60,
      this.error1=false
      this.error2=false
      this.error3=false
      this.error4=false
      this.butt1=true,
      this.butt2=false,
      this.warning=false,
      this.submit=false,
      this.showRegister = true;
      this.showLogin = false;
      this.showPassChange=false;
    },
    ToLogin() {
            this.email=""

      this.newPassword1=""
      this.newPassword2=""
       this.captcha="",
      this.time_count=60,
      this.error1=false
      this.error2=false
      this.error3=false
      this.error4=false
      this.butt1=true,
      this.butt2=false,
      this.warning=false,
      this.submit=false,
      this.showRegister = false;
      this.showLogin = true;
      this.showPassChange=false;

    },
    ToPassChange(){
            this.email=""
      this.newPassword1=""
      this.newPassword2=""
       this.captcha="",
      this.time_count=60,
      this.error1=false
      this.error2=false
      this.error3=false
      this.error4=false
      this.butt1=true,
      this.butt2=false,
      this.warning=false,
      this.submit=false,
      this.showRegister = false;
      this.showLogin = false;
      this.showPassChange=true;
    },
    login() {
      if (this.username == "" || this.password == "") {
        this.$Message.warning("请输入用户名或密码");
      } else {
        this.$Spin.show();
        var _this = this;
        api.user_login(this.username, this.password, function(response) {
          _this.$Spin.hide();
          if (response.code == 0) {
            _this.$Message.success("登录成功");
            _this.$router.push("/home");
          } else if (response.code == -101) {
            _this.$Message.error("用户名或密码不正确");
          } else {
            _this.$Message.error("未知错误");
          }
        });
      }
    },
    reset(){
        var _this=this
        if(_this.email==""){
                  _this.error_message2="邮箱不能为空"
                  _this.error2=true
                }else{
                  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
                  if(!myreg.test(_this.email)){
                    _this.error_message2="邮箱格式错误"
                    _this.error2=true
                  }else{
                    _this.$Spin.show()
                    api.util_check_email(_this.email,function(response){
                        if(response.code==0){
                          console.log(response.data)
                          if(response.data=='true'){
                            _this.$Spin.hide()
                            _this.error_message2="邮箱未注册"
                            _this.error2=true
                          }else{
                            _this.error2=false
                            
                            if (!PassIsleagal(_this.newPassword1)){
                              _this.$Spin.hide()
                              _this.error_message3="密码格式错误，至少6位，只能为字母数字.@#$-"
                              _this.error3=true
                            }else{
                              if(_this.newPassword1!=_this.newPassword2){
                                _this.$Spin.hide()
                                  _this.error_message3="两次密码输入不一致"
                                  _this.error3=true
                                }else{
                                  _this.error3=false
                                  if(_this.captcha==""){
                                    _this.$Spin.hide()
                                    _this.error_message4="验证码不能为空"
                                    _this.error4=true
                                  }else{
                                    api.user_reset(_this.email,_this.captcha,_this.newPassword1,
                                    function(response){
                                      _this.$Spin.hide()
                                      if(response.code==0){
                                        _this.$Message.success('修改密码成功，请重新登录')
                                        _this.ToLogin()
                                      }else{
                                        _this.$Message.error(response.message)
                                      }
                                    })
                                  }
                                }
                            }

                          }
                        }else{
                          _this.$Spin.hide()
                          _this.$Message.error('未知错误')
                        }
                      })
                    }
                  }
            

    },

    register() {
       if(this.newUsername==''){
        this.error_message1="用户名不能为空"
        this.error1=true
      }else{
        var _this=this
        api.util_check_username(this.newUsername,function(response){
          if(response.code==0){
            if(response.data=='false'){
              _this.error_message1="用户名已被占用"
              _this.error1=true
            }else{
              _this.error1=false
              if(_this.email==""){
                  _this.error_message2="邮箱不能为空"
                  _this.error2=true
                }else{
                  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
                  if(!myreg.test(_this.email)){
                    _this.error_message2="邮箱格式错误"
                    _this.error2=true
                  }else{
                    api.util_check_email(_this.email,function(response){
                        if(response.code==0){
                          if(response.data=='false'){
                            _this.error_message2="邮箱已被注册"
                            _this.error2=true
                          }else{
                            _this.error2=false
                            
                            if (!PassIsleagal(_this.newPassword1)){
                              _this.error_message3="密码格式错误，至少6位，只能为字母数字.@#$-"
                              _this.error3=true
                            }else{
                              if(_this.newPassword1!=_this.newPassword2){
                                  _this.error_message3="两次密码输入不一致"
                                  _this.error3=true
                                }else{
                                  _this.error3=false
                                  if(_this.captcha==""){
                                    _this.error_message4="验证码不能为空"
                                    _this.error4=true
                                  }else{
                                    api.user_register(_this.newUsername,_this.newPassword1,_this.email,_this.captcha,
                                    function(response){
                                      if(response.code==0){
                                        _this.$Message.success(response.message)
                                        _this.ToLogin
                                      }else{
                                        _this.$Message.error(response.message)
                                      }
                                    })
                                  }
                                }
                            }

                          }
                        }else{
                          _this.$Message.error('未知错误')
                        }
                      })
                    }
                  }
            }
          }
        })
      }
    },
    check_username(){
      if(this.newUsername==''){
        this.error_message1="用户名不能为空"
        this.error1=true
      }else{
        var _this=this
        api.util_check_username(this.newUsername,function(response){
          if(response.code==0){
          
            if(response.data=='true'){
              _this.error1=false                         

            }else{
              _this.error_message1="用户名已被占用"
              _this.error1=true

            }
          }else{
            _this.$Message.error('未知错误')
          }
        })
      }
    },
    check_email(){
      if(this.email==""){
         this.error_message2="邮箱不能为空"
        this.error2=true
      }else{
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(!myreg.test(this.email)){
          this.error_message2="邮箱格式错误"
           this.error2=true
        }else{
          var _this=this
          api.util_check_email(this.email,function(response){
            if(response.code==0){
              if(_this.showRegister){
                if(response.data=='false'){
                  _this.error_message2="邮箱已被注册"
                  _this.error2=true
                }else{
                  _this.error2=false
                  _this.butt1=true
                  _this.butt2=false
                }
              }else{
                if(response.data=='true'){
                  _this.error_message2="邮箱未被注册"
                  _this.error2=true
                }else{
                  _this.error2=false
                  _this.butt1=true
                  _this.butt2=false
                }
              }
            }else{
              _this.$Message.error('未知错误')
            }
          })
        }
      }
    },
    check_password(){
      if (!PassIsleagal(this.newPassword1)){
        this.error_message3="密码格式错误，至少6位，只能为字母数字.@#$-"
        this.error3=true
      }else{
        if(this.newPassword2==""){
          this.error3=false

        }else{
          if(this.newPassword1!=this.newPassword2){
            this.error_message3="两次密码输入不一致"
            this.error3=true
          }else{
            this.error3=false

          }
        }

      }
    },
    send_captcha(){
      console.log('发送')
      
      if(this.email==""){
         this.error_message2="邮箱不能为空"
        this.error2=true
      }else{
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(!myreg.test(this.email)){
          this.error_message2="邮箱格式错误"
           this.error2=true
        }else{
          var _this=this
          api.util_check_email(this.email,function(response){
            if(response.code==0){
              
              if(_this.showRegister&&response.data=='false'){
                _this.error_message2="邮箱已被注册"
                _this.error2=true

              }else if(_this.showPassChange&&response.data=='true'){
                _this.error_message2="邮箱未被注册"
                _this.error2=true
              }else{
                if(!_this.submit){
                  _this.submit=!_this.submit
                }else{
                  return
                }
                _this.warning=true
                _this.butt1=false
                _this.butt2=true
                var timer=setInterval(()=>{
                  if(_this.time_count==1){
                    _this.submit=false
                    _this.time_count=60
                    _this.butt1=true
                    _this.butt2=false
                    clearInterval(timer)
                  }
                  console.log(_this.time_count)
                  _this.time_count-=1;
                  
                },"1000");
                api.util_send_captcha(_this.email,function(response){
                  if(response.code==0){
                    console.log(response.message)
                  }
                })
              }
            }else{
              _this.$Message.error('未知错误')
            }
          })
        }
      }
      
    }
  },

};  
</script>

<style scoped>
.ivu-icon{
      line-height: 40px;
}
.center-in-center {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.login-wrap {
  text-align: center;
 
} 
.login-wrap >>>.ivu-input{
  height: 40px;
}
.register-wrap >>>.ivu-input{
  height: 35px;
}
.register-wrap {
  text-align: center;
}
p {
  color: red;
}
h1 {
  font-family: "Helvetica Neue";
  font-size: 50px;
  color: rgb(69, 88, 109);
}
span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
}
</style>