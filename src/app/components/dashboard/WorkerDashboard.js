"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import PendingDashboard from "./PendingDashboard";
import ApprovedDashboard from "./ApprovedDashboard";
import RejectedDashboard from "./RejectedDashboard";

export default function WorkerDashboard() {
  const [loading, setLoading] = useState(true);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    async function loadWorker() {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const ref = doc(db, "healthcareWorkers", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setWorker(snap.data());
      }

      setLoading(false);
    }

    loadWorker();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Worker profile not found.
      </div>
    );
  }

  const status = worker.verification?.status || "pending";

  if (status === "approved") {
    return <ApprovedDashboard worker={worker} />;
  }

  if (status === "rejected") {
    return <RejectedDashboard worker={worker} />;
  }

  return <PendingDashboard worker={worker} />;
}