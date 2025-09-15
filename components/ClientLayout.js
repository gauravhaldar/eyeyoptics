// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import Loader from "./Loader";

// export default function ClientLayout({ children }) {
//   const [loading, setLoading] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     setLoading(true);
//     const timeout = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(timeout);
//   }, [pathname]);

//   return (
//     <>
//       {loading && <Loader />}
//       {children}
//     </>
//   );
// }
