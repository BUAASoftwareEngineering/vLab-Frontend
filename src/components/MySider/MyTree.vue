<template>
    <Layout style="background-color: #808695" height='80vh' visible="visible" width="1000px">
        <Row>
            <Col span="24">
                <Card style="border-radius: 0vh; width:100%" visible="visible">
                    <p slot="title">文件管理器</p>
                </Card>
            </Col>
        </Row>
        <Tree :data="data4" :render="renderContent"></Tree>
        <Dropdown transfer ref="contentFolderMenu" style="display: none;" trigger="click" placement="right-start">
            <DropdownMenu slot="list" ref="ppp" style="min-width: 80px;">
                <DropdownItem><a @click="appendfile(rootData, nodeInfo.nodeKey, nodeInfo)">新建文件</a></DropdownItem>
                <DropdownItem><a @click="appendfolder(rootData, nodeInfo.nodeKey, nodeInfo)">新建文件夹</a></DropdownItem>
                <DropdownItem><a @click="movefolder_choose(rootData, nodeInfo.nodeKey, nodeInfo)">剪切</a></DropdownItem>
                <DropdownItem><a @click="copyfolder_choose(rootData, nodeInfo.nodeKey, nodeInfo)">复制</a></DropdownItem>
                <DropdownItem><a @click="paste(rootData, nodeInfo.nodeKey, nodeInfo)">粘贴</a></DropdownItem>
                <DropdownItem><a @click="editTree(nodeInfo)">重命名</a></DropdownItem>
                <DropdownItem><a @click="remove(rootData, nodeInfo.nodeKey, nodeInfo)">删除</a></DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown transfer ref="contentFileMenu" style="display: none;" trigger="click" placement="right-start">
            <DropdownMenu slot="list" ref="pp" style="min-width: 80px;">
                <DropdownItem><a @click="movefile_choose(rootData, nodeInfo.nodeKey, nodeInfo)">剪切</a></DropdownItem>
                <DropdownItem><a @click="copyfile_choose(rootData, nodeInfo.nodeKey, nodeInfo)">复制</a></DropdownItem>
                <DropdownItem><a @click="paste(rootData, nodeInfo.nodeKey, nodeInfo)">粘贴</a></DropdownItem>
                <DropdownItem><a @click="editTree(nodeInfo)">重命名</a></DropdownItem>
                <DropdownItem><a @click="remove(rootData, nodeInfo.nodeKey, nodeInfo)">删除</a></DropdownItem>
            </DropdownMenu>
        </Dropdown>
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
                
                var timer = setInterval(function(){
                    api.file_struct(newVal, "/code/", function(response){
                    
                    if(response.code==0){
                        _this.$set(_this.data4[0], 'children', _this.clearFileData(response.data));
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
                enterflag:false,
                copyflag:false, //复制行为为true，剪切行为为false
                editState:false,
                userName:"",
                projectId:0,
                projectName:"",
                data4: [
                    {
                        title: '',
                        expand: true,
                        children: [],
                        render: (h, {root, node, data}) => {
                            return h('span', {
                                class: "root",
                                style: {
                                    display: 'inline-block',
                                    lineHeight: '20px',
                                    width: '100%',
                                    cursor: 'pointer',
                                },
                                on: {
                                    contextmenu:(e) => {
                                        e.preventDefault();
                                        this.nodeInfo = data;
                                        this.$refs.contentFolderMenu.$refs.reference = event.target;
                                        this.$refs.contentFolderMenu.currentVisible = !this.$refs.contentFolderMenu.currentVisible;
                                    }
                                }
                            }, [
                                data.title
                            ])
                        }
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                },
                inputContent:"",// 输入框要修改的内容
                oldName:"",// 修改前的TreeNode名称
                doculist:[],
                nodeInfo:[], //当前选中节点信息
                copyInfo:[], //当前选中待复制节点信息
                rootData:[]
            }
        },
        
        methods: {
            // 处理从后端得到的文件数据
            clearFileData(data) {
                var retData = [];
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if ((data[i].title)[0] != '.') {
                        retData.push(data[i]);
                    }
                }
                return retData;
            },
            sort (root, data) {
                var parentKey = root[data.nodeKey].parent;
                var parent = root[parentKey].node;
                var newnew = parent.children.sort(function(a, b){
                    if ((a.children != undefined) && (b.children == undefined)) {
                        console.log(a.title + " " + b.title);
                        return -1;
                    } else if ((a.children == undefined) && (b.children != undefined)) {
                        return 1;
                    } else {
                        var x = a.title;
                        var y = b.title;
                        if (x < y) { return -1;}
                        if (x > y) { return 1;}
                    }
                    return 0;
                });
                
            },
            // 树渲染逻辑
            renderContent (h, { root, node, data }) { 
                this.rootData = root;
                //data.expand = true;
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
                        },
                        on: {
                            contextmenu:(e) => {
                                e.preventDefault();
                                this.nodeInfo = data;
                                this.$refs.contentFolderMenu.$refs.reference = event.target;
                                this.$refs.contentFolderMenu.currentVisible = !this.$refs.contentFolderMenu.currentVisible;
                            }
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
                            []
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
                            click:()=>{
                                data.editState ? '' :  this.handleDbClickTreeNode(root, node.nodeKey, data)
                            },
                            /*click:()=>{
                                data.editState ? '' : this.handleClickTreeNode(data)
                            }*/
                            contextmenu:(e) => {
                                e.preventDefault();
                                this.nodeInfo = data;
                                this.$refs.contentFileMenu.$refs.reference = event.target;
                                this.$refs.contentFileMenu.currentVisible = !this.$refs.contentFileMenu.currentVisible;
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
                            []
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
            getPath(root, nodekey, data){
                var path = "";
                var findkey = nodekey;
                if (data.children != undefined){
                    //若为文件夹，返回当前文件夹的路径   
                    while (findkey !== 0) {
                        console.log(data.title + " " +data.nodeKey)
                
                        var parentKey = root.find(el => el.nodeKey === findkey).parent;
                        if (parentKey == 0) {
                            break;
                        }
                        var parent = root.find(el => el.nodeKey === parentKey).node;
                        path = parent.title+"/"+ path;
                        var findkey = parentKey;
                    }
                    if(nodekey != 0){
                        path = "/code/" + path + data.title+"/";
                    } else {
                        path = "/code/"
                    }
                } else {
                    //若为文件，返回当前文件的上层目录
                    while (findkey !== 0) {
                        var parentKey = root.find(el => el.nodeKey === findkey).parent;
                        if (parentKey == 0) {
                            break;
                        }
                        var parent = root.find(el => el.nodeKey === parentKey).node;
                        path = parent.title+"/"+ path;
                        var findkey = parentKey;
                    }
                    path = "/code/" + path;
                }
                return path;
            },
            // 复制文件夹
            copyfolder_choose (root, nodekey, data) {
                event.stopPropagation()
                this.$refs.contentFolderMenu.currentVisible = false;
                this.$refs.contentFileMenu.currentVisible = false;
                this.copyInfo = data;
                this.copyflag = true;
            },
            // 剪切文件夹
            movefolder_choose (root, nodekey, data) {
                event.stopPropagation()
                this.$refs.contentFolderMenu.currentVisible = false;
                this.$refs.contentFileMenu.currentVisible = false;
                this.copyInfo = data;
                this.copyflag = false;
            },
            
            // 复制文件
            copyfile_choose (root, nodekey, data) {
                event.stopPropagation()
                this.$refs.contentFolderMenu.currentVisible = false;
                this.$refs.contentFileMenu.currentVisible = false;
                this.copyInfo = data;
                this.copyflag = true; //复制行为为true
            },
            // 剪切文件
            movefile_choose (root, nodekey, data) {
                event.stopPropagation()
                this.$refs.contentFolderMenu.currentVisible = false;
                this.$refs.contentFileMenu.currentVisible = false;
                this.copyInfo = data;
                this.copyflag = false; //剪切行为为false
            },
            // 粘贴文件，用一个变量区别当前行为是剪切还是复制
            // 复制到同一目录下
            paste (root, nodekey, data) {
                event.stopPropagation()
                this.$refs.contentFolderMenu.currentVisible = false;
                this.$refs.contentFileMenu.currentVisible = false;
                if (this.copyInfo != []){
                    var targetPath = this.getPath(root, nodekey, data); //目标目录，以/结尾
                    var originPath = this.getPath(root, this.copyInfo.nodeKey, this.copyInfo); //原文件所在目录或原文件夹的目录，以/结尾
                    if (this.copyflag) {
                        //复制行为
                            var _this=this
                            this.$Spin.show()
                            if (_this.copyInfo.children == undefined) {
                                console.log("文件从目录"+originPath+_this.copyInfo.title+"移动到目录"+
                                targetPath+_this.copyInfo.title)
                                api.file_copy(_this.projectId, originPath+_this.copyInfo.title, targetPath+_this.copyInfo.title, false, function(response){
                                    _this.$Spin.hide();
                                    console.log("粘贴返回"+response.code)
                                    if (response.code == 0) {
                                        if (data.children == undefined) {
                                            //若粘贴目标为文件
                                            var parentKey = root[nodekey].parent;
                                            var parent = root[parentKey].node;
                                            const children = parent.children || [];
                                            children.push(_this.copyInfo);
                                            _this.$set(parent, 'children', children);
                                            _this.sort(root, parent.children[0]);
                                        } else {
                                            //若粘贴目标为文件夹
                                            const children = data.children || [];
                                            children.push(_this.copyInfo); 
                                            _this.$set(data, 'children', children);
                                            _this.sort(root, data.children[0]);
                                        }
                                        _this.$Message.info('粘贴成功')
                                    } else if(response.code==-101){
                                        _this.$Message.error('cookie验证失败')
                                        _this.$router.push('/')
                                    }else if(response.code==-102){
                                        _this.$Message.error('权限不足')
                                    }else if(response.code==-301){
                                        _this.$Modal.confirm({
                                            title:"提示",
                                            content:'在目标文件夹中有同名文件，是否覆盖？',
                                            onOk:() => {
                                                api.file_copy(_this.projectId, originPath+_this.copyInfo.title, targetPath+_this.copyInfo.title, true, function(response){
                                                    _this.$Spin.hide();
                                                    console.log("粘贴返回"+response.code)
                                                    if (response.code == 0) {
                                                        if (data.children == undefined) {
                                                            //若粘贴目标为文件
                                                            var parentKey = root[nodekey].parent;
                                                            var parent = root[parentKey].node;
                                                            const children = parent.children || [];
                                                            children.push(_this.copyInfo);
                                                            _this.$set(parent, 'children', children);
                                                            _this.sort(root, parent.children[0]);
                                                        } else {
                                                            //若粘贴目标为文件夹
                                                            const children = data.children || [];
                                                            children.push(_this.copyInfo); 
                                                           _this.$set(data, 'children', children);
                                                           _this.sort(root, data.children[0]);
                                                        }
                                                        _this.$Message.info('粘贴成功')
                                                    } else if(response.code==-101){
                                                        _this.$Message.error('cookie验证失败')
                                                        _this.$router.push('/')
                                                    } else if(response.code==-102){
                                                        _this.$Message.error('权限不足')
                                                    } else {
                                                        _this.$Message.error('未知错误')
                                                    }
                                                })
                                            },
                                            onCancel:() => {
                                                _this.$Message.info('取消')
                                            }
                                        })
                                    }else{
                                        _this.$Message.error('未知错误')
                                    }
                                })
                            } else {
                                console.log("文件夹从目录"+ originPath +"移动到目录"+targetPath+_this.copyInfo.title+"/")
                                api.dir_copy(_this.projectId, originPath, targetPath+_this.copyInfo.title+"/", false, function(response){
                                    _this.$Spin.hide();
                                    console.log("粘贴返回"+response.code)
                                    if (response.code == 0) {
                                        if (data.children == undefined) {
                                            //若粘贴目标为文件
                                            var parentKey = root[nodekey].parent;
                                            var parent = root[parentKey].node;
                                            const children = parent.children || [];
                                            children.push(_this.copyInfo);
                                            _this.$set(parent, 'children', children);
                                            _this.sort(root, parent.children[0]);
                                        } else {
                                            //若粘贴目标为文件夹
                                            const children = data.children || [];
                                            children.push(_this.copyInfo); 
                                            _this.$set(data, 'children', children);
                                            _this.sort(root, data.children[0]);
                                        }
                                        _this.$Message.info('粘贴成功')
                                    } else if(response.code==-101){
                                        _this.$Message.error('cookie验证失败')
                                        _this.$router.push('/')
                                    }else if(response.code==-102){
                                        _this.$Message.error('权限不足')
                                    }else if(response.code==-301){
                                        _this.$Modal.confirm({
                                            title:"提示",
                                            content:'在目标文件夹中有同名文件，是否覆盖？',
                                            onOk:() => {
                                                api.dir_copy(_this.projectId, originPath, targetPath+_this.copyInfo.title+"/", true, function(response){
                                                    _this.$Spin.hide();
                                                    console.log("粘贴返回"+response.code)
                                                    if (response.code == 0) {
                                                        if (data.children == undefined) {
                                                            //若粘贴目标为文件
                                                            var parentKey = root[nodekey].parent;
                                                            var parent = root[parentKey].node;
                                                            const children = parent.children || [];
                                                            children.push(_this.copyInfo);
                                                            _this.$set(parent, 'children', children);
                                                            _this.sort(root, parent.children[0]);
                                                        } else {
                                                            //若粘贴目标为文件夹
                                                            const children = data.children || [];
                                                            children.push(_this.copyInfo); 
                                                            _this.$set(data, 'children', children);
                                                            _this.sort(root, data.children[0]);
                                                        }
                                                        _this.$Message.info('粘贴成功')
                                                    } else if(response.code==-101){
                                                        _this.$Message.error('cookie验证失败')
                                                        _this.$router.push('/')
                                                    } else if(response.code==-102){
                                                        _this.$Message.error('权限不足')
                                                    } else {
                                                        _this.$Message.error('未知错误')
                                                    }
                                                })
                                            },
                                            onCancel:() => {
                                                _this.$Message.info('取消')
                                            }
                                        })
                                    }else{
                                        _this.$Message.error('未知错误')
                                    }
                                })
                            }
                    } else {
                        //剪切行为
                        var _this=this
                        this.$Spin.show()
                        if (_this.copyInfo.children == undefined) {
                            console.log("文件从目录"+originPath+_this.copyInfo.title+"剪切到目录"+targetPath+_this.copyInfo.title)
                            api.file_move(_this.projectId, originPath+_this.copyInfo.title, targetPath+_this.copyInfo.title, false, function(response){
                                _this.$Spin.hide();
                                console.log("粘贴返回"+response.code)
                                if (response.code == 0) {
                                    
                                    var IDmap = {};
                                    IDmap[originPath+_this.copyInfo.title] = [targetPath+_this.copyInfo.title, _this.copyInfo.title, '/code/'];
                                    bridge.$emit('renameFile', IDmap)

                                    _this.removenode(root, _this.copyInfo.nodeKey, _this.copyInfo)
                                    if (data.children == undefined) {
                                        //若粘贴目标为文件
                                        var parentKey = root[nodekey].parent;
                                        var parent = root[parentKey].node;
                                        const children = parent.children || [];
                                        children.push(_this.copyInfo);
                                        _this.$set(parent, 'children', children)
                                        _this.sort(root, parent.children[0]);
                                    } else {
                                        //若粘贴目标为文件夹
                                        const children = data.children || [];
                                        children.push(_this.copyInfo); 
                                        _this.$set(data, 'children', children)
                                        _this.sort(root, data.children[0]);
                                    }
                                    _this.copyInfo = [];
                                    _this.$Message.info('粘贴成功')
                                } else if(response.code==-101){
                                    _this.$Message.error('cookie验证失败')
                                    _this.$router.push('/')
                                } else if(response.code==-102){
                                    _this.$Message.error('权限不足')
                                } else if(response.code==-301){
                                    _this.$Modal.confirm({
                                        title:"提示",
                                        content:'在目标文件夹中有同名文件，是否覆盖？',
                                        onOk:() => {
                                            api.file_move(_this.projectId, originPath+_this.copyInfo.title, targetPath+_this.copyInfo.title, true, function(response){
                                                _this.$Spin.hide();
                                                console.log("粘贴返回"+response.code)
                                                if (response.code == 0) {
                                                    var IDmap = {};
                                                    IDmap[originPath+_this.copyInfo.title] = [targetPath+_this.copyInfo.title, _this.copyInfo.title, '/code/'];
                                                    bridge.$emit('renameFile', IDmap)

                                                    _this.removenode(root, _this.copyInfo.nodeKey, _this.copyInfo)
                                                    if (data.children == undefined) {
                                                        //若粘贴目标为文件
                                                        var parentKey = root[nodekey].parent;
                                                        var parent = root[parentKey].node;
                                                        const children = parent.children || [];
                                                        children.push(_this.copyInfo);
                                                        _this.$set(parent, 'children', children)
                                                        _this.sort(root, parent.children[0]);
                                                    } else {
                                                        //若粘贴目标为文件夹
                                                        const children = data.children || [];
                                                        children.push(_this.copyInfo); 
                                                        _this.$set(data, 'children', children)
                                                        _this.sort(root, data.children[0]);
                                                    }
                                                    _this.copyInfo = [];
                                                    _this.$Message.info('粘贴成功')
                                                } else if(response.code==-101){
                                                    _this.$Message.error('cookie验证失败')
                                                    _this.$router.push('/')
                                                } else if(response.code==-102){
                                                    _this.$Message.error('权限不足')
                                                } else {
                                                    _this.$Message.error('未知错误')
                                                }
                                            })
                                        },
                                        onCancel:() => {
                                            _this.$Message.info('取消')
                                        }
                                    })
                                }else{
                                    _this.$Message.error('未知错误')
                                }
                            })
                        } else {
                            console.log("文件夹从目录"+originPath+"剪切到目录"+targetPath+_this.copyInfo.title+"/")
                            api.dir_move(_this.projectId, originPath, targetPath+_this.copyInfo.title+"/", false, function(response){
                                _this.$Spin.hide();
                                console.log("粘贴返回"+response.code)
                                if (response.code == 0) {
                                    var leaves = _this.getLeafPath(root, _this.copyInfo.nodeKey);
                                    var IDmap = {};
                                    var oldID = '';
                                    var newID = '';
                                    for (let i = 0; i < leaves.length; i++){
                                        oldID = originPath+leaves[i];
                                        newID = targetPath+_this.copyInfo.title+'/'+leaves;
                                        console.log(oldID + ' ' + newID)
                                        IDmap[oldID] = [newID, '/code/'];
                                    }
                                    bridge.$emit('renameFloder', IDmap);

                                    _this.removenode(root, _this.copyInfo.nodeKey, _this.copyInfo)
                                    if (data.children == undefined) {
                                        //若粘贴目标为文件
                                        var parentKey = root[nodekey].parent;
                                        var parent = root[parentKey].node;
                                        const children = parent.children || [];
                                        children.push(_this.copyInfo);
                                        _this.$set(parent, 'children', children)
                                        _this.sort(root, parent.children[0]);
                                    } else {
                                        //若粘贴目标为文件夹
                                        const children = data.children || [];
                                        children.push(_this.copyInfo); 
                                        _this.$set(data, 'children', children)
                                        _this.sort(root, data.children[0]);
                                    }
                                    _this.$Message.info('粘贴成功')
                                } else if(response.code==-101){
                                    _this.$Message.error('cookie验证失败')
                                    _this.$router.push('/')
                                } else if(response.code==-102){
                                    _this.$Message.error('权限不足')
                                } else if(response.code==-301){
                                    _this.$Modal.confirm({
                                        title:"提示",
                                        content:'在目标文件夹中有同名文件，是否覆盖？',
                                        onOk:() => {
                                            api.dir_move(_this.projectId, originPath, targetPath+_this.copyInfo.title+"/", true, function(response){
                                                _this.$Spin.hide();
                                                console.log("粘贴返回"+response.code)
                                                if (response.code == 0) {
                                                    var leaves = _this.getLeafPath(root, _this.copyInfo.nodeKey);
                                                    var IDmap = {};
                                                    var oldID = '';
                                                    var newID = '';
                                                    for (let i = 0; i < leaves.length; i++){
                                                        oldID = originPath+leaves[i];
                                                        newID = targetPath+_this.copyInfo.title+'/'+leaves;
                                                        IDmap[oldID] = [newID, '/code/'];
                                                    }
                                                    bridge.$emit('renameFloder', IDmap);

                                                    _this.removenode(root, _this.copyInfo.nodeKey, _this.copyInfo)
                                                    if (data.children == undefined) {
                                                        //若粘贴目标为文件
                                                        var parentKey = root[nodekey].parent;
                                                        var parent = root[parentKey].node;
                                                        const children = parent.children || [];
                                                        children.push(_this.copyInfo);
                                                        _this.$set(parent, 'children', children);
                                                        _this.sort(root, parent.children[0]);
                                                    } else {
                                                        //若粘贴目标为文件夹
                                                        const children = data.children || [];
                                                        children.push(_this.copyInfo); 
                                                        _this.$set(data, 'children', children);
                                                        _this.sort(root, data.children[0]);
                                                    }
                                                    _this.$Message.info('粘贴成功')
                                                } else if(response.code==-101){
                                                    _this.$Message.error('cookie验证失败')
                                                    _this.$router.push('/')
                                                } else if(response.code==-102){
                                                    _this.$Message.error('权限不足')
                                                } else {
                                                    _this.$Message.error('未知错误')
                                                }
                                            })
                                        },
                                        onCancel:() => {
                                            _this.$Message.info('取消')
                                        }
                                    })
                                }else{
                                    _this.$Message.error('未知错误')
                                }
                            })
                        }
                    }
                }
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
                while (findkey !== 0) {
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
                console.log(nodekey);
                while (findkey !== 0) {
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
            removenode (root, nodekey, data) {
                event.stopPropagation()
                const parentKey = root.find(el => el.nodeKey === nodekey).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1)
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
                        while (findkey !== 0) {
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

                                    var leaves = _this.getLeafPath(root, nodekey);
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
                        while (findkey !== 0) {
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
                                    _this.sort(root, data);

                                    
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

                                    _this.sort(root, data);

                                   
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
                    
                    while (findkey !== 0) {
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
                while (findkey !== 0) {
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
        },
        mounted(){
            /*
            var _this=this
            this.$Spin.show()
            var timer = setInterval(function(){
                    api.file_struct(_this.projectId, "/code/", function(response){
                    if(response.code==0){
                        _this.$set(_this.data4[0], 'children', response.data);
                        console.log(_this.projectId+ "更新获得文件长度"+response.data.length)
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
                }, 10000)
                */
            bridge.$on('AllFile',(CallBack)=>{
                this.doculist = this.getLeafPath(this.rootData, 0);
                // for (let i = 0; i < this.doculist.length; i++)
                // {
                    // console.log(i,this.doculist[i])//暂且验证一下
                // }
                bridge.$emit('ReturnAllFile',this.doculist);
            })
            var _this = this
            var timer = setInterval(function(){
                if(_this.rootData.length != 0) {
                    for (let i = 0; i < _this.rootData.length; i++) {
                        var shownode = _this.rootData[i].node;
                        console.log(shownode);
                        if (shownode.children === undefined) {
                            _this.sort(_this.rootData, shownode)
                        }
                    }
                    clearInterval(timer);
                }
            }, 1000)
        },
        created() {
            /*
            var _this=this
            this.$Spin.show()
            var timer = setInterval(function(){
                    api.file_struct(_this.projectId, "/code/", function(response){
                    if(response.code==0){
                        _this.$set(_this.data4[0], 'children', response.data);
                        console.log(_this.projectId+ "更新获得文件长度"+response.data.length)
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
                }, 10000)
                */
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
/* .hhhaha:hover .btnNone{ */
.hhhaha:hover{
   display: inline-block;
   overflow: visible;
}

.hhhaha:hover {
   color:#275cd4
}

.root {
    font-weight: bold;
    padding: 0px;
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