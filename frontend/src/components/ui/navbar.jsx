import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav className="flex fixed top-0 p-6 w-full bg-gray-900 text-white justify-between items-center space-x-3.5">
        <h1>
        <a href="/" className="font-bold text-3xl">Blog App</a>
        </h1>

        <ul className="flex list-none text-xl space-x-2.5 justify-center items-center">
          <li className="hover:text-gray-300">
            <a href="/posts">Posts</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
