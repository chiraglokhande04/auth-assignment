import { FaUser, FaLock } from "react-icons/fa"
import { useState } from "react"
import { loginUser } from "../api"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await loginUser(form)
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user))
    navigate("/dashboard")
  }

  return (
    <AuthLayout>
      <div className="w-90 bg-[#1f2a44] rounded-xl shadow-2xl relative">

        {/* SIGN IN */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#7ff0ea] text-gray-800 px-10 py-2 rounded-md font-semibold shadow-md">
          SIGN IN
        </div>

        {/* Top wave */}
        <div className="h-28 bg-linear-to-r from-[#2c3b5a] to-[#1f2a44] rounded-t-xl"></div>

        {/* Avatar */}
        <div className="flex justify-center -mt-10">
          <div className="w-20 h-20 rounded-full bg-[#8f9ab3] border-4 border-[#1f2a44] flex items-center justify-center">
            <FaUser className="text-white text-3xl"/>
          </div>
        </div>

        <div className="p-8 space-y-4">

          {/* Username */}
          <div className="flex items-center bg-[#2c3b5a] rounded-md px-3 py-3">
            <FaUser className="text-gray-300"/>
            <input
              name="email"
              placeholder="email"
              onChange={handleChange}
              className="ml-3 w-full bg-transparent outline-none text-white placeholder-gray-300"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-[#2c3b5a] rounded-md px-3 py-3">
            <FaLock className="text-gray-300"/>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              className="ml-3 w-full bg-transparent outline-none text-white placeholder-gray-300"
            />
          </div>

          <div className="flex justify-between text-xs text-[#7ff0ea]">
            <span>Remember me</span>
            <span>Forgot your password?</span>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#7ff0ea] text-gray-800 py-3 rounded-md font-bold tracking-wide shadow-md"
          >
            LOGIN
          </button>

          <p className="text-center text-gray-300 text-sm">
            No account? <Link to="/register" className="text-[#7ff0ea]">Register</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
