'use client';

import Link from 'next/link';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get form values from event object
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex min-h-screen px-2 md:px-5 items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded-lg outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-lg outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded-lg outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green text-white p-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <Link href="/login" className="text-green hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
