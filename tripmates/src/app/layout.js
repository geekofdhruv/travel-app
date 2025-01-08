// app/layout.js
import './globals.css'
import Navbar from "./components/navbar";

const Layout = ({ children }) => {
  return (
    <html>
      <body>
       
      
      <main>{children}</main>
    
    </body>
    </html>
  );
};

export default Layout;
