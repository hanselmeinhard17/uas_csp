import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '../actions/auth'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-4">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <h1 className="text-xl text-gray-700">
            Halo <b>{user.email}!</b>
          </h1>
        </div>

        <form action={logout}>
          <button className="bg-red-600 text-white px-4 py-2 rounded-xl">
            Logout
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {announcements?.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.content}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
