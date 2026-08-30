'use client';

import Link from 'next/link';
import Navbar from './components/Navbar';
// import FirebaseNotice from './components/FirebaseNotice';
import { Button } from '@/components/ui/button';
import { Card, CardContent,  } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, FileCheck2, Wallet, Clock, 
  HeartPulse, Stethoscope, UserCheck, Sparkles, Newspaper,
  PlayCircle, Users,
  ArrowRight } from 'lucide-react';
import Footer from './components/Footer';

const App = () => {

  const latestNews = [
    {
      id: 1,
      title: "How to Prepare for Your First Home Care Assignment",
      excerpt:
        "Practical tips to help new healthcare professionals make a great first impression.",
      date: "July 28, 2026",
      category: "Career Tips",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800"
    },
  //   {
  //   id: 2,
  //   title: "Karema Kare Now Supports Appointment Tracking",
  //   excerpt:
  //     "Workers can now manage appointments, arrivals, and completion reports directly from their dashboard.",
  //   date: "July 20, 2026",
  //   category: "Platform News",
  //   image: "/nursetracking.png"
  // }
  //   {
  //     id: 2,
  //     title: "Karema Kare Now Supports Appointment Tracking",
  //     excerpt:
  //       "Workers can now manage appointments, arrivals, and completion reports directly from their dashboard.",
  //     date: "July 20, 2026",
  //     category: "Platform News",
  //     image:
  // "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800"
  //   }
  ];

  const latestVideos = [
    {
      id: 1,
      title: "Completing Your Healthcare Worker Profile",
      duration: "4 mins"
    },
    {
      id: 2,
      title: "Best Practices for Home Visits",
      duration: "8 mins"
    },
    {
      id: 3,
      title: "Communicating with Clients Professionally",
      duration: "6 mins"
    }
];
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white p-2">
      <Navbar />
      {/* <FirebaseNotice /> */}

      {/* Hero */}
      {/* <section className="pt-16 pb-24 items-center text-center px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0">
              <Sparkles className="mr-1 h-3 w-3" /> Verified freelance care, on demand
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Karema Professional  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Ecosystem.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Karema Kare Hub helps independent healthcare workers  - submit credentials, set their own daily rates, and land trusted freelance shifts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/apply">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">
                  Start your application
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">I already have an account</Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500">
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
      </section> */}
      {/* Karema Ecosystem */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">

            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0">
              <Sparkles className="mr-1 h-3 w-3" />
              The Karema Ecosystem
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              More than care.
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                A community built around people.
              </span>
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Karema brings professionals, families and organizations together
              through trusted connections, meaningful opportunities and services
              designed to make life easier.
            </p>

          </div>

          <div className="mt-8 mb-20 flex flex-wrap gap-3">
              <Link href="/apply">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">
                  Start your application
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">I already have an account</Button>
              </Link>
            </div>


          {/* Main Audience Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Professionals */}
            <Card className="group relative overflow-hidden border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300">

              <CardContent className="p-8">

                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">

                  <UserCheck className="h-7 w-7 text-emerald-600" />

                </div>

                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0 mb-4">
                  For Professionals
                </Badge>

                <h3 className="text-2xl font-bold text-slate-900">
                  Earn. Network. Grow.
                </h3>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  Earn more from the skills you already have while connecting
                  with clients, businesses and opportunities that help you
                  grow professionally.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  Build your professional future
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>

              </CardContent>

            </Card>


            {/* Families */}
            <Card className="group relative overflow-hidden border-teal-100 hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-300">

              <CardContent className="p-8">

                <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-6">

                  <HeartPulse className="h-7 w-7 text-teal-600" />

                </div>

                <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-50 border-0 mb-4">
                  For Families
                </Badge>

                <h3 className="text-2xl font-bold text-slate-900">
                  Trusted care.
                </h3>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  Find trusted professionals for your loved ones who matter most, who can provide the care and support you need
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal-600">
                  Find trusted care
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>

              </CardContent>

            </Card>


            {/* Businesses */}
            <Card className="group relative overflow-hidden border-cyan-100 hover:shadow-xl hover:shadow-cyan-100/50 transition-all duration-300">

              <CardContent className="p-8">

                <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6">

                  <Users className="h-7 w-7 text-cyan-600" />

                </div>

                <Badge className="bg-cyan-50 text-cyan-700 hover:bg-cyan-50 border-0 mb-4">
                  For Care Businesses
                </Badge>

                <h3 className="text-2xl font-bold text-slate-900">
                  People when you need them.
                </h3>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  Find the people you need, when you need them. Connect with
                  vetted professionals and access services that support your
                  organization's needs.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-600">
                  Find trusted talent
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>

              </CardContent>

            </Card>

          </div>


          {/* Core Values */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-2 md:p-10 text-white text-center shadow-xl shadow-emerald-600/20">

            <p className="text-xs md:text-xl font-semibold sm:tracking-wide">
              Trust.
              <span className="mx-1 md:mx-3 text-emerald-200">•</span>
              Opportunity.
              <span className="mx-1 md:mx-3 text-emerald-200">•</span>
              Convenience.
              <span className="mx-1 md:mx-3 text-emerald-200">•</span>
              Belonging.
            </p>

            <p className="mt-3 text-emerald-100 text-sm sm:text-base">
              Everything we build starts with people.
            </p>

          </div>


          {/* Karema Products */}
          <div className="mt-20">

            <div className="text-center mb-10">

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                One platform. Many possibilities.
              </h3>

              <p className="mt-2 text-slate-600">
                The Karema ecosystem is growing.
              </p>

            </div>


            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Karema Professionals */}
              <EcosystemCard
                title="Karema Professionals"
                description="Where professionals earn, network and grow."
                icon={UserCheck}
                active
              />

              {/* Karema Care */}
              <EcosystemCard
                title="Karema Care"
                description="Where families find trusted care."
                icon={HeartPulse}
                active
              />

              {/* Karema Business */}
              <EcosystemCard
                title="Karema Business"
                description="Where organizations find vetted talent and services."
                icon={Users}
                active
              />

              <div className="lg:col-start-2 lg:col-span-2">

                {/* Learning */}
                <EcosystemCard
                  title="Karema Learning"
                  description="CPD, tutoring, certifications and workshops."
                  icon={FileCheck2}
                />


              </div>

             <div className="lg:col-span-2">


                {/* Marketplace */}
                <EcosystemCard
                  title="Karema Marketplace"
                  description="Professional and lifestyle services."
                  icon={Wallet}
                />

              </div>

              {/* Opportunities */}
              {/* <EcosystemCard
                title="Karema Opportunities"
                description="Jobs, contracts, gigs and side hustles."
                icon={Sparkles}
              /> */}

            </div>

          </div>

        </div>
      </section>

       <section className="pt-16 pb-24 items-center text-center px-4">
        <div className="relative lg:pl-6">

        {/* Soft background glow */}
        <div className="absolute -inset-6 bg-gradient-to-br from-emerald-200 via-teal-100 to-emerald-200 rounded-[2.5rem] blur-3xl opacity-50" />

        {/* Image container */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 shadow-2xl shadow-emerald-900/10">

          <img
            src="/nurse.jpeg"
            alt="Healthcare professional using the Karema Kare Hub mobile app"
            className="
              w-full
              h-[320px]
              sm:h-[400px]
              lg:h-[520px]
              object-cover
              object-center
              transition-transform
              duration-700
              hover:scale-[1.03]
            "
          />

          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent" />

          {/* Bottom image caption */}
          {/* <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-sm font-medium text-emerald-800 shadow-lg">

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />

              Karema Professional

            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
              Work on your terms.
            </h3>

            <p className="mt-2 max-w-md text-sm sm:text-base text-white/85">
              Manage your professional profile, rates, availability and opportunities
              from wherever you are.
            </p>

          </div> */}

        </div>

        {/* Floating verification card */}
        <div className="
          absolute
          -bottom-6
          -left-4
          sm:-left-8
          bg-white
          rounded-2xl
          shadow-xl
          border
          border-emerald-100
          p-4
          sm:p-5
          flex
          items-center
          gap-3
        ">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Professional Status
            </p>

            <p className="font-semibold text-slate-900">
              Verified & Ready
            </p>
          </div>

        </div>

        {/* Floating rates card */}
        <div className="
          absolute
          -top-5
          -right-4
          sm:-right-8
          hidden
          sm:flex
          items-center
          gap-3
          rounded-2xl
          bg-white/95
          backdrop-blur-md
          border
          border-emerald-100
          shadow-xl
          px-5
          py-4
        ">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
            <Wallet className="h-5 w-5 text-teal-600" />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Your rates
            </p>

            <p className="font-bold text-slate-900">
              Set your own
            </p>
          </div>

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

      {/* News & Learning */}

      <section className="pb-24 mx-4">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-3xl font-bold">

              News & Learning

            </h2>

            <p className="text-slate-600 mt-2">

              Stay informed with healthcare news, platform updates and training videos.

            </p>

          </div>

          <Link href="/news">

            <Button variant="outline">

              View All

              <ArrowRight className="ml-2 h-4 w-4"/>

            </Button>

          </Link>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Latest News */}

          <div className="lg:col-span-3">

            <div className="space-y-6">

              {latestNews.map((article)=>(

                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300"
                >

                  <div className="grid md:grid-cols-3">

                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />

                    <CardContent className="md:col-span-2 p-6">

                      <Badge className="bg-emerald-100 text-emerald-700">

                        <Newspaper className="h-3 w-3 mr-1"/>

                        {article.category}

                      </Badge>

                      <h3 className="text-xl font-bold mt-4">

                        {article.title}

                      </h3>

                      <p className="text-slate-600 mt-3">

                        {article.excerpt}

                      </p>

                      <div className="flex justify-between items-center mt-6">

                        <span className="text-sm text-slate-500">

                          {article.date}

                        </span>

                        <Button variant="ghost">

                          Read More

                        </Button>

                      </div>

                    </CardContent>

                  </div>

                </Card>

              ))}

            </div>

          </div>

          {/* Video Library */}

          {/* <Card className="border-emerald-100">

            <CardContent className="p-6">

              <div className="flex items-center gap-3 mb-6">

                <PlayCircle className="text-emerald-600"/>

                <h3 className="font-bold text-xl">

                  Latest Training

                </h3>

              </div>

              <div className="space-y-4">

                {latestVideos.map(video=>(

                  <button
                    key={video.id}
                    className="w-full text-left rounded-xl border p-4 hover:bg-emerald-50 transition"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="font-semibold">

                          {video.title}

                        </p>

                        <p className="text-sm text-slate-500 mt-1">

                          {video.duration}

                        </p>

                      </div>

                      <PlayCircle className="text-emerald-600"/>

                    </div>

                  </button>

                ))}

              </div>

              <Link href="/learning">

                <Button
                  className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
                >

                  Browse Video Library

                </Button>

              </Link>

            </CardContent>

          </Card> */}

        </div>

      </section>



      {/* <footer className="border-t border-slate-100 py-8">
        <div className="container text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Karema Kare Hub. Built for verified freelance care.
        </div>
      </footer> */}

      {/* <Footer /> */}
    </div>
  );
};

function EcosystemCard({
  title,
  description,
  icon: Icon,
  active = false
}) {

  return (

    <Card
      className={`
        relative overflow-hidden
        rounded-2xl
        border
        transition-all
        duration-300
        ${
          active
            ? "border-emerald-200 hover:border-emerald-400 hover:shadow-lg"
            : "border-slate-200 bg-slate-50/70"
        }
      `}
    >

      <CardContent className="p-6">

        <div className="flex items-start justify-between">

          <div
            className={`
              w-11
              h-11
              rounded-xl
              flex
              items-center
              justify-center
              ${
                active
                  ? "bg-emerald-100"
                  : "bg-slate-200"
              }
            `}
          >

            <Icon
              className={
                active
                  ? "text-emerald-600"
                  : "text-slate-500"
              }
              size={21}
            />

          </div>


          {!active && (

            <Badge
              variant="outline"
              className="text-xs"
            >
              Coming Soon
            </Badge>

          )}

        </div>


        <h4 className="mt-5 text-lg font-bold text-slate-900">
          {title}
        </h4>


        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {description}
        </p>


        {active && (

          <div className="mt-4 text-xs font-semibold text-emerald-600">
            Available now
          </div>

        )}

      </CardContent>

    </Card>

  );

}


export default App;