'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/validators/loginSchema";
import { loginInitialValues } from "@/store/defaultValues/loginInitialValues";

export default function Login() {
  const { state, actions } = useAuth();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginInitialValues
  });

  const onSubmit = (data: { username: string, password: string }) => {
    setLoginError('');

    const success = actions.login(data.username, data.password);

    if (success) {
      return router.push('/dashboard')
    } else {
      setLoginError('Username or password incorrects');
      reset();
    }
  }

  useEffect(() => {
    if (state.isAuthenticated) return router.push('/dashboard');
  }, [state.isAuthenticated, router]);

  return (
    <div className="flex-center p-4 w-full">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {loginError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{loginError}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition
                ${errors.username
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
                }`
              }
              placeholder="username"
              {...register('username')}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition
                ${errors.password
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
                }`
              }
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
