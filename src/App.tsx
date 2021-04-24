import { useEffect } from "react";

import TaskItem from "./components/TaskItem";
import { db } from "./firebaseApp";
import { Task } from "./models";

export default function App() {
  return (
    <div className="h-screen bg-gray-100">
      <div className="container mx-auto py-5">
        <div className="space-y-3">
          <TaskItem></TaskItem>
          <TaskItem></TaskItem>
        </div>
      </div>
    </div>
  );
}
