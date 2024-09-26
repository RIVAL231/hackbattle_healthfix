"use client"

import Link from "next/link";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Heart, Shield, Users, Clock, Star, Phone, Video, Calendar, FileText, UserCircle } from "lucide-react"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"

export default function LandingPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6 }  // Move transition inside animate
        }
      }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <header className="container mx-auto px-4 py-6 relative z-10">
          <nav className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <h1 className="text-2xl font-bold text-blue-600">DigiSwasth</h1>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Button variant="ghost" className="mr-2">Home</Button>
              <Button variant="ghost" className="mr-2">Services</Button>
              <Button variant="ghost" className="mr-2">About</Button>
              <Button variant="ghost" className="mr-4">Contact</Button>
             <Link href='/login'> <Button variant="outline" className="mr-2">Login</Button></Link>
            <Link href='/signup'><Button variant="outline" className="mr-2">Sign Up</Button></Link>
            </motion.div>
          </nav>
        </header>

        <main className="relative">
          <Parallax speed={-10}>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full opacity-50 filter blur-3xl"></div>
              <div className="absolute bottom-40 right-20 w-96 h-96 bg-green-200 rounded-full opacity-50 filter blur-3xl"></div>
              <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-200 rounded-full opacity-50 filter blur-3xl"></div>
            </div>
          </Parallax>

          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div className="text-center" variants={stagger} initial="initial" animate="animate">
              <Parallax speed={-5}>
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                  variants={fadeIn}
                >
                  Your Health, Our Priority
                </motion.h2>
              </Parallax>
              <Parallax speed={-3}>
                <motion.p 
                  className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                  variants={fadeIn}
                >
                  Experience healthcare like never before with VirtualHospital. 
                  Consult doctors, manage prescriptions, and monitor your health, all from the comfort of your home.
                </motion.p>
              </Parallax>
              <motion.div variants={fadeIn}>
                <Button size="lg" className="mr-4">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">Learn More</Button>
              </motion.div>
            </motion.div>

            <Parallax speed={5}>
              <motion.div 
                className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={stagger}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-lg">
                  <Users className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">24/7 Doctor Consultations</h3>
                  <p className="text-gray-600">Connect with experienced doctors anytime, anywhere.</p>
                </motion.div>
                <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-lg">
                  <Heart className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Health Monitoring</h3>
                  <p className="text-gray-600">Track your vitals and receive personalized health insights.</p>
                </motion.div>
                <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-lg">
                  <Shield className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                  <p className="text-gray-600">Your health data is protected with state-of-the-art encryption.</p>
                </motion.div>
              </motion.div>
            </Parallax>

            <Parallax speed={-2}>
              <motion.div 
                className="mt-32 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 rounded-full p-4 mb-4">
                      <UserCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Create Account</h3>
                    <p className="text-gray-600">Sign up and complete your health profile</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 rounded-full p-4 mb-4">
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
                    <p className="text-gray-600">Choose a doctor and schedule a convenient time</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-purple-100 rounded-full p-4 mb-4">
                      <Video className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Video Consultation</h3>
                    <p className="text-gray-600">Meet with your doctor via secure video call</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-yellow-100 rounded-full p-4 mb-4">
                      <FileText className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Follow-up Care</h3>
                    <p className="text-gray-600">Receive prescriptions and follow-up instructions</p>
                  </div>
                </div>
              </motion.div>
            </Parallax>

            <Parallax speed={3}>
              <motion.div 
                className="mt-32 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-12 rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Why Choose VirtualHospital?</h2>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <Clock className="h-6 w-6 mr-2" />
                        <span>24/7 access to healthcare professionals</span>
                      </li>
                      <li className="flex items-center">
                        <Star className="h-6 w-6 mr-2" />
                        <span>Top-rated doctors and specialists</span>
                      </li>
                      <li className="flex items-center">
                        <Phone className="h-6 w-6 mr-2" />
                        <span>Convenient mobile app for on-the-go care</span>
                      </li>
                      <li className="flex items-center">
                        <Shield className="h-6 w-6 mr-2" />
                        <span>Secure and confidential consultations</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <img 
                      src="/placeholder.svg?height=300&width=300" 
                      alt="Doctor using VirtualHospital" 
                      className="mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </motion.div>
            </Parallax>

            <Parallax speed={-2}>
              <motion.div 
                className="mt-32"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">What Our Patients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Sarah L.",
                      comment: "VirtualHospital has been a lifesaver. I got expert medical advice without leaving my home!",
                      rating: 5
                    },
                    {
                      name: "John D.",
                      comment: "The doctors are knowledgeable and caring. It's like having a hospital in your pocket.",
                      rating: 5
                    },
                    {
                      name: "Emily R.",
                      comment: "Quick, efficient, and professional. I'm impressed with the quality of care I received.",
                      rating: 4
                    }
                  ].map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                      <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{testimonial.name}</span>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Parallax>

            <Parallax speed={3}>
              <motion.div 
                className="mt-32 bg-blue-600 text-white p-12 rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-3xl font-bold mb-4 text-center">Ready to Take Control of Your Health?</h3>
                <p className="text-xl mb-8 text-center">Join thousands of satisfied patients and experience the future of healthcare today.</p>
                <div className="flex justify-center space-x-4">
                  <Button size="lg" variant="secondary">
                    Download App
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </Parallax>

            <Parallax speed={-2}>
              <motion.div 
                className="mt-32"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      question: "How does VirtualHospital work?",
                      answer: "VirtualHospital connects you with licensed healthcare professionals through secure video consultations. You can book appointments, discuss your health concerns, receive diagnoses, and get prescriptions all from the comfort of your home."
                    },
                    {
                      question: "Is my personal health information secure?",
                      answer: "Yes, we take your privacy very seriously. All your personal and health information is encrypted and stored securely. We comply with all relevant data protection regulations to ensure your information remains confidential."
                    },
                    {
                      question: "Can I get prescriptions through VirtualHospital?",
                      answer: "Yes, our doctors can prescribe medications when necessary. Prescriptions are sent electronically to your preferred pharmacy for convenient pickup."
                    },
                    {
                      question: "What types of health issues can be addressed through VirtualHospital?",
                      answer: "VirtualHospital can address a wide range of non-emergency health issues, including common illnesses, skin conditions, mental health concerns, and chronic disease management. However, for emergencies, please call your local emergency services."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                      <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Parallax>

            <Parallax speed={3}>
              <motion.div 
                className="mt-32 bg-gray-100 p-12 rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-center">Stay Updated</h3>
                <p className="mb-4 text-center">Subscribe to our newsletter for the latest health tips and VirtualHospital updates.</p>
                <form className="flex gap-4 max-w-md mx-auto">
                  <Input type="email" placeholder="Enter your email" className="flex-grow" />
                  <Button type="submit">Subscribe</Button>
                </form>
              </motion.div>
            </Parallax>
          </div>
        </main>

        <Parallax speed={10}>
          <footer className="bg-gray-800 text-white mt-32 relative z-10">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">DigiSwasth</h3>
                  <p className="text-sm text-gray-400">Revolutionizing healthcare through technology</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">Home</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">Services</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">About Us</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">Cookie Policy</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Connect</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">Facebook</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">Twitter</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">LinkedIn</a></li>
                    <li><a href="#" className="text-sm text-gray-400 hover:text-white">Instagram</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} DigiSwasth. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Parallax>
      </div>
    </ParallaxProvider>
  )
}