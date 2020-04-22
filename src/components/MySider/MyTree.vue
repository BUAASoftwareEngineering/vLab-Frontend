<template>
    <Layout style="background-color: #808695" height='80vh' visible="visible" width="1000px">
        <Row>
            <Col span="24">
            <Card style="border-radius: 0vh; width:100%" visible="visible">
                    <p slot="title">文件管理器</p>
                    <p style="height:2.4vh;padding-left:0.4vh;color:white">{{projectname}}</p>
                </Card>
                </Col>
                </Row>
        <Tree :data="data4" :render="renderContent"></Tree>
    </Layout>
</template>

<script>
import api from '../../assets/js/api.js';
import bridge from '../bridge'
    export default {
        props: {
            username:{
                type:String,
                required:true
            },
            projectid:{
                type:Number,
                required:true
            },
            projectname:{
                type:String,
                required:true
            }
        },
        watch: {
            projectname: function(newVal, oldVal){
                this.projectName = newVal;
                this.$set(this.data4[0], 'title', this.projectName);
            },
            projectid: function(newVal, oldVal){
                this.projectId = newVal;
                console.log("projectid"+this.projectId);
                var _this=this
                this.$Spin.show()
                var timer = setInterval(function(){
                    api.file_struct(newVal, "/code/", function(response){
                    _this.$Spin.hide()
                    if(response.code==0){
                        _this.$set(_this.data4[0], 'children', response.data);
                        console.log(newVal+ "获得文件长度"+response.data.length)
                        clearInterval(timer);
                    }else if(response.code==-101){
                        _this.$Message.error('cookie验证失败')
                        _this.$router.push('/')
                        clearInterval(timer);
                    }else if(response.code==-102){
                        _this.$Message.error('权限不足')
                        clearInterval(timer);
                    }else if(response.code==500){
                        
                    }else{
                        _this.$Message.error('未知错误')
                        clearInterval(timer);
                    }
                })
                }, 1000)
                
            }
        },
        
        data () {
            return {
                newfiletag:false,
                newfoldertag:false,
                editState:false,
                userName:"",
                projectId:0,
                projectName:"",
                data4: [
                    {
                        title: '',
                        expand: true,
                        children: []
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                },
                inputContent:"",// 输入框要修改的内容
                oldName:"",// 修改前的TreeNode名称
                doculist:[],
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
                        attrs: {
                            draggable:'true'
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
                                    },
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
                                        click: () => { 
                                            this.saveEdit(root);
                                            this.editTree(data) 
                                        }
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
                                        click: () => { 
                                            this.saveEdit(root);
                                            this.appendfile(root, node.nodeKey, data) }
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
                                        click: () => { 
                                            this.saveEdit(root);
                                            this.appendfolder(root, node.nodeKey, data) }
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
                                        click: () => { 
                                            this.saveEdit(root);
                                            this.remove(root, node.nodeKey, data) 
                                        }
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
                                            this.confirmTheChange(root, node.nodeKey, data) 
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
                                data.editState ? '' :  this.handleDbClickTreeNode(root, node.nodeKey, data)
                            },
                            click:()=>{
                                data.editState ? '' : this.handleClickTreeNode(data)
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
                                        click: () => { 
                                            this.saveEdit(root);
                                            this.editTree(data) 
                                        }
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
                                        click: () => { 
                                            this.saveEdit(root);
                                            this.remove(root, node.nodeKey, data) 
                                        }
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
                                            this.confirmTheChange(root, node.nodeKey, data) 
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

            saveEdit(root){
                var i;
                var findnode = undefined;
                for (i = 0; i < root.length; i++) {
                    var shownode = root.find(el => el.nodeKey === i).node;
                    if (shownode.editState === true) {
                        findnode = shownode;
                        break;
                    }
                }
                if (findnode != undefined) {
                    console.log(6666)
                    this.confirmTheChange(root, i, findnode);
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
            appendfile (root, nodekey, data) {
                event.stopPropagation()
                /*
                const children = data.children || [];
                children.push({
                    title: '新建文件'
                }); 
                this.$set(data, 'children', children)
                this.editTree(children[children.length-1])
                */
                var path = "";
                var findkey = nodekey;
                while (findkey !== root[0].nodeKey) {
                    var parentKey = root.find(el => el.nodeKey === findkey).parent;
                    if (parentKey == 0) {
                        break;
                    }
                    var parent = root.find(el => el.nodeKey === parentKey).node;
                    path = parent.title+"/"+ path;
                    var findkey = parentKey;
                }
                if(nodekey != 0){
                    path = path + data.title+"/";
                }
                var _this=this
                this.$Spin.show()
                console.log(this.projectId + "当前新建文件》》" + "/code/" + path +"新建文件");
                api.file_new(this.projectId, "/code/" + path + "新建文件", function(response){
                    _this.$Spin.hide()
                    console.log("response.code:" + response.code);
                    if(response.code==0){
                        console.log("当前新建文件》》" + "/code/" + path + "新建文件");
                        const children = data.children || [];
                        children.push({
                            title: '新建文件'
                        }); 
                        _this.$set(data, 'children', children)
                        _this.editTree(children[children.length-1])
                    }else if(response.code==-101){
                        _this.$Message.error('cookie验证失败')
                        _this.$router.push('/')
                    }else if(response.code==-102){
                        _this.$Message.error('权限不足')
                    }else if(response.code==-301){
                        _this.$Message.error('文件重名')
                    }else{
                        _this.$Message.error('未知错误')
                    }
                })
            },
            // 添加文件夹按钮
            appendfolder (root, nodekey, data) {
                event.stopPropagation()
                /*
                const children = data.children || [];
                children.push({
                    title: '新建文件夹',
                    children: []
                }); 
                this.$set(data, 'children', children);
                this.editTree(children[children.length-1])
                */
                var path = "";
                var findkey = nodekey;
                while (findkey !== root[0].nodeKey) {
                    var parentKey = root.find(el => el.nodeKey === findkey).parent;
                    if (parentKey == 0) {
                        break;
                    }
                    var parent = root.find(el => el.nodeKey === parentKey).node;
                    path = parent.title+"/"+ path;
                    var findkey = parentKey;
                }
                if(nodekey != 0){
                    path = path + data.title+"/";
                }
                var _this=this
                this.$Spin.show()
                console.log(this.projectId + "当前新建文件夹》》" + "/code/" + path + "新建文件夹/");
                api.dir_new(this.projectId, "/code/" + path + "新建文件夹/", function(response){
                    _this.$Spin.hide();
                    console.log("response.code:" + response.code);
                    if(response.code==0){
                        console.log("当前新建文件夹》》" + "/code/" + path + "新建文件夹/");
                        const children = data.children || [];
                        children.push({
                            title: '新建文件夹',
                            children: []
                        }); 
                        _this.$set(data, 'children', children);
                        _this.editTree(children[children.length-1])
                    }else if(response.code==-101){
                        _this.$Message.error('cookie验证失败')
                        _this.$router.push('/')
                    }else if(response.code==-102){
                        _this.$Message.error('权限不足')
                    }else if(response.code==-301){
                        _this.$Message.error('文件夹重命名')
                    }else{
                        _this.$Message.error('未知错误')
                    }
                })
            },
            // 删除按钮
            remove (root, nodekey, data) {
                event.stopPropagation()
                
                this.$Modal.confirm({
                    title:"提示",
                    content:`您确定删除 “${data.title}” 吗？`,
                    onOk: () => {
                        /*
                        var parentKey = root.find(el => el.nodeKey === nodekey).parent;
                        var parent = root.find(el => el.nodeKey === parentKey).node;
                        const index = parent.children.indexOf(data);
                        parent.children.splice(index, 1);
                        this.$Message.info('删除成功');
                        */
                        var path = "";
                        var findkey = nodekey;
                        while (findkey !== root[0].nodeKey) {
                            var parentKey = root.find(el => el.nodeKey === findkey).parent;
                            if (parentKey == 0) {
                                break;
                            }
                            var parent = root.find(el => el.nodeKey === parentKey).node;
                            path = parent.title+"/"+ path;
                            var findkey = parentKey;
                        }
                        var _this = this
                        this.$Spin.show()
                        if (data.children != undefined){
                            console.log("当前删除文件夹》》" + "/code/" + path + data.title + "/");
                            api.dir_delete(this.projectId, "/code/" + path + data.title + "/", function(response){
                                _this.$Spin.hide()
                                console.log("response.code:" + response.code);
                                if(response.code==0){
                                    var parentKey = root.find(el => el.nodeKey === nodekey).parent;
                                    var parent = root.find(el => el.nodeKey === parentKey).node;
                                    const index = parent.children.indexOf(data);
                                    parent.children.splice(index, 1);
                                    _this.$Message.info('删除成功');

                                    console.log("当前删除文件夹》》" + "/code/" + path + data.title + "/");

                                    var leaves = this.getLeafPath(root, nodekey);
                                    var oldID = [];
                                    for(let i = 0; i < leaves.length ;i++){
                                        oldID.push('/code/' + path + data.title + '/' +leaves[i]);
                                    }
                                    bridge.$emit('deleteFloder', oldID);
                                }else if(response.code==-101){
                                    _this.$Message.error('cookie验证失败')
                                    _this.$router.push('/')
                                }else if(response.code==-102){
                                    _this.$Message.error('权限不足')
                                }else{
                                    _this.$Message.error('未知错误')
                                }
                            })
                            
                        } else {
                            console.log("当前删除文件》》" + "/code/" + path + data.title);
                            api.file_delete(this.projectId, "/code/" + path + data.title, function(response){
                                _this.$Spin.hide()
                                console.log("response.code:" + response.code);
                                if(response.code==0){
                                    var parentKey = root.find(el => el.nodeKey === nodekey).parent;
                                    var parent = root.find(el => el.nodeKey === parentKey).node;
                                    const index = parent.children.indexOf(data);
                                    parent.children.splice(index, 1);
                                    _this.$Message.info('删除成功');
                                    console.log("当前删除文件》》" + "/code/" + path + data.title);

                                    bridge.$emit('deleteFile', '/code/'+ path + data.title);
                                }else if(response.code==-101){
                                    _this.$Message.error('cookie验证失败')
                                    _this.$router.push('/')
                                }else if(response.code==-102){
                                    _this.$Message.error('权限不足')
                                }else{
                                    _this.$Message.error('未知错误')
                                }
                            })
                            
                        }
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });
            }, 
            // 确认修改树节点
            confirmTheChange(root, nodekey, data){   
                if(!this.inputContent){
                    this.$Notice.warning({
                        title: '当前输入有误', 
                    });
                }else{ 
                    if(this.oldName!==this.inputContent){  
                        
                        var path = "";
                        var findkey = nodekey;
                        while (findkey !== root[0].nodeKey) {
                            var parentKey = root.find(el => el.nodeKey === findkey).parent;
                            if (parentKey == 0) {
                                break;
                            }
                            var parent = root.find(el => el.nodeKey === parentKey).node;
                            path = parent.title+"/"+ path;
                            var findkey = parentKey;
                        }
                        var _this=this
                        this.$Spin.show()
                        if (data.children != undefined){
                            console.log(this.projectId + "当前修改文件夹》》" + "/code/" + path + data.title+"/为"+"/code/"+path+this.inputContent+"/");
                            api.dir_rename(this.projectId, "/code/" + path + data.title+"/", "/code/"+path+this.inputContent+"/", function(response){
                                _this.$Spin.hide()
                                console.log("response.code:" + response.code);
                                if(response.code==0){
                                    var leaves = _this.getLeafPath(root, nodekey);
                                    var IDmap = {};
                                    var oldID = '';
                                    var newID = '';
                                    for(let i = 0; i < leaves.length ;i++){
                                        oldID = '/code/' + path + data.title + '/' +leaves[i];
                                        newID = '/code/' + path + _this.inputContent + '/' + leaves[i];
                                        IDmap[oldID] = [newID, '/code/'+path];
                                    }
                                    // console.log(this.getLeafPath(root, nodekey));
                                    bridge.$emit('renameFloder', IDmap);
                                    
                                    data.title=_this.inputContent 
                                    _this.$Message.info('修改成功');
                                    _this.setStates(data);
                                    //_this.getLeafPath(root, nodekey);

                                    
                                }else if(response.code==-101){
                                    _this.$Message.error('cookie验证失败')
                                    _this.$router.push('/')
                                }else if(response.code==-102){
                                    _this.$Message.error('权限不足')
                                }else if(response.code==-301){
                                    _this.$Message.error('文件夹重名')
                                }else{
                                    _this.$Message.error('未知错误')
                                }
                            })
                        } else {
                            console.log(this.projectId + "当前修改文件》》" + "/code/" + path + data.title+"为"+"/code/"+path+this.inputContent);
                            api.file_rename(this.projectId, "/code/" + path + data.title, "/code/"+path+this.inputContent, function(response){
                                _this.$Spin.hide()
                                console.log("response.code:" + response.code);
                                if(response.code==0){
                                    var oldID = '/code/' + path + data.title;
                                    var newID = '/code/' + path + _this.inputContent;
                                    var IDmap = {};
                                    IDmap[oldID] = [newID, _this.inputContent, '/code/' + path];
                                    bridge.$emit('renameFile', IDmap)

                                    data.title=_this.inputContent 
                                    _this.$Message.info('修改成功');
                                    _this.setStates(data);

                                   
                                }else if(response.code==-101){
                                    _this.$Message.error('cookie验证失败')
                                    _this.$router.push('/')
                                }else if(response.code==-102){
                                    _this.$Message.error('权限不足')
                                }else if(response.code==-301){
                                    _this.$Message.error('文件重名')
                                }else{
                                    _this.$Message.error('未知错误')
                                }
                            })
                        }
                    } else{
                        this.setStates(data);
                    }
                }
                 
            },
            getLeafPath(root, nodekey){
                var i;
                var pathList = [];
                console.log(root.length)
                for (i = 0; i < root.length; i++) {
                    var findkey = i;
                    //var searchnode = root.find(el => el.nodeKey === i).node;
                    var searchnode = root[i].node;
                    if (searchnode.children != undefined){
                        continue;
                    }
                    var path = searchnode.title;
                    
                    while (findkey !== root[0].nodeKey) {
                        var parentKey = root[findkey].parent;
                        //var parentKey = root.find(el => el.nodeKey === findkey).parent;
                        var parent = root.find(el => el.nodeKey === parentKey).node;
                        if (parentKey === nodekey) {
                            pathList.push(path);
                            console.log(path);
                            break;
                        } else {
                            path = parent.title+"/"+path;
                            var findkey = parentKey;
                        }
                    }
                }
                return pathList;
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
            handleDbClickTreeNode(root, nodekey, data){
                var path = "";
                var findkey = nodekey;
                while (findkey !== root[0].nodeKey) {
                    var parentKey = root.find(el => el.nodeKey === findkey).parent;
                    if (parentKey == 0) {
                        break;
                    }
                    var parent = root.find(el => el.nodeKey === parentKey).node;
                    path = parent.title+"/"+ path;
                    var findkey = parentKey;
                }
                console.log("当前双击》》"+"/"+path+data.title);
                bridge.$emit('add',["/code/"+path+data.title, data.title, "/code/"+path]);
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