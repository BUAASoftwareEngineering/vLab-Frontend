
<template>
    <div id="menubar">
        <Layout>
            <Header style="height: '4vh', padding: '0'">
            <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0vh">
                <Button type="primary" style="min-width: 9vh">
                    文件
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh; overflow:hidden">
                    <DropdownItem @click.native="newFile()">新建文件</DropdownItem>
                    <DropdownItem @click.native="newFolder()">新建文件夹</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0vh">
                <Button type="primary" style="min-width: 9vh">
                    编辑
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh; overflow:hidden">
                    <DropdownItem @click.native="undo(editorMap[currentTab])">撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem  @click.native="redo(editorMap[currentTab])">恢复<span style="float: right">Ctrl+Y</span></DropdownItem>
                    <DropdownItem divided @click.native='cut(editorMap[currentTab])'>剪切<span style="float: right">Ctrl+X</span></DropdownItem>
                    <DropdownItem  @click.native='copy(editorMap[currentTab])'>复制<span style="float: right">Ctrl+C</span></DropdownItem>
                   <!--  <DropdownItem  @click.native='paste(editorMap[currentTab])'>粘贴<span style="float: right">Ctrl+Y</span></DropdownItem>
                    
                    <DropdownItem>粘贴<span style="float: right">Ctrl+V</span></DropdownItem>-->
                    <DropdownItem divided  @click.native='search(editorMap[currentTab])'>查找<span style="float: right">Ctrl+F</span></DropdownItem>
                    <DropdownItem @click.native='replace(editorMap[currentTab])'>替换<span style="float: right">Ctrl+H</span></DropdownItem>
                  
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0vh">
                <Button type="primary" style="min-width: 9vh">
                    代码操作
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh, max-height: 500px, overflow: hidden">
                    <DropdownItem @click.native='fold(editorMap[currentTab])'>折叠当前位置</DropdownItem>
                    <DropdownItem @click.native='unfold(editorMap[currentTab])'>展开当前位置</DropdownItem>
                    <DropdownItem @click.native='foldRecursively(editorMap[currentTab])'>从当前位置递归折叠</DropdownItem>
                    <DropdownItem @click.native='unfoldRecursively(editorMap[currentTab])'>从当前位置递归展开</DropdownItem>
                    <DropdownItem @click.native='foldAll(editorMap[currentTab])'>折叠全部</DropdownItem>
                    <DropdownItem @click.native='unfoldAll(editorMap[currentTab])'>展开全部</DropdownItem>
                    <DropdownItem divided  @click.native='revealDefinition(editorMap[currentTab])'>转到声明/定义</DropdownItem>
                    <DropdownItem @click.native='referenceSearch(editorMap[currentTab])'>转到引用</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 9vh">
                    运行
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh">
                    <DropdownItem @click.native="compile">编译</DropdownItem>
                    <DropdownItem @click.native="run">运行</DropdownItem>
                    <DropdownItem @click.native="compilerun">编译并运行</DropdownItem>                  
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 9vh">
                    视图
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh">
                    <DropdownItem  @click.native='setLineNumberOnOff(editorMap[currentTab])'>显示/隐藏&ensp;行号</DropdownItem>
                    <DropdownItem  @click.native='setMinimapOnOff(editorMap[currentTab])'>显示/隐藏&ensp;迷你地图</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 9vh">
                    帮助
                </Button>
                <DropdownMenu slot="list" style="min-width: 20vh">
                    <DropdownItem @click.native='toDocs'>发布说明</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Button type="primary" style="min-width: 9vh; float: right; margin:0px" @click="exitproject">
                退出项目{{ this.projectname }}
            </Button>
            </Header>
        </Layout>
    </div>
</template>

<script>
import api from '../assets/js/api.js';
import {bus} from './bus.js';
import * as Editor from '../editor/Appearances.js';
import bridge from './bridge.js';
export default {
    props: {
        projectid:{
            type:Number,
            required:true
        },
        projectname:{
            type:String,
            required:true
        }
    },
    watch: {
        projectid: function(newVal, oldVal){
            this.projectId = newVal;
            console.log("已更新projectid")
        },
        currentTab:function(){
            if(this.LineNumberOnOff){
                Editor.setLineNumberOnOff(this.editorMap[this.currentTab],'on')
            }else{
                 Editor.setLineNumberOnOff(this.editorMap[this.currentTab],'off')

            }
            if(this.MinimapOnOff){
                Editor.setMinimapOnOff(this.editorMap[this.currentTab],'on')
            }else{
                 Editor.setMinimapOnOff(this.editorMap[this.currentTab],'off')
            }
        }
    },

    data() {
        return {
            projectId:0,
            editorMap:{},
            currentTab:'',
            LineNumberOnOff:true,
            MinimapOnOff:true
        }
    },
    created(){
        bus.$on('editorMap',(editorMap)=>{
            this.editorMap=editorMap
        }),
        bus.$on('currentTab',(currentTab)=>{
            this.currentTab=currentTab
        })
        console.log(this.editorMap),
        console.log(this.currentTab)
    },
    methods: {
        newFile() {
            bridge.$emit('newRootFile');
        },
        newFolder() {
            bridge.$emit('newRootFolder');
        },
        exitproject() {
            if (this.projectId != 0){
                var _this=this
                this.$Spin.show()
                console.log("退出id为"+this.projectId)
                api.project_exit(this.projectId, function(response){
                    _this.$Spin.hide()
                    console.log("response.code:" + response.code);
                    if(response.code==0){
                        console.log("退出项目成功");
                        _this.$router.push('/home')
                    }else if(response.code==-101){
                        _this.$Message.error('cookie验证失败')
                        _this.$router.push('/')
                    }else if(response.code==-102){
                        _this.$Message.error('权限不足')
                    }else{
                        _this.$Message.error('未知错误')
                    }
                })
            }
        },
        undo(editor){
           
           editor.getModel().undo()
        },
        redo(editor){
          
           editor.getModel().redo()
        },
       cut(editor){
           editor.getAction('editor.action.clipboardCutAction').run()
       },
        copy(editor){         
            editor.getAction('editor.action.clipboardCopyAction').run()
        },
        paste(editor){
            editor.getAction('editor.action.clipboardPasteAction').run()
        },
        search(editor){
            editor.getAction('actions.find').run()
        },
        replace(editor){
            editor.getAction('editor.action.startFindReplaceAction').run()
        },
        setLineNumberOnOff(editor){
            this.LineNumberOnOff=!this.LineNumberOnOff
            if(this.LineNumberOnOff){
                Editor.setLineNumberOnOff(editor,'on')
            }else{
                 Editor.setLineNumberOnOff(editor,'off')

            }
        },
        setMinimapOnOff(editor){
            this.MinimapOnOff=!this.MinimapOnOff
            if(this.MinimapOnOff){
                Editor.setMinimapOnOff(editor,'on')
            }else{
                 Editor.setMinimapOnOff(editor,'off')

            }
            
        },
        fold(editor){
            editor.getAction('editor.fold').run()
        },
        unfold(editor){
            editor.getAction('editor.unfold').run()
        },
        foldRecursively(editor){
            editor.getAction('editor.foldRecursively').run()
        },
        unfoldRecursively(editor){
            editor.getAction('editor.unfoldRecursively').run()
        },
        foldAll(editor){
            editor.getAction('editor.foldAll').run()

        },
        unfoldAll(editor){
            editor.getAction('editor.unfoldAll').run()        
        },
        revealDefinition(editor){
            editor.getAction('editor.action.revealDefinition').run()
        },
       referenceSearch(editor){
           editor.getAction('editor.action.referenceSearch.trigger').run()
       },
       compile(){
           bridge.$emit('tocompile',true)
       },
       run(){
           bridge.$emit('torun',true)
       },
       compilerun(){
           bridge.$emit('tocompilerun',true)
       },
       toDocs(){
           window.open('https://github.com/BUAASoftwareEngineering/vLab-Frontend/blob/master/Welcome.md')
       },
        
    }
}
</script>

<style scoped>
    .ivu-btn{
        border-radius: 0px;
        color:#f5f7f9;background-color:#464e57;border-color:#464e57;
        margin: 0px;
        border: 0px solid transparent;
        padding: 6px 16px 6px;
        margin:-3px;
    }
    .ivu-layout-header{
        height:4vh;
        line-height:4vh;
        padding:0;
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
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
	  .ivu-btn:hover{
      background-color: dimgrey;
    }
    .ivu-dropdown{
        height: 3.6vh;
    }
    .ivu-dropdown-rel{
        height: 3.6vh;
    }
    .ivu-dropdown-menu{
        max-height: 500px;
        overflow: hidden;
    }
    .ivu-dropdown-item{
     padding: 0px 5px 0px 8px;
      height: 3.6vh;
        float: none;
    }
    .ivu-dropdown-item-divided{
      height: 3.6vh;
      margin-top: 0px;
      margin-bottom: 2px;
      padding: 0px 5px 0px 8px;
      line-height: 20px;
      border-top: 1px solid #e8eaec;
        float: none;
    }
    .ivu-layout-header{
        height:36px;
        line-height:36px;
        padding:0;
        background-color: #464e57;
        margin: 0;
    }
	.ivu-select-dropdown {
      border-radius: 0px;
      margin-top: 2px;
      max-height: 400px;
      padding: 0px;
      z-index: 20000;
      overflow: hidden;
    }
    .ivu-tree-title{
      border-radius:0px;
      color:#fff;
    }
</style>