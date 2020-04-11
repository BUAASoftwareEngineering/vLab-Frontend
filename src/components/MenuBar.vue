
<template>
    <div id="menubar">
        <Layout>
            <Header :style="{height: '36px', padding: '0'}">
            <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0px">
                <Button type="primary" style="min-width: 70px">
                    文件
                </Button>
                <DropdownMenu slot="list" style="min-width: 150px">
                    <DropdownItem>新建文件</DropdownItem>
                    <DropdownItem>豆汁儿</DropdownItem>
                    <Dropdown placement="right-start" transfer style="min-width: 150px">
                        <DropdownItem>
                            北京烤鸭
                            <Icon type="ios-arrow-forward" style="float: right; margin-top: 5px"></Icon>
                        </DropdownItem>
                        <DropdownMenu slot="list">
                            <DropdownItem>挂炉烤鸭</DropdownItem>
                            <DropdownItem>焖炉烤鸭</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click" style="padding: 0px">
                <Button type="primary" style="min-width: 70px">
                    编辑
                </Button>
                <DropdownMenu slot="list" style="min-width: 150px">
                    <DropdownItem>撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem>重做<span style="float: right">Ctrl+Y</span></DropdownItem>
                    <DropdownItem divided style="line-height: 80%">拷贝<span style="float: right">Ctrl+C</span></DropdownItem>
                    <DropdownItem>剪切<span style="float: right">Ctrl+X</span></DropdownItem>
                    <DropdownItem>粘贴<span style="float: right">Ctrl+V</span></DropdownItem>
                    <DropdownItem divided style="line-height: 80%">查找<span style="float: right">Ctrl+F</span></DropdownItem>
                    <DropdownItem>替换<span style="float: right">Ctrl+H</span></DropdownItem>
                    <DropdownItem>全局查找<span style="float: right">Ctrl+Shift+F</span></DropdownItem>
                    <DropdownItem>全局替换<span style="float: right">Ctrl+Shift+H</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 70px">
                    代码操作
                </Button>
                <DropdownMenu slot="list" style="min-width: 150px">
                    <DropdownItem>撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem>重做</DropdownItem>
                    <DropdownItem divided style="line-height: 80%">拷贝</DropdownItem>
                    <DropdownItem>剪切</DropdownItem>
                    <DropdownItem>粘贴</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 70px">
                    运行
                </Button>
                <DropdownMenu slot="list" style="min-width: 150px">
                    <DropdownItem >撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem >重做</DropdownItem>
                    <DropdownItem divided style="line-height: 80%">拷贝</DropdownItem>
                    <DropdownItem >剪切</DropdownItem>
                    <DropdownItem >粘贴</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 70px">
                    视图
                </Button>
                <DropdownMenu slot="list" style="min-width: 150px">
                    <DropdownItem>撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem>重做</DropdownItem>
                    <DropdownItem divided style="line-height: 80%">拷贝</DropdownItem>
                    <DropdownItem>剪切</DropdownItem>
                    <DropdownItem>粘贴</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start" transfer trigger="click">
                <Button type="primary" style="min-width: 70px">
                    帮助
                </Button>
                <DropdownMenu slot="list" style="min-width: 150px">
                    <DropdownItem>撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem>重做</DropdownItem>
                    <DropdownItem divided style="line-height: 80%">拷贝</DropdownItem>
                    <DropdownItem>剪切</DropdownItem>
                    <DropdownItem>粘贴</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </Header>
        </Layout>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .ivu-btn{
        border-radius: 0px;
        color:#f5f7f9;background-color:#464e57;border-color:#464e57;
        margin: 0px;
    }
    .ivu-layout-header{
        height:36px;
        line-height:36px;
        padding:0;
    }
</style>