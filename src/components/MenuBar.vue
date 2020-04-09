
<template>
    <div id="menubar">
        <Layout>
            <Header>
            <Dropdown placement="top" transfer trigger="click">
                <Button type="primary">
                    文件
                </Button>
                <DropdownMenu slot="list" style="min-width: 150px">
                    <DropdownItem>新建文件</DropdownItem>
                    <DropdownItem>豆汁儿</DropdownItem>
                    <Dropdown placement="right-start" transfer>
                        <DropdownItem>
                            北京烤鸭
                            <Icon type="ios-arrow-forward"></Icon>
                        </DropdownItem>
                        <DropdownMenu slot="list">
                            <DropdownItem>挂炉烤鸭</DropdownItem>
                            <DropdownItem>焖炉烤鸭</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="top" transfer trigger="click">
                <Button type="primary" round="false">
                    编辑
                </Button>
                <DropdownMenu slot="list" style="min-width: 150px">
                    <DropdownItem>撤销<span style="float: right">Ctrl+Z</span></DropdownItem>
                    <DropdownItem>重做</DropdownItem>
                    <DropdownItem divided>拷贝</DropdownItem>
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