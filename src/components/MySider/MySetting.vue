<template>
    <Layout>
        <Tabs :animated="false">
            <TabPane label="主题"></TabPane>
            
        </Tabs>
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