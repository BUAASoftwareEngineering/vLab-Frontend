<template>
    <Layout style="background-color: #808695">
        <Row>
            <Col span="24">
                <Card style="border-radius: 0vh">
                    <p slot="title">Notebook设置</p>
                    <p style="height:2.4vh;padding-left:0.4vh;color:white">My first notebook</p>
                </Card>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 3.04vh">
                    <Button type="primary" style="border-radius: 0.4vh; margin: 0 3vh 0 3vh; width: 25vh; height: 4vh">更改Kernel...</Button>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 3.04vh">
                <Button type="primary" style="border-radius: 0.4vh; margin: 0 3vh 0 3vh; width: 25vh; height: 4vh">自动同步设置...</Button>
            </Col>
        </Row>
        <br>
        <Row>
            <Col :span="24" style="margin: 0 auto; height: 3.04vh">
                <Button type="primary" style="border-radius: 0.4vh; margin: 0 3vh 0 3vh; width: 25vh; height: 4vh">共享Notebook...</Button>
            </Col>
        </Row>
    </Layout>
</template>