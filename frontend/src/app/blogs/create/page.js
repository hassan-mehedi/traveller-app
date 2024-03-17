import React from "react";

export default function CreateBlog() {
    return (
        <div className="p-4 py-6 bg-gray-50 md:p-8">
            <form>
                <div className="mt-4">
                    <label className="block mb-2 text-sm text-gray-600 ">Title</label>
                    <input
                        type="text"
                        placeholder="The biggest river in Bangladesh"
                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="w-full mt-4">
                    <label className="block mb-2 text-sm text-gray-600 ">Description</label>
                    <textarea
                        className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Description of your traveling experience"
                    ></textarea>
                </div>

                <label
                    for="dropzone-file"
                    className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>

                    <h2 className="mx-3 text-gray-400">Upload Image</h2>

                    <input id="dropzone-file" type="file" className="hidden" />
                </label>

                <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Save
                </button>
            </form>
        </div>
    );
}
