"use client";

import React, { useState } from "react";
import AlertComponent from "@/components/alert";

export default function CreateBlog() {
    const [data, setData] = useState({ title: "", description: "", images: [] });
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");

    // handle input change like title and description
    const handleInput = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // handle image input
    const handleImageInput = e => {
        setData({ ...data, images: [...data.images, e.target.files[0]] });
        setIsImageUploaded(true);
    };

    const handleSubmit = e => {
        e.preventDefault();

        // validate data
        if (!data.title || !data.description) {
            setMessage("Please fill title and description");
            setShowAlert(true);
            return;
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="p-4 py-6 w-full md:w-4/5 lg:w-3/5 mt-8 md:p-8">
                <h1 className="text-5xl font-semibold w-full flex align-middle justify-center">Create Blog</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm text-gray-600 ">Title</label>
                        <input
                            onInput={handleInput}
                            name="title"
                            type="text"
                            placeholder="The biggest river in Bangladesh"
                            className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="w-full mt-4">
                        <label className="block mb-2 text-sm text-gray-600 ">Description</label>
                        <textarea
                            onInput={handleInput}
                            name="description"
                            className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Description of your traveling experience"
                        ></textarea>
                    </div>

                    <label
                        htmlFor="dropzone-file"
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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>

                        <h2 className="mx-3 text-gray-400">Upload Image</h2>

                        <input onChange={handleImageInput} id="dropzone-file" type="file" className="hidden" />
                    </label>

                    <span className={`flex justify-end mt-1 ${isImageUploaded ? "text-green-500" : "text-red-500"}`}>
                        {isImageUploaded ? "Image uploaded" : "No image uploaded"}
                    </span>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                        Save
                    </button>
                </form>
            </div>
            {showAlert && <AlertComponent setShowAlert={setShowAlert} message={message} />}
        </div>
    );
}
