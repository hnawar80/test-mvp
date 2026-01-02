"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "saving" | "success" | "error";

export default function NewCandidate() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("saving");

    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const profileUrl = String(data.get("cvUrl") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();

    const { error } = await supabase.from("candidates").insert({
      full_name: fullName,
      email,
      phone: phone || null,
      role,
      profile_url: profileUrl || null,
      notes: notes || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();

    // Optional: auto-hide success after 3s
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">New Candidate</CardTitle>
            <CardDescription>Create a new candidate profile in the system.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" type="text" placeholder="John Doe" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="text" placeholder="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role/Title</Label>
                <Input id="role" name="role" type="text" placeholder="Senior Software Engineer" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvUrl">CV / LinkedIn URL</Label>
                <Input id="cvUrl" name="cvUrl" type="url" placeholder="https://linkedin.com/in/johndoe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Additional information about the candidate..."
                  rows={4}
                />
              </div>

              {status === "saving" && (
                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  Saving…
                </div>
              )}

              {status === "success" && (
                <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                  Saved successfully.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  Save failed. Check the console for details.
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" disabled={status === "saving"}>
                  Continue
                </Button>

                <Button type="button" variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
