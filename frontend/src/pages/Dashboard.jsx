import { FaCog, FaTimes, FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const users = [
  { id: 1, name: "Michael Holz", date: "04/10/2013", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 2, name: "Paula Wilson", date: "05/08/2014", role: "Publisher", status: "Active", avatar: "https://i.pravatar.cc/100?img=32" },
  { id: 3, name: "Antonio Moreno", date: "11/05/2015", role: "Publisher", status: "Suspended", avatar: "https://i.pravatar.cc/100?img=52" },
  { id: 4, name: "Mary Saveley", date: "06/09/2016", role: "Reviewer", status: "Active", avatar: "https://i.pravatar.cc/100?img=45" },
  { id: 5, name: "Martin Sommer", date: "12/08/2017", role: "Moderator", status: "Inactive", avatar: "https://i.pravatar.cc/100?img=68" }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Bar */}
      <div className="bg-white shadow-sm px-10 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700">User Management</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {user.name}</span>
          <button onClick={logout} className="text-red-500 hover:text-red-600">
            <FaSignOutAlt size={18} />
          </button>
        </div>
      </div>

      <div className="p-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-500 text-sm uppercase">
                <th className="p-5 text-left">#</th>
                <th className="p-5 text-left">User</th>
                <th className="p-5 text-left">Date Created</th>
                <th className="p-5 text-left">Role</th>
                <th className="p-5 text-left">Status</th>
                <th className="p-5 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-5">{i + 1}</td>

                  <td className="p-5 flex items-center gap-4">
                    <img src={u.avatar} className="w-12 h-12 rounded-full" />
                    <span className="font-medium text-gray-700">{u.name}</span>
                  </td>

                  <td className="p-5 text-gray-500">{u.date}</td>

                  <td className="p-5">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-5">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : u.status === "Suspended"
                        ? "bg-red-100 text-red-500"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        u.status === "Active"
                          ? "bg-green-500"
                          : u.status === "Suspended"
                          ? "bg-red-500"
                          : "bg-yellow-400"
                      }`}></span>
                      {u.status}
                    </span>
                  </td>

                  <td className="p-5 flex justify-center gap-3">
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <FaCog />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200">
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  )
}
