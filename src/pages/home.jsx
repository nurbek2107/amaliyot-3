import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import FormInput from "../components/FormInput"; // Make sure to adjust the import path if necessary
import { Form, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import "./home.css";
import EditModal from "../components/EditModal"; // Make sure to adjust the import path if necessary

export const action = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const age = formData.get("age");
  const familyName = formData.get("familyName");
  const email = formData.get("email");
  const completed = formData.get("completed");

  return { title, age, familyName, email, completed };
};

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data: todos } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createAt"]
  );
  const userData = useActionData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    if (userData) {
      const newDoc = {
        ...userData,
        uid: user.uid,
        createAt: serverTimestamp(),
      };
      addDoc(collection(db, "todos"), newDoc).then(() => {
        toast.success("Successfully Added");
      });
    }
  }, [userData, user.uid]);

  const deleteDocument = (id) => {
    deleteDoc(doc(db, "todos", id)).then(() => {
      toast.success("Deleted");
    });
  };

  const openModal = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const saveTodo = (updatedTodo) => {
    const todoDoc = doc(db, "todos", updatedTodo.id);
    updateDoc(todoDoc, updatedTodo).then(() => {
      toast.success("Todo Updated");
    });
  };

  return (
    <div className="site-container">
      <div className="grid grid-cols-2">
        <div className="pt-10">
          <Form
            method="post"
            className="flex flex-col items-center gap-4 card bg-base-100 w-96 shadow-xl p-5"
          >
            <h1 className="text-3xl font-semibold">Add new Todo</h1>
            <FormInput type="text" labelText="Title" name="title" />
            <FormInput type="text" labelText="Age" name="age" />
            <FormInput type="text" labelText="Family Name" name="familyName" />
            <FormInput type="email" labelText="Email" name="email" />
            <div className="w-full pl-3">
              <button className="btn btn-active font-bold rounded mt-8 w-80">
                Add
              </button>
            </div>
          </Form>
        </div>

        <div>
          <h1 className="text-center mt-10">List</h1>
          <div className="overflow-auto h-[500px] mt-5">
            {todos &&
              todos.reverse().map((todo) => (
                <div
                  className="flex gap-4 items-center justify-between p-5 shadow-xl"
                  key={todo.id}
                >
                  <div>
                    <h3 className="text-3xl">{todo.title}</h3>
                    <p className="text-xl">
                      <span className="text-slate-600">Age:</span> {todo.age}
                    </p>
                    <p className="text-xl">
                      <span className="text-slate-600">Family Name:</span>{" "}
                      {todo.familyName}
                    </p>
                    <p className="text-xl">
                      <span className="text-slate-600">Email:</span>{" "}
                      {todo.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => openModal(todo)}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDocument(todo.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveTodo}
        todo={selectedTodo}
      />
    </div>
  );
}

export default Home;
