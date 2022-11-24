import axios from "axios";
import { FunctionComponent } from "react";
import { baseUrl, serviceUrl } from "../../../../../Constants/url";
import { useTaskStore } from "../Stores/TaskStore";

export const TaskCard: FunctionComponent<{
  id: String;
  title: String;
  url?: String;
  description?: String;
  isActive: boolean;
}> = ({ id, title, url, description, isActive }) => {
  const buildBorderColor = (isActive: boolean) => {
    return isActive ? " border-l-blue-400" : " border-l-blue-gray-400";
  };

  const { deleteTask } = useTaskStore();

  const submitDeleteTaskToRestApi = async () => {
    console.log(`Task (${id}) delete button pressed.`);

    // TODO: insert sessionId
    const url = baseUrl + serviceUrl + "1/task/" + id;

    const result = await axios.delete(url);

    deleteTask(id);
  }

  return (
    <>
      <div
        className={
          "flex flex-col border-l-4 m-2 p-4 bg-white rounded" +
          buildBorderColor(isActive)
        }
        onClick={() => {
          console.log("Marking task with id: " + id + " as active");
        }}
      >
        <div className="flex flex-row justify-between py-2">
          <strong>{title}</strong>
          <p>{url}</p>
          <button
            onClick={submitDeleteTaskToRestApi}
            className={
              "border-b-blue-700 bg-red-500 hover:bg-red-700 text-white font-bold m-2 p-1 rounded "
            }
          >
            Delete
          </button>
        </div>
        <hr />
        <p className="pt-2">{description}</p>
      </div>
    </>
  );
};
