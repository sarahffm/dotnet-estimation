import produce from "immer";
import create from "zustand";
import { ITask } from "../../../../../../app/Interfaces/ITask";

interface ISessionTaskState {
  tasks: ITask[];
  setCurrentTasks(payload: ITask[]): void;
  clearCurrentTasks: () => void;
  upsertTask: (task: ITask) => void;
  deleteTask: (id: String) => void;
}

export const useTaskStore = create<ISessionTaskState>()((set, get) => ({
  tasks: [],
  setCurrentTasks: (payload: ITask[]) =>
    set((state) => ({ ...state, tasks: payload })),
  clearCurrentTasks: () => set((state) => ({ ...state, tasks: [] })),
  upsertTask: (task: ITask) => {
    set(
      produce((draft: ISessionTaskState) => {
        console.log("Updating State");
        console.log(task);

        let taskGotUpserted = false;

        draft.tasks.forEach((item, index) => {
          if (task.id == item.id) {
            draft.tasks[index] = task;

            taskGotUpserted = true;
          }
        });

        if (taskGotUpserted == false) {
          draft.tasks.push(task);
        }
      })
    );
  },
  deleteTask: (id: String) => {
    set(
      produce((draft: ISessionTaskState) => {
        console.log(`Deleting Task ${id}`);

        const index = draft.tasks.findIndex(task => task.id == id);
        draft.tasks.splice(index, 1);

        console.log(draft.tasks);
      })
    );
  },
  sort: () => {
    set(
      produce((draft: ISessionTaskState) => {
        draft.tasks.sort((a, b) => {
          if (a.status == b.status) return 0;

          if (a.status < b.status) {
            return -1;
          }

          return 1;
        });
      })
    );
  },
}));
