<template>
    <Layout style="background-color: #808695">
        <Row>
            <Col span="24">
            <Card style="border-radius: 0vh">
                <p slot="title">构建设置</p>
                <p style="height:2.4vh;padding-left:0.4vh;color:white">{{ this.projectname }}</p>
            </Card>
                
            </Col>
        </Row>

        <template v-for="file in Files">
            <Checkbox :id='file' :key="file" @on-change='changeState(file)' :value="Show[file]">
                <label style="color:white">
                    {{file}}
                </label>
            </Checkbox>
        </template>
        <button @click="compile" v-if="pythonMark==false">
            <p>Compile</p>
        </button>
        <button @click="run">
            <p>Run</p>
        </button>
    </Layout>
</template>
<script>
import bridge from '../bridge';
import terminal from '../Terminal';
import api from '../../assets/js/api'
    export default {
        props: {
            username:{
                type:String,
                required:true
            },
            projectid:{
                type:Number,
                required:true
            },
            projectname:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                Files:[],
                Show:{},
                pythonMark:false,
            }
        },
        methods:{
            changeState(data){
                console.log(data, this.Show[data]);
                this.Show[data] = !this.Show[data];
                console.log(data, this.Show[data]);
            },
            compile(){
                let temp={};
                temp.sources = [];
                for(var key in this.Show){
                    if(this.Show[key]==true){
                        temp.sources.push('/code/'+key);
                    }
                }
                console.log(temp);
                terminal.compile(temp);
            },
            run(){
                if (this.pythonMark){
                    let temp={};
                    temp.exec = '';
                    let count = 0;
                    for(var key in this.Show){
                        if(this.Show[key]==true){
                            count++;
                            temp.exec = '/code/' + key;
                        }
                    }
                    if(count==0){
                        this.$Message.error('请选择一个python类文件')
                    } else if (count==1){
                        terminal.run(temp);
                    } else if(count > 1){
                        this.$Message.error('Python 类型工程只能有一个入口，请取消多余勾选')
                    }
                } else {
                    let temp={};
                    terminal.run(temp);
                }
            }
        },
        mounted(){
            bridge.$on('ReturnAllFile',(Files)=>{
                this.Files = [];
                console.log(this.Files);
                this.$nextTick(function(){
                    this.Show = {};
                    for(let i=0; i<Files.length;i++){
                        this.Show[Files[i]] = false;
                        this.Files.push(Files[i]);
                    }
                    console.log(this.Files);
                })
            }),
            bridge.$on('settingProject',(Project)=>{
                console.log(Project.imageType)
                if(Project.imageType=='PYTHON3'){
                    this.pythonMark = true;
                }
            })

        }
    }
</script>

<style scoped>
    .my-setting .ivu-tabs-bar{
        margin-bottom: 0vh;
    }
    .ivu-card-head{
        padding: 0.4vh;
    }
    .ivu-card-body{
    padding: 0vh;
    height: 2.4vh;
    background: #363e4f;;
    margin: -0.1vh;
    }
    .ivu-btn{
        border-radius: 0px;
        color:#f5f7f9;background-color:#464e57;border-color:#464e57;
        margin: 0px;
		    border: 0px solid transparent;
        padding: 6px 16px 6px;
        margin:-3px;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
    }
	.ivu-btn:hover{
      background-color: dimgrey;
    }
    .ivu-layout-header{
        height:36px;
        line-height:36px;
        padding:0;
    background-color: #464e57;
        margin: 0;
    }
    .ivu-tree-title{
      border-radius:0px;
      color:#fff;
    }
</style> 