import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <svg
        className="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 01-8 8z"
        ></path>
      </svg>
      <span className="text-white">Loading...</span>
    </div>
  );
};

export default Loader;
