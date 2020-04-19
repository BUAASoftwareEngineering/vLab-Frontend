<template>
    <Layout style="background-color: #808695" height='80vh' visible="visible" width="1000px">
        
        <Row>
            <Col span="24">
            <Card style="border-radius: 0vh; width:100%" visible="visible">
                    <p slot="title">文件管理器</p>
                    <p style="height:2.4vh;padding-left:0.4vh;color:white">My first notebook</p>
                </Card>
                </Col>
                </Row>
        <Tree :data="data4" :render="renderContent"></Tree>
    </Layout>
</template>

<script>
import bridge from '../bridge';
    export default {
        data () {
            return {
                editState:false,
                data4: [
                    {
                        title: 'cloud_ide',
                        expand: true,
                        
                        children: [
                            {
                                title: 'src',
                                expand: true, 
                                children: [
                                    {
                                        title: 'editor',
                                        expand: true
                                    },
                                    {
                                        title: 'components',
                                        expand: true
                                    }
                                ]
                            } 
                        ]
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                },
                inputContent:"",// 输入框要修改的内容
                oldName:""// 修改前的TreeNode名称
            }
        },
        methods: {
            // 树渲染逻辑
            renderContent (h, { root, node, data }) { 
                if (data.children != undefined) {
                    return h("span", {
                        class:"hhhaha",
                        style: { 
                            display: 'inline-block',
                            lineHeight:'20px',   
                            width: '100%', 
                            cursor: 'pointer' 
                        },
                        on:{
                        }
                    }, [  
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'ios-folder'
                                },
                                style: {
                                    marginRight: '8px', 
                                }
                            }),
                            h(`${ data.editState ? '' : 'span'}`, data.title),
                            h(`${ data.editState ? 'input' : ''}`, 
                                {
                                    attrs:{
                                        value:`${ data.editState ? data.title : ''}`, 
                                        autofocus :"true"
                                    },  
                                    style: {     
                                        width: '50%', 
                                        cursor: 'auto' ,
                                    },
                                    on:{
                                        change:(event)=>{ 
                                            this.inputContent=event.target.value 
                                        }
                                    }
                                }
                            ),
                        ]), 
                        // 增删改按钮部分
                        h(`${ data.editState ? '' : 'span'}`,
                            {
                                class:"btnNone",
                                style: { marginLeft:'1rem' }
                            },
                            [
                                //操作按钮部分 
                                    // 编辑按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-brush-outline'
                                    }),
                                    style: {
                                        marginRight: '8px',
                                        borderRadius: '50%',
                                        width: '1.5rem',
                                        lineHeight: '0',
                                        padding:'0',  
                                        height: '1.4rem',
                                    },
                                    on: {
                                        click: () => { this.editTree(data) }
                                    }
                                }),
                                    // 添加文件按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-add-circle'
                                    }),
                                    style: {
                                        marginRight: '8px',
                                        borderRadius: '50%',
                                        width: '1.5rem',
                                        lineHeight: '0',
                                        padding:'0',  
                                        height: '1.4rem',
                                    },
                                    on: {
                                        click: () => { this.appendfile(root, node, data) }
                                    }
                                }),

                                // 添加文件夹按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-add-circle-outline'
                                    }),
                                    style: {
                                        marginRight: '8px',
                                        borderRadius: '50%',
                                        width: '1.5rem',
                                        lineHeight: '0',
                                        padding:'0',  
                                        height: '1.4rem',
                                    },
                                    on: {
                                        click: () => { this.appendfolder(root, node, data) }
                                    }
                                }),

                                    // 删除按钮

                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-remove'
                                    }),
                                    style: {
                                        marginRight: '8px',
                                        borderRadius: '50%',
                                        width: '1.5rem',
                                        padding:'0', 
                                        lineHeight: '0', 
                                        height: '1.4rem',
                                    },
                                    on: {
                                        click: () => { this.remove(root, node, data) }
                                    }
                                })
                            ]
                        ),    
                        // 确认/取消修改部分
                        h(`${ data.editState ? 'span' : ''}`,
                            { 
                                style: { 
                                    marginLeft:'.5rem'
                                }
                            },
                            [  
                                // 确认按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-checkmark' 
                                    }),
                                    style: {
                                        // marginRight: '8px',
                                        border:0,
                                        background:'rgba(0,0,0,0)',
                                        fontSize:'1.3rem',
                                        outline:"none"
                                    },
                                    on: {
                                        click: (event) => {  
                                            this.confirmTheChange(root, node, data) 
                                        }
                                    }
                                }),
                                // 取消按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-close'
                                    }),
                                    style: {
                                        border:'0',
                                        background:'rgba(0,0,0,0)',
                                        fontSize:'1.3rem',
                                        outline:"none"
                                    },
                                    on: {
                                        click: () => { this.CancelChange(data) }
                                    }
                                }) 
                            ]
                        ) 
                    ]);
                }
                else {
                    return h("span", {
                        class:"hhhaha",
                        style: { 
                            display: 'inline-block',
                            lineHeight:'20px',   
                            width: '100%', 
                            cursor: 'pointer' 
                        },
                        on:{
                            dblclick:()=>{
                                data.editState ? '' :  this.handleDbClickTreeNode(root, node, data)
                            }
                        }
                    }, [  
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'md-document'
                                },
                                style: {
                                    marginRight: '8px', 
                                }
                            }),
                            h(`${ data.editState ? '' : 'span'}`, data.title),
                            h(`${ data.editState ? 'input' : ''}`, 
                                {
                                    attrs:{
                                        value:`${ data.editState ? data.title : ''}`, 
                                        autofocus :"true"
                                    },  
                                    style: {     
                                        width: '50%', 
                                        cursor: 'auto' ,
                                    },
                                    on:{
                                        change:(event)=>{ 
                                            this.inputContent=event.target.value 
                                        }
                                    }
                                }
                            ),
                        ]), 
                        // 增删改按钮部分
                        h(`${ data.editState ? '' : 'span'}`,
                            {
                                class:"btnNone",
                                style: { marginLeft:'1rem' }
                            },
                            [
                                //操作按钮部分 
                                    // 编辑按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-brush-outline'
                                    }),
                                    style: {
                                        marginRight: '8px',
                                        borderRadius: '50%',
                                        width: '1.5rem',
                                        lineHeight: '0',
                                        padding:'0',  
                                        height: '1.4rem',
                                    },
                                    on: {
                                        click: () => { this.editTree(data) }
                                    }
                                }),
                                    // 删除按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-remove'
                                    }),
                                    style: {
                                        marginRight: '8px',
                                        borderRadius: '50%',
                                        width: '1.5rem',
                                        padding:'0', 
                                        lineHeight: '0', 
                                        height: '1.4rem',
                                    },
                                    on: {
                                        click: () => { this.remove(root, node, data) }
                                    }
                                })
                            ]
                        ),    
                        // 确认/取消修改部分
                        h(`${ data.editState ? 'span' : ''}`,
                            { 
                                style: { 
                                    marginLeft:'.5rem'
                                }
                            },
                            [  
                                // 确认按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-checkmark' 
                                    }),
                                    style: {
                                        // marginRight: '8px',
                                        border:0,
                                        background:'rgba(0,0,0,0)',
                                        fontSize:'1.3rem',
                                        outline:"none"
                                    },
                                    on: {
                                        click: (event) => {  
                                            this.confirmTheChange(root, node, data) 
                                        }
                                    }
                                }),
                                // 取消按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-close'
                                    }),
                                    style: {
                                        border:'0',
                                        background:'rgba(0,0,0,0)',
                                        fontSize:'1.3rem',
                                        outline:"none"
                                    },
                                    on: {
                                        click: () => { this.CancelChange(data) }
                                    }
                                }) 
                            ]
                        ) 
                    ]);
                }
            },
            // 控制Tree当前状态函数
            setStates(data){
                var editState=data.editState
                if(editState){this.$set(data, 'editState', false);}
                else{this.$set(data, 'editState', true);}  
            },
            // Tree修改按钮
            editTree(data){
                event.stopPropagation()  
                this.inputContent=data.title 
                this.oldName=data.title
                this.setStates(data)  
            },
            // 添加文件按钮
            appendfile (root, node, data) {
                event.stopPropagation()
                const children = data.children || [];
                children.push({
                    title: '新建文件'
                }); 
                this.$set(data, 'children', children)
                this.editTree(children[children.length-1])
                //console.log(children[children.length-1].title)


                var path = "";
                var findkey = node.nodeKey;
                while (findkey !== root[0].nodeKey) {
                    var parentKey = root.find(el => el.nodeKey === findkey).parent;
                    var parent = root.find(el => el.nodeKey === parentKey).node;
                    path = parent.title+"/"+ path;
                    var findkey = parentKey;
                }
                console.log("当前新建文件》》" + path + data.title + "/新建文件");
            },
            // 添加文件夹按钮
            appendfolder (root, node, data) {
                event.stopPropagation()
                const children = data.children || [];
                children.push({
                    title: '新建文件夹',
                    children: []
                }); 
                this.$set(data, 'children', children);
                this.editTree(children[children.length-1])

                var path = "";
                var findkey = node.nodeKey;
                while (findkey !== root[0].nodeKey) {
                    var parentKey = root.find(el => el.nodeKey === findkey).parent;
                    var parent = root.find(el => el.nodeKey === parentKey).node;
                    path = parent.title+"/"+ path;
                    var findkey = parentKey;
                }
                console.log("当前新建文件夹》》"+path+data.title + "/新建文件夹");
            },
            // 删除按钮
            remove (root, node, data) {
                event.stopPropagation()
                
                this.$Modal.confirm({
                    title:"提示",
                    content:`您确定删除 “${data.title}” 吗？`,
                    onOk: () => {
                        var parentKey = root.find(el => el === node).parent;
                        var parent = root.find(el => el.nodeKey === parentKey).node;
                        const index = parent.children.indexOf(data);
                        parent.children.splice(index, 1);
                        this.$Message.info('删除成功');

                        var path = "";
                        var findkey = node.nodeKey;
                        while (findkey !== root[0].nodeKey) {
                            parentKey = root.find(el => el.nodeKey === findkey).parent;
                            parent = root.find(el => el.nodeKey === parentKey).node;
                            path = parent.title+"/"+ path;
                            var findkey = parentKey;
                        }
                        if (data.children != undefined){
                            console.log("当前删除文件夹》》" + path + data.title);
                        } else {
                            console.log("当前删除文件》》" + path + data.title);
                            bridge.$emit('deleteFile',path + data.title)
                        }
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });
            }, 
            // 确认修改树节点
            confirmTheChange(root, node, data){   
                if(!this.inputContent){
                    this.$Notice.warning({
                        title: '当前输入有误', 
                    });
                }else{ 
                    if(this.oldName!==this.inputContent){  
                        
                        var path = "";
                        //console.log(root[4].title);
                        var findkey = node.nodeKey;
                        while (findkey !== root[0].nodeKey) {
                            var parentKey = root.find(el => el.nodeKey === findkey).parent;
                            var parent = root.find(el => el.nodeKey === parentKey).node;
                            path = parent.title+"/"+ path;
                            var findkey = parentKey;
                        }
                        //index = parent.children.indexOf(data);
                        //parent.children.splice(index, 1);
                        if (data.children != undefined){
                            console.log("当前修改文件夹》》" + path + data.title + "为" + path  + this.inputContent);
                        } else {
                            console.log("当前修改文件》》" + path + data.title + "为" + path  + this.inputContent);
                        }

                        data.title=this.inputContent 
                        this.$Message.info('修改成功');
                        /*
                        this.$Modal.confirm({
                            title:"提示",
                            content:`您确定将  “${this.oldName}”  重命名为 “ ${this.inputContent} ” 吗？`,
                            onOk: () => {
                                data.title=this.inputContent 
                                this.$Message.info('修改成功');
                            },
                            onCancel: () => {
                                this.$Message.info('取消');
                            }
                        });
                        */
                        this.setStates(data);
                    } else{
                        this.setStates(data);
                    }
                }
                 
            },
            // 取消修改树节点
            CancelChange(data){ 
                this.$Notice.info({
                    title: '取消修改',
                });
                this.setStates(data)
            },
            // 点击Tree节点触发
            handleClickTreeNode(data){  
                console.log("当前点击》》"+data.title);
            },
            // 双击Tree节点时触发
            handleDbClickTreeNode(root, node, data){
                var path = "";
                
                //console.log(root[4].title);
                var findkey = node.nodeKey;
                while (findkey !== root[0].nodeKey) {
                    var parentKey = root.find(el => el.nodeKey === findkey).parent;
                    var parent = root.find(el => el.nodeKey === parentKey).node;
                    path = parent.title+"/"+ path;
                    var findkey = parentKey;
                }
                //index = parent.children.indexOf(data);
                //parent.children.splice(index, 1);
                console.log("当前双击》》"+path+data.title);
                bridge.$emit('add',[path+data.title, data.title]);
            }
        }
    }
</script>
<style  >
.IviewTree{
    width: 300px;
    text-align: left;
    margin: 0 auto;
}
.btnNone{
    display:none
}
/* .hhhaha:hover{color:aqua} */
.hhhaha:hover .btnNone{
   display: inline-block;
   overflow: visible;
}

.hhhaha:hover {
   color:#275cd4
}
.ivu-tree ul li {
    list-style: none;
    /* margin: 8px 0; */
    padding: 0;
    white-space: nowrap;
    outline: none;
}
</style>


<style scoped>
    .my-setting .ivu-tabs-bar{
        margin-bottom: 0vh;
    }
    .ivu-card-head{
        padding: 0.4vh;
    }
    .ivu-card-body{
    padding: 0vh;
    height: 2.4vh;
    background: #363e4f;;
    margin: -0.1vh;
    }
    .ivu-btn{
        border-radius: 0px;
        color:#f5f7f9;background-color:#464e57;border-color:#464e57;
        margin: 0px;
		    border: 0px solid transparent;
        padding: 6px 16px 6px;
        margin:-3px;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
    }
	.ivu-btn:hover{
      background-color: dimgrey;
    }
    .ivu-layout-header{
        height:36px;
        line-height:36px;
        padding:0;
    background-color: #464e57;
        margin: 0;
    }
    .mytree >>> .ivu-tree-title{
      border-radius:0px;
      color:#fff;
    }
</style> 