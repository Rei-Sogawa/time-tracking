import * as Task from '../models/task';
import ListGroup from '../basics/list-group';

type Props = {
  task: Task.Data;
};

const TaskItem = ({ task }: Props) => {
  return (
    <ListGroup.Item>
      <div className="flex items-center space-x-3">
        <input type="checkbox" className="form-checkbox" />
        <div>{task.description}</div>
      </div>
    </ListGroup.Item>
  );
};

export default TaskItem;
