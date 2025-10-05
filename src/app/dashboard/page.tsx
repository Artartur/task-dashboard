'use client';

import { useEffect, useState } from "react";
import { useGlobal } from "@/hooks/useGlobal";

import TaskModal from "@/components/ui/modals/TaskModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ITask } from "@/interfaces/task.types";
import { Status } from "@/validators/taskSchema";

export default function Dashboard() {
  const { state, actions } = useGlobal();
  const {
    deleteTask,
    updateTask,
    setDraggedTask,
    setDragOverColumn,
    setSelectedTask,
    setShowEditTaskModal,
    setShowCreateTaskModal,
  } = actions;

  const {
    dragOverColumn,
    draggedTask,
    showCreateTaskModal,
    tasks
  } = state;

  const isClient = typeof window !== 'undefined';
  const [filters, setFilters] = useState({
    PENDING: '',
    IN_PROGRESS: '',
    COMPLETED: '',
    CANCELED: ''
  });

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

  const handleDragStart = (e: React.DragEvent, task: ITask) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnStatus: Status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnStatus);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: Status) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      updateTask(draggedTask.id as string, { ...draggedTask, status: newStatus });
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
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
      <div className="col items-start h-screen xl:flex xl:w-screen xl:items-center xl:overflow-x-hidden xl:pb-10">
        <div className="col items-start justify-start space-y-4 px-6 first:mt-6">
          <button
            type="button"
            className="w-32 p-2 bg-blue-600 text-white rounded-md"
            onClick={handleCreateTask}
          >
            Create task
          </button>
          <div className="row gap-4">
            <div
              className={`w-[265px] min-h-36 p-4 space-y-4 text-white rounded-md shadow-lg transition-colors duration-200
                ${dragOverColumn === 'PENDING'
                  ? 'bg-yellow-500'
                  : 'bg-gray-500'
                }`
              }
              onDragOver={(e) => handleDragOver(e, Status.PENDING)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, Status.PENDING)}
            >
              <div className="col border-b border-gray-400 pb-2">
                <h3>
                  Pending
                </h3>
                <div className="col space-y-1">
                  <span className="text-sm text-gray-200">Filters: </span>
                  <div className="col space-y-1">
                    <input
                      placeholder="Filter by title"
                      className="border border-gray-400 rounded-sm p-1 w-2/2 outline-0"
                      value={filters.PENDING}
                      onChange={(e) => setFilters({ ...filters, PENDING: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {tasks
                .filter((task) => task.status === 'PENDING')
                .filter((task) => task.title.toLowerCase().includes(filters.PENDING.toLowerCase()))
                .length > 0 ? (
                tasks
                  .filter((task) => task.status === 'PENDING')
                  .filter((task) => task.title.toLowerCase().includes(filters.PENDING.toLowerCase()))
                  .map((task) => (
                    <div
                      key={task.id}
                      className="col items-center justify-center space-y-4"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="col border rounded-md w-full p-2.5 bg-gray-600 space-y-4 min-h-16 break-all overflow-hidden cursor-move">
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
                        <div className="flex-between">
                          <span>Created</span>
                          <span>
                            {task.createdBy?.toLocaleDateString('pt-Br', {
                              day: "numeric",
                              month: 'numeric'
                            })}
                            {" "}
                            -
                            {" "}
                            {task.createdBy?.toLocaleTimeString('pt-Br', {
                              hour: "2-digit",
                              minute: '2-digit'
                            })}
                          </span>
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

            <div
              className={`w-[265px] min-h-36 p-4 space-y-4 text-white rounded-md shadow-lg transition-colors duration-200
                ${dragOverColumn === 'IN_PROGRESS'
                  ? 'bg-blue-500'
                  : 'bg-gray-500'
                }`
              }
              onDragOver={(e) => handleDragOver(e, Status.IN_PROGRESS)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, Status.IN_PROGRESS)}
            >
              <div className="col border-b border-gray-400 pb-2">
                <h3>
                  In Progress
                </h3>
                <div className="col space-y-1">
                  <span className="text-sm text-gray-200">Filters: </span>
                  <div className="col space-y-1">
                    <input
                      placeholder="Filter by title"
                      className="border border-gray-400 rounded-sm p-1 w-2/2 outline-0"
                      value={filters.IN_PROGRESS}
                      onChange={(e) => setFilters({ ...filters, IN_PROGRESS: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {tasks
                .filter((task) => task.status === 'IN_PROGRESS')
                .filter((task) => task.title.toLowerCase().includes(filters.IN_PROGRESS.toLowerCase()))
                .length > 0 ? (
                tasks
                  .filter((task) => task.status === 'IN_PROGRESS')
                  .filter((task) => task.title.toLowerCase().includes(filters.IN_PROGRESS.toLowerCase()))
                  .map((task) => (
                    <div
                      key={task.id}
                      className="col items-center justify-center space-y-4"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="col border rounded-md w-full p-2.5 bg-gray-600 space-y-4 min-h-16 break-all overflow-hidden cursor-move">
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
                        <div className="flex-between">
                          <span>Created</span>
                          <span>
                            {task.createdBy?.toLocaleDateString('pt-Br', {
                              day: "numeric",
                              month: 'numeric'
                            })}
                            {" "}
                            -
                            {" "}
                            {task.createdBy?.toLocaleTimeString('pt-Br', {
                              hour: "2-digit",
                              minute: '2-digit'
                            })}
                          </span>
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

            <div
              className={`w-[265px] min-h-36 p-4 space-y-4 text-white rounded-md shadow-lg transition-colors duration-200
                ${dragOverColumn === 'COMPLETED'
                  ? 'bg-green-500'
                  : 'bg-gray-500'
                }`
              }
              onDragOver={(e) => handleDragOver(e, Status.COMPLETED)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, Status.COMPLETED)}
            >
              <div className="col border-b border-gray-400 pb-2">
                <h3>
                  Completed
                </h3>
                <div className="col space-y-1">
                  <span className="text-sm text-gray-200">Filters: </span>
                  <div className="col space-y-1">
                    <input
                      placeholder="Filter by title"
                      className="border border-gray-400 rounded-sm p-1 w-2/2 outline-0"
                      value={filters.COMPLETED}
                      onChange={(e) => setFilters({ ...filters, COMPLETED: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {tasks
                .filter((task) => task.status === 'COMPLETED')
                .filter((task) => task.title.toLowerCase().includes(filters.COMPLETED.toLowerCase()))
                .length > 0 ? (
                tasks
                  .filter((task) => task.status === 'COMPLETED')
                  .filter((task) => task.title.toLowerCase().includes(filters.COMPLETED.toLowerCase()))
                  .map((task) => (
                    <div
                      key={task.id}
                      className="col items-center justify-center space-y-4"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="col border rounded-md w-full p-2.5 bg-gray-600 space-y-4 min-h-16 break-all overflow-hidden cursor-move">
                        <div className="flex-between space-x-2 w-full *:cursor-pointer">
                          <span>{task.title}</span>
                          <div className="row">
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
                        <div className="flex-between">
                          <span>Created</span>
                          <span>
                            {task.createdBy?.toLocaleDateString('pt-Br', {
                              day: "numeric",
                              month: 'numeric'
                            })}
                            {" "}
                            -
                            {" "}
                            {task.createdBy?.toLocaleTimeString('pt-Br', {
                              hour: "2-digit",
                              minute: '2-digit'
                            })}
                          </span>
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

            <div
              className={`w-[265px] min-h-36 p-4 space-y-4 text-white rounded-md shadow-lg transition-colors duration-200
                ${dragOverColumn === 'CANCELED'
                  ? 'bg-red-500'
                  : 'bg-gray-500'
                }`
              }
              onDragOver={(e) => handleDragOver(e, Status.CANCELED)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, Status.CANCELED)}
            >
              <div className="col border-b border-gray-400 pb-2">
                <h3>
                  Canceled
                </h3>
                <div className="col space-y-1">
                  <span className="text-sm text-gray-200">Filters: </span>
                  <div className="col space-y-1">
                    <input
                      placeholder="Filter by title"
                      className="border border-gray-400 rounded-sm p-1 w-2/2 outline-0"
                      value={filters.CANCELED}
                      onChange={(e) => setFilters({ ...filters, CANCELED: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {tasks
                .filter((task) => task.status === 'CANCELED')
                .filter((task) => task.title.toLowerCase().includes(filters.CANCELED.toLowerCase()))
                .length > 0 ? (
                tasks
                  .filter((task) => task.status === 'CANCELED')
                  .filter((task) => task.title.toLowerCase().includes(filters.CANCELED.toLowerCase()))
                  .map((task) => (
                    <div
                      key={task.id}
                      className="col items-center justify-center space-y-4"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="col border rounded-md w-full p-2.5 bg-gray-600 space-y-4 min-h-16 break-all overflow-hidden cursor-move">
                        <div className="flex-between space-x-2 w-full *:cursor-pointer">
                          <span>{task.title}</span>
                          <div className="row">
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
                        <div className="flex-between">
                          <span>Created</span>
                          <span>
                            {task.createdBy?.toLocaleDateString('pt-Br', {
                              day: "numeric",
                              month: 'numeric'
                            })}
                            {" "}
                            -
                            {" "}
                            {task.createdBy?.toLocaleTimeString('pt-Br', {
                              hour: "2-digit",
                              minute: '2-digit'
                            })}
                          </span>
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
