'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAuthToken } from '../auth';

export default function PatientDashboard() {
  const [profileCreated, setProfileCreated] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [diagnosis, setDiagnosis] = useState('')

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    setProfileCreated(true)
  }

  const handleSymptomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the symptoms to your backend for analysis
    setDiagnosis('Sample diagnosis based on symptoms')
  }

  const renderProfileCreation = () => (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
        <CardDescription>Please enter your medical history and current health information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileSubmit}>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="familyHistory">Family History</Label>
                <Textarea id="familyHistory" placeholder="Enter family history of diseases..." />
              </div>
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select>
                  <SelectTrigger id="bloodType">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setCurrentStep(2)}>Next</Button>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" placeholder="Enter any allergies..." />
              </div>
              <div>
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea id="currentMedications" placeholder="Enter current medications..." />
              </div>
              <div>
                <Label htmlFor="previousTreatments">Previous Treatments</Label>
                <Textarea id="previousTreatments" placeholder="Enter previous treatments..." />
              </div>
              <div>
                <Label htmlFor="previousDiagnosis">Upload Previous Diagnosis</Label>
                <Input id="previousDiagnosis" type="file" />
              </div>
              <Button type="submit">Create Profile</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )

  const renderDashboard = () => (
    <Tabs defaultValue="symptoms">
      <TabsList>
        <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
        <TabsTrigger value="vitals">Vitals</TabsTrigger>
        <TabsTrigger value="tests">Tests & Scans</TabsTrigger>
        <TabsTrigger value="medicines">Medicines</TabsTrigger>
      </TabsList>
      <TabsContent value="symptoms">
        <Card>
          <CardHeader>
            <CardTitle>Symptom Checker</CardTitle>
            <CardDescription>Select your symptoms for a preliminary diagnosis.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSymptomSubmit}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="fever" />
                  <Label htmlFor="fever">Fever</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cough" />
                  <Label htmlFor="cough">Cough</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="headache" />
                  <Label htmlFor="headache">Headache</Label>
                </div>
                {/* Add more symptoms as needed */}
                <Button type="submit">Get Diagnosis</Button>
              </div>
            </form>
          </CardContent>
          {diagnosis && (
            <CardFooter>
              <div>
                <h3 className="font-bold">Diagnosis:</h3>
                <p>{diagnosis}</p>
                <Button className="mt-2">Download PDF</Button>
                <Button className="mt-2 ml-2">View Recommended Doctors</Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </TabsContent>
      <TabsContent value="vitals">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Vitals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input id="bloodPressure" placeholder="e.g., 120/80" />
              </div>
              <div>
                <Label htmlFor="temperature">Body Temperature (°F)</Label>
                <Input id="temperature" placeholder="e.g., 98.6" />
              </div>
              <div>
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input id="heartRate" placeholder="e.g., 72" />
              </div>
              <Button>Save Vitals</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tests">
        <Card>
          <CardHeader>
            <CardTitle>Order Tests & Upload Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a test to order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bloodTest">Blood Test</SelectItem>
                  <SelectItem value="xRay">X-Ray</SelectItem>
                  <SelectItem value="mri">MRI</SelectItem>
                  <SelectItem value="ctScan">CT Scan</SelectItem>
                </SelectContent>
              </Select>
              <Button>Order Selected Test</Button>
              <div>
                <Label htmlFor="uploadScan">Upload Scan</Label>
                <Input id="uploadScan" type="file" />
              </div>
              <Button>Upload and Get Diagnosis</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="medicines">
        <Card>
          <CardHeader>
            <CardTitle>Order Medicines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a nearby pharmacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pharmacy1">Pharmacy 1</SelectItem>
                  <SelectItem value="pharmacy2">Pharmacy 2</SelectItem>
                  <SelectItem value="pharmacy3">Pharmacy 3</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Enter medicines to order..." />
              <Button>Place Order</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DigiSwasth Patient Dashboard</h1>
      {!profileCreated ? renderProfileCreation() : renderDashboard()}
    </div>
  )
}