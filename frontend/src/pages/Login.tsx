import React from 'react';

const Login = () => (
  <div className="p-8 max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <form className="space-y-4">
      <input className="w-full border px-3 py-2 rounded" type="email" placeholder="Email" />
      <input className="w-full border px-3 py-2 rounded" type="password" placeholder="Password" />
      <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold" type="submit">Login</button>
    </form>
  </div>
);

export default Login;
