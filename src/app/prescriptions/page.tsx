'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  date: string;
}

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    medication: '',
    dosage: '',
    date: ''
  });

  useEffect(() => {
    // Fetch the prescriptions from the API
    fetch('/api/prescriptions')
      .then(response => response.json())
      .then(data => setPrescriptions(data))
      .catch(error => console.error('Error fetching prescriptions:', error));
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrescription({
      ...newPrescription,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission to create a new prescription
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPrescription),
      });

      const data = await response.json();
      setPrescriptions([...prescriptions, data]);
      // Reset the form
      setNewPrescription({ patientName: '', medication: '', dosage: '', date: '' });
    } catch (error) {
      console.error('Error creating prescription:', error);
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                type="text"
                id="patientName"
                name="patientName"
                value={newPrescription.patientName}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medication">Medication</Label>
              <Input
                type="text"
                id="medication"
                name="medication"
                value={newPrescription.medication}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                type="text"
                id="dosage"
                name="dosage"
                value={newPrescription.dosage}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={newPrescription.date}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <Button type="submit" className="w-full">Add Prescription</Button>
          </form>
          <hr className="my-4" />
          {prescriptions.length > 0 ? (
            <ul className="space-y-4">
              {prescriptions.map(prescription => (
                <li key={prescription.id} className="p-4 border rounded">
                  <h3 className="font-bold">Patient: {prescription.patientName}</h3>
                  <p>Medication: {prescription.medication}</p>
                  <p>Dosage: {prescription.dosage}</p>
                  <p>Date: {prescription.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No prescriptions available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
