import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import FormInput from "../components/FormInput"; // Make sure to adjust the import path if necessary
import { Form, useActionData } from "react-router-dom";
import { useEffect } from "react";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let age = formData.get("age");
  let familyName = formData.get("familyName");
  let email = formData.get("email");
  let completed = formData.get("completed");

  return { title, age, familyName, email, completed };
};

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data: todos } = useCollection("todos", ["uid", "==", user.uid]);
  const userData = useActionData();

  useEffect(() => {
    if (userData) {
      const newDoc = {
        ...userData,
        uid: user.uid,
      };
      addDoc(collection(db, "todos"), newDoc).then(() => {
        toast.success("Successfully Added");
      });
    }
  }, [userData]);

  const deleteDocument = (id) => {
    deleteDoc(doc(db, "todos", id)).then(() => {
      toast.success("Deleted");
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

            <div className="w-full  pl-3">
              <button className="btn btn-active font-bold rounded mt-8 w-80 ">
                Add
              </button>
            </div>
          </Form>
        </div>
        <div>
          {todos &&
            todos.map((todo) => (
              <div
                className="flex gap-4 items-center  justify-between p-5 shadow-xl"
                key={todo.id}
              >
                <div>
                  <h3 className="text-3xl">{todo.title}</h3>
                  <p className="text-xl">
                    {" "}
                    <span className="text-slate-600"> Age:</span> {todo.age}
                  </p>
                  <p className="text-xl">
                    <span className="text-slate-600"> Family Name:</span>{" "}
                    {todo.familyName}
                  </p>
                  <p className="text-xl">
                    <span className="text-slate-600"> Email:</span> {todo.email}
                  </p>
                </div>
                <button
                  onClick={() => deleteDocument(todo.id)}
                  className="btn btn-primary btn-sm"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
