import Image from "next/image";
import React from "react";
import DefaultBlogImage from "@/../public/default-blog-image.jpg";

export default function Card() {
    return (
        <div>
            <Image className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={DefaultBlogImage} alt="Card Image" />

            <div className="mt-8">
                <span className="text-sky-500 uppercase tracking-wider">Blog</span>

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
