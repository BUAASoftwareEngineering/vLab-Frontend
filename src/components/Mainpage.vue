<template>
    <div class="demo-split">
        <Split v-model="split2" mode="vertical" >
            <div slot="top" class="demo-split-pane" >    
                <input v-model="test1place"></input>            
                <button @click="test1()">cpp_test</button>
                <button @click="test2()">python_test</button>
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
            split2: 0.7,
            test1place: ''
        }
    },
    mounted() {
        console.log('wenhao')
        Terminal.mounted({
            projectId : 145,
            terminalPort : '4000',
            ip : 'localhost',
            name : 'pp'
        }, 'shell')
    },
    methods: {
        fitg() {
            Terminal.fit()
        },
        async test1() {
            let path = await Terminal.compile({
                type: "CPP",
                sources: ['/code/src/main.cpp', '/code/src/test2.cpp','/code/src/test.cpp','/code/include/test.h','/code/include/test2.h']
            })
            Terminal.run({
                type: "CPP",
                exec: path
            })
        },
        test2() {
            Terminal.run({
                type: "PYTHON3",
                exec: '/code/src/test.py'
            })
        }
    }
}
</script>
<style>
    .demo-split{
        height: 900px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>















