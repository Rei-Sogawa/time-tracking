import classNames from "classnames";
import { useCollectionData } from "react-firebase-hooks/firestore";

import TaskForm, { FormValues } from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import { db } from "./firebaseApp";
import * as Task from "./models/task";

export default function App() {
  const [tasks] = useCollectionData<Task.Data, "id", "ref">(
    db.collection("tasks").orderBy("createdAt", "desc"),
    {
      transform: Task.fromFirestore,
      snapshotOptions: { serverTimestamps: "estimate" },
      idField: "id",
      refField: "ref",
    }
  );

  const onSubmit = (values: FormValues) => {
    const { title, category, estimatedMinutes } = values;
    const newTask: Task.FirestoreData = {
      ...Task.getDefaultFirestoreData(),
      title,
      category,
      estimatedMinutes,
    };
    db.collection("tasks").add(newTask);
  };

  return (
    <div className="h-screen bg-white">
      <div className="max-w-screen-lg mx-auto py-5">
        <div className="space-y-3">
          <TaskForm onSubmit={onSubmit} />
          <ul className="divide-y divide-gray-200">
            {tasks
              ?.filter((task) => !Task.isComplete(task))
              .map((task, idx) => (
                <li
                  key={task.id}
                  className={classNames(
                    "py-4",
                    { "bg-white": idx % 2 },
                    { "bg-gray-50": !(idx % 2) }
                  )}
                >
                  <TaskItem task={task} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
