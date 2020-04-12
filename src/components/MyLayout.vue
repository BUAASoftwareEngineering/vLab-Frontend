
<template>
    <div id='mylayout' ref='mylayout' class="layout">
        <Layout>
            <MenuBar></MenuBar>
            <ControlPanel></ControlPanel>
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
