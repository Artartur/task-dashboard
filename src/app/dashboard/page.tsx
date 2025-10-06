'use client';

import { useState } from "react";
import { useGlobal } from "@/hooks/useGlobal";

import Column from "@/components/ui/Column";
import TaskModal from "@/components/ui/modals/TaskModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Status } from "@/validators/taskSchema";

export default function Dashboard() {
  const { actions, state } = useGlobal();
  const {
    setSelectedTask,
    setShowEditTaskModal,
    setShowCreateTaskModal,
  } = actions;

  const {
    showCreateTaskModal,
  } = state;

  const [filters, setFilters] = useState({
    PENDING: '',
    IN_PROGRESS: '',
    COMPLETED: '',
    CANCELED: ''
  });

  const [priorityFilters, setPriorityFilters] = useState({
    PENDING: '',
    IN_PROGRESS: '',
    COMPLETED: '',
    CANCELED: ''
  });

  const [sortFilters, setSortFilters] = useState({
    PENDING: '',
    IN_PROGRESS: '',
    COMPLETED: '',
    CANCELED: ''
  });

  const columns = [
    {
      bgColorOnDrag: 'bg-yellow-500',
      emptyMessage: 'No pending tasks',
      status: Status.PENDING,
      title: 'Pending',
    },
    {
      bgColorOnDrag: 'bg-blue-500',
      emptyMessage: 'No tasks in progress',
      status: Status.IN_PROGRESS,
      title: 'In Progress',
    },
    {
      bgColorOnDrag: 'bg-green-500',
      emptyMessage: 'No tasks completed',
      status: Status.COMPLETED,
      title: 'Completed',
    },
    {
      bgColorOnDrag: 'bg-red-500',
      emptyMessage: 'No tasks canceled',
      status: Status.CANCELED,
      title: 'Canceled',
    }
  ];

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowEditTaskModal(false);
    setShowCreateTaskModal(true);
  };

  return (
    <ProtectedRoute>
      <div className="col items-start h-screen xl:flex xl:w-screen xl:items-center xl:pb-10">
        <div className="col items-start justify-start space-y-4 px-6 first:mt-6">
          <button
            type="button"
            className="w-32 p-2 bg-blue-600 text-white rounded-md"
            onClick={handleCreateTask}
          >
            Create task
          </button>
          <div className="row gap-4">
            {columns.map((column) => (
              <Column
                bgColorOnDrag={column.bgColorOnDrag}
                emptyMessage={column.emptyMessage}
                filter={filters[column.status]}
                key={column.status}
                onFilterChange={(value) => setFilters({ ...filters, [column.status]: value })}
                onPriorityFilterChange={(value) => setPriorityFilters({ ...priorityFilters, [column.status]: value })}
                onSortFilterChange={(value) => setSortFilters({ ...sortFilters, [column.status]: value })}
                priorityFilter={priorityFilters[column.status]}
                sortFilter={sortFilters[column.status]}
                status={column.status}
                title={column.title}
              />
            ))}
          </div>
        </div>
      </div>

      {showCreateTaskModal && (
        <TaskModal />
      )}
    </ProtectedRoute>
  )
}
