<template>

    <div>
       
        <Modal v-model="modal1" title="新建工程"
        @on-ok='new_ok'>                          
            <Input v-model="project_name" style="width:200px" placeholder="请输入Project Name"></Input>
        </Modal>

        <Modal v-model="modal2"
        @on-ok='delete_ok'>
            <p>确定删除该project</p>
        </Modal> 

        <Modal v-model="modal3" title="重命名"
        @on-ok="update_ok">
            <Input v-model="project_name" style="width:200px" ></Input>
        </Modal>  
        
        <div style="margin-top:80px;margin-left:20vh">                            
            <Input v-model="search_name"  placeholder=" Search for Notebooks..." 
            style="width: 800px" @keyup.enter.native="search" >
                <Select v-model="search_type" slot="prepend" style="width: 100px">
                    <Option value="All">Show All</Option>
                    <Option value="C">C</Option>
                    <Option value="CPP">C++</Option>
                    <Option value="PYTHON2">Python2</Option>
                    <Option value="PYTHON3">Python3</Option>
                    <Option value="JAVA">Java</Option>
                </Select>
                <Button slot="append" icon="ios-search" @click="search" ></Button>
            </Input>        
        </div>
        <Footer >
            <div style="margin-top:20px;">
                <Tabs v-model=note_type>
                    <TabPane label="C Notebooks" name="C">
                        <div >
                            <div class='mycardbody' style="float:left;margin-left:25px">                          
                                <Card style="width:120px ;float:left">
                                    <div style="text-align:center">
                                        <img src="../../assets/new.png"/>
                                        <br>
                                        <a @click="newProject('C')">New</a>
                                        <br><br>                                                                                    
                                    </div>
                                    <div style="text-align:left">
                                        <img src="../../assets/import.png" width=20px height=20px>
                                        <a >Import ...</a>
                                    </div>
                                </Card>   
                            </div>                           
                            <div class='mycardbody' style="float:left;margin-left:25px;margin-bottom:10px" 
                            v-for="(data,index) in c_books" :key='index'
                            @mouseout="iconshow=false" @mouseover="iconshow=true">
                                <Card style="width:120px;" >                                                                                    
                                    {{data.name}}                                  
                                    <a style="position:absolute;left:5px;bottom:5px" @click="udtProject('C',index)" v-show="iconshow">
                                        <Icon type="ios-more" />
                                    </a>
                                    <a  style="position:absolute;right:5px;bottom:5px" @click="delProject('C',index)" v-show="iconshow">
                                        <Icon  type="ios-trash-outline"/>
                                    </a>
                                    
                                </Card>
                            </div>                                   
                        </div>
                    </TabPane>
                    <TabPane label="C++ Notebooks" name="CPP">
                        <div >
                            <div class='mycardbody' style="float:left;margin-left:25px">                          
                                <Card style="width:120px ;float:left">
                                    <div style="text-align:center">
                                        <img src="../../assets/new.png"/>
                                        <br>
                                        <a @click="newProject('CPP')">New</a>
                                        <br><br>                                                                                    
                                    </div>
                                    <div style="text-align:left">
                                        <img src="../../assets/import.png" width=20px height=20px>
                                        <a >Import ...</a>
                                    </div>
                                </Card>   
                            </div>                           
                            <div class='mycardbody' style="float:left;margin-left:25px;margin-bottom:10px" 
                            v-for="(data,index) in cpp_books" :key='index'
                            @mouseout="iconshow=false" @mouseover="iconshow=true">
                                <Card style="width:120px;" >                                                                                    
                                    {{data.name}}                                  
                                    <a style="position:absolute;left:5px;bottom:5px" @click="udtProject('CPP',index)" v-show="iconshow">
                                        <Icon type="ios-more" />
                                    </a>
                                    <a  style="position:absolute;right:5px;bottom:5px" @click="delProject('CPP',index)" v-show="iconshow">
                                        <Icon  type="ios-trash-outline"/>
                                    </a>
                                    
                                </Card>
                            </div>                                   
                        </div>
                    </TabPane>
                    <TabPane label="Python2 Notebooks" name="PYTHON2">
                         <div >
                            <div class='mycardbody' style="float:left;margin-left:25px">                          
                                <Card style="width:120px ;float:left">
                                    <div style="text-align:center">
                                        <img src="../../assets/new.png"/>
                                        <br>
                                        <a @click="newProject('PYTHON2')">New</a>
                                        <br><br>                                                                                    
                                    </div>
                                    <div style="text-align:left">
                                        <img src="../../assets/import.png" width=20px height=20px>
                                        <a >Import ...</a>
                                    </div>
                                </Card>   
                            </div>                           
                            <div class='mycardbody' style="float:left;margin-left:25px;margin-bottom:10px" 
                            v-for="(data,index) in p2_books" :key='index'
                            @mouseout="iconshow=false" @mouseover="iconshow=true">
                                <Card style="width:120px;" >                                                                                    
                                    {{data.name}}                                  
                                    <a style="position:absolute;left:5px;bottom:5px" @click='udtProject("PYTHON2",index)' v-show="iconshow">
                                        <Icon type="ios-more" />
                                    </a>
                                    <a  style="position:absolute;right:5px;bottom:5px" @click='delProject("PYTHON2",index)' v-show="iconshow">
                                        <Icon  type="ios-trash-outline"/>
                                    </a>
                                    
                                </Card>
                            </div>                                   
                        </div>
                    </TabPane>
                    <TabPane label="Python3 Notebooks" name="PYTHON3">
                         <div >
                            <div class='mycardbody' style="float:left;margin-left:25px">                          
                                <Card style="width:120px ;float:left">
                                    <div style="text-align:center">
                                        <img src="../../assets/new.png"/>
                                        <br>
                                        <a @click="newProject('PYTHON3')">New</a>
                                        <br><br>                                                                                    
                                    </div>
                                    <div style="text-align:left">
                                        <img src="../../assets/import.png" width=20px height=20px>
                                        <a >Import ...</a>
                                    </div>
                                </Card>   
                            </div>                           
                            <div class='mycardbody' style="float:left;margin-left:25px;margin-bottom:10px" 
                            v-for="(data,index) in p3_books" :key='index'
                            @mouseout="iconshow=false" @mouseover="iconshow=true">
                                <Card style="width:120px;" >                                                                                    
                                    {{data.name}}                                  
                                    <a style="position:absolute;left:5px;bottom:5px" @click='udtProject("PYTHON3",index)' v-show="iconshow">
                                        <Icon type="ios-more" />
                                    </a>
                                    <a  style="position:absolute;right:5px;bottom:5px" @click='delProject("PYTHON3",index)' v-show="iconshow">
                                        <Icon  type="ios-trash-outline"/>
                                    </a>
                                    
                                </Card>
                            </div>                                   
                        </div>
                    </TabPane>
                    <TabPane label="Java Notebooks" name="JAVA">
                         <div >
                            <div class='mycardbody' style="float:left;margin-left:25px">                          
                                <Card style="width:120px ;float:left">
                                    <div style="text-align:center">
                                        <img src="../../assets/new.png"/>
                                        <br>
                                        <a @click="newProject('JAVA')">New</a>
                                        <br><br>                                                                                    
                                    </div>
                                    <div style="text-align:left">
                                        <img src="../../assets/import.png" width=20px height=20px>
                                        <a >Import ...</a>
                                    </div>
                                </Card>   
                            </div>                           
                            <div class='mycardbody' style="float:left;margin-left:25px;margin-bottom:10px" 
                            v-for="(data,index) in j_books" :key='index'
                            @mouseout="iconshow=false" @mouseover="iconshow=true">
                                <Card style="width:120px;" >                                                                                    
                                    {{data.name}}                                  
                                    <a style="position:absolute;left:5px;bottom:5px" @click='udtProject("JAVA",index)' v-show="iconshow">
                                        <Icon type="ios-more" />
                                    </a>
                                    <a  style="position:absolute;right:5px;bottom:5px" @click='delProject("JAVA",index)' v-show="iconshow">
                                        <Icon  type="ios-trash-outline"/>
                                    </a>
                                    
                                </Card>
                            </div>                                   
                        </div>
                    </TabPane>
                </Tabs>         
            </div>
        </Footer>
    </div>
     
</template>

<script>
import api from '../../assets/js/api.js'
export default {
     data () {
            return {
                modal1:false,
                modal2:false,
                modal3:false,
                project_name:'',
                project_type:'',
                project_index:0,
                iconshow:false,
                note_type:'C',
                search_name:'',
                search_type:'All'            

            }
        },
       

   props:{
       c_books:{
           type:Array,
           required:true
       },
       cpp_books:{
           type:Array,
           required:true
       },
       p2_books:{
           type:Array,
           required:true
       },
       p3_books:{
           type:Array,
           required:true
       },
       j_books:{
           type:Array,
           required:true
       }
   },
    
    methods:{
    
        newProject(type){
            this.project_name=''
            switch(type){
                case api.C:
                    this.project_type=api.C
                    break
                case api.CPP:
                    this.project_type=api.CPP
                    break
                case api.PYTHON2:
                    this.project_type=api.PYTHON2
                    break
                case api.PYTHON3:
                    this.project_type=api.PYTHON3
                    break
                case api.JAVA:
                    this.project_type=api.JAVA
                    break
            }
            this.modal1=true 


        },
        delProject(type,index){
             switch(type){
                 case api.C:
                    this.project_type=api.C
                    break
                case api.CPP:
                    this.project_type=api.CPP
                    break
                case api.PYTHON2:
                    this.project_type=api.PYTHON2
                    break
                case api.PYTHON3:
                    this.project_type=api.PYTHON3
                    break
                case api.JAVA:
                    this.project_type=api.JAVA
                    break
            }
            this.project_index=index
            this.modal2=true
        },
        udtProject(type,index){
             switch(type){
                 case api.C:
                    this.project_type=api.C
                    this.project_name=this.c_books[index].name
                    break
                case api.CPP:
                    this.project_type=api.CPP
                    this.project_name=this.cpp_books[index].name
                    break
                case api.PYTHON2:
                    this.project_type=api.PYTHON2
                    this.project_name=this.p2_books[index].name
                    break
                case api.PYTHON3:
                    this.project_type=api.PYTHON3
                    this.project_name=this.p3_books[index].name
                    break
                case api.JAVA:
                    this.project_type=api.JAVA
                    this.project_name=this.j_books[index].name
                    break
            }
            this.project_index=index
            this.modal3=true
        },    
                    
       new_ok(){
           var _this=this
           this.$Spin.show()

           
          api.project_new(this.project_name,this.project_type,function(response){
               _this.$Spin.hide()
               if(response.code==0){
                   var data=response.data
                   if(data.imageType==api.C){
                     _this.c_books.push({projectId:data.projectId,
                             name:data.name})
                   }else if(data.imageType==api.CPP){
                     _this.cpp_books.push({projectId:data.projectId,
                             name:data.name})
                   }else if(data.imageType==api.PYTHON2){
                       _this.p2_books.push({projectId:data.projectId,
                             name:data.name})
                   }else if(data.imageType==api.PYTHON3){
                       _this.p3_books.push({projectId:data.projectId,
                             name:data.name})
                    }else{
                         _this.j_books.push({projectId:data.projectId,
                             name:data.name})
                   }
                  
                    _this.$Message.success('新建成功')
                    _this.$router.push('/ide')
               }else if(response.code==-101){
                 _this.$Message.error('cookie验证失败')
                 _this.$router.push('/')
             }else{
                 _this.$Message.error('未知错误')
                  
             }
           })
           
       },
      
     
       delete_ok(){
           var _this=this
           var del_id
           if(this.project_type==api.C){
               del_id=this.c_books[this.project_index].projectId
           }else if(this.project_type==api.CPP){
               del_id=this.cpp_books[this.project_index].projectId
           }else if(this.project_type==api.PYTHON2){
               del_id=this.p2_books[this.project_index].projectId
           }else if(this.project_type==api.PYTHON3){
               del_id=this.p3_books[this.project_index].projectId
           }else{
               del_id=this.j_books[this.project_index].projectId
           }
           this.$Spin.show()
           api.project_delete(del_id,function(response){
               _this.$Spin.hide()
               console.log(response.code)
               if(response.code==0){
                  
                   if(_this.project_type==api.C){
                     _this.c_books.splice(_this.project_index,1)
                   }else if(_this.project_type==api.CPP){
                     _this.cpp_books.splice(_this.project_index,1)
                   }else if(_this.project_type==api.PYTHON2){
                     _this.p2_books.splice(_this.project_index,1)
                   }else if(_this.project_type==api.PYTHON3){
                     _this.p3_books.splice(_this.project_index,1)
                   }else{
                     _this.j_books.splice(_this.project_index,1)
                   }
                   _this.$Message.success('删除成功')
               }else if(response.code==-101){
                 _this.$Message.error('cookie验证失败')
                 _this.$router.push('/')
                }else if(response.code==-102){
                 _this.$Message.error('权限不足')
                }else{
                 _this.$Message.error('未知错误')
                }
           })
       },

       update_ok(){
            var _this=this
           var del_id
           if(this.project_type==api.C){
               del_id=this.c_books[this.project_index].projectId
           }else if(this.project_type==api.CPP){
               del_id=this.cpp_books[this.project_index].projectId
           }else if(this.project_type==api.PYTHON2){
               del_id=this.p2_books[this.project_index].projectId
           }else if(this.project_type==api.PYTHON3){
               del_id=this.p3_books[this.project_index].projectId
           }else{
               del_id=this.j_books[this.project_index].projectId
           }
           this.$Spin.show()
           api.project_info_update(del_id,this.project_name,function(response){
               _this.$Spin.hide()
               console.log(response.code)
               if(response.code==0){
                  
                   if(_this.project_type==api.C){
                     _this.c_books[this.project_index]={projectId:del_id,name:_this.project_name}
                   }else if(_this.project_type==api.CPP){
                     _this.cpp_books[this.project_index]={projectId:del_id,name:_this.project_name}
                   }else if(_this.project_type==api.PYTHON2){
                    _this.p2_books[this.project_index]={projectId:del_id,name:_this.project_name}
                   }else if(_this.project_type==api.PYTHON3){
                     _this.p3_books[this.project_index]={projectId:del_id,name:_this.project_name}
                   }else{
                     _this.j_books[this.project_index]={projectId:del_id,name:_this.project_name}
                   }
                   _this.$Message.success('更新成功')
               }else if(response.code==-101){
                 _this.$Message.error('cookie验证失败')
                 _this.$router.push('/')
                }else if(response.code==-102){
                 _this.$Message.error('权限不足')
                }else{
                 _this.$Message.error('未知错误')
                }
           })
       },
       search(){
           var _this=this
            this.$Spin.show()
                api.project_info(function(response){
              _this.$Spin.hide()
             if(response.code==0){                
                 
                 var projects=response.data
                 for(var i=0;i<projects.length;i++){
                     if(projects[i].imageType==api.C){
                         _this.c_books.push(
                             {projectId:projects[i].projectId,
                             name:projects[i].name})
                        
                     }else if(projects[i].imageType==api.CPP){
                         _this.cpp_books.push(
                             {projectId:projects[i].projectId,
                             name:projects[i].name})
                        
                     }else if(projects[i].imageType==api.PYTHON2){
                         _this.p2_books.push( {projectId:projects[i].projectId,
                             name:projects[i].name})
                     }else if(projects[i].imageType==api.PYTHON3){
                         _this.p3_books.push( {projectId:projects[i].projectId,
                             name:projects[i].name})
                     }else if(projects[i].imageType==api.JAVA){
                         _this.j_books.push( {projectId:projects[i].projectId,
                             name:projects[i].name})
                     }
                 }
             }else if(response.code==-101){
                 _this.$Message.error('cookie验证失败')
                 _this.$router.push('/')
             }else{
                 _this.$Message.error('未知错误')
             }
         })
         
           if(this.search_type==api.C){
               this.note_type='C'
                for(var i=0;i<this.c_books.length;i++){
                    if(this.c_books[i].name==this.search_name){
                        var search_project=this.c_books[i]
                        this.c_books=[search_project]
                        return
                    }
                }
                this.c_books=[]
                return
           }else if(this.search_type==api.CPP){
               this.note_type='CPP'
                for(var i=0;i<this.cpp_books.length;i++){
                    if(this.cpp_books[i].name==this.search_name){
                        var search_project=this.cpp_books[i]
                        this.cpp_books=[search_project]
                        return
                    }
                }
                this.cpp_books=[]
                return
           }else if(this.search_type==api.PYTHON2){
               this.note_type='PYTHON2'
                for(var i=0;i<this.p2_books.length;i++){
                    if(this.p2_books[i].name==this.search_name){
                        var search_project=this.p2_books[i]
                        this.p2_books=[search_project]
                        return
                    }
                }
                this.p2_books=[]
                return
           }else if(this.search_type==api.PYTHON3){
               this.note_type='PYTHON3'
                for(var i=0;i<this.p3_books.length;i++){
                    if(this.p3_books[i].name==this.search_name){
                        var search_project=this.p3_books[i]
                        this.p3_books=[search_project]
                        return
                    }
                }
                this.p3_books=[]
                return
           }else if(this.search_type==api.JAVA){
               this.note_type='JAVA'
                for(var i=0;i<this.j_books.length;i++){
                    if(this.j_books[i].name==this.search_name){
                        var search_project=this.j_books[i]
                        this.j_books=[search_project]
                        return
                    }
                }
                this.j_books=[]
                return
           }else{
               this.note_type='C'
               this.search_name=''
           }
       }      
        

    }
   
}
</script>

<style scoped>
   
   .mycardbody >>>.ivu-card-body{
       height: 137px;
   }
   .ivu-icon{
        font-size:30px;
        color:rgb(223, 67, 158)
   }
  
</style>
