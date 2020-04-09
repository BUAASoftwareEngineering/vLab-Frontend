<template>
    <Layout :style="{marginLeft: '0px'}">
        <Sider :style="{height: '100vh', overflow: 'auto'}" width="60">                
                <Menu active-name="emmm2" theme="dark" width="50" :open-names="['1']" @on-select="test">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                    </MenuItem>
                </Menu>
            </Sider>
        <Sider :style="{height: '100vh', overflow: 'auto'}" collapsible v-model="flodmark" collapsed-width="0">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        Item 1
                    </template>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <Menu active-name="1-3" theme="dark" width="auto" :open-names="['1']">
                        <Submenu name="666">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-8">Option 1</MenuItem>
                            <MenuItem name="1-9">Option 2</MenuItem>
                            <MenuItem name="1-10">Option 3</MenuItem>
                        </Submenu>
                    </Menu>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        Item 2
                    </template>
                    <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="123">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                    </template>
                    <MenuItem name="3-1">Option 1</MenuItem>
                    <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
            </Menu>
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
    export default{
        components: {
            FootTerminal
        },
        data(){
            return{
                split2:0.5,
                flodmark:true,
                isCollapsed: true,
            }
        },
        methods:{
            test:function(){
                this.flodmark = !this.flodmark
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