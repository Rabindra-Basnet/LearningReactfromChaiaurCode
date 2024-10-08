// import "./App.css";
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoLists from "./components/TodoLists";
import { TodoProvider } from "./contexts";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.forEach((prevTodo) => {
        prevTodo.id === id ? todo : prevTodo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todovalue) =>
        todovalue.id === id
          ? { ...todovalue, complete: !todovalue.complete }
          : todovalue
      )
    );
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todo"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });
  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }} //  value is in object form
    >
      <section className="w-full bg-[#172842] min-h-screen">
        <div className="py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Tasks
            </h1>
            <div className="mb-4">
              {/* Forms */}
              <TodoForm />
            </div>
            <div>
              {/* todolists */}
              {todos.map((todo) => (
                <div key={todo.id} className="flex flex-wrap gap-y-3">
                  <TodoLists todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </TodoProvider>
  );
}

export default App;
