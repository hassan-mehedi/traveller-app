import Image from "next/image";
import React from "react";

export default function Card() {
    return (
        <div>
            <Image
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                width={500}
                height={500}
                alt="Card Image"
            />

            <div className="mt-8">
                <span className="text-sky-500 uppercase tracking-wider">Article</span>

                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white truncate">What do you want to know about UI</h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est asperiores vel, ab animi recusandae nulla veritatis id tempore
                    sapiente
                </p>

                <div className="flex items-center justify-between mt-4">
                    <div>
                        <a href="#" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500">
                            John snow
                        </a>

                        <p className="text-sm text-gray-500 dark:text-gray-400">February 1, 2022</p>
                    </div>

                    <a href="#" className="inline-block text-sky-500 underline hover:text-sky-400">
                        Read more
                    </a>
                </div>
            </div>
        </div>
    );
}
