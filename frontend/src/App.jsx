import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const API_URL = 'https://Jameryxxs.pythonanywhere.com/api/tasks/'

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!title) return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, is_completed: false }),
      })

      if (response.ok) {
        setTitle('')
        fetchTasks()
      }
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}${task.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, is_completed: !task.is_completed }),
      })

      if (response.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error('Error toggling task:', error)
    }
  }

  const deleteCompleted = async () => {
    try {
      const response = await fetch(`${API_URL}clear-completed/`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error('Error clearing tasks:', error)
    }
  }

  const activeTasks = tasks.filter(t => !t.is_completed)
  const completedTasks = tasks.filter(t => t.is_completed)

  return (
    <div className="container">
      <h1 className="header">Task Management</h1>
      
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Enter your task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="add-btn">Add</button>
      </form>

      <div className="section">
        <h2>Your Tasks</h2>
        {activeTasks.length > 0 ? (
          <ul className="task-list">
            {activeTasks.map((task) => (
              <li key={task.id} onClick={() => toggleTask(task)} className="task-item">
                <span className="bullet">○</span> {task.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-msg">No active tasks yet</p>
        )}
      </div>

      <div className="section completed-section">
        <div className="section-header">
          <h2>Completed Tasks</h2>
          {completedTasks.length > 0 && (
            <button onClick={deleteCompleted} className="delete-btn">
              Delete All Completed Task
            </button>
          )}
        </div>
        
        {completedTasks.length > 0 ? (
          <ul className="task-list">
            {completedTasks.map((task) => (
              <li key={task.id} onClick={() => toggleTask(task)} className="task-item completed">
                <span className="bullet">✓</span> {task.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-msg">No completed tasks yet</p>
        )}
      </div>
    </div>
  )
}

export default App
