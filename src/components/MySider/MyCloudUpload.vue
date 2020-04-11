<template>
    <Layout style="background-color: #808695">
        <Row>
            <Col span="24">
                <Card style="border-radius: 0px">
                    <p slot="title">上传与导入</p>
                    <p style="height:24px;padding-left:4px;color:white">My first notebook</p>
                </Card>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 30.4px">
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="primary" style="border-radius: 4px; margin: 0 20px 0 20px; width: 160px">上传文件到Notebook...</Button>
                </Upload>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 30.4px">
                <Button type="primary" style="border-radius: 4px; margin: 0 20px 0 20px; width: 160px">从网盘导入Notebook...</Button>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 30.4px">
                <Button type="primary" style="border-radius: 4px; margin: 0 20px 0 20px; width: 160px">从GitHub导入到Notebook...</Button>
            </Col>
        </Row>
    </Layout>
</template>