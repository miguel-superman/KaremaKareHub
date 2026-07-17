export default function ApplicationStatus(){


return (

<main className="min-h-screen bg-slate-50 flex items-center justify-center">


<div className="bg-white shadow-lg rounded-3xl p-10 text-center max-w-lg">


<div className="text-5xl">

⏳

</div>



<h1 className="text-3xl font-bold mt-5">

Application Under Review

</h1>



<p className="text-gray-500 mt-4">

Thank you for applying to KameraCare Hub.

Our verification team is reviewing your documents.

</p>



<div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">


<p className="font-semibold text-yellow-700">

Status: Pending Verification

</p>


</div>


</div>


</main>

);


}