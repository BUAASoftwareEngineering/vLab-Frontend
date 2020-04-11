<template>
    <Layout style="background-color: #808695">
        <Row>
            <Col span="24">
                <Card style="border-radius: 0px">
                    <p slot="title">偏好设置</p>
                    <p style="height:24px;padding-left:4px;color:white">编辑器偏好设置</p>
                </Card>
            </Col>
        </Row>
        <Tabs :animated="false" type="card">
            <TabPane label="主题"></TabPane>
        </Tabs>
        <Select v-model="model1" style="width:200px">
            <Option v-for="item in themeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </br>
        <Tabs :animated="false" type="card">
            <TabPane label="行号"></TabPane>
        </Tabs>
        <RadioGroup v-model="openmark">
            <Radio label="yes" border></Radio>
            <Radio label="no" border></Radio>
        </RadioGroup>
        </br>
        <Tabs :animated="false" type="card">
            <TabPane label="字体"></TabPane>
        </Tabs>
        <Select v-model="model2" style="width:200px">
            <Option v-for="item in fontList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </Layout>
</template>
<script>
export default {
    data () {
            return {
                themeList: [
                    {
                        value: 'dark',
                        label: 'dark'
                    },
                    {
                        value: 'light',
                        label: 'light'
                    },
                ],
                model1: 'dark',
                fontList: [
                    {
                        value: 'Monaco',
                        label: 'Monaco'
                    },
                    {
                        value: 'Courier New',
                        label: 'Courier New'
                    },
                ],
                model2: 'Monaco',
                openmark: 'yes',
            }
        }
}
</script>