import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])

  const handleAddTask = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task, completed: false }])
      setTask('')
    }
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #ff4e50, #f9d423)',
      padding: '30px 15px'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 col-xl-5">

            {/* Header */}
            <div className="text-center mb-4 text-white">
              <div className="mb-3">
                <Check size={36} />
              </div>
              <h1 className="fw-bold">My Tasks</h1>
              <p className="text-white-50">Track and finish them off 🔥</p>
            </div>

            {/* Input Section */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body d-flex p-3">
                <input
                  type="text"
                  className="form-control me-2"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Add a new task..."
                  style={{
                    border: '1px solid #dc3545',
                    borderRadius: '12px',
                    color: '#dc3545'
                  }}
                />
                <button
                  className="btn"
                  disabled={!task.trim()}
                  onClick={handleAddTask}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '8px 12px'
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Todo List */}
            {todos.length === 0 ? (
              <div className="text-center text-white-50 py-5">
                <Check size={48} color="rgba(255,255,255,0.3)" />
                <p className="mt-3 h5">No tasks yet</p>
                <p className="small">Add one to get started!</p>
              </div>
            ) : (
              <div>
                {todos.map((todo, i) => (
                  <div
                    key={todo.id}
                    className="card mb-3"
                    style={{
                      borderRadius: '12px',
                      border: '1px solid #f1f1f1',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      backgroundColor: 'white',
                      opacity: todo.completed ? 0.65 : 1,
                      animation: `fadeIn 0.3s ease-out ${i * 0.05}s forwards`,
                      transform: 'translateY(10px)'
                    }}
                  >
                    <div className="card-body py-3 d-flex align-items-center">
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        className="btn btn-sm me-3"
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          border: `2px solid ${todo.completed ? '#dc3545' : '#ccc'}`,
                          backgroundColor: todo.completed ? '#dc3545' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {todo.completed && <Check size={16} color="white" />}
                      </button>
                      <span className={`flex-grow-1 ${todo.completed ? 'text-decoration-line-through text-muted' : 'text-dark'}`}>
                        {todo.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stats */}
            {totalCount > 0 && (
              <div className="card mt-4 mb-2">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-1 text-muted small">
                    <span>Completed</span>
                    <span>{completedCount}/{totalCount}</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-danger"
                      style={{
                        width: `${(completedCount / totalCount) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-white-50 mt-4">
              <small>Built by Karan Lamba</small>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-control::placeholder {
          color: #999 !important;
        }

        .form-control:focus {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 0.2rem rgba(220,53,69,0.25) !important;
          color: #dc3545 !important;
        }
      `}</style>
    </div>
  )
}

export default App