import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(result => {
        const updatedTodos = todos.map(todo => {
          if (todo._id === id) {
            return { ...todo, done: true };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        const filteredTodos = todos.filter(todo => todo._id !== id);
        setTodos(filteredTodos);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='home'>
      <h2>To Do List</h2>
      <Create fetchData={fetchData} />
      {todos.length === 0 ? (
        <div><h2>No Record Found</h2></div>
      ) : (
        todos.map((todo, index) => (
          <div key={todo._id ? todo._id : index} className='task'>
            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
