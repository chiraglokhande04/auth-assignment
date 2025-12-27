import { FaUser } from "react-icons/fa"
import { useState } from "react"
import { registerUser } from "../api"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", dob: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await registerUser(form)
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user))
    navigate("/dashboard")
  }

  return (
    <AuthLayout>
      <div className="w-90 bg-[#1f2a44] rounded-xl shadow-2xl relative">

        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#7ff0ea] px-10 py-2 rounded-md font-semibold">
          REGISTER
        </div>

        <div className="h-28 bg-linear-to-r from-[#2c3b5a] to-[#1f2a44] rounded-t-xl"></div>

        <div className="flex justify-center -mt-10">
          <div className="w-20 h-20 rounded-full bg-[#8f9ab3] border-4 border-[#1f2a44] flex items-center justify-center">
            <FaUser className="text-white text-3xl" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-3">
          <input name="name" placeholder="Name" onChange={handleChange}
            className="w-full bg-[#2c3b5a] text-white p-3 rounded-md" />

          <input name="email" placeholder="Email" onChange={handleChange}
            className="w-full bg-[#2c3b5a] text-white p-3 rounded-md" />

          <input type="date" name="dob" onChange={handleChange}
            className="w-full bg-[#2c3b5a] text-white p-3 rounded-md" />

          <input type="password" name="password" placeholder="Password" onChange={handleChange}
            className="w-full bg-[#2c3b5a] text-white p-3 rounded-md" />

          <button className="w-full bg-[#7ff0ea] text-gray-800 py-3 rounded-md font-bold">
            REGISTER
          </button>

          <p className="text-center text-gray-300 text-sm">
            Already have account? <Link to="/login" className="text-[#7ff0ea]">Login</Link>
          </p>
        </form>

      </div>
    </AuthLayout>
  )
}
