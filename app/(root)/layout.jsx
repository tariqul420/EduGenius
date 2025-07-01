import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
