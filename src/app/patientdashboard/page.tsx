'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAuthToken } from '../auth';

const [token, setToken] = useState<string | null>(null); // Initialize token state

  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Access localStorage in useEffect
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error('No token found. Please log in again.');
    }
  }, []);


const symptomsDict = {
  "Skin and Dermatological Issues": [
    "Itching", "Skin Rash", "Nodal Skin Eruptions", "Pus Filled Pimples",
    "Blackheads", "Scarring", "Skin Peeling", "Silver Like Dusting",
    "Small Dents In Nails", "Inflammatory Nails", "Blister",
    "Red Sore Around Nose", "Yellow Crust Ooze", "Dischromic Patches"
  ],
  "Respiratory Issues": [
    "Continuous Sneezing", "Cough", "Breathlessness", "Phlegm",
    "Throat Irritation", "Redness Of Eyes", "Sinus Pressure",
    "Runny Nose", "Congestion", "Mucoid Sputum", "Rusty Sputum",
    "Blood In Sputum"
  ],
  "Gastrointestinal Issues": [
    "Stomach Pain", "Acidity", "Ulcers On Tongue", "Vomiting",
    "Burning Micturition", "Spotting urination", "Diarrhoea",
    "Constipation", "Abdominal Pain", "Dehydration", "Indigestion",
    "Nausea", "Loss Of Appetite", "Pain During Bowel Movements",
    "Pain In Anal Region", "Bloody Stool", "Irritation In Anus",
    "Passage Of Gases", "Internal Itching", "Belly Pain",
    "Stomach Bleeding", "Distention Of Abdomen"
  ],
  "Neurological and Psychological Issues": [
    "Anxiety", "Mood Swings", "Restlessness", "Lethargy",
    "Headache", "Altered Sensorium", "Lack Of Concentration",
    "Visual Disturbances", "Depression", "Irritability",
    "Slurred Speech", "Coma", "Loss Of Balance", "Unsteadiness",
    "Spinning Movements", "Weakness Of One Body Side",
    "Loss Of Smell", "Dizziness"
  ],
  "Musculoskeletal Issues": [
    "Joint Pain", "Muscle Wasting", "Back Pain", "Neck Pain",
    "Knee Pain", "Hip Joint Pain", "Muscle Weakness", "Stiff Neck",
    "Swelling Joints", "Movement Stiffness", "Cramps",
    "Painful Walking", "Weakness In Limbs", "Muscle Pain"
  ],
  "General Health Issues": [
    "Shivering", "Chills", "Fatigue", "Weight Gain",
    "Weight Loss", "High Fever", "Sweating", "Malaise",
    "Weakness In Limbs", "Fast Heart Rate", "Cold Hands And Feets",
    "Sunken Eyes", "Patches In Throat", "Irregular Sugar Level",
    "Fluid Overload", "Swelling Of Stomach", "Swelled Lymph Nodes",
    "Blurred And Distorted Vision", "Puffy Face And Eyes",
    "Enlarged Thyroid", "Brittle Nails", "Swollen Extremities",
    "Excessive Hunger", "Polyuria", "Increased Appetite",
    "Obesity", "Family History", "Bruising", "Palpitations", "Enlarged Thyroid"
  ],
  "Liver and Renal Issues": [
    "Yellowish Skin", "Dark Urine", "Yellow Urine",
    "Yellowing Of Eyes", "Acute Liver Failure", "Fluid Overload.1",
    "Swelling Of Stomach", "Mild Fever", "Prominent Veins On Calf"
  ],
  "Reproductive and Urinary Issues": [
    "Burning Micturition", "Spotting urination", "Bladder Discomfort",
    "Foul Smell Of urine", "Continuous Feel Of Urine",
    "Abnormal Menstruation", "Extra Marital Contacts"
  ],
  "Infectious and Immune Issues": [
    "Red Spots Over Body", "History Of Alcohol Consumption",
    "Receiving Blood Transfusion", "Receiving Unsterile Injections",
    "Toxic Look (typhos)"
  ]
}

interface Doctor {
  name: string;
  specialization: string;
  experience: string;
  phone: string;
  email: string;
  location: string;
  latitude: number;
  longitude: number;
  distance?: number;
  link: string;
}

export default function PatientDashboard() {
  const [profileCreated, setProfileCreated] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [diagnosis, setDiagnosis] = useState('')
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [nearestDoctors, setNearestDoctors] = useState<Doctor[]>([])
  const [userLocation, setUserLocation] = useState<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null })
  const [showDoctors, setShowDoctors] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
interface MedicalRecords {
  bloodType: string;
  allergies: string;
  currentMedications: string;
  previousTreatments: string;
  previousDiagnosis: File | null;
}

interface FormData {
  medicalRecords: MedicalRecords;
}

const [formData, setFormData] = useState<FormData>({
  medicalRecords: {
    bloodType: '',
    allergies: '',
    currentMedications: '',
    previousTreatments: '',
    previousDiagnosis: null
  }
})

const handleProfileSubmit = async (e: React.FormEvent) => {

  e.preventDefault();
  setProfileCreated(true);
  try {
    const response = await fetch('api/patient/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData),
  });
}catch (error) {
  console.error('Error:', error);
  setProfileCreated(false);
}
}

  const handleSymptomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_symptoms: selectedSymptoms }),
      });
      const data = await response.json();
      setDiagnosis(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setDiagnosis('Error occurred while predicting disease');
    }
  };

  const handleSymptomChange = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const getLocation = async () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          setUserLocation({
            latitude: userLat,
            longitude: userLon
          })
          await findNearestDoctors(userLat, userLon)
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      setIsLoading(false)
    }
  }

  const findNearestDoctors = async (userLat: number, userLon: number) => {  
    try {
      const response = await fetch("/data/doctors.json")
      const allDoctors: Doctor[] = await response.json()
      
      const doctorDistances = allDoctors.map(doctor => {
        const distance = calculateDistance(
          [userLat, userLon],
          [doctor.latitude, doctor.longitude]
        )
        return { ...doctor, distance }
      })

      doctorDistances.sort((a, b) => (a.distance || 0) - (b.distance || 0))
      setNearestDoctors(doctorDistances.slice(0, 3))
      setShowDoctors(true)
    } catch (error) {
      console.error('Error loading doctor data:', error)
    }
  }

  const calculateDistance = (loc1: [number, number], loc2: [number, number]): number => {
    const R = 6371 // Radius of the Earth in km
    const lat1 = loc1[0] * (Math.PI / 180)
    const lon1 = loc1[1] * (Math.PI / 180)
    const lat2 = loc2[0] * (Math.PI / 180)
    const lon2 = loc2[1] * (Math.PI / 180)

    const dLat = lat2 - lat1
    const dLon = lon2 - lon1

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in km
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
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, medicalRecords: { ...prev.medicalRecords, bloodType: value } }))}>
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
              <Button type="button" onClick={() => setCurrentStep(2)}>Next</Button>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" placeholder="Enter any allergies..." onChange={(e) => setFormData(prev => ({ ...prev, medicalRecords: { ...prev.medicalRecords, allergies: e.target.value } }))} />
              </div>
              <div>
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea id="currentMedications" placeholder="Enter current medications..." onChange={(e) => setFormData(prev => ({ ...prev, medicalRecords: { ...prev.medicalRecords, currentMedications: e.target.value } }))} />
              </div>
              <div>
                <Label htmlFor="previousTreatments">Previous Treatments</Label>
                <Textarea id="previousTreatments" placeholder="Enter previous treatments..." onChange={(e) => setFormData(prev => ({ ...prev, medicalRecords: { ...prev.medicalRecords, previousTreatments: e.target.value } }))} />
              </div>
              <div>
                <Label htmlFor="previousDiagnosis">Upload Previous Diagnosis</Label>
                <Input id="previousDiagnosis" type="file" onChange={(e) => setFormData(prev => ({ ...prev, medicalRecords: { ...prev.medicalRecords, previousDiagnosis: e.target.files?.[0] || null } }))} />
              </div>
              <Button type="submit">Create Profile</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );

  const renderSymptomChecker = () => (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Checker</CardTitle>
        <CardDescription>Select your symptoms for a preliminary diagnosis.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSymptomSubmit}>
          {Object.entries(symptomsDict).map(([category, symptoms]) => (
            <div key={category} className="mb-4">
              <h3 className="font-bold mb-2">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {symptoms.map(symptom => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox 
                      id={symptom} 
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomChange(symptom)}
                    />
                    <Label htmlFor={symptom}>{symptom}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button type="submit">Get Diagnosis</Button>
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
  )

  const renderVitals = () => (
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
  )

  const renderTestsAndScans = () => (
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
  )

  const renderMedicines = () => (
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
  )

  const renderNearestDoctors = () => (
    <Card>
      <CardHeader>
        <CardTitle>Nearest Doctors</CardTitle>
        <CardDescription>Based on your current location</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={getLocation} disabled={isLoading}>
          {isLoading ? 'Finding Doctors...' : 'Find Nearest Doctors'}
        </Button>
        {showDoctors && nearestDoctors.length > 0 && (
          <div className="mt-4">
            {nearestDoctors.map((doctor, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <h3 className="font-bold">{doctor.name}</h3>
                <p>Specialization: {doctor.specialization}</p>
                <p>Experience: {doctor.experience}</p>
                <p>Phone: {doctor.phone}</p>
                <p>Email: {doctor.email}</p>
                <p>Location: {doctor.location}</p>
                <p>Distance: {doctor.distance?.toFixed(2)} km</p>
                <a href={doctor.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Profile
                </a>
              </div>
            ))}
          </div>
        )}
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
        <TabsTrigger value="doctors">Nearest Doctors</TabsTrigger>
      </TabsList>
      <TabsContent value="symptoms">{renderSymptomChecker()}</TabsContent>
      <TabsContent value="vitals">{renderVitals()}</TabsContent>
      <TabsContent value="tests">{renderTestsAndScans()}</TabsContent>
      <TabsContent value="medicines">{renderMedicines()}</TabsContent>
      <TabsContent value="doctors">{renderNearestDoctors()}</TabsContent>
    </Tabs>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DigiSwasth Patient Dashboard</h1>
      {!profileCreated ? renderProfileCreation() : renderDashboard()}
    </div>
  )
}