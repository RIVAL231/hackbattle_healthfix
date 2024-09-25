// src/app/register/doctor/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";

export default function RegisterDoctor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    // Implement license validation logic
    if (!isValidLicense(licenseNumber)) {
      alert("Invalid License Number");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role: "doctor",
        licenseNumber,
      });
      alert("Doctor account created successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Registration Error: ", error);
    }
  };

  const isValidLicense = (license: string) => {
    // Replace with actual license verification logic
    return true;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4 text-center">Register as Doctor</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="License Number"
          className="w-full mb-4 p-2 border rounded"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
