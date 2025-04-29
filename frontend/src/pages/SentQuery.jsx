import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { X, UserCircle } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

const SentQuery = () => {
  const [loading, setLoading] = useState(false);
  const[error,setError]=useState("")
  const toastShown = useRef(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    remarks: "",
  });
  const navigate = useNavigate();

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
        const token = await localStorage.getItem("token")
      
       const response = await axios.post("http://localhost:3000/interview/userquery", {formData},{
            headers:{
                Authorization:`${token}`
            }
        });
        if (response.status === 200) {
          setError("")
          toast.success(response.data.message);
          setFormData({
            question: "",
            answer: "",
            remarks: "",
          })
        }
    } catch (error) {
      console.error("Submit Error:", error);
      setError(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-blue-200 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative">
        <div className="flex flex-col items-center mb-6">
          <UserCircle className="text-sky-500" size={64} />
          <h2 className="text-3xl font-bold text-sky-600 mt-2">Sent Query</h2>
        </div>
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-6 text-gray-400 hover:text-gray-600 text-3xl"
        >
          ×
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="question"
              placeholder="Questions"
              value={formData.question}
              onChange={handleChange}
              required
              disabled={loading} // 🔒
              className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
            />
          <input
            type="text"
            name="answer"
            placeholder="answer"
            value={formData.answer}
            onChange={handleChange}
            required
            disabled={loading} // 🔒
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
          <input
            type="text"
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
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
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ReactLoading type="spin" color="white" height={25} width={25} />
              </div>
            ) : <div>Submit</div>}
          </button>
        </form>
        </div>
        </div>
  );
};

export default SentQuery;
