
<template>
    <div id='mylayout' ref='mylayout' class="layout">
        <Layout>
            <MenuBar class="mymenu"></MenuBar>
            <ControlPanel class="mycontrol"></ControlPanel>
        </Layout>
    </div>
</template>
<script>
import ControlPanel from "./ControlPanel"
import MenuBar from "./MenuBar"
    export default{
        components: {
            MenuBar, ControlPanel
        },
    }
</script>

<style scoped>
    .mycontrol >>> .ivu-layout-sider-trigger{
        visibility: hidden;
    }
    .mymenu >>> .ivu-dropdown-rel{
        height: 5vh;
        text-align: middle;
    }
    .mymenu >>> .ivu-btn{
        height: 5vh;
        margin-top: 0vh;
        margin-bottom: 0vh;
    }
    .mymenu >>> .ivu-dropdown{
        height: 5vh;
    }
</style>