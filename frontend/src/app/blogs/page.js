import React from "react";
import Card from "@/components/card";
import HeadingAction from "@/components/heading-action";

export default function Blogs() {
    return (
        <>
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
