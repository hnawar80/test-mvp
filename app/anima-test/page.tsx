import AnimaTestScreen from "@/components/anima/AnimaTestScreen";

export default function AnimaTestPage() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-xl font-semibold">Anima Test</h1>
      <p className="text-sm text-gray-500 mt-1">
        Sandbox page for validating Anima exports.
      </p>

      <div className="mt-6 rounded-lg border p-6">
        <AnimaTestScreen />
      </div>
    </main>
  );
}
