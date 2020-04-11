<template>
    <Layout :style="{marginLeft: '0px'}">
        <Sider :style="{height: '100vh', overflow: 'auto'}" width="60">                
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
                <MenuItem name="5-1" @click.native="changePreference" style="margin-top:59vh">
                    <Icon type="md-contact" />
                </MenuItem>
                <MenuItem name="6-1" @click.native="changeNotebook">
                    <Icon type="md-settings" />
                </MenuItem>
            </Menu>
        </Sider>

        <Sider :style="{height: '100vh', overflow: 'auto'}" collapsible v-model="treemark" collapsed-width="0" style="background-color: #808695">
            <MyTree></MyTree>
        </Sider>
        <Sider :style="{height: '100vh', overflow: 'auto'}" collapsible v-model="settingmark" collapsed-width="0" style="background-color: #808695">
            <MySetting></MySetting>
        </Sider>
        <Sider :style="{height: '100vh', overflow: 'auto'}" collapsible v-model="uploadmark" collapsed-width="0" style="background-color: #808695">
            <MyCloudUpload></MyCloudUpload>
        </Sider>
        <Sider :style="{height: '100vh', overflow: 'auto'}" collapsible v-model="downloadmark" collapsed-width="0" style="background-color: #808695">
            <MyCloudDownload></MyCloudDownload>
        </Sider>
        <Sider :style="{height: '100vh', overflow: 'auto'}" collapsible v-model="preferencemark" collapsed-width="0" style="background-color: #808695">
            <MyPreference></MyPreference>
        </Sider>
        <Sider :style="{height: '100vh', overflow: 'auto'}" collapsible v-model="notebookmark" collapsed-width="0" style="background-color: #808695">
            <MyNotebook></MyNotebook>
        </Sider>
        <Layout>
            <Split v-model="split2" mode="vertical">
                <div slot="top" class="demo-split-pane">
                    Top Pane
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
    export default{
        components: {
            FootTerminal,MyTree,MySetting, MyCloudUpload, MyCloudDownload, MyPreference, MyNotebook
        },
        data(){
            return{
                split2:0.5,
                treemark:true,
                settingmark:true,
                uploadmark:true,
                downloadmark:true,
                preferencemark:true,
                notebookmark:true,
                isCollapsed: true
            }
        },
        methods:{
            changeTree:function(){
                this.treemark = !this.treemark;
                this.uploadmark = true;
                this.downloadmark = true;
                this.settingmark = true;
                this.preferencemark = true;
                this.notebookmark = true;
            },
            changeSetting:function(){
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
            }
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>

<style>
.my-setting .ivu-tabs-bar{
    margin-bottom: 0px;
}
.ivu-card-head{
    padding: 4px;
}
.ivu-card-body{
    padding: 0px;
    height: 24px;
    background: #363e4f;;
    margin: -1px;
}

</style>