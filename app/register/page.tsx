'use client'

import { useFormState } from 'react-dom'
import { register } from '../actions/auth'

export default function RegisterPage() {
  const [state, formAction] = useFormState(register, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action={formAction}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">Register</h1>

        {state?.error && (
          <p className="text-red-600 text-sm text-center">
            {state.error}
          </p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full text-gray-700"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full text-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  )
}
