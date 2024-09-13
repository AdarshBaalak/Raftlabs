import React, { useState } from 'react';
import TaskForm from './Components/TaskForm';
import DisplayTask from './Components/DisplayTask';
import { Task } from './features';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: task.status === 'completed' ? 'in-progress' : 'completed' } : task));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <DisplayTask tasks={tasks} deleteTask={deleteTask} toggleTaskStatus={toggleTaskStatus} updateTask={updateTask}/>
    </div>
  );
};

export default App;
