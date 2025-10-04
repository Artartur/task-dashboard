'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGlobal } from '@/hooks/useGlobal';
import { taskInitialValues } from '@/store/defaultValues/globalInitialValues';
import { taskSchema, Priority, Status } from '@/validators/taskSchema';

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskModal() {
  const { state, actions } = useGlobal();
  const {
    createTask,
    editTask,
    setSelectedTask,
    setShowEditTaskModal,
    setShowCreateTaskModal
  } = actions;

  const {
    selectedTask,
    showEditTaskModal,
  } = state;

  const isEditMode = selectedTask && showEditTaskModal;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: taskInitialValues,
  });

  const handleClose = () => {
    setShowCreateTaskModal(false);
    setShowEditTaskModal(false);
    setSelectedTask(null);
    reset(taskInitialValues);
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (isEditMode) {
        if (!selectedTask.id) return;
        editTask(selectedTask.id, data);
      } else {
        data.createdBy = new Date();
        createTask(data);
      }
      handleClose();
    } catch (error) {
      alert(`Error ${isEditMode ? 'editing' : 'creating'} task: ${error}`);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      reset({
        description: selectedTask.description,
        title: selectedTask.title,
        priority: selectedTask.priority,
        status: selectedTask.status
      });
    } else {
      reset(taskInitialValues);
    }
  }, [isEditMode, selectedTask, reset]);

  return (
    <div className="absolute flex items-center justify-center h-screen w-screen px-4 bg-black/50 top-0">
      <div className="col items-center pt-2 pb-4 px-6 min-h-96 space-y-4 w-full max-w-md bg-white rounded-md">
        <div className="row items-center justify-between mb-6 w-full">
          <h3 className="text-xl font-semibold text-gray-900">
            {isEditMode ? 'Edit Task' : 'Create Task'}
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => {
              setShowCreateTaskModal(false);
              setShowEditTaskModal(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            <span className="sr-only">
              Fechar Modal
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="col space-y-4 w-full *:space-y-2">
          <div className="col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <span className="text-sm text-red-600">{errors.title.message}</span>
            )}
          </div>

          <div className="col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              {...register('description')}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter task description"
            />
            {errors.description && (
              <span className="text-sm text-red-600">{errors.description.message}</span>
            )}
          </div>

          <div className="col">
            <label htmlFor="priority" className="text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              {...register('priority')}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.priority ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value={Priority.LOW}>Low</option>
              <option value={Priority.MEDIUM}>Medium</option>
              <option value={Priority.HIGH}>High</option>
            </select>
            {errors.priority && (
              <span className="text-sm text-red-600">{errors.priority.message}</span>
            )}
          </div>

          <div className="col">
            <label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.status ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value={Status.PENDING}>Pending</option>
              <option value={Status.IN_PROGRESS}>In Progress</option>
              <option value={Status.CANCELED}>Canceled</option>
              <option value={Status.COMPLETED}>Completed</option>
            </select>
            {errors.status && (
              <span className="text-sm text-red-600">{errors.status.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? (isEditMode ? 'Saving...' : 'Creating...')
              : (isEditMode ? 'Save Changes' : 'Create Task')
            }
          </button>
        </form>
      </div>
    </div>
  );
}
