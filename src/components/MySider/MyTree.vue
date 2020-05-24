<template>
  <Layout
    style="background-color: inherit;color: inherit;"
    height="80vh"
    visible="visible"
    width="1000px"
  >
    <Modal
      v-model="modal1"
      draggable
      scrollable
      title="以下文件与已存在的文件或文件名重名"
      @on-ok="modal1_ok"
      @on-cancel="modal1_ok"
    >
      <div v-for="(data,index) in files_conflict" :key="index">{{data}}</div>
    </Modal>
    <Row type="flex" justify="center" align="middle">
      <Col span="12">
        <p style="padding:4px 4px 4px 15px;height:23px;font-size:15px;">文件管理</p>
      </Col>
      <Col span="12">
        <Button
          style="height:100%;width:30px;float:right;margin-right:5px;margin-top:2px;font-size:15px; padding:0px;"
          @click="UpdateData(projectId)"
        >
          <Icon type="ios-refresh"></Icon>
        </Button>
      </Col>
    </Row>
    <Divider style="margin:10px auto" />
    <Tree :class="treeTheme" :data="data4" :render="renderContent"></Tree>
    <Dropdown transfer ref="contentRootMenu" style="display: none;" trigger="click">
      <DropdownMenu slot="list" ref="pppp" style="min-width: 80px;">
        <DropdownItem @click.native="appendfile(rootData, nodeInfo.nodeKey, nodeInfo)">新建文件</DropdownItem>
        <DropdownItem @click.native="appendfolder(rootData, nodeInfo.nodeKey, nodeInfo)">新建文件夹</DropdownItem>
        <Divider style="margin:0" />

        <DropdownItem @click.native="paste(rootData, nodeInfo.nodeKey, nodeInfo)">粘贴</DropdownItem>

        <Divider style="margin:0" />
        <DropdownItem @click.native="download(rootData, nodeInfo.nodeKey, nodeInfo)">下载项目</DropdownItem>

        <uploader :class="treeTheme" @file-success="handleFolder">
          <uploader-drop>
            <uploader-btn :directory="true" :single="true">
              <DropdownItem style="width:120px">上传文件夹</DropdownItem>
            </uploader-btn>
          </uploader-drop>
        </uploader>
        <Upload :before-upload="handleFiles" action="http" multiple>
          <DropdownItem style="width:120px">上传文件</DropdownItem>
        </Upload>
      </DropdownMenu>
    </Dropdown>
    <Dropdown transfer ref="contentFolderMenu" style="display: none;" trigger="click">
      <DropdownMenu slot="list" ref="ppp" style="min-width: 80px;">
        <DropdownItem @click.native="appendfile(rootData, nodeInfo.nodeKey, nodeInfo)">新建文件</DropdownItem>
        <DropdownItem @click.native="appendfolder(rootData, nodeInfo.nodeKey, nodeInfo)">新建文件夹</DropdownItem>
        <Divider style="margin:0" />

        <DropdownItem @click.native="movefolder_choose(rootData, nodeInfo.nodeKey, nodeInfo)">剪切</DropdownItem>
        <DropdownItem @click.native="copyfolder_choose(rootData, nodeInfo.nodeKey, nodeInfo)">复制</DropdownItem>
        <DropdownItem @click.native="paste(rootData, nodeInfo.nodeKey, nodeInfo)">粘贴</DropdownItem>
        <Divider style="margin:0" />
        <DropdownItem @click.native="editTree(nodeInfo)">重命名</DropdownItem>
        <!--<DropdownItem @click.native="uploadFiles(rootData, nodeInfo.nodeKey, nodeInfo)">上传文件</DropdownItem>-->
        <DropdownItem @click.native="remove(rootData, nodeInfo.nodeKey, nodeInfo)">删除</DropdownItem>
        <Divider style="margin:0" />
        <DropdownItem @click.native="download(rootData, nodeInfo.nodeKey, nodeInfo)">下载文件夹</DropdownItem>

        <uploader :class="treeTheme" @file-success="handleFolder">
          <uploader-drop>
            <uploader-btn :directory="true" :single="true">
              <DropdownItem style="width:120px">上传文件夹</DropdownItem>
            </uploader-btn>
          </uploader-drop>
        </uploader>
        <Upload :before-upload="handleFiles" action="http" multiple>
          <DropdownItem style="width:120px">上传文件</DropdownItem>
        </Upload>
      </DropdownMenu>
    </Dropdown>
    <Dropdown transfer ref="contentFileMenu" style="display: none;" trigger="click">
      <DropdownMenu slot="list" ref="pp" style="min-width: 80px;">
        <DropdownItem @click.native="movefile_choose(rootData, nodeInfo.nodeKey, nodeInfo)">剪切</DropdownItem>
        <DropdownItem @click.native="copyfile_choose(rootData, nodeInfo.nodeKey, nodeInfo)">复制</DropdownItem>
        <DropdownItem @click.native="paste(rootData, nodeInfo.nodeKey, nodeInfo)">粘贴</DropdownItem>
        <Divider style="margin:0" />
        <DropdownItem @click.native="editTree(nodeInfo)">重命名</DropdownItem>
        <DropdownItem @click.native="remove(rootData, nodeInfo.nodeKey, nodeInfo)">删除</DropdownItem>
        <Divider style="margin:0" />
        <DropdownItem @click.native="download(rootData, nodeInfo.nodeKey, nodeInfo)">下载</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Layout>
</template>

<script>
import api from "../../assets/js/api.js";
import bridge from "../bridge";
export default {
  props: {
    username: {
      type: String,
      required: true
    },
    projectid: {
      type: Number,
      required: true
    },
    projectname: {
      type: String,
      required: true
    }
  },
  watch: {
    projectname: function(newVal, oldVal) {
      this.projectName = newVal;
      this.$set(this.data4[0], "title", this.projectName);
    },
    projectid: function(newVal, oldVal) {
      this.projectId = newVal;
      this.UpdateData(newVal);
    }
  },

  data() {
    return {
      copyflag: false, //复制行为为true，剪切行为为false
      editState: false,
      userName: "",
      projectId: 0,
      projectName: "",
      treeTheme: "lightTree",
      data4: [
        {
          title: "",
          expand: true,
          children: [],
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                class: "root",
                style: {
                  display: "inline-block",
                  lineHeight: "20px",
                  width: "100%",
                  cursor: "pointer"
                },
                on: {
                  dragover: () => {
                    this.handleDragOver(root, node, data);
                  },
                  dragend: () => {
                    this.handleDragEnd(root, node, data);
                  },
                  drop: () => {
                    this.handleDrop(root, node, data);
                  },
                  contextmenu: e => {
                    e.preventDefault();
                    this.hiddenRightMenu();
                    this.nodeInfo = data;
                    this.$refs.contentRootMenu.$refs.reference = event.target;
                    this.$refs.contentRootMenu.currentVisible = !this.$refs
                      .contentRootMenu.currentVisible;
                  }
                }
              },
              [data.title]
            );
          }
        }
      ],
      buttonProps: {
        type: "default",
        size: "small"
      },
      inputContent: "", // 输入框要修改的内容
      oldName: "", // 修改前的TreeNode名称
      doculist: [],
      nodeInfo: [], //当前选中节点信息
      copyInfo: [], //当前选中待复制节点信息
      rootData: [],
      dragstartNode: "", //被拖动结点Node
      dragstartData: "", //被拖动结点Data
      files_number: 0,
      files_conflict: [],
      modal1: false
    };
  },

  methods: {
    download(root, nodekey, data) {
      var path = this.getPath(root, nodekey, data);

      if (data.children != undefined) {
        path = path.substring(0, path.length - 1);
      } else {
        path = path + data.title;
      }
      api.file_download(this.projectid, path);
    },

    modal1_ok() {
      this.files_conflict = [];
      this.modal1 = false;
      window.location.reload();
    },
    handleFiles(file) {
      var path = this.getPath(
        this.rootData,
        this.nodeInfo.nodeKey,
        this.nodeInfo
      );
      if (this.files_number == 0) this.$Spin.show();
      this.files_number++;
      var filename = file.name;
      var filecontent = "";
      //  console.log(this.file)
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = e => {
        filecontent = e.target.result;
      };
      var _this = this;
      this.$Spin.show();
      api.file_new(this.projectid, path + filename, function(response) {
        if (response.code == 0) {
          api.file_update(
            _this.projectid,
            path + filename,
            new Buffer(filecontent),
            function(response) {
              _this.files_number--;
              if (_this.files_number == 0) {
                _this.$Spin.hide();
                if (_this.files_conflict.length != 0) _this.modal1 = true;
                else {
                  window.location.reload();
                }
              }
              if (response.code == 0) {
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else {
                _this.$Message.error("未知错误");
              }
            }
          );
        } else if (response.code == -101) {
          _this.files_number--;
          if (_this.files_number == 0) {
            _this.$Spin.hide();
            if (_this.files_conflict.length != 0) _this.modal1 = true;
            else {
              window.location.reload();
            }
          }
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
          _this.files_number--;
          if (_this.files_number == 0) {
            _this.$Spin.hide();
            if (_this.files_conflict.length != 0) _this.modal1 = true;
            else {
              window.location.reload();
            }
          }
          _this.$Message.error("权限不足");
        } else if (response.code == -301) {
          _this.files_number--;
          _this.files_conflict.push(filename);
          if (_this.files_number == 0) {
            _this.$Spin.hide();
            if (_this.files_conflict.length != 0) _this.modal1 = true;
            else {
              window.location.reload();
            }
          }
        } else {
          _this.files_number--;
          if (_this.files_number == 0) {
            _this.$Spin.hide();
            if (_this.files_conflict.length != 0) _this.modal1 = true;
            else {
              window.location.reload();
            }
          }
          _this.$Message.error("未知错误");
        }
        return true;
      });
    },
    handleFolder(rootFile1, file1, response, chunk) {
      var path = this.getPath(
        this.rootData,
        this.nodeInfo.nodeKey,
        this.nodeInfo
      );
      if (this.files_number == 0) {
        this.$Spin.show();
        this.up_folder = true;
      }
      this.files_number++;
      var file = file1.file;

      var rootFile = file1.relativePath;
      var folder = "";
      for (var i = rootFile.lenth - 1; i >= 0; i--) {
        if (rootFile[i] == "/") {
          folder = rootFile.substring(0, i + 1);
          break;
        }
      }

      var filename = file.name;
      var filecontent = "";
      //  console.log(this.file)
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = e => {
        filecontent = e.target.result;
      };
      var _this = this;
      console.log(rootFile);
      api.file_new(_this.projectid, path + rootFile, function(response) {
        if (response.code == 0) {
          api.file_update(
            _this.projectid,
            path + rootFile,
            new Buffer(filecontent),
            function(response) {
              _this.files_number--;
              if (_this.files_number == 0) {
                _this.$Spin.hide();
                if (_this.files_conflict.length != 0) _this.modal1 = true;
                else {
                  window.location.reload();
                }
              }
              if (response.code == 0) {
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else {
                _this.$Message.error("未知错误");
              }
            }
          );
        } else if (response.code == -101) {
          _this.files_number--;
          if (_this.files_number == 0) {
            _this.$Spin.hide();
            if (_this.files_conflict.length != 0) _this.modal1 = true;
            else {
              window.location.reload();
            }
          }
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
          _this.files_number--;
          if (_this.files_number == 0) {
            _this.$Spin.hide();
            if (_this.files_conflict.length != 0) _this.modal1 = true;
            else {
              window.location.reload();
            }
          }
          _this.$Message.error("权限不足");
        } else if (response.code == -301) {
          _this.files_number--;
          _this.files_conflict.push(rootFile);
          if (_this.files_number == 0) {
            _this.$Spin.hide();
            if (_this.files_conflict.length != 0) _this.modal1 = true;
            else {
              window.location.reload();
            }
          }
        } else {
          _this.files_number--;
          if (_this.files_number == 0) {
            _this.$Spin.hide();
            if (_this.files_conflict.length != 0) _this.modal1 = true;
            else {
              window.location.reload();
            }
          }
          _this.$Message.error("未知错误");
        }
      });
    },
    uploadFiles(root, nodekey, data) {
      var path = this.getPath(root, nodekey, data);
      bridge.$emit("uploadFiles", path);
    },

    UpdateData(projectid) {
      var _this = this;
      var formerData = _this.deepcopy(_this.rootData);
      this.$Spin.show();
      api.file_struct(projectid, "/code/", function(response) {
        _this.$Spin.hide();
        if (response.code == 0) {
          _this.$set(_this.data4[0], "children", response.data);

          _this.$nextTick(() => {
            _this.sortAll();
            for (let i = 0; i < _this.rootData.length; i++) {
              if (_this.rootData[i].children != undefined) {
                var targetData = _this.rootData[i].node;
                var targetPath = _this.getPath(_this.rootData, i, targetData);
                for (let j = 0; j < formerData.length; j++) {
                  var oriData = formerData[j].node;
                  if (
                    oriData.title == targetData.title &&
                    oriData.expand == true
                  ) {
                    var oriPath = _this.getPath(formerData, j, oriData);
                    if (oriPath == targetPath) {
                      _this.$set(targetData, "expand", true);
                    }
                  }
                }
              }
            }
          });
        } else if (response.code == -101) {
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
          _this.$Message.error("权限不足");
        } else if (response.code == 500) {
        } else {
          _this.$Message.error("未知错误");
        }
      });
    },

    sortAll() {
      var _this = this;
      //console.log("这里的长度是" + _this.rootData.length);
      _this.clearFileData(_this.rootData);
      //console.log("处理之后的长度是" + _this.rootData.length);
      for (let i = 0; i < _this.rootData.length; i++) {
        var shownode = _this.rootData[i].node;
        if (shownode.children === undefined) {
          _this.sort(_this.rootData, shownode);
        }
      }
    },

    deepcopy(copyInfo) {
      var newInfo = [];
      newInfo = JSON.parse(JSON.stringify(copyInfo));
      return newInfo;
    },

    hiddenRightMenu() {
      this.$refs.contentFolderMenu.$refs.reference = event.target;
      this.$refs.contentFolderMenu.currentVisible = false;
      this.$refs.contentFileMenu.$refs.reference = event.target;
      this.$refs.contentFileMenu.currentVisible = false;
      this.$refs.contentRootMenu.$refs.reference = event.target;
      this.$refs.contentRootMenu.currentVisible = false;
    },
    // 处理从后端得到的文件数据
    clearFileData(data) {
      for (let i = 0; i < data.length; i++) {
        var thisNode = data[i].node;
        if (thisNode.title.indexOf(".gitignore") == 0) {
        } else if (
          thisNode.title[0] != "." &&
          thisNode.title.indexOf("__pycache__") != 0
        ) {
        } else {
          console.log("要隐藏的文件是：" + thisNode.title);
          var parentKey = data[i].parent;
          var parent = data[parentKey].node;
          const index = parent.children.indexOf(thisNode);
          parent.children.splice(index, 1);
        }
      }
    },
    sort(root, data) {
      var parentKey = root[data.nodeKey].parent;
      var parent = root[parentKey].node;
      var newnew = parent.children.sort(function(a, b) {
        if (a.children != undefined && b.children == undefined) {
          return -1;
        } else if (a.children == undefined && b.children != undefined) {
          return 1;
        } else {
          var x = a.title;
          var y = b.title;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
        }
        return 0;
      });
    },
    // 树渲染逻辑
    renderContent(h, { root, node, data }) {
      var that = this;
      that.rootData = root;
      //data.expand = true;
      if (data.children != undefined) {
        return h(
          "span",
          {
            class: "hhhaha",
            style: {
              display: "inline-block",
              lineHeight: "20px",
              width: "100%",
              cursor: "pointer"
            },
            attrs: {
              draggable: "true"
            },
            on: {
              dragstart: () => {
                this.handleDragStart(root, node, data);
              },
              dragover: () => {
                this.handleDragOver(root, node, data);
              },
              dragend: () => {
                this.handleDragEnd(root, node, data);
              },
              drop: () => {
                this.handleDrop(root, node, data);
              },
              click: () => {
                data.editState
                  ? ""
                  : this.handleClickTreeNode(root, node.nodeKey, data);
              },
              contextmenu: e => {
                e.preventDefault();
                this.hiddenRightMenu();
                this.nodeInfo = data;
                this.$refs.contentFolderMenu.$refs.reference = event.target;
                this.$refs.contentFolderMenu.currentVisible = !this.$refs
                  .contentFolderMenu.currentVisible;
              }
            }
          },
          [
            h("span", [
              h("Icon", {
                props: {
                  type: "ios-folder"
                },
                style: {
                  marginRight: "8px"
                }
              }),
              h(`${data.editState ? "" : "span"}`, data.title),
              h(`${data.editState ? "input" : ""}`, {
                attrs: {
                  value: `${data.editState ? data.title : ""}`,
                  autofocus: "true"
                },
                style: {
                  width: "50%",
                  cursor: "auto"
                },
                on: {
                  change: event => {
                    this.inputContent = event.target.value;
                  },
                  keyup: event => {
                    if (event.keyCode == 13) {
                      this.confirmTheChange(root, data.nodeKey, data);
                    }
                  },
                  focus: event => {
                    event.currentTarget.select();
                  }
                }
              })
            ]),
            // 增删改按钮部分
            h(
              `${data.editState ? "" : "span"}`,
              {
                class: "btnNone",
                style: { marginLeft: "1rem" }
              },
              []
            ),
            // 确认/取消修改部分
            h(
              `${data.editState ? "span" : ""}`,
              {
                style: {
                  marginLeft: ".5rem"
                }
              },
              [
                // 确认按钮
                h("Button", {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-checkbox-outline",
                    size: "1.5rem"
                  }),
                  style: {
                    border: 0,
                    background: "rgba(0,0,0,0)",
                    fontSize: "1.3rem",
                    outline: "none",
                    padding: "1px"
                  },
                  on: {
                    click: event => {
                      this.confirmTheChange(root, node.nodeKey, data);
                    }
                  }
                })
              ]
            )
          ]
        );
      } else {
        return h(
          "span",
          {
            class: "hhhaha",
            style: {
              display: "inline-block",
              lineHeight: "20px",
              width: "100%",
              cursor: "pointer"
            },
            attrs: {
              draggable: "true"
            },
            on: {
              dragstart: () => {
                this.handleDragStart(root, node, data);
              },
              dragover: () => {
                this.handleDragOver(root, node, data);
              },
              dragend: () => {
                this.handleDragEnd(root, node, data);
              },
              drop: () => {
                this.handleDrop(root, node, data);
              },
              click: () => {
                data.editState
                  ? ""
                  : this.handleClickTreeNode(root, node.nodeKey, data);
              },
              contextmenu: e => {
                e.preventDefault();
                this.hiddenRightMenu();
                this.nodeInfo = data;
                this.$refs.contentFileMenu.$refs.reference = event.target;
                this.$refs.contentFileMenu.currentVisible = !this.$refs
                  .contentFileMenu.currentVisible;
              }
            }
          },
          [
            h("span", [
              h("Icon", {
                props: {
                  type: "md-document"
                },
                style: {
                  marginRight: "8px"
                }
              }),
              h(`${data.editState ? "" : "span"}`, data.title),
              h(`${data.editState ? "input" : ""}`, {
                attrs: {
                  value: `${data.editState ? data.title : ""}`,
                  autofocus: "true"
                },
                style: {
                  width: "50%",
                  cursor: "auto"
                },
                on: {
                  change: event => {
                    this.inputContent = event.target.value;
                  },
                  keyup: event => {
                    if (event.keyCode == 13) {
                      this.confirmTheChange(root, data.nodeKey, data);
                    }
                  },
                  focus: event => {
                    event.currentTarget.select();
                  }
                }
              })
            ]),
            // 增删改按钮部分
            h(
              `${data.editState ? "" : "span"}`,
              {
                class: "btnNone",
                style: { marginLeft: "1rem" }
              },
              []
            ),
            // 确认/取消修改部分
            h(
              `${data.editState ? "span" : ""}`,
              {
                style: {
                  marginLeft: ".5rem"
                }
              },
              [
                // 确认按钮
                h("Button", {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-checkbox-outline",
                    size: "1.5rem"
                  }),
                  style: {
                    border: 0,
                    background: "rgba(0,0,0,0)",
                    fontSize: "1.3rem",
                    outline: "none",
                    padding: "1px"
                  },
                  on: {
                    click: event => {
                      this.confirmTheChange(root, node.nodeKey, data);
                    }
                  }
                })
              ]
            )
          ]
        );
      }
    },

    handleDragStart(root, node, data) {
      const event = window.event || arguments[0];
      this.dragstartNode = node;
      this.dragstartData = data;
    },

    handleDragOver(root, node, data) {
      const event = window.event || arguments[0];
      event.preventDefault();
    },

    handleDragEnd(root, node, data) {
      const event = window.event || arguments[0];
      event.preventDefault();
    },

    handleDrop(root, node, data) {
      event.preventDefault();
      if (node === this.dragstartNode) return; //若拖动到源结点上，则无改变
      var targetPath = this.getPath(root, node.nodeKey, data);
      var originPath = this.getPath(
        root,
        this.dragstartNode.nodeKey,
        this.dragstartData
      );
      if (targetPath == originPath) {
        var _this = this;
        _this.$Message.error("粘贴到了同一路径下！");
      } else {
        this.pasteMove(
          root,
          node.nodeKey,
          data,
          false,
          this.dragstartData,
          originPath,
          targetPath,
          false
        );
      }
    },

    saveEdit(root) {
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
        this.confirmTheChange(root, i, findnode);
      }
    },

    pasteMove(
      root,
      nodekey,
      data,
      copyflag,
      copyInfo,
      originPath,
      targetPath,
      force
    ) {
      //copyflag为1为复制行为，为0为剪切行为
      //copyInfo为被复制的内容
      //data为复制到的对象，可以为文件夹也可以为文件
      //force为Boolean值
      var _this = this;
      if (force == true) {
        var removeKey;
        if (data.children == undefined) {
          //若复制到的对象是文件
          var parentKey = root[nodekey].parent;
          var parent = root[parentKey].node;
          for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].title == copyInfo.title) {
              removeKey = parent.children[i].nodeKey;
              break;
            }
          }
        } else {
          //若复制到的对象是文件夹
          for (let i = 0; i < data.children.length; i++) {
            if (data.children[i].title == copyInfo.title) {
              removeKey = data.children[i].nodeKey;
              break;
            }
          }
        }
        if (copyInfo.children == undefined) {
          //若复制的对象是文件
          console.log("删除文件" + targetPath + data.title);
          bridge.$emit("deleteFile", targetPath + data.title);
        } else {
          //若复制的对象是文件夹
          var leaves = _this.getLeafPath(root, removeKey);
          var oldID = [];
          for (let i = 0; i < leaves.length; i++) {
            oldID.push(targetPath + leaves[i]);
          }
          bridge.$emit("deleteFloder", oldID);
        }
      }
      if (copyflag) {
        //复制行为
        this.$Spin.show();
        if (copyInfo.children == undefined) {
          //复制文件
          api.file_copy(
            _this.projectId,
            originPath + copyInfo.title,
            targetPath + copyInfo.title,
            force,
            function(response) {
              _this.$Spin.hide();
              console.log("粘贴返回" + response.code);
              if (response.code == 0) {
                _this.UpdateData(_this.projectId);
                _this.$Message.info("粘贴成功");
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else if (response.code == -301) {
                _this.$Modal.confirm({
                  title: "提示",
                  content: "在目标文件夹中有同名文件，是否覆盖？",
                  onOk: () => {
                    _this.pasteMove(
                      root,
                      nodekey,
                      data,
                      copyflag,
                      copyInfo,
                      originPath,
                      targetPath,
                      true
                    );
                  },
                  onCancel: () => {
                    _this.$Message.info("取消");
                  }
                });
              } else {
                _this.$Message.error("未知错误");
              }
            }
          );
        } else {
          //复制文件夹
          api.dir_copy(
            _this.projectId,
            originPath,
            targetPath + copyInfo.title + "/",
            force,
            function(response) {
              _this.$Spin.hide();
              console.log("粘贴返回" + response.code);
              if (response.code == 0) {
                _this.UpdateData(_this.projectId);
                _this.$Message.info("粘贴成功");
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else if (response.code == -301) {
                _this.$Modal.confirm({
                  title: "提示",
                  content: "在目标文件夹中有同名文件，是否覆盖？",
                  onOk: () => {
                    _this.pasteMove(
                      root,
                      nodekey,
                      data,
                      copyflag,
                      copyInfo,
                      originPath,
                      targetPath,
                      true
                    );
                  },
                  onCancel: () => {
                    _this.$Message.info("取消");
                  }
                });
              } else {
                _this.$Message.error("未知错误");
              }
            }
          );
        }
      } else {
        //剪切行为
        this.$Spin.show();
        if (copyInfo.children == undefined) {
          //剪切文件
          console.log(
            "剪切文件" +
              _this.projectId +
              " " +
              originPath +
              copyInfo.title +
              " " +
              targetPath +
              copyInfo.title +
              " " +
              force
          );
          api.file_move(
            _this.projectId,
            originPath + copyInfo.title,
            targetPath + copyInfo.title,
            force,
            function(response) {
              _this.$Spin.hide();
              console.log("粘贴返回" + response.code);
              if (response.code == 0) {
                var IDmap = {};
                IDmap[originPath + copyInfo.title] = [
                  targetPath + copyInfo.title,
                  copyInfo.title,
                  "/code/"
                ];
                bridge.$emit("renameFile", IDmap);

                _this.UpdateData(_this.projectId);
                _this.copyInfo = [];
                _this.$Message.info("粘贴成功");
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else if (response.code == -301) {
                _this.$Modal.confirm({
                  title: "提示",
                  content: "在目标文件夹中有同名文件，是否覆盖？",
                  onOk: () => {
                    _this.pasteMove(
                      root,
                      nodekey,
                      data,
                      copyflag,
                      copyInfo,
                      originPath,
                      targetPath,
                      true
                    );
                  },
                  onCancel: () => {
                    _this.$Message.info("取消");
                  }
                });
              } else {
                _this.$Message.error("未知错误");
              }
            }
          );
        } else {
          //剪切文件夹
          console.log(
            "剪切文件夹" +
              _this.projectId +
              " " +
              originPath +
              " " +
              targetPath +
              copyInfo.title +
              "/" +
              " " +
              force
          );
          api.dir_move(
            _this.projectId,
            originPath,
            targetPath + copyInfo.title + "/",
            force,
            function(response) {
              _this.$Spin.hide();
              console.log("粘贴返回" + response.code);
              if (response.code == 0) {
                var leaves = _this.getLeafPath(root, copyInfo.nodeKey);
                var IDmap = {};
                var oldID = "";
                var newID = "";
                for (let i = 0; i < leaves.length; i++) {
                  oldID = originPath + leaves[i];
                  newID = targetPath + copyInfo.title + "/" + leaves;
                  console.log(oldID + " " + newID);
                  IDmap[oldID] = [newID, "/code/"];
                }
                bridge.$emit("renameFloder", IDmap);

                _this.UpdateData(_this.projectId);
                _this.$Message.info("粘贴成功");
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else if (response.code == -301) {
                _this.$Modal.confirm({
                  title: "提示",
                  content: "在目标文件夹中有同名文件，是否覆盖？",
                  onOk: () => {
                    _this.pasteMove(
                      root,
                      nodekey,
                      data,
                      copyflag,
                      copyInfo,
                      originPath,
                      targetPath,
                      true
                    );
                  },
                  onCancel: () => {
                    _this.$Message.info("取消");
                  }
                });
              } else {
                _this.$Message.error("未知错误");
              }
            }
          );
        }
      }
    },

    // 控制Tree结点当前编辑状态函数
    setStates(data) {
      var editState = data.editState;
      if (editState) {
        this.$set(data, "editState", false);
      } else {
        this.$set(data, "editState", true);
      }
    },

    // Tree结点修改按钮
    editTree(data) {
      this.hiddenRightMenu();
      event.stopPropagation();
      this.inputContent = data.title;
      this.oldName = data.title;
      this.setStates(data);
    },

    getPath(root, nodekey, data) {
      var path = "";
      var findkey = nodekey;
      if (data.children != undefined) {
        //若为文件夹，返回当前文件夹的路径
        while (findkey !== 0) {
          var parentKey = root.find(el => el.nodeKey === findkey).parent;
          if (parentKey == 0) {
            break;
          }
          var parent = root.find(el => el.nodeKey === parentKey).node;
          path = parent.title + "/" + path;
          var findkey = parentKey;
        }
        if (nodekey != 0) {
          path = "/code/" + path + data.title + "/";
        } else {
          path = "/code/";
        }
      } else {
        //若为文件，返回当前文件的上层目录
        while (findkey !== 0) {
          var parentKey = root.find(el => el.nodeKey === findkey).parent;
          if (parentKey == 0) {
            break;
          }
          var parent = root.find(el => el.nodeKey === parentKey).node;
          path = parent.title + "/" + path;
          var findkey = parentKey;
        }
        path = "/code/" + path;
      }
      return path;
    },

    // 复制文件夹
    copyfolder_choose(root, nodekey, data) {
      event.stopPropagation();
      this.hiddenRightMenu();
      this.copyInfo = data;
      this.copyflag = true;
    },

    // 剪切文件夹
    movefolder_choose(root, nodekey, data) {
      event.stopPropagation();
      this.hiddenRightMenu();
      this.copyInfo = data;
      this.copyflag = false;
    },

    // 复制文件
    copyfile_choose(root, nodekey, data) {
      event.stopPropagation();
      this.hiddenRightMenu();
      this.copyInfo = data;
      this.copyflag = true; //复制行为为true
    },

    // 剪切文件
    movefile_choose(root, nodekey, data) {
      event.stopPropagation();
      this.hiddenRightMenu();
      this.copyInfo = data;
      this.copyflag = false; //剪切行为为false
    },

    // 粘贴文件，用一个变量区别当前行为是剪切还是复制
    // 复制到同一目录下
    paste(root, nodekey, data) {
      event.stopPropagation();
      this.hiddenRightMenu();
      if (this.copyInfo != []) {
        var targetPath = this.getPath(root, nodekey, data); //目标目录，以/结尾
        var originPath = this.getPath(
          root,
          this.copyInfo.nodeKey,
          this.copyInfo
        ); //原文件所在目录或原文件夹的目录，以/结尾
        if (targetPath == originPath) {
          var _this = this;
          _this.$Message.error("粘贴到了同一路径下！");
        } else {
          this.pasteMove(
            root,
            nodekey,
            data,
            this.copyflag,
            this.copyInfo,
            originPath,
            targetPath,
            false
          );
        }
      }
    },

    // 添加文件按钮
    appendfile(root, nodekey, data) {
      this.hiddenRightMenu();
      event.stopPropagation();
      var path = this.getPath(root, nodekey, data);
      var _this = this;
      this.$Spin.show();
      console.log(this.projectId + "当前新建文件》》" + path + "新建文件");
      api.file_new(this.projectId, path + "新建文件", function(response) {
        _this.$Spin.hide();
        console.log("response.code:" + response.code);
        if (response.code == 0) {
          // console.log("当前新建文件》》" + "/code/" + path + "新建文件");
          const children = data.children || [];
          children.push({
            title: "新建文件"
          });
          _this.$set(data, "children", children);
          _this.$set(data, "expand", true);
          _this.editTree(children[children.length - 1]);
        } else if (response.code == -101) {
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
          _this.$Message.error("权限不足");
        } else if (response.code == -301) {
          _this.$Message.error("文件重名");
        } else {
          _this.$Message.error("未知错误");
        }
      });
    },

    // 添加文件夹按钮
    appendfolder(root, nodekey, data) {
      this.hiddenRightMenu();
      event.stopPropagation();
      var path = this.getPath(root, nodekey, data);
      var _this = this;
      this.$Spin.show();
      console.log(this.projectId + "当前新建文件夹》》" + path + "新建文件夹/");
      api.dir_new(this.projectId, path + "新建文件夹/", function(response) {
        _this.$Spin.hide();
        // console.log("response.code:" + response.code);
        if (response.code == 0) {
          // console.log("当前新建文件夹》》" + "/code/" + path + "新建文件夹/");
          const children = data.children || [];
          children.push({
            title: "新建文件夹",
            children: []
          });
          _this.$set(data, "children", children);
          _this.$set(data, "expand", true);
          _this.editTree(children[children.length - 1]);
        } else if (response.code == -101) {
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
          _this.$Message.error("权限不足");
        } else if (response.code == -301) {
          _this.$Message.error("文件夹重命名");
        } else {
          _this.$Message.error("未知错误");
        }
      });
    },

    removenode(root, nodekey, data) {
      event.stopPropagation();
      const parentKey = root.find(el => el.nodeKey === nodekey).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },

    // 删除按钮
    remove(root, nodekey, data) {
      this.hiddenRightMenu();
      event.stopPropagation();

      this.$Modal.confirm({
        title: "提示",
        content: `您确定删除 “${data.title}” 吗？`,
        onOk: () => {
          var path = this.getPath(root, nodekey, data);
          var _this = this;
          this.$Spin.show();
          if (data.children != undefined) {
            console.log("当前删除文件夹》》" + path);
            api.dir_delete(this.projectId, path, function(response) {
              _this.$Spin.hide();
              // console.log("response.code:" + response.code);
              if (response.code == 0) {
                var parentKey = root.find(el => el.nodeKey === nodekey).parent;
                var parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
                _this.$Message.info("删除成功");
                // console.log("当前删除文件夹》》" + "/code/" + path + data.title + "/");
                var leaves = _this.getLeafPath(root, nodekey);
                var oldID = [];
                for (let i = 0; i < leaves.length; i++) {
                  oldID.push(path + leaves[i]);
                }
                bridge.$emit("deleteFloder", oldID);
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else {
                _this.$Message.error("未知错误");
              }
            });
          } else {
            console.log("当前删除文件》》" + path + data.title);
            api.file_delete(this.projectId, path + data.title, function(
              response
            ) {
              _this.$Spin.hide();
              // console.log("response.code:" + response.code);
              if (response.code == 0) {
                var parentKey = root.find(el => el.nodeKey === nodekey).parent;
                var parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
                _this.$Message.info("删除成功");
                // console.log("当前删除文件》》" + "/code/" + path + data.title);
                bridge.$emit("deleteFile", path + data.title);
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
              } else {
                _this.$Message.error("未知错误");
              }
            });
          }
        },
        onCancel: () => {
          this.$Message.info("取消");
        }
      });
    },

    // 确认修改树节点
    confirmTheChange(root, nodekey, data) {
      if (!this.inputContent) {
        this.$Notice.warning({
          title: "当前输入有误"
        });
      } else {
        if (this.oldName !== this.inputContent) {
          var path = "";
          var findkey = nodekey;
          while (findkey !== 0) {
            var parentKey = root.find(el => el.nodeKey === findkey).parent;
            if (parentKey == 0) {
              break;
            }
            var parent = root.find(el => el.nodeKey === parentKey).node;
            path = parent.title + "/" + path;
            var findkey = parentKey;
          }
          var _this = this;
          this.$Spin.show();
          if (data.children != undefined) {
            // console.log(this.projectId + "当前修改文件夹》》" + "/code/" + path + data.title+"/为"+"/code/"+path+this.inputContent+"/");
            api.dir_rename(
              this.projectId,
              "/code/" + path + data.title + "/",
              "/code/" + path + this.inputContent + "/",
              function(response) {
                _this.$Spin.hide();
                // console.log("response.code:" + response.code);
                if (response.code == 0) {
                  var leaves = _this.getLeafPath(root, nodekey);
                  var IDmap = {};
                  var oldID = "";
                  var newID = "";
                  for (let i = 0; i < leaves.length; i++) {
                    oldID = "/code/" + path + data.title + "/" + leaves[i];
                    newID =
                      "/code/" + path + _this.inputContent + "/" + leaves[i];
                    IDmap[oldID] = [newID, "/code/" + path];
                  }
                  // console.log(this.getLeafPath(root, nodekey));
                  bridge.$emit("renameFloder", IDmap);

                  data.title = _this.inputContent;
                  _this.$Message.info("修改成功");
                  _this.setStates(data);
                  //_this.getLeafPath(root, nodekey);
                  _this.sort(root, data);
                } else if (response.code == -101) {
                  _this.$Message.error("cookie验证失败");
                  _this.$router.push("/");
                } else if (response.code == -102) {
                  _this.$Message.error("权限不足");
                } else if (response.code == -301) {
                  _this.$Message.error("文件夹重名");
                } else {
                  _this.$Message.error("未知错误");
                }
              }
            );
          } else {
            // console.log(this.projectId + "当前修改文件》》" + "/code/" + path + data.title+"为"+"/code/"+path+this.inputContent);
            api.file_rename(
              this.projectId,
              "/code/" + path + data.title,
              "/code/" + path + this.inputContent,
              function(response) {
                _this.$Spin.hide();
                // console.log("response.code:" + response.code);
                if (response.code == 0) {
                  var oldID = "/code/" + path + data.title;
                  var newID = "/code/" + path + _this.inputContent;
                  var IDmap = {};
                  IDmap[oldID] = [newID, _this.inputContent, "/code/" + path];
                  bridge.$emit("renameFile", IDmap);

                  data.title = _this.inputContent;
                  _this.$Message.info("修改成功");
                  _this.setStates(data);

                  _this.sort(root, data);
                } else if (response.code == -101) {
                  _this.$Message.error("cookie验证失败");
                  _this.$router.push("/");
                } else if (response.code == -102) {
                  _this.$Message.error("权限不足");
                } else if (response.code == -301) {
                  _this.$Message.error("文件重名");
                } else {
                  _this.$Message.error("未知错误");
                }
              }
            );
          }
        } else {
          this.setStates(data);
        }
      }
    },

    getLeafPath(root, nodekey) {
      var i;
      var pathList = [];
      for (i = 0; i < root.length; i++) {
        var findkey = i;
        var searchnode = root[i].node;
        if (searchnode.children != undefined) {
          continue;
        }
        var path = searchnode.title;

        while (findkey !== 0) {
          var parentKey = root[findkey].parent;
          var parent = root.find(el => el.nodeKey === parentKey).node;
          if (parentKey === nodekey) {
            pathList.push(path);
            break;
          } else {
            path = parent.title + "/" + path;
            var findkey = parentKey;
          }
        }
      }
      return pathList;
    },

    // 点击Tree节点触发
    handleClickTreeNode(root, nodekey, data) {
      // console.log("当前点击》》"+data.title);
      this.saveEdit(root);
      this.nodeInfo = data;
      if (data.children == undefined) {
        var path = this.getPath(root, nodekey, data);
        bridge.$emit("add", [path + data.title, data.title, path]);
      } else {
        this.$set(data, "expand", !data.expand);
      }
    }
  },
  mounted() {
    var _this = this;

    bridge.$on("newRootFile", val => {
      _this.appendfile(_this.rootData, 0, _this.data4[0]);
    });

    bridge.$on("newRootFolder", val => {
      _this.appendfolder(_this.rootData, 0, _this.data4[0]);
    });

    bridge.$on("AllFile", CallBack => {
      _this.doculist = _this.getLeafPath(_this.rootData, 0);
      bridge.$emit("ReturnAllFile", _this.doculist);
    });

    bridge.$on("uploadFile", fileName => {
      this.UpdateData(this.projectId);
    });

    bridge.$on("FleshFilesTree", () => {
      this.UpdateData(this.projectId);
    });

    var timer = setInterval(function() {
      if (_this.rootData.length != 0) {
        for (let i = 0; i < _this.rootData.length; i++) {
          var shownode = _this.rootData[i].node;
          if (shownode.children === undefined) {
            _this.sort(_this.rootData, shownode);
          }
        }
        console.log("完成初始化刷新");
        clearInterval(timer);
      }
    }, 1000);

    bridge.$on("changeAllTheme", themeName => {
      if (themeName == "dark") {
        this.treeTheme = "darkTree";
      } else {
        this.treeTheme = "lightTree";
      }
    });
  },

  beforeDestroy() {
    bridge.$off("newRootFile");
    bridge.$off("newRootFolder");
    bridge.$off("AllFile");
    bridge.$off("uploadFile");
    bridge.$off("FleshFilesTree");
    bridge.$off("changeAllTheme");
  }
};
</script>
<style  >
.IviewTree {
  width: 300px;
  text-align: left;
  margin: 0 auto;
}
.btnNone {
  display: none;
}
/* .hhhaha:hover{color:aqua} */
/* .hhhaha:hover .btnNone{ */
.hhhaha:hover {
  display: inline-block;
  overflow: visible;
}

.hhhaha:hover {
  color: #949090;
}

.root {
  font-weight: bold;
  padding: 0px;
}

.root:hover {
  color: inherit;
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
.ivu-btn  {
  color: #f5f7f9;
  background-color: #464e57;
  border-color: #464e57;
}
.ivu-btn:hover  {
  background-color: dimgrey;
}

.my-setting .ivu-tabs-bar {
  margin-bottom: 0vh;
}
.ivu-card-head {
  padding: 0.4vh;
}
.ivu-card-body {
  padding: 0vh;
  height: 2.4vh;
  background: #363e4f;
  margin: -0.1vh;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
}
.ivu-layout-header {
  height: 36px;
  line-height: 36px;
  padding: 0;
  background-color: #464e57;
  margin: 0;
}
.darkTree >>> .ivu-tree-title {
  border-radius: 0px;
  color: #ececec;
  width: 100%;
  font-family: Consolas;
}
.lightTree >>> .ivu-tree-title {
  border-radius: 0px;
  color: #4b4b4d;
  width: 100%;
  font-family: Consolas;
}
.lightTree >>> .ivu-tree-title:hover {
  background: #d0ecf380;
  color: #4b4b4d;
}

.lightTree >>> .ivu-tree-title-selected,
.ivu-tree-title-selected:hover {
  background: #d0ecf3;
}

.darkTree >>> .ivu-tree-title:hover {
  background: #4b4b4d79;
}

.darkTree >>> .ivu-tree-title-selected,
.ivu-tree-title-selected:hover {
  background: #4b4b4d;
}
.lightTree >>> .uploader-drop {
  width: 120px;
  height: 33.2px;
  background-color: #ffffff;
  border: #ffffff;
  padding: 0;
}
.lightTree >>> .uploader-btn {
  border: #ffffff;
  color: #515a6e;
  width: 120px;
  padding: 0;
}
.lightTree >>> .ivu-upload {
  width: 100%;
  height: 100%;
}
.lightTree >>> .uploader {
  border: #ffffff;
  width: 120px;
  padding: 0;
  margin: 0;
}
.darkTree >>> .uploader-drop {
  background-color: #4b4b4d;
  border: #4b4b4d;
  width: 120px;
  height: 33.2px;
  padding: 0;
  margin: 0;
}
.darkTree >>> .uploader {
  border: #4b4b4d;
  width: 120px;
  height: 33.2px;
  padding: 0;
}
.darkTree >>> .uploader-btn {
  border: #4b4b4d;
  color: #4b4b4d;
  width: 120px;
  height: 33.2px;
  padding: 0;
}
</style> 