<template>
  <div>
    <Modal v-model="modal1" title="新建工程" @on-ok="new_ok">
      <Input
        v-model="project_name"
        style="width:200px"
        placeholder="请输入Project Name"
        @keyup.enter.native="new_ok"
      ></Input>
    </Modal>

    <Modal v-model="modal2" @on-ok="delete_ok">
      <p>确定删除该project</p>
    </Modal>

    <Modal v-model="modal3" title="重命名" @on-ok="update_ok">
      <Input v-model="project_name" style="width:200px" @keyup.enter.native="update_ok"></Input>
    </Modal>

    <Modal 
      v-model="modal4" 
      title="分享项目" 
      :loading="loading" 
      @on-ok="share_ok">
      <p>添加用户：</p>
      <br>
      <Input search enter-button="Add" placeholder="请输入对方的用户名..." v-model="shareUsernameAdd" @on-search="addShareUser()" />
      <br>
      <Table border :columns="columns12" :data="data6" style="border-top=10px">
        <template slot-scope="{ row }" slot="username">
            <strong>{{ row.username }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="error" size="small" @click="removeShareUser(index)">Delete</Button>
        </template>
      </Table>
      <br>
      <RadioGroup v-model="project_right">
        分享权限： 
        <Radio label="可读分享" value="writeable"></Radio>
        <Radio label="可写分享" value="readable"></Radio>
      </RadioGroup>
      <div slot="footer">
        <Button type="text" @click="share_cancel">取消</Button>
        <Button type="primary" @click="share_ok">分享</Button>
      </div>
    </Modal>

    <div style="margin-top:80px;margin-left:20vh">
      <Input
        v-model="search_name"
        placeholder=" Search for Notebooks..."
        style="width: 800px"
        @keyup.enter.native="search"
      >
        <Select v-model="search_type" slot="prepend" style="width: 100px">
          <Option value="PYTHON3" @click.native="search">Python</Option>
          <Option value="CPP" @click.native="search">C++</Option>
          <!--<Option value="PYTHON2" @click.native="search" >Python2</Option>-->

          <!--<Option value="JAVA" @click.native="search" >Java</Option>-->
        </Select>
        <Button slot="append" icon="ios-search" @click="search"></Button>
      </Input>
    </div>
    <Footer>
      <div style="margin-top:20px;">
        <Tabs v-model="note_type">
          <TabPane label="Python Notebooks" name="PYTHON3">
            <div>
              <div class="mycardbody" style="float:left;margin-left:25px">
                <Card style="width:120px ;float:left">
                  <div style="text-align:center;cursor:pointer" @click="newProject('PYTHON3')">
                    <br />
                    <img src="../../assets/new.png" />
                    <br />
                    <p>New</p>
                    <br />
                    <br />
                  </div>
                  <!--
                                    <div style="text-align:left">
                                        <img src="../../assets/import.png" width=20px height=20px>
                                        <a >Import ...</a>
                  </div>-->
                </Card>
              </div>
              <div
                class="mycardbody"
                style="float:left;margin-left:25px;margin-bottom:10px"
                v-for="(data,index) in p3_books"
                :key="index"
                @mouseout="iconshow=false"
                @mouseover="iconshow=true"
              >
                <Card style="width:120px;">
                  <div
                    style="height:80%;cursor:pointer;overflow: hidden;word-wrap: break-word;
                        word-break: break-all;"
                    @click="etrProject(data)"
                  >{{data.name}}</div>
                  <a
                    style="position:absolute;left:5px;bottom:5px"
                    @click="udtProject('PYTHON3',index)"
                    v-show="iconshow"
                  >
                    <Icon type="ios-more" />
                  </a>
                  <a
                    style="position:absolute;left:35px;bottom:5px"
                    @click="shareProject('PYTHON3',index)"
                    v-show="iconshow"
                  >
                    <Icon type="ios-share-alt-outline" />
                  </a>
                  <a
                    style="position:absolute;right:5px;bottom:5px"
                    @click="delProject('PYTHON3',index)"
                    v-show="iconshow"
                  >
                    <Icon type="ios-trash-outline" />
                  </a>
                </Card>
              </div>
            </div>
          </TabPane>
          <TabPane label="C++ Notebooks" name="CPP">
            <div>
              <div class="mycardbody" style="float:left;margin-left:25px">
                <Card style="width:120px ;float:left">
                  <div style="text-align:center;cursor:pointer" @click="newProject('CPP')">
                    <br />
                    <img src="../../assets/new.png" />
                    <br />
                    <p>New</p>
                    <br />
                    <br />
                  </div>
                  <!--
                                    <div style="text-align:left">
                                        <img src="../../assets/import.png" width=20px height=20px>
                                        <a >Import ...</a>
                  </div>-->
                </Card>
              </div>
              <div
                class="mycardbody"
                style="float:left;margin-left:25px;margin-bottom:10px"
                v-for="(data,index) in cpp_books"
                :key="index"
                @mouseout="iconshow=false"
                @mouseover="iconshow=true"
              >
                <Card style="width:120px;">
                  <div
                    style="height:80%;cursor:pointer;overflow: hidden;word-wrap: break-word;
                                        word-break: break-all;"
                    @click="etrProject(data)"
                  >{{data.name}}</div>
                  <a
                    style="position:absolute;left:5px;bottom:5px"
                    @click="udtProject('CPP',index)"
                    v-show="iconshow"
                  >
                    <Icon type="ios-more" />
                  </a>
                  <a
                    style="position:absolute;left:35px;bottom:5px"
                    @click="udtProject('CPP',index)"
                    v-show="iconshow"
                  >
                    <Icon type="ios-share-alt-outline" />
                  </a>
                  <a
                    style="position:absolute;right:5px;bottom:5px"
                    @click="delProject('CPP',index)"
                    v-show="iconshow"
                  >
                    <Icon type="ios-trash-outline" />
                  </a>
                </Card>
              </div>
            </div>
          </TabPane>
          <!--<TabPane label="Python2 Notebooks" name="PYTHON2">
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
                                    <a @click="etrProject(data)">{{data.name}}</a>                                
                                    <a style="position:absolute;left:5px;bottom:5px" @click='udtProject("PYTHON2",index)' v-show="iconshow">
                                        <Icon type="ios-more" />
                                    </a>
                                    <a  style="position:absolute;right:5px;bottom:5px" @click='delProject("PYTHON2",index)' v-show="iconshow">
                                        <Icon  type="ios-trash-outline"/>
                                    </a>
                                    
                                </Card>
                            </div>                                   
                        </div>
          </TabPane>-->

          <!--<TabPane label="Java Notebooks" name="JAVA">
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
                                    <a @click="etrProject(data)">{{data.name}}</a>                                
                                    <a style="position:absolute;left:5px;bottom:5px" @click='udtProject("JAVA",index)' v-show="iconshow">
                                        <Icon type="ios-more" />
                                    </a>
                                    <a  style="position:absolute;right:5px;bottom:5px" @click='delProject("JAVA",index)' v-show="iconshow">
                                        <Icon  type="ios-trash-outline"/>
                                    </a>
                                    
                                </Card>
                            </div>                                   
                        </div>
          </TabPane>-->
        </Tabs>
      </div>
    </Footer>
  </div>
</template>

<script>
import api from "../../assets/js/api.js";
import bridge from "../bridge.js";
export default {
  data() {
    return {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      project_name: "",
      project_type: "",
      project_index: 0,
      iconshow: false,
      note_type: "PYTHON3",
      search_name: "",
      search_type: "PYTHON3",
      shareUsernameAdd: "",
      project_right: "",
      c_books: this.fc_books,
      cpp_books: this.fcpp_books,
      p2_books: this.fp2_books,
      p3_books: this.fp3_books,
      j_books: this.fj_books,
      loading: true,
      columns12: [
          {
              title: 'username',
              slot: 'username'
          },
          {
              title: 'Action',
              slot: 'action',
              width: 150,
              align: 'center'
          }
      ],
      data6: []
    };
  },

  props: {
    fc_books: {
      type: Array,
      required: true
    },
    fcpp_books: {
      type: Array,
      required: true
    },
    fp2_books: {
      type: Array,
      required: true
    },
    fp3_books: {
      type: Array,
      required: true
    },
    fj_books: {
      type: Array,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },

  methods: {
    addShareUser() {
      if (this.shareUsernameAdd == "") {
        this.$Message.error("用户名不能为空")
        return
      }
      for (let i = 0; i < this.data6.length; i = i + 1) {
        if (this.data6[i].username == this.shareUsernameAdd) {
          this.$Message.error("用户" + this.shareUsernameAdd + "已添加")
          return
        }
      }
      let _this = this
      api.util_check_username(this.shareUsernameAdd, function(obj) {
        if (obj.code == 0) {
          let check = obj.data == "true" ? true : false
          if (check == false) {
            _this.data6.push({
              username: _this.shareUsernameAdd
            })
          } else {
            _this.$Message.error("用户名不存在")
          }
        } else {
          _this.$Message.error(obj.Message)
        }
        if (obj.code == -101) {
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        }
        _this.shareUsernameAdd = ''
      })
      
    },
    removeShareUser(index) {
      this.data6.splice(index, 1)
    },
    newProject(type) {
      this.project_name = "";
      switch (type) {
        case api.C:
          this.project_type = api.C;
          break;
        case api.CPP:
          this.project_type = api.CPP;
          break;
        case api.PYTHON2:
          this.project_type = api.PYTHON2;
          break;
        case api.PYTHON3:
          this.project_type = api.PYTHON3;
          break;
        case api.JAVA:
          this.project_type = api.JAVA;
          break;
      }
      this.modal1 = true;
    },
    delProject(type, index) {
      switch (type) {
        case api.C:
          this.project_type = api.C;
          break;
        case api.CPP:
          this.project_type = api.CPP;
          break;
        case api.PYTHON2:
          this.project_type = api.PYTHON2;
          break;
        case api.PYTHON3:
          this.project_type = api.PYTHON3;
          break;
        case api.JAVA:
          this.project_type = api.JAVA;
          break;
      }
      this.project_index = index;
      this.modal2 = true;
    },
    udtProject(type, index) {
      switch (type) {
        case api.C:
          this.project_type = api.C;
          this.project_name = this.c_books[index].name;
          break;
        case api.CPP:
          this.project_type = api.CPP;
          this.project_name = this.cpp_books[index].name;
          break;
        case api.PYTHON2:
          this.project_type = api.PYTHON2;
          this.project_name = this.p2_books[index].name;
          break;
        case api.PYTHON3:
          this.project_type = api.PYTHON3;
          this.project_name = this.p3_books[index].name;
          break;
        case api.JAVA:
          this.project_type = api.JAVA;
          this.project_name = this.j_books[index].name;
          break;
      }
      this.project_index = index;
      this.modal3 = true;
    },
    shareProject(type, index) {
      this.project_index = index
      this.project_type = type
      this.modal4 = true;
    },
    new_ok() {
      if (this.project_name == "") {
        this.$Modal.error({
          title: "创建失败",
          content: "<p>项目名不能为空</p>"
        });
        return;
      }
      var _this = this;
      this.$Spin.show();

      api.project_new(this.project_name, this.project_type, function(response) {
        _this.$Spin.hide();
        if (response.code == 0) {
          var data = response.data;
          if (data.imageType == api.C) {
            _this.c_books.push({ projectId: data.projectId, name: data.name });
          } else if (data.imageType == api.CPP) {
            _this.cpp_books.push({
              projectId: data.projectId,
              name: data.name
            });
          } else if (data.imageType == api.PYTHON2) {
            _this.p2_books.push({ projectId: data.projectId, name: data.name });
          } else if (data.imageType == api.PYTHON3) {
            _this.p3_books.push({ projectId: data.projectId, name: data.name });
          } else {
            _this.j_books.push({ projectId: data.projectId, name: data.name });
          }

          _this.$Message.success("新建成功");
          _this.etrProject(data);
        } else if (response.code == -101) {
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else {
          _this.$Message.error("未知错误");
        }
      });
      this.modal1 = false;
    },

    delete_ok() {
      var _this = this;
      var del_id;
      if (this.project_type == api.C) {
        del_id = this.c_books[this.project_index].projectId;
      } else if (this.project_type == api.CPP) {
        del_id = this.cpp_books[this.project_index].projectId;
      } else if (this.project_type == api.PYTHON2) {
        del_id = this.p2_books[this.project_index].projectId;
      } else if (this.project_type == api.PYTHON3) {
        del_id = this.p3_books[this.project_index].projectId;
      } else {
        del_id = this.j_books[this.project_index].projectId;
      }
      this.$Spin.show();
      api.project_delete(del_id, function(response) {
        _this.$Spin.hide();
        if (response.code == 0) {
          if (_this.project_type == api.C) {
            _this.c_books.splice(_this.project_index, 1);
          } else if (_this.project_type == api.CPP) {
            _this.cpp_books.splice(_this.project_index, 1);
          } else if (_this.project_type == api.PYTHON2) {
            _this.p2_books.splice(_this.project_index, 1);
          } else if (_this.project_type == api.PYTHON3) {
            _this.p3_books.splice(_this.project_index, 1);
          } else {
            _this.j_books.splice(_this.project_index, 1);
          }
          _this.$Message.success("删除成功");
        } else if (response.code == -101) {
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
          _this.$Message.error("权限不足");
        } else {
          _this.$Message.error("未知错误");
        }
      });
      this.modal2 = false;
    },

    update_ok() {
      if (this.project_name == "") {
        this.$Modal.error({
          title: "修改失败",
          content: "<p>项目名不能为空</p>"
        });
        return;
      }
      var _this = this;
      var del_id;
      if (this.project_type == api.C) {
        del_id = this.c_books[this.project_index].projectId;
      } else if (this.project_type == api.CPP) {
        del_id = this.cpp_books[this.project_index].projectId;
      } else if (this.project_type == api.PYTHON2) {
        del_id = this.p2_books[this.project_index].projectId;
      } else if (this.project_type == api.PYTHON3) {
        del_id = this.p3_books[this.project_index].projectId;
      } else {
        del_id = this.j_books[this.project_index].projectId;
      }
      this.$Spin.show();
      api.project_info_update(del_id, this.project_name, function(response) {
        _this.$Spin.hide();
        //    console.log(response.code)
        if (response.code == 0) {
          if (_this.project_type == api.C) {
            _this.c_books[_this.project_index] = {
              projectId: del_id,
              name: _this.project_name
            };
          } else if (_this.project_type == api.CPP) {
            _this.cpp_books[_this.project_index] = {
              projectId: del_id,
              name: _this.project_name
            };
          } else if (_this.project_type == api.PYTHON2) {
            _this.p2_books[_this.project_index] = {
              projectId: del_id,
              name: _this.project_name
            };
          } else if (_this.project_type == api.PYTHON3) {
            _this.p3_books[_this.project_index] = {
              projectId: del_id,
              name: _this.project_name
            };
          } else {
            _this.j_books[_this.project_index] = {
              projectId: del_id,
              name: _this.project_name
            };
          }
          _this.$Message.success("重命名成功");
        } else if (response.code == -101) {
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
          _this.$Message.error("权限不足");
        } else {
          _this.$Message.error("未知错误");
        }
      });
      this.modal3 = false;
    },

    share_ok() {
      // console.log(this.data6)
      if (this.data6.length == []) {
        this.$Message.error("请添加要分享的用户")
        return
      }
      if (this.project_right == '') {
        this.$Message.error("请选择分享权限")
        return
      }
      let _this = this
      let callback = function() {
        _this.shareUsernameAdd = ''
        _this.project_right = ''
        _this.data6 = []
        _this.modal4 = false
        _this.$Spin.hide()
      }
      let count = this.data6.length
      let error_users = []
      this.$Spin.show()
      for (let i = 0; i < this.data6.length; i = i + 1) {
        // console.log(this.project_right)
        let pid = ''
        if (this.project_type == api.C) {
          pid = this.c_books[this.project_index].projectId;
        } else if (this.project_type == api.CPP) {
          pid = this.cpp_books[this.project_index].projectId;
        } else if (this.project_type == api.PYTHON2) {
          pid = this.p2_books[this.project_index].projectId;
        } else if (this.project_type == api.PYTHON3) {
          pid = this.p3_books[this.project_index].projectId;
        } else {
          pid = this.j_books[this.project_index].projectId;
        }
        let writeable = this.project_right == '可写分享' ? true : false
        api.share_invite(pid, this.data6[i].username, writeable, function(res) {
          count -= 1
          // console.log(res)
          if (res.code != undefined) {
            
            if (res.code == 0) {

            } else {
              // _this.$Message.error(res.Message)
              error_users.push({
                "username": res.username,
                "message" : res.message
              })
            }
          } else {
            // _this.$Message.error("未知错误")
            error_users.push({
              "username": res.username,
              "message": "未知错误"
            })
          }
          if (res.code == -101) {
            _this.$Message.error("cookie验证失败");
            _this.$router.push("/");
            count = 0
            error_users = []
          }
          if (count == 0) {
            callback()
            // console.log(error_users)
            if (error_users.length == 0) {
              _this.$Message.success("分享成功")
            } else {
              let content = ''
              for (let i = 0; i < error_users.length; i = i + 1) {
                content += "用户名："+error_users[i]["username"]+"<br>原因："+error_users[i]["message"] + "<br><br>"
              }
              _this.$Modal.error({
                title: "以下用户分享失败",
                content: content
              });
            }
            
          }
        })
      }
    },
    share_cancel() {
      this.data6 = []
      this.shareUsernameAdd = ''
      this.project_right = ''
      this.modal4 = false
    },
    search() {
      this.c_books.length = [];
      this.cpp_books.length = [];
      this.p2_books.length = [];
      this.p3_books.length = [];
      this.j_books.length = [];
      var _this = this;
      this.$Spin.show();
      api.project_info(function(response) {
        _this.$Spin.hide();
        if (response.code == 0) {
          var projects = response.data;
          for (var i = 0; i < projects.length; i++) {
            if (projects[i].imageType == api.C) {
              _this.c_books.push({
                projectId: projects[i].projectId,
                name: projects[i].name
              });
            } else if (projects[i].imageType == api.CPP) {
              _this.cpp_books.push({
                projectId: projects[i].projectId,
                name: projects[i].name
              });
            } else if (projects[i].imageType == api.PYTHON2) {
              _this.p2_books.push({
                projectId: projects[i].projectId,
                name: projects[i].name
              });
            } else if (projects[i].imageType == api.PYTHON3) {
              _this.p3_books.push({
                projectId: projects[i].projectId,
                name: projects[i].name
              });
            } else if (projects[i].imageType == api.JAVA) {
              _this.j_books.push({
                projectId: projects[i].projectId,
                name: projects[i].name
              });
            }
          }
          if (_this.search_type == api.C) {
            _this.note_type = "C";
            if (_this.search_name == "") return;
            var res = [];
            for (var i = 0; i < _this.c_books.length; i++) {
              if (_this.c_books[i].name.indexOf(_this.search_name) != -1) {
                res.push(_this.c_books[i]);
              }
            }
            _this.c_books = res;
            return;
          } else if (_this.search_type == api.CPP) {
            _this.note_type = "CPP";
            if (_this.search_name == "") return;
            var res = [];
            for (var i = 0; i < _this.cpp_books.length; i++) {
              if (_this.cpp_books[i].name.indexOf(_this.search_name) != -1) {
                res.push(_this.cpp_books[i]);
              }
            }
            _this.cpp_books = res;

            return;
          } else if (_this.search_type == api.PYTHON2) {
            _this.note_type = "PYTHON2";
            if (_this.search_name == "") return;
            var res = [];
            for (var i = 0; i < _this.p2_books.length; i++) {
              if (_this.p2_books[i].name.indexOf(_this.search_name) != -1) {
                res.push(_this.p2_books[i]);
              }
            }
            _this.p2_books = res;
            return;
          } else if (_this.search_type == api.PYTHON3) {
            _this.note_type = "PYTHON3";
            if (_this.search_name == "") return;
            var res = [];
            // console.log(_this.p3_books)
            for (var i = 0; i < _this.p3_books.length; i++) {
              //  console.log('_this.search_name:'+_this.search_name)
              // console.log('_this.p3_books[i].name'+_this.p3_books[i].name)
              if (_this.p3_books[i].name.indexOf(_this.search_name) != -1) {
                res.push(_this.p3_books[i]);
              }
            }
            // console.log(res)
            _this.p3_books = res;
            // console.log(_this.p3_books)
            return;
          } else if (_this.search_type == api.JAVA) {
            _this.note_type = "JAVA";
            if (_this.search_name == "") return;
            var res = [];
            for (var i = 0; i < _this.j_books.length; i++) {
              if (_this.j_books[i].name.indexOf(_this.search_name) != -1) {
                res.push(_this.j_books[i]);
              }
            }
            _this.j_books = res;
            return;
          }
        } else if (response.code == -101) {
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else {
          _this.$Message.error("未知错误");
        }
      });
    },
    etrProject(data) {
      this.$Loading.config({
        height: 4
      });
      var _this = this;
      this.$Loading.start();
      api.project_enter(data.projectId, function(response) {
        if (response.code == 0) {
          var timer = setInterval(function() {
            api.file_struct(data.projectId, "/code/", function(response) {
              _this.$Loading.finish();
              if (response.code == 0) {
                _this.$router.push({
                  name: "Ide",
                  query: {
                    projectId: data.projectId,
                    projectName: data.name
                  }
                });
                clearInterval(timer);
              } else if (response.code == -101) {
                _this.$Message.error("cookie验证失败");
                _this.$router.push("/");
                clearInterval(timer);
              } else if (response.code == -102) {
                _this.$Message.error("权限不足");
                clearInterval(timer);
              } else if (response.code == 500) {
              } else {
                _this.$Message.error("未知错误");
                clearInterval(timer);
              }
            });
          }, 1000);
        } else if (response.code == -101) {
          _this.$Loading.error();
          _this.$Message.error("cookie验证失败");
          _this.$router.push("/");
        } else if (response.code == -102) {
          _this.$Loading.error();
          _this.$Message.error("权限不足");
        } else {
          _this.$Loading.error();
          _this.$Modal.error({
            title: "请求失败",
            content: "<p>您的操作太过频繁</p><p>请稍后再试</p>"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.mycardbody >>> .ivu-card-body {
  height: 137px;
}
.ivu-icon {
  font-size: 30px;
  color: rgb(223, 67, 158);
}
</style>
