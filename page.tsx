export default function UserDashboard() {
    return (
      <main className="min-h-screen p-8 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a]">
        <h1 className="text-3xl font-bold mb-6">Browse Stores</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {/* You’ll map real StoreCard components here later */}
          <div className="bg-white dark:bg-[#222] p-6 rounded-2xl shadow">Store A</div>
          <div className="bg-white dark:bg-[#222] p-6 rounded-2xl shadow">Store B</div>
        </div>
      </main>
    );
  }
  