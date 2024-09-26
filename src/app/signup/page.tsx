'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"

interface FamilyHistory {
  diabetes: boolean
  heartDisease: boolean
  kidneyStones: boolean
  lungDiseases: boolean
  cancer: boolean
}

interface FormData {
  name: string
  email: string
  password: string
  specialty?: string
  familyHistory: FamilyHistory
}

type UserType = 'doctor' | 'patient' | ''

export default function SignupPage() {
  const [userType, setUserType] = useState<UserType>('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    specialty: '',
    familyHistory: {
      diabetes: false,
      heartDisease: false,
      kidneyStones: false,
      lungDiseases: false,
      cancer: false,
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (disease: keyof FamilyHistory) => {
    setFormData({
      ...formData,
      familyHistory: {
        ...formData.familyHistory,
        [disease]: !formData.familyHistory[disease],
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/auth/${userType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'register' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      toast({
        title: "Account created successfully",
        description: "You can now log in with your new account.",
      })

      router.push('/login')
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'An error occurred during signup',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderForm = () => {
    switch (userType) {
      case 'doctor':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input id="specialty" name="specialty" type="text" required onChange={handleChange} />
            </div>
          </>
        )
      case 'patient':
        return (
          <div className="space-y-2">
            <Label>Family History</Label>
            {Object.keys(formData.familyHistory).map((disease) => (
              <div key={disease} className="flex items-center space-x-2">
                <Checkbox
                  id={disease}
                  checked={formData.familyHistory[disease as keyof FamilyHistory]}
                  onCheckedChange={() => handleCheckboxChange(disease as keyof FamilyHistory)}
                />
                <label
                  htmlFor={disease}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {disease.charAt(0).toUpperCase() + disease.slice(1)}
                </label>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select onValueChange={(value) => setUserType(value as UserType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
              <AnimatePresence mode="wait">
                {userType && (
                  <motion.div
                    key={userType}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" type="text" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" required onChange={handleChange} />
                    </div>
                    {renderForm()}
                  </motion.div>
                )}
              </AnimatePresence>
              <Button type="submit" className="w-full" disabled={!userType || isLoading}>
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}