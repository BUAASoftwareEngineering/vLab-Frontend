<template>
    <Layout style="background-color: #808695" height='80vh'>
        <Tabs :animated="false" color="white">
            <TabPane label="文件管理器" ></TabPane>
            
        </Tabs>
        <Tree :data="data4" show-checkbox multiple></Tree>
    </Layout>
</template>
<script>
    export default {
        data () {
            return {
                data4: [
                    {
                        title: 'parent 1',
                        expand: true,
                        selected: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        checked: true
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'parent 2',
                        expand: true,
                        selected: true,
                        children: [
                            {
                                title: 'parent 2-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 2-1-1'
                                    },
                                    {
                                        title: 'leaf 2-1-2'
                                    }
                                ]
                            }
                        ]
                    }
                ]
                
            }
        }
    }
</script>