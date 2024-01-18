import React from "react";
import Footer from "./Footer";
import NavPage from "./NavPage";
export default function Layout({ children }) {
  return (
    <div>
      <NavPage />
      {children}
      <Footer />
    </div>
  );
}
