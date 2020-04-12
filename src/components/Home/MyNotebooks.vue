<template>

    <div>
        <div style="margin-top:80px;">
                            <Input search  placeholder=" Search for Notebooks..." style="width: 800px" />                  
        </div>
                        <Footer>
                        <div style="margin-top:20px;">
                            <Tabs value="name1">
                                <TabPane label="C/C++ Notebooks" name="name1"></TabPane>
                                <TabPane label="Python Notebooks" name="name2"></TabPane>
                                <TabPane label="Java Notebooks" name="name3"></TabPane>
                            </Tabs>
                            <Card style="width:120px ">
                                <div style="text-align:center">
                                <img src="../../assets/new.png"/>
                                <br>
                                    <a @click="toIde">New</a>
                                    <br><br>
                                    
                                </div>
                                <div style="text-align:left">
                                    <img src="../../assets/import.png" width=20px height=20px>
                                    <a >Import ...</a>
                                </div>
                            </Card>
                        </div>
                        </Footer>
    </div>
     
</template>

<script>
export default {
    methods:{
        toIde(){
            this.$router.push('/ide')
        }
    }
}
</script>