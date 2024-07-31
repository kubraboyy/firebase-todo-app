"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('incomplete');
  const [todos, setTodos] = useState<{ task: string, date: Date }[]>([]);
  const [completedTodos, setCompletedTodos] = useState<{ task: string, date: Date }[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.push('/register');
    } catch (error) {
      console.error('Sign out error:', error);
      setLoading(false);
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTask = { task: newTodo, date: new Date()};
      if (editIndex !== null) {
        const updatedTodos = todos.map((todo, index) => (index === editIndex ? newTask : todo));
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, newTask]);
      }
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleDeleteCompletedTodo = (index: number) => {
    const newCompletedTodos = completedTodos.filter((_, i) => i !== index);
    setCompletedTodos(newCompletedTodos);
  };

  const handleEditTodo = (index: number) => {
    setNewTodo(todos[index].task);
    setEditIndex(index);
  };

  const handleCompleteTodo = (index: number) => {
    const completedTask = todos[index];
    setCompletedTodos([...completedTodos, completedTask]);
    handleDeleteTodo(index);
  };
  
  const filteredTodos = todos.filter(todo => todo.task.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredCompletedTodos = completedTodos.filter(todo => todo.task.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center"><h1 className="text-center">Hi!</h1>
          </h1>
          <p className="text-center">Welcome to the app!</p>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">To Do App</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className={`nav-link ${activeTab === 'incomplete' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('incomplete')}>Incomplete</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('completed')}>Completed</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
            />
            <button className="btn btn-primary" onClick={handleAddTodo}>
              {editIndex !== null ? 'Update' : 'Add'}
            </button>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks"
            />
          </div>
          {activeTab === 'incomplete' ? (
            <div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Task</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos.sort((a, b) => b.date.getTime() - a.date.getTime()).map((todo, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{todo.task}</td>
                      <td>
                        <button className="btn btn-success btn-sm" onClick={() => handleCompleteTodo(index)}><i className="bi bi-check2-square"></i></button>
                        <button className="btn btn-primary btn-sm mx-2" onClick={() => handleEditTodo(index)}><i className="bi bi-pencil"></i></button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTodo(index)}><i className="bi bi-trash3"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Completed Task</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompletedTodos.sort((a, b) => b.date.getTime() - a.date.getTime()).map((todo, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{todo.task}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCompletedTodo(index)}>Sil</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
           <button className="btn btn-danger w-100" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;