'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Users, Pill, Heart, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Patient {
  id: number;
  name: string;
  age: number;
  lastVisit: string;
}

interface Appointment {
  id: number;
  patient: string;
  date: string;
  time: string;
  reason: string;
}

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'patients' | 'prescriptions' | 'medical-records'>('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    // Simulating fetching data from an API
    setAppointments([
      { id: 1, patient: 'John Doe', date: '2023-10-15', time: '10:00 AM', reason: 'Annual Checkup' },
      { id: 2, patient: 'Jane Smith', date: '2023-10-15', time: '11:00 AM', reason: 'Follow-up' },
      { id: 3, patient: 'Bob Johnson', date: '2023-10-15', time: '2:00 PM', reason: 'New Patient' },
    ]);
    setPatients([
      { id: 1, name: 'John Doe', age: 35, lastVisit: '2023-09-15' },
      { id: 2, name: 'Jane Smith', age: 28, lastVisit: '2023-09-20' },
      { id: 3, name: 'Bob Johnson', age: 42, lastVisit: '2023-09-18' },
    ]);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <Appointments appointments={appointments} />;
      case 'patients':
        return <Patients patients={patients} />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'medical-records':
        return <MedicalRecords />;
      default:
        return <Overview appointments={appointments} patients={patients} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white shadow-md"
      >
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Dr. Sarah Johnson</p>
              <p className="text-xs text-muted-foreground">Cardiologist</p>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          {[
            { name: 'Overview', icon: Users, id: 'overview' as const },
            { name: 'Appointments', icon: Calendar, id: 'appointments' as const },
            { name: 'Patients', icon: Users, id: 'patients' as const },
            { name: 'Prescriptions', icon: Pill, id: 'prescriptions' as const },
            { name: 'Medical Records', icon: FileText, id: 'medical-records' as const },
          ].map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </motion.div>
          ))}
        </nav>
        <motion.div
          className="absolute bottom-4 left-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" className="w-full justify-start text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </motion.div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function Overview({ appointments, patients }: { appointments: Appointment[]; patients: Patient[] }) {
  const patientAgeData = [
    { name: '18-30', value: 30 },
    { name: '31-50', value: 45 },
    { name: '51-70', value: 20 },
    { name: '71+', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold"
      >
        Welcome back, Dr. Johnson
      </motion.h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">Scheduled for today</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
              <p className="text-xs text-muted-foreground">Active patients</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">Based on recent feedback</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment, index) => (
                  <motion.tr
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.patient}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Age Distribution</CardTitle>
            <CardDescription>Overview of your patient demographics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientAgeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {patientAgeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4">
              {patientAgeData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center mx-2">
                  <div className="w-3 h-3 mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Appointments({ appointments }: { appointments: Appointment[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage your patient appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment, index) => (
              <motion.tr
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.patient}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Reschedule</Button>
                  <Button variant="ghost" size="sm" className="text-red-500">Cancel</Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4"
        >
          <Button className="w-full">Schedule New Appointment</Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function Patients({ patients }: { patients: Patient[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient List</CardTitle>
        <CardDescription>Manage your patients and their information</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => (
              <motion.tr
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View Records</Button>
                  <Button variant="ghost" size="sm">Schedule Appointment</Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4"
        >
          <Button className="w-full">Add New Patient</Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function Prescriptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescriptions</CardTitle>
        <CardDescription>Manage and issue patient prescriptions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
            <Select>
              <SelectTrigger id="patient">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {['medication', 'dosage', 'frequency', 'duration'].map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              <Input id={field} type="text" placeholder={`Enter ${field}`} />
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="w-full">Issue Prescription</Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}

function MedicalRecords() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
        <CardDescription>Access and manage patient medical records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700">Select Patient</label>
            <Select>
              <SelectTrigger id="patient-select">
                <SelectValue placeholder="Choose a patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Available Records</h3>
            {['Lab Results', 'Vaccination History', 'Surgical History', 'Allergy Information'].map((record, index) => (
              <motion.div
                key={record}
                className="flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span>{record}</span>
                <Button variant="outline" size="sm">View</Button>
              </motion.div>
            ))}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="w-full">Upload New Record</Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}