import React from "react";
import Link from "next/link";

export default function HeadingAction({ title, url }) {
    return (
        <div className=" flex items-center justify-between">
            <h2 className=" text-gray-800 font-bold text-3xl">{title}</h2>

            <Link href={url}>
                <button className="flex items-center px-4 py-2.5 font-medium tracking-wide text-sky-500 capitalize transition-colors duration-300 transform border border-sky-500 rounded-lg hover:bg-sky-50 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
                    <span className="mx-1">Exploer All</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 mx-1 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </Link>
        </div>
    );
}
