export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">🎉 Here's Your Sample Lead List</h2>
      <p className="mb-6">You’ll receive a CSV file of 100 niche investors via email shortly.</p>
      <a
        href="/sample-leads.csv"
        download
        className="inline-block bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600"
      >
        Download Sample Leads
      </a>
    </div>
  )
}
