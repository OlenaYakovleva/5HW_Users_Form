import { useState } from "react";
import { List } from "../List/List";

export interface User {
  name: string;
  id?: number;
  age: number;
  email: string;
}

const initialstate = () => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export function Form() {
  const [userForm, setUserForm] = useState<User>({ //userState hook saves the information about the user
    name: "",
    age: 0,
    email: "",
  });

  const [users, setUsers] = useState<User[]>(initialstate());


  // Function to add a new user, after user submitted the form
  const addUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser: User = {
      ...userForm,
      id: Date.now(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUserForm({ name: "", age: 0, email: "" });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const deleteUser = (id: number): void => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserForm({
      ...userForm,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  return (
    <>
      <form
        onSubmit={addUser}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="name">
            User name:
          </label>
          <input
            value={userForm.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Input your name"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="age">
            User age:
          </label>
          <input
            value={userForm.age}
            onChange={handleChange}
            type="number"
            id="age"
            name="age"
            placeholder="age"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="email">
            User email:
          </label>
          <input
            value={userForm.email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add user
        </button>
      </form>

      <List users={users} deleteUser={deleteUser} />
    </>
  );
}
