<template>
    <Layout style="background-color: #808695" height='80vh'>
        <Row>
            <Col span="24">
                <Card style="border-radius: 0px">
                    <p slot="title">文件管理器</p>
                    <p style="height:24px;padding-left:4px;color:white">My first notebook</p>
                </Card>
            </Col>
        </Row>
        <Tree :data="data4" multiple></Tree>
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