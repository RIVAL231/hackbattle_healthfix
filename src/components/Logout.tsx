// src/components/Logout.tsx
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig"; // Adjust the path according to your project structure

export default function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
