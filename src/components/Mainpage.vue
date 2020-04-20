<template>
    <div class="demo-split">
        <Split v-model="split2" mode="vertical" >
            <div slot="top" class="demo-split-pane" >                
                fff
            </div>
            <div slot="bottom" class="demo-split-pane" style="width: 100%; height: 100%" id="shell">

            </div>
        </Split>
    </div>
</template>

<script>
import Terminal from './Terminal.js'
import bus from '../bus.js'

export default {
    components: {Terminal},
    data () {
        return {
            split2: 0.7
        }
    },
    mounted() {
        console.log('wenhao')
        Terminal.mounted('8080')
    },
    methods: {
        fitg() {
            Terminal.fit()
        }
    }
}
</script>
<style>
    .demo-split{
        height: 500px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>















