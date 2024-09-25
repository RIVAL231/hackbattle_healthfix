'use client'

import React, { useState, useEffect } from 'react';
import { BarChart, Users, Pill, FileText, Activity, ShoppingCart, Menu, Search, Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Modal from './modal'

export default function DashboardComponent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [patients, setPatients] = useState(() => {
    const storedPatients = localStorage.getItem('patients');
    return storedPatients
      ? JSON.parse(storedPatients)
      : [
          { id: 1, name: 'John Doe', age: 35, gender: 'Male', lastVisit: '2023-09-15' },
          { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', lastVisit: '2023-09-20' },
          { id: 3, name: 'Bob Johnson', age: 42, gender: 'Male', lastVisit: '2023-09-18' },
          { id: 4, name: 'Alice Brown', age: 31, gender: 'Female', lastVisit: '2023-09-22' },
        ];
  });

  // Function to add or update patients
  const handleAddOrUpdatePatient = (newPatient, editPatientId = null) => {
    if (editPatientId !== null) {
      setPatients((prev) =>
        prev.map((patient) =>
          patient.id === editPatientId
            ? { ...patient, ...newPatient }
            : patient
        )
      );
    } else {
      setPatients((prev) => [
        ...prev,
        {
          ...newPatient,
          id: prev.length + 1,
        },
      ]);
    }
  };

  // Function to delete a patient
  const handleDeletePatient = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this patient?');
    if (confirmed) {
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
    }
  };

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const renderContent = () => {
    switch (activeTab) {
      case 'disease-prediction':
        return <DiseasePrediction />
      case 'medical-store':
        return <MedicalStore />
      case 'patient-records':
        return <PatientRecords patients={patients} onAddOrUpdate={handleAddOrUpdatePatient} onDelete={handleDeletePatient} />
      case 'prescriptions':
        return <Prescriptions />
      case 'vitals':
        return <VitalsMonitoring patients={patients} />
      default:
        return <Overview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">HealthMed</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: 'Overview', icon: BarChart, id: 'overview' },
            { name: 'Disease Prediction', icon: FileText, id: 'disease-prediction' },
            { name: 'Medical Store', icon: ShoppingCart, id: 'medical-store' },
            { name: 'Patient Records', icon: Users, id: 'patient-records' },
            { name: 'Prescriptions', icon: Pill, id: 'prescriptions' },
            { name: 'Vitals Monitoring', icon: Activity, id: 'vitals' },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
          <Pill className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">567</div>
          <p className="text-xs text-muted-foreground">+10.5% from last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Store Revenue</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,345</div>
          <p className="text-xs text-muted-foreground">+15.2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Treatments</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89</div>
          <p className="text-xs text-muted-foreground">+7.8% from last week</p>
        </CardContent>
      </Card>
    </div>
  )
}

function DiseasePrediction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disease Prediction Model</CardTitle>
        <CardDescription>Upload an MRI report to predict diseases and get remedies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="mri" type="file" />
          </div>
          <Button>Upload and Analyze</Button>
        </div>
        {/* Placeholder for results */}
        <div className="mt-4">
          <h3 className="font-semibold">Results will appear here</h3>
          <p className="text-sm text-muted-foreground">Upload an MRI report to see predictions and remedies</p>
        </div>
      </CardContent>
    </Card>
  )
}

function MedicalStore() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Store</CardTitle>
        <CardDescription>Browse and purchase medical supplies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input type="search" placeholder="Search for medical supplies..." />
          {/* Placeholder for product list */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-200 mb-2"></div>
                  <h3 className="font-semibold">Product {item}</h3>
                  <p className="text-sm text-muted-foreground">$19.99</p>
                  <Button className="w-full mt-2">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PatientRecords({ patients, onAddOrUpdate, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '', lastVisit: '' });
  const [editPatientId, setEditPatientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdatePatient = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.lastVisit) {
      alert('Please fill in all fields');
      return;
    }

    onAddOrUpdate(newPatient, editPatientId);

    clearInputFields(); // Clear input fields after adding
    setIsModalOpen(false);
    setEditPatientId(null);
  };

  const handleEditPatient = (patient) => {
    setNewPatient(patient);
    setEditPatientId(patient.id);
    setIsModalOpen(true);
  };

  const clearInputFields = () => {
    setNewPatient({ name: '', age: '', gender: '', lastVisit: '' }); // Reset to initial state
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Records</CardTitle>
        <CardDescription>Manage and view patient information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Input
            className="max-w-sm"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Patient
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(patient.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-semibold mb-4">
              {editPatientId ? 'Edit Patient' : 'Add New Patient'}
            </h2>
            <div className="space-y-4">
              <Input
                name="name"
                value={newPatient.name}
                onChange={handleInputChange}
                placeholder="Patient Name"
              />
              <Input
                name="age"
                type="number"
                value={newPatient.age}
                onChange={handleInputChange}
                placeholder="Patient Age"
              />
              <Input
                name="gender"
                value={newPatient.gender}
                onChange={handleInputChange}
                placeholder="Patient Gender"
              />
              <Input
                name="lastVisit"
                type="date"
                value={newPatient.lastVisit}
                onChange={handleInputChange}
                placeholder="Last Visit"
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={clearInputFields} className="ml-2">
                Clear
              </Button>
              <Button className="ml-2" onClick={handleAddOrUpdatePatient}>
                {editPatientId ? 'Save Changes' : 'Add Patient'}
              </Button>
            </div>
          </Modal>
        )}
      </CardContent>
    </Card>
  );
}

function Prescriptions() {
  const prescriptions = [
    { id: 1, patient: 'John Doe', medication: 'Amoxicillin', dosage: '500mg', frequency: 'Every 8 hours', startDate: '2023-09-15', endDate: '2023-09-22' },
    { id: 2, patient: 'Jane Smith', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2023-09-20', endDate: '2023-10-20' },
    { id: 3, patient: 'Bob Johnson', medication: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', startDate: '2023-09-18', endDate: '2023-12-18' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescriptions</CardTitle>
        <CardDescription>Manage and view patient prescriptions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Input className="max-w-sm" placeholder="Search prescriptions..." />
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Prescription
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell>{prescription.patient}</TableCell>
                <TableCell>{prescription.medication}</TableCell>
                <TableCell>{prescription.dosage}</TableCell>
                <TableCell>{prescription.frequency}</TableCell>
                <TableCell>{prescription.startDate}</TableCell>
                <TableCell>{prescription.endDate}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function VitalsMonitoring({ patients }) {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vitals Monitoring</CardTitle>
        <CardDescription>Monitor and record patient vital signs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select onValueChange={(value) => setSelectedPatient(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
          </div>
          {selectedPatient && (
            <div>
              <p className="text-lg">Vitals for: {patients.find(patient => patient.id.toString() === selectedPatient).name}</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input type="text" placeholder="Systolic" className="mb-2" />
                    <Input type="text" placeholder="Diastolic" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input type="text" placeholder="BPM" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input type="text" placeholder="°C" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Oxygen Saturation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input type="text" placeholder="%" />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <Button className="w-full">Save Vitals</Button>
        </div>
      </CardContent>
    </Card>
  )
}
