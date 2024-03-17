import NavBar from "@/components/navbar";
import Quote from "@/components/quote";
import Blogs from "@/components/blogs";
import Footer from "@/components/footer";

export default function Home() {
    return (
        <main>
            <NavBar />
            <Quote />
            <Blogs />
            <Footer />
        </main>
    );
}
