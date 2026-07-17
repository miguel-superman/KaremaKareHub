// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import FirebaseNotice from '@/components/FirebaseNotice';
// import { useAuth } from '@/components/AuthProvider';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
// import { toast } from 'sonner';
// import { Users, CheckCircle2, XCircle, Clock, ShieldCheck, ExternalLink, Search } from 'lucide-react';

// const App = () => {
//   const router = useRouter();
//   const { user, loading, getToken, isFirebaseConfigured } = useAuth();
//   const [me, setMe] = useState(null);
//   const [items, setItems] = useState([]);
//   const [tab, setTab] = useState('pending');
//   const [q, setQ] = useState('');
//   const [selected, setSelected] = useState(null);
//   const [rejectReason, setRejectReason] = useState('');

//   const load = async (status) => {
//     try {
//       const token = await getToken();
//       const res = await fetch(`/api/applications?status=${status}`, { headers: { Authorization: `Bearer ${token}` } });
//       const j = await res.json();
//       setItems(j.items || []);
//     } catch (e) {
//       toast.error('Failed to load');
//     }
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (!isFirebaseConfigured) return;
//     if (!user) { router.push('/login'); return; }
//     (async () => {
//       const token = await getToken();
//       const meRes = await fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } });
//       const meJson = await meRes.json();
//       setMe(meJson);
//       if (!meJson.isAdmin) return;
//       await load(tab);
//     })();
//   }, [user, loading, tab]);

//   const approve = async (id) => {
//     const token = await getToken();
//     const res = await fetch(`/api/applications/${id}/approve`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
//     if (res.ok) { toast.success('Approved'); setSelected(null); load(tab); }
//     else toast.error('Failed');
//   };

//   const reject = async (id) => {
//     const token = await getToken();
//     const res = await fetch(`/api/applications/${id}/reject`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ reason: rejectReason }) });
//     if (res.ok) { toast.success('Rejected'); setSelected(null); setRejectReason(''); load(tab); }
//     else toast.error('Failed');
//   };

//   if (loading) return <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white"><Navbar /><div className="container py-20 text-center text-slate-500">Loading...</div></div>;

//   if (!isFirebaseConfigured) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
//         <Navbar />
//         <FirebaseNotice />
//         <div className="container py-20 text-center text-slate-500">Add Firebase keys to access admin dashboard.</div>
//       </div>
//     );
//   }

//   if (me && !me.isAdmin) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
//         <Navbar />
//         <div className="container py-20 text-center">
//           <ShieldCheck className="mx-auto h-12 w-12 text-slate-400 mb-3" />
//           <p className="text-slate-600">You don&apos;t have admin access.</p>
//           <p className="text-sm text-slate-500 mt-1">Add your email to <code>ADMIN_EMAILS</code> in <code>.env</code> to grant access.</p>
//         </div>
//       </div>
//     );
//   }

//   const filtered = items.filter((i) => !q || (i.fullName || '').toLowerCase().includes(q.toLowerCase()) || (i.email || '').toLowerCase().includes(q.toLowerCase()) || (i.role || '').toLowerCase().includes(q.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
//       <Navbar />

//       <div className="container py-10">
//         <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2"><Users className="h-7 w-7 text-emerald-600" /> Admin Portal</h1>
//             <p className="text-slate-600">Review and verify healthcare worker applications</p>
//           </div>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//             <Input placeholder="Search name, email, role..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9 w-72" />
//           </div>
//         </div>

//         <Tabs value={tab} onValueChange={setTab}>
//           <TabsList className="grid w-full max-w-md grid-cols-3">
//             <TabsTrigger value="pending" className="gap-1"><Clock className="h-3 w-3" /> Pending</TabsTrigger>
//             <TabsTrigger value="approved" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Approved</TabsTrigger>
//             <TabsTrigger value="rejected" className="gap-1"><XCircle className="h-3 w-3" /> Rejected</TabsTrigger>
//           </TabsList>

//           <TabsContent value={tab} className="mt-6">
//             {filtered.length === 0 ? (
//               <Card><CardContent className="py-16 text-center text-slate-500">No applications in this category.</CardContent></Card>
//             ) : (
//               <div className="grid gap-4">
//                 {filtered.map((a) => (
//                   <Card key={a.id} className="hover:shadow-md transition-shadow">
//                     <CardContent className="p-5 flex flex-wrap items-center gap-4">
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h3 className="font-semibold text-slate-900">{a.fullName || 'Unnamed'}</h3>
//                           <Badge variant="outline" className="text-xs">{a.role || '—'}</Badge>
//                         </div>
//                         <p className="text-sm text-slate-600 truncate">{a.email} · {a.phone || 'no phone'}</p>
//                         <p className="text-xs text-slate-500 mt-1">License: {a.licenseNumber || '—'} · {a.yearsOfExperience || 0}y exp · {a.currency} {a.dailyRate}/day</p>
//                       </div>
//                       <Button variant="outline" size="sm" onClick={() => setSelected(a)}>Review</Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>

//       <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
//         <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
//           <DialogHeader><DialogTitle>Application Review</DialogTitle></DialogHeader>
//           {selected && (
//             <div className="space-y-4 text-sm">
//               <div className="grid grid-cols-2 gap-3">
//                 <div><span className="text-slate-500">Name:</span> <span className="font-medium">{selected.fullName}</span></div>
//                 <div><span className="text-slate-500">Email:</span> {selected.email}</div>
//                 <div><span className="text-slate-500">Phone:</span> {selected.phone}</div>
//                 <div><span className="text-slate-500">DOB:</span> {selected.dob}</div>
//                 <div className="col-span-2"><span className="text-slate-500">Address:</span> {selected.address}</div>
//                 <div><span className="text-slate-500">Role:</span> <span className="font-medium">{selected.role}</span></div>
//                 <div><span className="text-slate-500">Experience:</span> {selected.yearsOfExperience} years</div>
//                 <div><span className="text-slate-500">License #:</span> {selected.licenseNumber}</div>
//                 <div><span className="text-slate-500">Rate:</span> <span className="font-semibold">{selected.currency} {selected.dailyRate}/day</span></div>
//                 <div className="col-span-2"><span className="text-slate-500">Specializations:</span> {(selected.specializations || []).join(', ') || '—'}</div>
//                 <div className="col-span-2"><span className="text-slate-500">Availability:</span> {(selected.availability || []).join(', ') || '—'}</div>
//                 {selected.bio && <div className="col-span-2"><span className="text-slate-500">Bio:</span> {selected.bio}</div>}
//               </div>

//               <div>
//                 <p className="font-semibold mb-2">Documents</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   {Object.entries(selected.documents || {}).map(([k, v]) => v ? (
//                     <a key={k} href={v} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded border border-slate-200 p-2 text-emerald-700 hover:bg-emerald-50">
//                       <ExternalLink className="h-3 w-3" /> <span className="truncate">{k}</span>
//                     </a>
//                   ) : null)}
//                   {selected.profilePhoto && (
//                     <a href={selected.profilePhoto} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded border border-slate-200 p-2 text-emerald-700 hover:bg-emerald-50">
//                       <ExternalLink className="h-3 w-3" /> profilePhoto
//                     </a>
//                   )}
//                 </div>
//               </div>

//               {selected.status === 'pending' && (
//                 <div className="space-y-2 pt-2">
//                   <Input placeholder="Rejection reason (optional)" value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} />
//                 </div>
//               )}
//             </div>
//           )}
//           <DialogFooter className="gap-2">
//             <Button variant="outline" onClick={() => reject(selected.id)} className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
//             <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => approve(selected.id)}>Approve</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default App;

// "use client";

// import WorkerTable from "../components/admin/WorkerTable";


// export default function AdminDashboard(){


//   return (

//     <main className="min-h-screen bg-slate-50">


//     <div className="max-w-7xl mx-auto px-6 py-10">


//     <h1 className="text-3xl font-bold">

//     Admin Verification Dashboard

//     </h1>


//     <p className="text-gray-500 mt-2">

//     Review and approve healthcare professionals.

//     </p>



//     <WorkerTable />


//     </div>


//     </main>

//   );


// }

"use client";

import WorkerTable from "../components/admin/WorkerTable";
import { ShieldCheck } from "lucide-react";
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white">
        <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Admin Verification Dashboard
          </h1>
        </div>
        <p className="text-slate-600 ml-[52px]">
          Review and approve healthcare professionals.
        </p>

        {/* Table card */}
        <div className="mt-8 relative">
          <div className="absolute -inset-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl blur-xl opacity-40 pointer-events-none"></div>
          <div className="relative rounded-2xl border border-emerald-100 bg-white shadow-xl shadow-emerald-600/5 overflow-hidden">
            <WorkerTable />
          </div>
        </div>
      </div>
    </main>
  );
}