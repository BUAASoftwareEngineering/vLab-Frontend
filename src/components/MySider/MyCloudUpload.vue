<template>
    <Layout style="background-color: #808695">
        <Row>
            <Col span="24">
                <Card style="border-radius: 0vh">
                    <p slot="title">上传与导入</p>
                    <p style="height:2.4vh;padding-left:0.4vh;color:white">My first notebook</p>
                </Card>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 3.04vh">
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="primary" style="border-radius: 0.4vh; margin: 0 3vh 0 3vh; width: 20vh; height: 4vh">上传文件到Notebook...</Button>
                </Upload>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 3.04vh">
                <Button type="primary" style="border-radius: 0.4vh; margin: 0 3vh 0 3vh; width: 20vh; height: 4vh">从网盘导入Notebook...</Button>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 3.04vh">
                <Button type="primary" style="border-radius: 0.4vh; margin: 0 3vh 0 3vh; width: 20vh; height: 4vh">从GitHub导入到Notebook...</Button>
            </Col>
        </Row>
    </Layout>
</template>