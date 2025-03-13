'use client';

import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get input values directly from the form
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex min-h-screen px-2 md:px-5 items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green text-white p-2 rounded-lg"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button className="w-full flex items-center justify-center gap-2 bg-slate-200 p-2 rounded-lg">
            <FcGoogle size={20} /> Sign in with Google
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Don&apos;t have an account? <Link href="/register" className="text-green hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
