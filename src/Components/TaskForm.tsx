import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { Task } from '../features';

interface Props {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<Props> = ({ addTask }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newTask: Task = {
      id: Date.now(), 
      title: values.title,
      description: values.description,
      dueDate: values.dueDate.toDate(),
      priority: values.priority,
      status: 'in-progress',
    };
    addTask(newTask);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="inline">
      <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
        <Input placeholder="Description" />
      </Form.Item>
      <Form.Item name="dueDate" rules={[{ required: true, message: 'Please select the due date!' }]}>
        <DatePicker format="DD-MM-YYYY" placeholder="Due Date" />
      </Form.Item>
      <Form.Item name="priority" rules={[{ required: true, message: 'Please select the priority!' }]}>
        <Select placeholder="Priority">
          <Select.Option value="low">Low</Select.Option>
          <Select.Option value="medium">Medium</Select.Option>
          <Select.Option value="high">High</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add Task</Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;