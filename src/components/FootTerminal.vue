<template>
    <Tabs :animated="false" style="width:100%;height:100%">
        <TabPane label="调试控制台" style="width:100%;height:100%">
            <div id='myFoot' style="width: 100%; height: 100%">

            </div>
        </TabPane>
    </Tabs>
    
</template>
<script>
import terminal from './Terminal'
import api from '../assets/js/api'
export default {
    props: {
        projectid:{
            type: Number,
            required:true
        }
    },
    watch:{
        projectid: function(newVal, oldVal){
            if(this.count==0){
                this.count++;
                this.projectId = newVal;
                console.log(this.projectId);
                console.log('e,,,',this.$props.projectid);
                var _this=this;
	            api.project_info(function(response){
                    if(response.code==0){
                        var project_info = response;
                        console.log(project_info);
                        // var project_now = project_info.data[0];
                        for(let i = 0; i < project_info.data.length; i++){
                            if(_this.projectId == project_info.data[i].projectId){
                                _this.project_now = project_info.data[i];
                                break;
                            }
                        }
                        terminal.mounted(_this.project_now, 'myFoot');
                    }
                })
                
            }
        }
    },
    data(){
        return{
            projectId:0,
            project_now:undefined,
            count:0,
        }
    },
}
</script>