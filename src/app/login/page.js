'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
// import FirebaseNotice from '../components/FirebaseNotice';
import { useAuth } from '../components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { HeartPulse } from 'lucide-react';
import { getWorker } from "../lib/user";

const App = () => {
const router = useRouter();

const { login } = useAuth();
  // const { login, isFirebaseConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

//   const login = async (email, password) => {

//     // const credential =
//     //     await signInWithEmailAndPassword(
//     //         auth,
//     //         email,
//     //         password
//     //     );

//     // return credential.user;

//     const user =
//     await login(
//         email,
//         password
//           );

//       const worker =
//           await getWorker(user.uid);

//       if(!worker){

//           toast.error(
//               "Application not found."
//           );

//           return;

//       }

//       router.push("/dashboard");

// };




  // const handleSubmit = async (e) => {

  //     e.preventDefault();

  //     setLoading(true);

  //     try {

  //         const user = await login(
  //             email,
  //             password
  //         );


  //         toast.success(
  //             "Welcome back!"
  //         );


  //         router.push("/dashboard");


  //     } catch(err){

  //         console.error(err);

  //         toast.error(
  //             err.message || "Login failed"
  //         );


  //     } finally {

  //         setLoading(false);

  //     }

  // };
  //   e.preventDefault();
  //   const { login } = useAuth();
  //   setLoading(true);
  //   try {
  //     await login(email, password);
  //     toast.success('Welcome back!');
  //     router.push('/dashboard');
  //   } catch (err) {
  //     toast.error(err.message || 'Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);


    try {


        const user = await login(
            email,
            password
        );


        const worker =
            await getWorker(user.uid);



        if(!worker){

            toast.error(
                "Worker profile not found."
            );

            return;

        }



        toast.success(
            "Welcome back!"
        );


        router.push(
            "/dashboard"
        );



    } catch(err){


        console.error(err);


        toast.error(
            err.message || "Login failed"
        );


    } finally {


        setLoading(false);


    }

};

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white p-4">
      <Navbar />
      {/* <FirebaseNotice /> */}
      <div className=" flex justify-center pt-16 pb-24">
        <Card className="w-full max-w-md border-emerald-100 shadow-xl shadow-emerald-100/50 p-8">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
              <HeartPulse className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to access your Karema Kare Proffessional Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
              <p className="text-center text-sm text-slate-600">
                Don&apos;t have an account?{' '}
                <Link href="/apply" className="font-semibold text-emerald-700 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


export default App;