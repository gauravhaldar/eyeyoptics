import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Nunito_Sans } from "next/font/google";
import { AuthProvider } from "../context/AuthContext"; // <-- import AuthProvider

// Load Nunito Sans font
const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], 
  variable: "--font-nunito",
});

export const metadata = {
  title: "Eyey",
  description: "Buy Eyeglasses, Computer Glasses & More",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-nunito">
        <AuthProvider>   {/* ✅ Wrap your app here */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
