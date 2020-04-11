<template>
    <Layout style="background-color: #808695">
        <Row>
            <Col span="24">
            <Card style="border-radius: 0px">
                <p slot="title">构建设置</p>
                <p style="height:24px;padding-left:4px;color:white">My first notebook</p>
            </Card>
                
            </Col>
        </Row>
        <br>
         <Select v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Tabs :animated="false">
            <TabPane label="行号"></TabPane>
        </Tabs>
    </Layout>
</template>
<script>
export default {
    data () {
            return {
                cityList: [
                    {
                        value: 'dark',
                        label: 'dark'
                    },
                    {
                        value: 'light',
                        label: 'light'
                    },
                ],
                model1: 'dark'
            }
        }
}
</script>