import { range } from "ramda";
import { useMemo } from "react";

import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import * as Task from "./models/task";

export default function App() {
  const tasks = useMemo(
    () =>
      range(0, 3).map((_) => ({
        ...Task.getDefaultData(),
        title: "腹筋ローラー",
        category: "筋トレ",
      })),
    []
  );

  return (
    <div className="h-screen bg-white">
      <div className="max-w-screen-lg mx-auto py-5">
        <div className="space-y-3">
          <TaskForm onSubmit={(values) => console.log(values)} />
          <div className="space-y-1.5">
            {tasks.map((task, index) =>
              index === 0 ? (
                <TaskItem task={task} />
              ) : (
                <>
                  <hr />
                  <TaskItem task={task} />
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
