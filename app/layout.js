import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./_lib/AuthContext";



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata = {
  title: "Skill Foundry",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased flex flex-col min-h-screen`}>
        
          <AuthProvider>
            <Header />
          <main className="flex-grow">{children}</main>
          <ToastContainer position="top-right" autoClose={3000} />
          <Footer />
          </AuthProvider>
        
      </body>
    </html>
  );
}
