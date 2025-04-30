import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { X, UserCircle } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [otpModel, setOtpModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const[error,setError]=useState("")
  const toastShown = useRef(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    if (loading) return; // 🔒 Prevent toggle during loading
    setIsLogin(!isLogin);
    setError("")
    setFormData({ username: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    if (loading) return; // 🔒 Prevent change during loading
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // 🔒 Prevent double submit
    setLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await axios.post("http://localhost:3000/interview/login", {
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.data);
          navigate('/', { state: { loginSuccess: true } });
        }
      } else {
        response = await axios.post("http://localhost:3000/interview/otpsent", { formData });
        if (response.status === 200) {
          setOtpModel(true);
          setError("")
        }
      }
      toast.success(response.data.message);
    } catch (error) {
      console.error("Submit Error:", error);
      setError(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (loading) return; // 🔒 Prevent double OTP submit
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/interview/verifyotp", {
        otp,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsLogin(true);
        setOtpModel(false);
        setError("")
      }
    } catch (error) {
      console.error("OTP Verify Error:", error);
      setError(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setOtp("");
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-blue-200 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative">
        <div className="flex flex-col items-center mb-6">
          <UserCircle className="text-sky-500" size={64} />
          <h2 className="text-3xl font-bold text-sky-600 mt-2">{isLogin ? "Login" : "Sign Up"}</h2>
        </div>
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-6 text-gray-400 hover:text-gray-600 text-3xl"
           aria-label='X'
        >
          ×
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading} // 🔒
              className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading} // 🔒
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading} // 🔒
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
          {
            error && <div className="text-red-600 text-sm mt-2">
              {error}
            </div>
          }
          <button
            type="submit"
            disabled={loading} // 🔒
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold text-lg transition duration-300 disabled:opacity-60"
           aria-label={ isLogin ? "Login" : "Sign Up"}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ReactLoading type="spin" color="white" height={25} width={25} />
              </div>
            ) : (
              isLogin ? "Login" : "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={toggleForm}
            className="text-sky-600 font-semibold hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

        {otpModel && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form
              onSubmit={verifyOtp}
              className="flex flex-col items-center w-[90%] max-w-sm p-8 bg-white rounded-2xl shadow-xl gap-5 relative"
            >
              <X
                size={28}
                className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-black"
                onClick={() => !loading && setOtpModel(false)} // 🔒 Prevent close if loading
              />
              <h3 className="text-xl font-bold text-sky-600 mb-2">OTP Verification</h3>
              <input
                type="text"
                value={formData.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter your OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading} // 🔒
                className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
              />
                   {
            error && <div className="text-red-600 text-sm mt-2">
              {error}
            </div>
          }
              <button
                type="submit"
                disabled={loading} // 🔒
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold text-lg transition duration-300 disabled:opacity-60"
              aria-label="Verify OTP"
              >
                {loading ? (
                  <ReactLoading type="spin" color="white" height={20} width={20} />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
