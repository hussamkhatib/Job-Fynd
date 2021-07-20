import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen mx-6">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
