'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DoctorDashboard() {
  interface Patient {
    id: number;
    name: string;
    age: number;
    condition: string;
  }

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [prescription, setPrescription] = useState('')

  const patients = [
    { id: 1, name: 'John Doe', age: 35, condition: 'Fever' },
    { id: 2, name: 'Jane Smith', age: 28, condition: 'Headache' },
    { id: 3, name: 'Bob Johnson', age: 42, condition: 'Back pain' },
  ]

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient)
  }

  const handlePrescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the prescription to your backend
    console.log('Prescription submitted:', prescription)
    setPrescription('')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DigiSwasth Doctor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {patients.map((patient) => (
                <li key={patient.id} className="mb-2">
                  <Button onClick={() => handlePatientSelect(patient)}>
                    {patient.name} - {patient.condition}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {selectedPatient && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedPatient.name}</CardTitle>
              <CardDescription>Age: {selectedPatient.age}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Patient Details</TabsTrigger>
                  <TabsTrigger value="vitals">Current Vitals</TabsTrigger>
                  <TabsTrigger value="diagnosis">AI Diagnosis</TabsTrigger>
                  <TabsTrigger value="prescription">Prescription</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <div className="space-y-2">
                    <p><strong>Condition:</strong> {selectedPatient.condition}</p>
                    <p><strong>Medical History:</strong> Lorem ipsum dolor sit amet...</p>
                    <Button>Request Current Vitals</Button>
                    <Button className="ml-2">Request Body Scan</Button>
                  </div>
                </TabsContent>
                <TabsContent value="vitals">
                  <div className="space-y-2">
                    <p><strong>Blood Pressure:</strong> 120/80</p>
                    <p><strong>Temperature:</strong> 98.6°F</p>
                    <p><strong>Heart Rate:</strong> 72 bpm</p>
                  </div>
                </TabsContent>
                <TabsContent value="diagnosis">
                  <p>AI Diagnosis: Based on the symptoms, the patient may have...</p>
                  <Button className="mt-2">Confirm Diagnosis</Button>
                  <Button className="mt-2 ml-2">Refer to Specialist</Button>
                </TabsContent>
                <TabsContent value="prescription">
                  <form onSubmit={handlePrescriptionSubmit}>
                    <Textarea 
                      placeholder="Enter prescription..." 
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                    />
                    <Button type="submit" className="mt-2">Submit Prescription</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}