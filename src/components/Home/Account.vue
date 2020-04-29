<template>
    <div style="text-align:center">
       <Form  label-position="right" :label-width="100" style="margin-top:80px;width:60%">
        <FormItem label="重置用户名">
            <Input v-model='newusername[0]' @keyup.enter.native="submit"></Input>
        </FormItem>
        <FormItem label="重置密码">
            <Input type="password" v-model='newpassword1' @keyup.enter.native="submit"></Input>
        </FormItem>
        <FormItem label="确认密码">
            <Input type="password" v-model='newpassword2' @keyup.enter.native="submit"></Input>
        </FormItem>
       <FormItem>
            <Button type="primary" @click='submit'>确认</Button>
           <!-- <Button style="margin-left: 8px" @click="cancel">取消</Button>-->
        </FormItem>
        </Form>
    </div>
</template>

<style scoped>
   
</style>

<script>
import api from '../../assets/js/api.js'
import { PassIsleagal } from '../../assets/js/checking.js'
export default {
    data(){
        return{
           
            newpassword1:'',
            newpassword2:''
        }
    }, 
    props:{
         username:{
             type:String,
             required:true
         },
         newusername:{
             type:Array,
             required:true
         },
        
    },
   
    methods:{
        submit(){
           // console.log(this.newusername)
            var _this=this
            if(this.newpassword1!=this.newpassword2){
                this.$Message.error('两次输入密码不一致')
                return
            }
            if(this.newusername==''){
                this.$Message.error('用户名不合法')
                return
            }
            if(this.newpassword1==''){
                if(this.username==this.newusername){
                    this.$Message.warning('用户信息未修改')
                    return
                }
                this.$Spin.show()
                api.user_info_update(this.newusername,function(response){
                    _this.$Spin.hide()
                  //  console.log(response.code)
                    if(response.code==0){
                        
                        _this.$Spin.show();
               			api.user_logout(function(response){
                         _this.$Spin.hide();
                        if(response.code==0){
                            _this.$Message.success('更新成功，请重新登录')
                            _this.$router.push('/')

                        }
                })
                    }else if(response.code==-101){
                        _this.$Message.error('验证失败')
                    }else if(response.code==-103){
                     _this.$Message.error('用户名重复')
                    }else{
                    _this.$Message.error('未知错误')
                }
                })
                                
                    
            }else{
                if(!PassIsleagal(this.newpassword1)){
                    this.$Message.error('密码格式错误')
                    return
                } 
                this.$Spin.show()
                api.user_info_update(this.newusername,this.newpassword1,function(response){
                    _this.$Spin.hide()
                    if(response.code==0){
                       
                        _this.$Spin.show();
               			api.user_logout(function(response){
                         _this.$Spin.hide();
                        if(response.code==0){
                             _this.$Message.success('更新成功，请重新登录')
                            _this.$router.push('/')

                        }
                        })
                        
                    }else if(response.code==-101){
                        _this.$Message.error('验证失败')
                    }else if(response.code==-103){
                        _this.$Message.error('用户名重复')
                    }else{
                        _this.$Message.error('未知错误')
                    }
            })
            }
                    
              
            
        },
        cancel(){

        }
    }
}
</script>