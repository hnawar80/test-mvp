"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Candidate = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  role: string | null;
  profile_url: string | null;
  notes: string | null;
  created_at: string;
};

export default function CandidateDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!id) {
        setError("No candidate ID provided");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("candidates")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error fetching candidate:", fetchError);
        setError("Failed to load candidate details");
      } else if (!data) {
        setError("Candidate not found");
      } else {
        setCandidate(data);
      }

      setLoading(false);
    };

    fetchCandidate();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Candidate Details</h1>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {loading ? "Loading..." : candidate?.full_name || "Candidate"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <p className="text-sm text-gray-500">Loading candidate details…</p>
            )}

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {error}
              </div>
            )}

            {!loading && !error && candidate && (
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Full Name</div>
                  <div className="mt-1 text-base">{candidate.full_name}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Email</div>
                  <div className="mt-1 text-base">
                    {candidate.email ? (
                      <a
                        href={`mailto:${candidate.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {candidate.email}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Phone</div>
                  <div className="mt-1 text-base">
                    {candidate.phone || <span className="text-gray-400">—</span>}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Role</div>
                  <div className="mt-1 text-base">
                    {candidate.role || <span className="text-gray-400">—</span>}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Profile URL</div>
                  <div className="mt-1 text-base">
                    {candidate.profile_url ? (
                      <a
                        href={candidate.profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {candidate.profile_url}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Notes</div>
                  <div className="mt-1 text-base whitespace-pre-wrap">
                    {candidate.notes || <span className="text-gray-400">—</span>}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Created At</div>
                  <div className="mt-1 text-base">
                    {new Date(candidate.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

