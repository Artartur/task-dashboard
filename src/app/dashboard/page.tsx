'use client';

import { useEffect } from "react";
import { useGlobal } from "@/hooks/useGlobal";

import TaskModal from "@/components/ui/modals/TaskModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ITask } from "@/interfaces/task.types";

export default function Dashboard() {
  const { state, actions } = useGlobal();
  const {
    deleteTask,
    setSelectedTask,
    setShowEditTaskModal,
    setShowCreateTaskModal
  } = actions;

  const {
    showCreateTaskModal,
    tasks
  } = state;

  const isClient = typeof window !== 'undefined';

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowEditTaskModal(false);
    setShowCreateTaskModal(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleEditTask = (task: ITask) => {
    setSelectedTask(task);
    setShowEditTaskModal(true);
    setShowCreateTaskModal(true);
  };

  useEffect(() => {
    if (isClient) {
      document.body.style.overflow = showCreateTaskModal ? 'hidden' : 'unset';
    }

    return () => {
      if (isClient) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [showCreateTaskModal, isClient]);

  return (
    <ProtectedRoute>
      <div className="col items-start h-screen xl:flex xl:w-screen xl:items-center">
        <div className="col items-start justify-start space-y-4 px-6 first:mt-6">
          <button
            type="button"
            className="w-32 p-2 bg-blue-600 text-white rounded-md"
            onClick={handleCreateTask}
          >
            Create task
          </button>
          <div className="row gap-4">
            <div className="w-[265px] min-h-36 p-4 space-y-4 bg-gray-500 text-white rounded-md shadow-lg">
              <h3 className="border-b border-gray-400 pb-2">
                Pending
              </h3>
              {tasks.filter((task) => task.status === 'PENDING').length > 0 ? (
                tasks
                  .filter((task) => task.status === 'PENDING')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="col items-center justify-center space-y-4"
                    >
                      <div className="col border rounded-md w-full p-2.5 bg-gray-600 space-y-4 min-h-16 break-all overflow-hidden">
                        <div className="flex-between space-x-2 w-full *:cursor-pointer">
                          <span>{task.title}</span>
                          <div className="row">
                            <button
                              type="button"
                              onClick={() => handleEditTask(task)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="22" viewBox="0 0 640 640"><path fill="#ffffff" d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z" /></svg>
                              <span className="sr-only">Edit task</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.id as string)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 640"><path fill="#e01b24" d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" /></svg>
                              <span className="sr-only">Delete task</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex-between">
                          <span>Priority: </span>
                          <span className="capitalize">{task.priority.toLowerCase()}</span>
                        </div>
                        <div className="bg-gray-700 w-full border min-h-28 p-2 rounded-md break-all">
                          {task.description}
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-gray-400"></div>
                    </div>
                  ))
              ) : (
                <div className="text-center text-gray-300 py-8">
                  No pending tasks
                </div>
              )}
            </div>

            <div className="w-[265px] min-h-36 p-4 space-y-4 bg-gray-500 text-white rounded-md shadow-lg">
              <h3 className="border-b border-gray-400 pb-2">
                In Progress
              </h3>
              {tasks.filter((task) => task.status === 'IN_PROGRESS').length > 0 ? (
                tasks
                  .filter((task) => task.status === 'IN_PROGRESS')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="col items-center justify-center space-y-4"
                    >
                      <div className="col border rounded-md w-full p-2.5 bg-gray-600 space-y-4 min-h-16 break-all overflow-hidden">
                        <div className="flex-between space-x-2 w-full *:cursor-pointer">
                          <span>{task.title}</span>
                          <div className="row">
                            <button
                              type="button"
                              onClick={() => handleEditTask(task)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="22" viewBox="0 0 640 640"><path fill="#ffffff" d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z" /></svg>
                              <span className="sr-only">Edit task</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.id as string)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 640"><path fill="#e01b24" d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" /></svg>
                              <span className="sr-only">Delete task</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex-between">
                          <span>Priority: </span>
                          <span className="capitalize">{task.priority.toLowerCase()}</span>
                        </div>
                        <div className="bg-gray-700 w-full border min-h-28 p-2 rounded-md break-all">
                          {task.description}
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-gray-400"></div>
                    </div>
                  ))
              ) : (
                <div className="text-center text-gray-300 py-8">
                  No tasks in progress
                </div>
              )}
            </div>

            <div className="w-[265px] min-h-36 p-4 space-y-4 bg-gray-500 text-white rounded-md shadow-lg">
              <h3 className="border-b border-gray-400 pb-2">
                Completed
              </h3>
              {tasks.filter((task) => task.status === 'COMPLETED').length > 0 ? (
                tasks
                  .filter((task) => task.status === 'COMPLETED')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="col items-center justify-center space-y-4"
                    >
                      <div className="col border rounded-md w-full p-2.5 bg-gray-600 space-y-4 min-h-16 break-all overflow-hidden">
                        <div className="flex-between space-x-2 w-full *:cursor-pointer">
                          <span>{task.title}</span>
                          <div className="row">
                            <button
                              type="button"
                              onClick={() => handleEditTask(task)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="22" viewBox="0 0 640 640"><path fill="#ffffff" d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z" /></svg>
                              <span className="sr-only">Edit task</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.id as string)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 640"><path fill="#e01b24" d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" /></svg>
                              <span className="sr-only">Delete task</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex-between">
                          <span>Priority: </span>
                          <span className="capitalize">{task.priority.toLowerCase()}</span>
                        </div>
                        <div className="bg-gray-700 w-full border min-h-28 p-2 rounded-md break-all">
                          {task.description}
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-gray-400"></div>
                    </div>
                  ))
              ) : (
                <div className="text-center text-gray-300 py-8">
                  No tasks completed
                </div>
              )}
            </div>

            <div className="w-[265px] min-h-36 p-4 space-y-4 bg-gray-500 text-white rounded-md shadow-lg">
              <h3 className="border-b border-gray-400 pb-2">
                Canceled
              </h3>
              {tasks.filter((task) => task.status === 'CANCELED').length > 0 ? (
                tasks
                  .filter((task) => task.status === 'CANCELED')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="col items-center justify-center space-y-4"
                    >
                      <div className="col border rounded-md w-full p-2.5 bg-gray-600 space-y-4 min-h-16 break-all overflow-hidden">
                        <div className="flex-between space-x-2 w-full *:cursor-pointer">
                          <span>{task.title}</span>
                          <div className="row">
                            <button
                              type="button"
                              onClick={() => handleEditTask(task)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="22" viewBox="0 0 640 640"><path fill="#ffffff" d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z" /></svg>
                              <span className="sr-only">Edit task</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.id as string)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 640"><path fill="#e01b24" d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" /></svg>
                              <span className="sr-only">Delete task</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex-between">
                          <span>Priority: </span>
                          <span className="capitalize">{task.priority.toLowerCase()}</span>
                        </div>
                        <div className="bg-gray-700 w-full border min-h-28 p-2 rounded-md break-all">
                          {task.description}
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-gray-400"></div>
                    </div>
                  ))
              ) : (
                <div className="text-center text-gray-300 py-8">
                  No tasks canceled
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCreateTaskModal && (
        <TaskModal />
      )}
    </ProtectedRoute>
  )
}
