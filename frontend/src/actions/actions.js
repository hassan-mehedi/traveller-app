"use server";

const createUser = async user => {
    const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const data = await response.json();
    return data;
};

const signIn = async user => {
    const response = await fetch("http://localhost:5000/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const data = await response.json();
    return data;
};

const createBlog = async blog => {
    const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
    });

    const data = await response.json();
    return data;
};

const updateBlog = async blog => {
    const response = await fetch("http://localhost:5000/api/blogs" + blog.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
    });

    const data = await response.json();
    return data;
};

export { createUser, createBlog, updateBlog };
