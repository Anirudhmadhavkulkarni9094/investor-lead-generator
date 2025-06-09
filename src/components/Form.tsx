import { useState } from 'react'
import { useRouter } from 'next/router'

export default function FormPage() {
  const [form, setForm] = useState({ niche: '', stage: '', region: '', email: '' })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    router.push('/leads')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold">Get Free Investor Leads</h2>

        <input className="w-full border p-3 rounded" name="email" placeholder="Your Email" required onChange={handleChange} />
        <input className="w-full border p-3 rounded" name="niche" placeholder="Startup Niche (e.g. SaaS, Fintech)" required onChange={handleChange} />
        <input className="w-full border p-3 rounded" name="stage" placeholder="Funding Stage (e.g. Seed, Series A)" required onChange={handleChange} />
        <input className="w-full border p-3 rounded" name="region" placeholder="Preferred Region (e.g. US, India)" required onChange={handleChange} />

        <button className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600" type="submit">
          Submit & Get Leads
        </button>
      </form>
    </div>
  )
}
