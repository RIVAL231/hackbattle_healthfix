'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Users,
  Pill,
  FileText,
  Activity,
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
}

interface Prescription {
  id: number;
  patient: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default function DashboardComponent() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [patients, setPatients] = useState<Patient[]>(() => {
    if (typeof window !== 'undefined') {
      const storedPatients = localStorage.getItem('patients');
      return storedPatients
        ? JSON.parse(storedPatients)
        : [
            {
              id: 1,
              name: 'John Doe',
              age: 35,
              gender: 'Male',
              lastVisit: '2023-09-15',
            },
            {
              id: 2,
              name: 'Jane Smith',
              age: 28,
              gender: 'Female',
              lastVisit: '2023-09-20',
            },
            {
              id: 3,
              name: 'Bob Johnson',
              age: 42,
              gender: 'Male',
              lastVisit: '2023-09-18',
            },
            {
              id: 4,
              name: 'Alice Brown',
              age: 31,
              gender: 'Female',
              lastVisit: '2023-09-22',
            },
          ];
    }
    return [];
  });
  
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  
  const handleAddOrUpdatePatient = (
    newPatient: any,
    editPatientId: number | null = null
  ) => {
    if (editPatientId !== null) {
      setPatients((prev) =>
        prev.map((patient) =>
          patient.id === editPatientId ? { ...patient, ...newPatient } : patient
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

  const handleDeletePatient = (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this patient?'
    );
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
        return <DiseasePrediction />;
      case 'medical-store':
        return <MedicalStore />;
      case 'patient-records':
        return (
          <PatientRecords
            patients={patients}
            onAddOrUpdate={handleAddOrUpdatePatient}
            onDelete={handleDeletePatient}
          />
        );
      case 'prescriptions':
        return (
          <Prescriptions
            prescriptions={prescriptions}
            setPrescriptions={setPrescriptions}
            patients={patients}
          />
        );
      case 'vitals':
        return <VitalsMonitoring patients={patients} />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">DigiSwasth</h1>
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

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
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
  );
}

function DiseasePrediction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disease Prediction Model</CardTitle>
        <CardDescription>
          Upload an MRI report to predict diseases and get remedies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="mri" type="file" />
          </div>
          <Button>Upload and Analyze</Button>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Results will appear here</h3>
          <p className="text-sm text-muted-foreground">
            Upload an MRI report to see predictions and remedies
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function MedicalStore() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Store</CardTitle>
        <CardDescription>Purchase medications and equipment</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Shop Now</Button>
      </CardContent>
    </Card>
  );
}

function PatientRecords({
  patients,
  onAddOrUpdate,
  onDelete,
}: {
  patients: Patient[];
  onAddOrUpdate: (patient: Patient, id: number | null) => void;
  onDelete: (id: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPatientId, setEditPatientId] = useState<number | null>(null);
  const [newPatient, setNewPatient] = useState<Patient>({
    id: 0,
    name: '',
    age: 0,
    gender: '',
    lastVisit: '',
  });

  const handleOpenModal = (patient?: Patient) => {
    if (patient) {
      setEditPatientId(patient.id);
      setNewPatient(patient);
    } else {
      setEditPatientId(null);
      setNewPatient({ id: 0, name: '', age: 0, gender: '', lastVisit: '' });
      setIsModalOpen(false);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    onAddOrUpdate(newPatient, editPatientId);
    setIsModalOpen(false);
    setNewPatient({ id: 0, name: '', age: 0, gender: '', lastVisit: '' });
  };
const handleClose = () => {
  setIsModalOpen(false);
}
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Records</CardTitle>
        <Button onClick={() => handleOpenModal()} className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </CardHeader>
      <CardContent>
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
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => handleOpenModal(patient)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onDelete(patient.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">
            {editPatientId ? 'Edit Patient' : 'Add Patient'}
          </h2>
          <div className="space-y-4">
            <Input
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              placeholder="Name"
            />
            <Input
              type="number"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
              placeholder="Age"
            />
            <Select
              value={newPatient.gender}
              onValueChange={(value) => setNewPatient({ ...newPatient, gender: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={newPatient.lastVisit}
              onChange={(e) => setNewPatient({ ...newPatient, lastVisit: e.target.value })}
              placeholder="Last Visit"
            />
            <div className='m-0 h-10 relative bottom-20'>
            <Button onClick={handleSubmit}>
              {editPatientId ? 'Update Patient' : 'Add Patient'}
            </Button>
            <Button onClick={() => handleClose()} className='m-20 relative left-36'>
              Close
            </Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}

function Prescriptions({
  prescriptions,
  setPrescriptions,
  patients,
}: {
  prescriptions: Prescription[];
  setPrescriptions: React.Dispatch<React.SetStateAction<Prescription[]>>;
  patients: Patient[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrescription, setNewPrescription] = useState<Prescription>({
    id: 0,
    patient: '',
    medication: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: ''
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    setPrescriptions([...prescriptions, { ...newPrescription, id: prescriptions.length + 1 }]);
    setIsModalOpen(false);
    setNewPrescription({
      id: 0,
      patient: '',
      medication: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleDeletePrescription = (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this prescription?'
    );
    if (confirmed) {
      setPrescriptions((prev) => prev.filter((prescription) => prescription.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescriptions</CardTitle>
        <Button onClick={handleOpenModal} className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Add Prescription
        </Button>
      </CardHeader>
      <CardContent>
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
                  <Button
                    variant="ghost"
                    onClick={() => handleDeletePrescription(prescription.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Add Prescription</h2>
          <div className="space-y-4">
            <Select
              value={newPrescription.patient}
              onValueChange={(value) =>
                setNewPrescription({ ...newPrescription, patient: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.name}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={newPrescription.medication}
              onChange={(e) =>
                setNewPrescription({ ...newPrescription, medication: e.target.value })
              }
              placeholder="Medication"
            />
            <Input
              value={newPrescription.dosage}
              onChange={(e) =>
                setNewPrescription({ ...newPrescription, dosage: e.target.value })
              }
              placeholder="Dosage"
            />
            <Input
              value={newPrescription.frequency}
              onChange={(e) =>
                setNewPrescription({ ...newPrescription, frequency: e.target.value })
              }
              placeholder="Frequency"
            />
            <Input
              type="date"
              value={newPrescription.startDate}
              onChange={(e) =>
                setNewPrescription({ ...newPrescription, startDate: e.target.value })
              }
            />
            <Input
              type="date"
              value={newPrescription.endDate}
              onChange={(e) =>
                setNewPrescription({ ...newPrescription, endDate: e.target.value })
              }
            />
            <Button onClick={handleSubmit} className="w-full">Add Prescription</Button>
          </div>
        </Modal>
      )}
    </Card>
  );
}

function VitalsMonitoring({ patients }: { patients: Patient[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vitals Monitoring</CardTitle>
        <CardDescription>Track patient vitals</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is where you can track patient vitals.</p>
      </CardContent>
    </Card>
  );
}

