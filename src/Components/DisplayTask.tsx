import React ,{useState} from 'react';
import { Table, Tag, Button, Input, Modal, DatePicker, Select} from 'antd';
import { Task } from '../features';
import moment, {Moment} from 'moment';

const {Option}=Select;

interface Props {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleTaskStatus: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
}

const DisplayTable: React.FC<Props> = ({ tasks, deleteTask, toggleTaskStatus , updateTask}) => {
   
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [newTitle, setNewTitle] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [newDueDate, setNewDueDate] = useState<Moment | null>(null);
    const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('low');

  
    

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate',
         render: (date: Date) => moment(date).format('DD-MM-YYYY') },

    { title: 'Priority', dataIndex: 'priority', key: 'priority',
         render: (priority: string) => <Tag color={priority === 'high' ? 
            'red' : priority === 'medium' ? 'orange' : 'green'}>
                {priority.toUpperCase()}</Tag> },

    { title: 'Status', dataIndex: 'status', key: 'status', 
         render: (status: string)=> <Tag color={status === 'completed' ?
          'green' : 'blue'}>{status.toUpperCase()}</Tag> },

    {
       title:(  
             <div style={{  marginLeft:'100px' }}>
              Action
             </div>),
             dataIndex: 'action', key: 'action', 
             render: (_: any, record: Task) => (
        <div>
             <Button onClick={() => showEditModal(record)} style={{ marginRight: '10px' }}>
            Edit
          </Button>

          <Button onClick={() => toggleTaskStatus(record.id)}>
            {record.status === 'completed' ? 'Mark In-Progress' :
             'Mark Completed'}</Button>



          <Button onClick={() => deleteTask(record.id)} 
          style={{ marginLeft: '10px' }}>Delete</Button>
        </div>
      ),
    },
  ];

  const showEditModal = (task: Task) => {
    setCurrentTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewDueDate(task.dueDate ? moment(task.dueDate) : null);
    setNewPriority(task.priority);
    setIsEditing(true);
  };

  const handleUpdateTask = () => {
    if (currentTask) {
      updateTask({
        ...currentTask,
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate ? newDueDate.toDate() : currentTask.dueDate,
        priority: newPriority,
      });
      setIsEditing(false);
      setCurrentTask(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleDateChange = (date: Moment | null) => {
    setNewDueDate(date);
  };

  return (
    <>
      <Table dataSource={tasks} columns={columns} rowKey="id" />

      {currentTask && (
        <Modal
          title="Edit Task"
          visible={isEditing}
          onOk={handleUpdateTask}
          onCancel={handleCancelEdit}
        >
          <Input
            placeholder="Title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            style={{ marginTop: '10px' }}
          />
          <DatePicker
            value={newDueDate}
            onChange={handleDateChange}
            style={{ marginTop: '10px', width: '100%' }}
            format="DD-MM-YYYY" 
          />
          <Select
            value={newPriority}
            onChange={(value: 'low'|'medium'|'high') => setNewPriority(value)}
            style={{ marginTop: '10px', width: '100%' }}
          >
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Modal>
      )}
    </>
    );
};

export default DisplayTable;