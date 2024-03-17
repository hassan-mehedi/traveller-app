import React from "react";
import Card from "@/components/card";
import HeadingAction from "@/components/heading-action";
import Link from "next/link";

export default function Blogs() {
    return (
        <>
            {/* Hero */}
            <section className="container mx-auto px-4 pt-16 pb-0 w-full flex justify-end align-middle">
                <Link href="/blogs/create">
                    <button className="flex items-center px-4 py-2.5 font-medium tracking-wide bg-green-600 text-white capitalize transition-colors duration-300 transform border border-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">
                        <span className="mx-1">Create Blog</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </Link>
            </section>

            {/* Lates Blogs */}
            <section className="container mx-auto px-4 py-16">
                <HeadingAction title={"Lates Blogs"} url={"/latest-blogs"} />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-12 xl:grid-cols-3">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </section>

            {/* Most Liked Blogs */}
            <section className="container mx-auto px-4 py-16">
                <HeadingAction title={"Most Liked Blogs"} url={"/most-liked-blogs"} />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-12 xl:grid-cols-3">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </section>
        </>
    );
}
