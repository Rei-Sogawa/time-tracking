import { TrashIcon } from '@heroicons/react/outline';

import { IdAndRef, Task } from '../models';

const TaskItem = ({ task }: { task: Task.Data & IdAndRef }) => {
  const handleRemove = () => task.ref.delete();

  return (
    <div className="px-4 py-3 border border-gray-200 rounded-md bg-white">
      <div className="space-y-3">
        <div className="flex justify-between">
          <div>{task.description}</div>
          <div className="flex">
            <TrashIcon
              onClick={handleRemove}
              className="h-6 w-6 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
