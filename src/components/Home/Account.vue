<template>
    <div >
       <Form  label-position="right" :label-width="100" style="margin-top:80px;width:60%">
        <FormItem label="修改用户名">
            <Input v-model='username'></Input>
        </FormItem>
        <FormItem label="修改密码">
            <Input type="password" v-model='password1'></Input>
        </FormItem>
        <FormItem label="再次输入密码">
            <Input type="password" v-model='password2'></Input>
        </FormItem>
       <FormItem>
            <Button type="primary" @click='submit'>确认</Button>
            <Button style="margin-left: 8px" @click="cancel">取消</Button>
        </FormItem>
        </Form>
    </div>
</template>

<script>
import api from '../../assets/js/api.js'
import { PassIsleagal } from '../../assets/js/checking.js'
export default {
    data(){
        return{
            username:'',
            password1:'',
            password2:''
        }
    }, 
    methods:{
        submit(){
            if(this.username==''||this.password1==''||this.password2==''){
                this.$Message.warning('用户名或密码不能为空')
            }else{
                if(!PassIsleagal(this.password1)||!PassIsleagal(this.password2)){
                    this.$Message.warning('密码格式错误')
                }else if(this.password1!=this.password2){
                    this.$Message.error('两次输入密码不同')
                }else{
                    this.$Spin.show()
                    var _this=this
                    api.user_info_update(this.username,this.password1,function(response){
                        _this.$Spin.hide()
                        if(response.code==0){
                            _this.$Message.success('账户信息更新成功')
                           
                        }else if(response.code==-101){
                            _this.$Message.error('验证失败')
                        }else if(response.code==-103){
                            _this.$Message.error('用户名重复')
                        }else{
                            _this.$Message.error('未知错误')
                        }
                    })
                }
            }
            
        },
        cancel(){

        }
    }
}
</script>