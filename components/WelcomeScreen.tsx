import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WelcomeScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-[420px]">
        <div className="h-24 rounded-t-xl bg-gradient-to-r from-blue-500 to-purple-600" />
        <CardHeader className="pb-4">
          <div className="h-28 w-full rounded-md bg-gray-200 mb-4" />
          <CardTitle className="text-center text-2xl">
            Welcome To Talents
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-2">
          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="w-full h-12 rounded-xl text-base">
              <Link href="/candidate/new">New Candidate</Link>
            </Button>

            <Button asChild size="lg" className="w-full h-12 rounded-xl text-base">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}