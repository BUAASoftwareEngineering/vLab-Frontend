<template>
    <Layout :style="{marginLeft: '0vh'}" id='wtf'>
        <Sider :style="{height: '95vh', overflow: 'hidden'}" width="60">                
            <Menu active-name="mySider" theme="dark" width="50" :open-names="['1']">
                <MenuItem name="1-1" @click.native="changeTree">
                    <Icon type="md-folder" />
                </MenuItem>
                <MenuItem name="2-1" @click.native="changeSetting">
                    <Icon type="md-build" />
                </MenuItem>
                <MenuItem name="3-1" @click.native="changeUpload">
                    <Icon type="md-cloud-upload" />
                </MenuItem>
                <MenuItem name="4-1" @click.native="changeDownload">
                    <Icon type="md-cloud-download" />
                </MenuItem>
                <MenuItem name="5-1" @click.native="changePreference" style="margin-top:50vh">
                    <Icon type="md-contact" />
                </MenuItem>
                <MenuItem name="6-1" @click.native="changeNotebook">
                    <Icon type="md-settings" />
                </MenuItem>
            </Menu>
        </Sider>

        <Sider :style="{height: '96vh', overflow: 'auto'}" collapsible v-model="treemark" collapsed-width="0" style="background-color: #808695" width="250">
            <MyTree class="mytree" :username="username" :projectid="projectid" :projectname="projectname"></MyTree>
        </Sider>
        <Sider :style="{height: '96vh', overflow: 'auto'}" collapsible v-model="settingmark" collapsed-width="0" style="background-color: #808695" width="250">
            <MySetting class="mysetting" :username="username" :projectid="projectid" :projectname="projectname"></MySetting>
        </Sider>
        <Sider :style="{height: '96vh', overflow: 'auto'}" collapsible v-model="uploadmark" collapsed-width="0" style="background-color: #808695" width="250">
            <MyCloudUpload class="mycloudupload" :username="username" :projectid="projectid" :projectname="projectname"></MyCloudUpload>
        </Sider>
        <Sider :style="{height: '96vh', overflow: 'auto'}" collapsible v-model="downloadmark" collapsed-width="0" style="background-color: #808695" width="250">
            <MyCloudDownload class="myclouddownload" :username="username" :projectid="projectid" :projectname="projectname"></MyCloudDownload>
        </Sider>
        <Sider :style="{height: '96vh', overflow: 'auto'}" collapsible v-model="preferencemark" collapsed-width="0" style="background-color: #808695" width="250">
            <MyPreference class="mypreference" :username="username" :projectid="projectid" :projectname="projectname"></MyPreference>
        </Sider>
        <Sider :style="{height: '96vh', overflow: 'auto'}" collapsible v-model="notebookmark" collapsed-width="0" style="background-color: #808695" width="250">
            <MyNotebook class="mynotebook" :username="username" :projectid="projectid" :projectname="projectname"></MyNotebook>
        </Sider>
        <Layout>
            <Split ref="sp" v-model="split2" mode="vertical">
                <div slot="top" class="demo-split-pane" style="width: 100%; height: 100%">
                    <Tabs type="card" style="height: 100%" v-model="currentTab" @on-tab-remove="handleTabRemove" >
                        <template v-for="key in tabs">
                                <TabPane :id="'father'+key" :key="key" :label="tabsMap[key]" closable :name="key">
                                    <div :id="key" style="width:100%;height:100%">
                                    </div>
                                </TabPane>
                        </template>
                    </Tabs>
                </div>
                <div slot="bottom" class="demo-split-pane">
                    <FootTerminal></FootTerminal>
                </div>
            </Split>
        </Layout>
    </Layout>
</template>
<script>
import FootTerminal from "./FootTerminal"
import MyTree from "./MySider/MyTree"
import MySetting from "./MySider/MySetting"
import MyCloudUpload from "./MySider/MyCloudUpload"
import MyCloudDownload from "./MySider/MyCloudDownload"
import MyPreference from "./MySider/MyPreference"
import MyNotebook from "./MySider/MyNotebook"
// import {initEditor} from '../editor/app'
import * as editor from '../editor/app'
import bridge from './bridge'
import api from '../assets/js/api.js';
// import { editor } from 'monaco-editor'
    export default{
        components: {
            FootTerminal,MyTree,MySetting, MyCloudUpload, MyCloudDownload,
            MyPreference, MyNotebook,
        },
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
            return{
                split2:0.3,
                treemark:true,
                settingmark:true,
                uploadmark:true,
                downloadmark:true,
                preferencemark:true,
                notebookmark:true,
                isCollapsed: true,
                tabs:[],
                tabsMap:{},
                editorMap:{},
                count: 0,
                currentTab:''
            }
        },
        methods:{
            handleTabsAdd(id, label, BASE_DIR) {
                this.count++;
                this.tabs.push(id);
                this.tabsMap[id] = label;
                console.log(this.tabs);
                this.$nextTick(function(){
                    let new_tabPane = document.createElement("DIV");
                    new_tabPane.id = this.getIDEId(id);
                    new_tabPane.style.height = "100%"
	                new_tabPane.style.width = "100%"
                    console.log(id);
                    document.getElementById(id).appendChild(new_tabPane);
                    var _this=this;
                    this.$Spin.show();
	                api.project_info(function(response){
                        _this.$Spin.hide()
                        if(response.code==0){
                            var project_info = response;
                            console.log(project_info);
                            var project_now = project_info.data[0];
                            for(let i = 0; i < project_info.data.length; i++){
                                if(_this.projectid == project_info.data[i].projectId){
                                    project_now = project_info.data[i];
                                    break;
                                }
                            }
                            console.log(project_now);
                            console.log(BASE_DIR);
                            console.log(new_tabPane.id);
                            api.file_new(_this.projectid, id, function(newfile){
                                if(newfile.code == 0){
                                    let myEditor = new editor.MonacoApp(project_now, BASE_DIR);
                                    _this.editorMap[id]=myEditor.addEditor(id, true, new_tabPane.id);
                                } else if(newfile.code == -301){
                                    let myEditor = new editor.MonacoApp(project_now, BASE_DIR);
                                    _this.editorMap[id]=myEditor.addEditor(id, false, new_tabPane.id);
                                }
                            })
                            _this.currentTab = id;
                            console.log(_this.editorMap);
                        }else if(response.code==-101){
                            _this.$Message.error('cookie验证失败')
                            _this.$router.push('/')
                        }else if(response.code==-102){
                            _this.$Message.error('权限不足')
                        }else{
                            _this.$Message.error('未知错误')
                        }    
                    });
                });
            },
            handleTabRemove(name) {
                for(let i=0;i<this.tabs.length;i++){
                    if(this.tabs[i]==name){
                        this.tabs.splice(i,1);
                    }
                }
                delete this.tabsMap[name];
                delete this.editorMap[name];
                console.log(this.tabsMap);
                console.log(this.editorMap);
            },
            getIDEId(Index){
                return "editor_"+Index;
            },
            changeTree:function(){
                this.treemark = !this.treemark;
                this.uploadmark = true;
                this.downloadmark = true;
                this.settingmark = true;
                this.preferencemark = true;
                this.notebookmark = true;
            },
            changeSetting:function(){
                bridge.$emit('AllFile');
                this.treemark = true;
                this.uploadmark = true;
                this.downloadmark = true;
                this.settingmark = !this.settingmark;
                this.preferencemark = true;
                this.notebookmark = true;
            },
            changeUpload:function(){
                this.treemark = true;
                this.uploadmark = !this.uploadmark;
                this.downloadmark = true;
                this.settingmark = true;
                this.preferencemark = true;
                this.notebookmark = true;
            },
            changeDownload:function(){
                this.treemark = true;
                this.uploadmark = true;
                this.downloadmark = !this.downloadmark;
                this.settingmark = true;
                this.preferencemark = true;
                this.notebookmark = true;
            },
            changePreference:function(){
                this.treemark = true;
                this.uploadmark = true;
                this.downloadmark = true;
                this.settingmark = true;
                this.preferencemark = !this.preferencemark;
                this.notebookmark = true;
            },
            changeNotebook:function(){
                this.treemark = true;
                this.uploadmark = true;
                this.downloadmark = true;
                this.settingmark = true;
                this.preferencemark = true;
                this.notebookmark = !this.notebookmark;
            },
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        mounted(){
            bridge.$on('add',(path_label)=>{
                if(!this.tabsMap.hasOwnProperty(path_label[0])){
                    this.handleTabsAdd(path_label[0],path_label[1], path_label[2]);
                }
                this.currentTab=path_label[0];
            }),
            bridge.$on('deleteFile',(path)=>{
                if(this.tabsMap.hasOwnProperty(path)){
                    this.handleTabRemove(path);
                }
            }),
            bridge.$on('deleteFloder',(paths)=>{
                for(let i=0; i < paths.length; i++){
                    if(this.tabsMap.hasOwnProperty(paths[i])){
                        this.handleTabRemove(paths[i]);
                    }
                }
            }),
            bridge.$on('renameFile',(IDmap)=>{
                console.log(IDmap);
                for(var key in IDmap){
                    if(this.tabsMap.hasOwnProperty(key)){
                        this.handleTabRemove(key);
                        this.handleTabsAdd(IDmap[key][0],IDmap[key][1], IDmap[key][2]);
                    }
                }
            }),
            bridge.$on('renameFloder',(IDmap)=>{
                console.log(IDmap);
                for(var key in IDmap){
                    if(this.tabsMap.hasOwnProperty(key)){
                        this.tabsMap[IDmap[key]] = this.tabsMap[key];
                        this.handleTabRemove(key);
                        this.handleTabsAdd(IDmap[key][0], this.tabsMap[IDmap[key][0]], IDmap[key][1]);
                    }
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
    .mytree >>> .ivu-card-body{
    padding: 0.3vh;
    height: 3.5vh;
    background: #363e4f;;
    margin: -0.1vh;
    }
    .mysetting >>> .ivu-card-body{
    padding: 0.3vh;
    height: 3.5vh;
    background: #363e4f;;
    margin: -0.1vh;
    }
    .mypreference >>> .ivu-card-body{
    padding: 0.3vh;
    height: 3.5vh;
    background: #363e4f;;
    margin: -0.1vh;
    }
    .myclouddownload >>> .ivu-card-body{
    padding: 0.3vh;
    height: 3.5vh;
    background: #363e4f;;
    margin: -0.1vh;
    }
    .mycloudupload >>> .ivu-card-body{
    padding: 0.3vh;
    height: 3.5vh;
    background: #363e4f;;
    margin: -0.1vh;
    }
    .mynotebook >>> .ivu-card-body{
    padding: 0.3vh;
    height: 3.5vh;
    background: #363e4f;;
    margin: -0.1vh;
    }
    .mytree >>> .ivu-card-head{
    padding: 0.4vh;
    }
    .mysetting >>> .ivu-card-head{
    padding: 0.4vh;
    }
    .mypreference >>> .ivu-card-head{
    padding: 0.4vh;
    }
    .myclouddownload >>> .ivu-card-head{
    padding: 0.4vh;
    }
    .mycloudupload >>> .ivu-card-head{
    padding: 0.4vh;
    }
    .mynotebook >>> .ivu-card-head{
    padding: 0.4vh;
    }
    .mypreference >>> .br{
        display: inline;
        line-height: 5px;
    }
</style> 