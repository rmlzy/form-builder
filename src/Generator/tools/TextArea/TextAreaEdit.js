import React from "react";
import { Drawer, Form, Button, Input, Switch, InputNumber, Row, Col } from "antd";
import { TextEditor } from "../../components";

export default ({ option, visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    onOk(values);
  };
  return (
    <Drawer width="40%" title="文本域配置" visible={visible} onClose={onCancel}>
      <Form form={form} initialValues={option} layout="vertical" onFinish={onFinish}>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="标题：" name="label" rules={[{ required: true, message: "必填项" }]}>
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="字段名称：" name="name" rules={[{ required: true, message: "必填项" }]}>
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="是否必填：" name="required" valuePropName="checked">
              <Switch checkedChildren="是" unCheckedChildren="否" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="行：" name="rows">
              <InputNumber style={{ width: "100%" }} min={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="占位内容：" name="placeholder">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="最大长度：" name="maxLength">
              <InputNumber style={{ width: "100%" }} min={1} placeholder="留空代表不限制" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="额外信息：" name="extra">
          <TextEditor />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => form.submit()}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
