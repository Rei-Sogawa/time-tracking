import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

export default function App() {
  return (
    <div className="h-screen bg-white">
      <div className="max-w-screen-md mx-auto py-5">
        <div className="space-y-3">
          <TaskForm onSubmit={(values) => console.log(values)} />
          <TaskItem></TaskItem>
          <TaskItem></TaskItem>
        </div>
      </div>
    </div>
  );
}
