"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


type Candidate = {
  id: string;
  full_name: string;
  email: string | null;
  role: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCandidates = async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("id, full_name, email, role, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching candidates:", error);
      } else {
        setCandidates(data ?? []);
      }

      setLoading(false);
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (candidateId: string) => {
    setActionError(null);
  
    const ok = confirm("Delete this candidate?");
    if (!ok) return;
  
    const { data, error } = await supabase
      .from("candidates")
      .delete()
      .eq("id", candidateId)
      .select("id"); // ensures we know if a row was actually deleted
  
    if (error) {
      console.error("Delete failed:", error);
      setActionError("Delete failed. Please try again.");
      return;
    }
  
    if (!data || data.length === 0) {
      // This happens when RLS blocks delete or the record doesn't exist
      setActionError("Delete was blocked (no rows deleted).");
      return;
    }
  
    // Only update UI if Supabase confirmed a row was deleted
    setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/candidate/new">New Candidate</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            {actionError && (
              <div className="mb-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {actionError}
              </div>
            )}
            {loading && <p className="text-sm text-gray-500">Loading…</p>}

            {!loading && candidates.length === 0 && (
              <p className="text-sm text-gray-500">No candidates yet.</p>
            )}

            {deleteError && (
              <p className="mb-3 text-sm text-red-600">{deleteError}</p>
            )}

            {!loading && candidates.length > 0 && (
              <div className="divide-y">
                {candidates.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium">{c.full_name}</div>
                      <div className="text-sm text-gray-600">
                        {c.role || "—"} · {c.email || "No email"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/candidate/${c.id}`}>View</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
