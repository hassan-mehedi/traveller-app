"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertComponent from "@/components/alert";
import storage from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUser, getUserByEmail } from "@/actions/actions";

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    isImageUploaded: false,
    showAlert: false,
    message: "",
    type: "",
};
const initialProfileImage = "https://merakiui.com/images/logo.svg";

export default function SignUpPage() {
    const router = useRouter();
    const [state, setState] = useState(initialState);
    const [showProfileImage, setShowProfileImage] = useState("https://merakiui.com/images/logo.svg");
    const [file, setFile] = useState(null);

    const handleInput = e => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageInput = e => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setShowProfileImage(URL.createObjectURL(selectedFile));
        setState(prevState => ({ ...prevState, isImageUploaded: true }));
    };

    const validateFormData = ({ name, email, password, confirmPassword }) => {
        if (!name || !email || !password || !confirmPassword) {
            setState(prevState => ({
                ...prevState,
                message: "Please fill all the fields",
                type: "warning",
                showAlert: true,
            }));
            return false;
        }

        if (password !== confirmPassword) {
            setState(prevState => ({
                ...prevState,
                message: "Passwords do not match",
                type: "error",
                showAlert: true,
            }));
            return false;
        }
        return true;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = { ...state };
        delete formData.showAlert;
        delete formData.message;
        delete formData.type;
        delete formData.isImageUploaded;

        console.log(formData);

        if (!validateFormData(formData)) return;

        const checkUser = await getUserByEmail(formData.email);
        if (checkUser.data) {
            setState(prevState => ({
                ...prevState,
                message: "User with the same email already exists",
                type: "error",
                showAlert: true,
            }));
            return;
        }

        if (state.isImageUploaded) {
            try {
                const dateTime = new Date().toISOString();
                const imageName = `${formData.name}-${dateTime}`;
                const storageRef = ref(storage, `images/${imageName}`);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                formData.image = downloadURL;
                await createUserAndHandleResponse(formData);
            } catch (error) {
                console.error(error);
                setState(prevState => ({
                    ...prevState,
                    message: error.message,
                    type: "error",
                    showAlert: true,
                }));
            }
        } else {
            await createUserAndHandleResponse(formData);
        }
    };

    const createUserAndHandleResponse = async formData => {
        const response = await createUser(formData);
        if (response.error) {
            setState(prevState => ({
                ...prevState,
                message: response.error,
                type: "error",
                showAlert: true,
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                ...initialState,
                message: response.message,
                type: "success",
                showAlert: true,
            }));
            setShowProfileImage(initialProfileImage);
            setFile(null);
            router.push("/signin");
        }
    };

    const { showAlert, type, message } = state;

    return (
        <section className="bg-white">
            <div className="container flex items-center justify-center mt-16 px-6 mx-auto">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <div className="flex justify-center mx-auto">
                        <Image className="w-auto h-7 sm:h-8" width={40} height={40} src={showProfileImage} alt="Profile Picture" />
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <p href="#" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500">
                            sign up
                        </p>
                    </div>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-3 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </span>

                        <input
                            onInput={handleInput}
                            type="text"
                            name="name"
                            value={state.name}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Name"
                        />
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

                        <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                        <input onChange={handleImageInput} id="dropzone-file" type="file" accept="image/*" className="hidden" />
                    </label>

                    <span className={`flex justify-end mt-1 text-sm ${state.isImageUploaded ? "text-green-500" : "text-red-500"}`}>
                        {state.isImageUploaded ? "Image inserted" : "No image inserted"}
                    </span>

                    <div className="relative flex items-center mt-3">
                        <span className="absolute">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-3 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </span>

                        <input
                            onInput={handleInput}
                            name="email"
                            type="email"
                            value={state.email}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Email"
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-3 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </span>

                        <input
                            onInput={handleInput}
                            name="password"
                            type="password"
                            value={state.password}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Password"
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-3 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </span>

                        <input
                            onInput={handleInput}
                            name="confirmPassword"
                            type="password"
                            value={state.confirmPassword}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Sign Up
                        </button>

                        <div className="mt-6 text-center">
                            <span className="text-sm text-gray-600">Already have an account? </span>

                            <Link href="/signin" className="mx-2 text-sm font-bold text-blue-500 hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            {showAlert && (
                <AlertComponent type={type} message={message} setShowAlert={show => setState(prevState => ({ ...prevState, showAlert: show }))} />
            )}
        </section>
    );
}
