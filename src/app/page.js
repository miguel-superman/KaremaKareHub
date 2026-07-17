'use client';

import Link from 'next/link';
import Navbar from './components/Navbar';
// import FirebaseNotice from './components/FirebaseNotice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, FileCheck2, Wallet, Clock, HeartPulse, Stethoscope, UserCheck, Sparkles } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white p-2">
      <Navbar />
      {/* <FirebaseNotice /> */}

      {/* Hero */}
      <section className="pt-16 pb-24 items-center text-center px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0">
              <Sparkles className="mr-1 h-3 w-3" /> Verified freelance care, on demand
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Get verified. <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Get hired.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              CareConnect helps independent healthcare workers — RNs, LPNs, CNAs, HHAs and caregivers — submit credentials, set their own daily rates, and land trusted freelance shifts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">
                  Start your application
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">I already have an account</Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> HIPAA-aware storage</div>
              <div className="flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-emerald-600" /> Credential verification</div>
              <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-emerald-600" /> Set your own rates</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-3xl blur-2xl opacity-40"></div>
            <Card className="relative border-emerald-100 shadow-2xl shadow-emerald-600/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <UserCheck className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Application Status</p>
                    <p className="font-semibold text-slate-900">Verified – Ready for shifts</p>
                  </div>
                  <Badge className="ml-auto bg-emerald-600 hover:bg-emerald-600">Approved</Badge>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Stethoscope, label: 'Registered Nurse • 8 years', value: '$580/day' },
                    { icon: FileCheck2, label: 'Government ID', value: 'Verified' },
                    { icon: FileCheck2, label: 'RN License #2384912', value: 'Verified' },
                    { icon: Clock, label: 'Availability', value: 'Mon–Fri' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3">
                      <div className="flex items-center gap-3 text-sm text-slate-700">
                        <r.icon className="h-4 w-4 text-emerald-600" />
                        {r.label}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{r.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className=" pb-24 mx-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How it works</h2>
          <p className="mt-2 text-slate-600">Three steps to start earning as a freelance healthcare pro.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: '01', title: 'Create your account', desc: 'Sign up with email and password. Takes less than a minute.', icon: HeartPulse },
            { n: '02', title: 'Submit credentials', desc: 'Upload ID, license, certifications and set your daily rate.', icon: FileCheck2 },
            { n: '03', title: 'Get verified & hired', desc: 'Our team reviews your profile and unlocks shift opportunities.', icon: ShieldCheck },
          ].map((s) => (
            <Card key={s.n} className="border-emerald-100 hover:shadow-lg hover:shadow-emerald-100 transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600">{s.n}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 mx-4">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-10 sm:p-16 text-white text-center shadow-2xl shadow-emerald-600/30">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to freelance on your terms?</h2>
          <p className="mt-3 text-emerald-100 max-w-xl mx-auto">Join hundreds of verified healthcare professionals earning better rates with CareConnect.</p>
          <Link href="/apply">
            <Button size="lg" className="mt-8 bg-white text-emerald-700 hover:bg-emerald-50">Start your application →</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8">
        <div className="container text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} CareConnect. Built for verified freelance care.
        </div>
      </footer>
    </div>
  );
};


export default App;