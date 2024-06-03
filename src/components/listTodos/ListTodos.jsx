import React from "react";

const ListTodos = () => {
  const today = new Date();
  const todos = [
    {
      id: 1,
      description: "Learn AWS",
      done: false,
      targetDate: new Date(
        today.getFullYear() + 12,
        today.getMonth() + 1,
        today.getDay()
      ),
    },
    {
      id: 2,
      description: "Learn DSA",
      done: false,
      targetDate: new Date(
        today.getFullYear() + 12,
        today.getMonth() + 1,
        today.getDay()
      ),
    },
    {
      id: 3,
      description: "Learn Backend",
      done: false,
      targetDate: new Date(
        today.getFullYear() + 12,
        today.getMonth() + 1,
        today.getDay()
      ),
    },
  ];
  return (
    <div className="container">
      <h1>Things you want to do!</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Description</td>
              <td>Is Done?</td>
              <td>targetDate</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodos;
