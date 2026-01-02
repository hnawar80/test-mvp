export default function DebugPage() {
    return (
      <div className="min-h-screen p-10 bg-red-200">
        <div className="bg-blue-500 text-white p-6 rounded-xl mb-6">
          Tailwind utilities test (should be blue box, white text, rounded).
        </div>
  
        <div className="space-y-4">
          <div className="bg-green-300 p-4">Item 1</div>
          <div className="bg-green-300 p-4">Item 2</div>
        </div>
      </div>
    );
  }
  