import { useState, useEffect } from "react";
import { List } from "../List/List";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const API_URL = "http://localhost:4200/notes"; // JSON-сервер

const userSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  age: z
    .number()
    .min(18, { message: "Age must be at least 18" })
    .max(100, { message: "Age must be at most 100" }),
  email: z.string().email({ message: "This is not a valid email" }),
});

export type UserSchema = z.infer<typeof userSchema>;

export interface User extends UserSchema {
  id: number;
}

export function Form() {
  const [users, setUsers] = useState<User[]>([]); //use state to store array

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      age: 0,
      email: "",
    },
  });

  // GET /users with first uploaddate
  useEffect(() => {
    axios.get<User[]>(API_URL)
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  // POST /users -- adding a new user in DB
  const onSubmit: SubmitHandler<UserSchema> = (data) => {
    axios.post<User>(API_URL, data)
      .then(res => {
        setUsers(prev => [...prev, res.data]);
        reset();
      })
      .catch(err => console.error("Error adding user:", err));
  };

  // DELETE /users/:id
  const deleteUser = (id: number) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(prev => prev.filter(user => user.id !== id));
      })
      .catch(err => console.error("Error deleting user:", err));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="name">
            User name:
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Input your name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="age">
            User age:
          </label>
          <input
            {...register("age", { valueAsNumber: true })} 
            type="number"
            id="age"
            placeholder="age"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="email">
            User email:
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="email"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Submit
        </button>

        <button
          type="reset"
          onClick={() => reset()}
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Очистити
        </button>
      </form>

      <List users={users} deleteUser={deleteUser} />
    </>
  );
}
