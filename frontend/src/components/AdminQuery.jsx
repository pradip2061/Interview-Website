import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { X, UserCircle,User2Icon} from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

const AdminQuery = () => {
  const [loading, setLoading] = useState(false);
  const[error,setError]=useState("")
  const[toggle,setToggle]=useState("theory")
  const toastShown = useRef(false);
  const [formData, setFormData] = useState({
    Topic:"",
    question: "",
    theory: "",
    code:"",
    category:"",
    outputQuestion:"",
    language:""
  });
  console.log(formData)
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (loading) return; // 🔒 Prevent change during loading
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // 🔒 Prevent double submit
    setLoading(true);
    try {
        const token = await localStorage.getItem("token")
      
       const response = await axios.post(`${BASE_URL}/htmlqueryTheory`, {formData},{
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

  const handleSubmitOutput = async (e) => {
    e.preventDefault();
    if (loading) return; // 🔒 Prevent double submit
    setLoading(true);
    try {
        const token = await localStorage.getItem("token")
      
       const response = await axios.post(`${BASE_URL}/htmlqueryOutput`, {formData},{
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
    <div className="min-h-screen flex  flex-col items-center justify-center bg-gradient-to-r from-sky-100 to-blue-200 p-4">
    <div className="flex space-x-10 mb-10">
    <button
  className={`${toggle === "theory" ? "bg-sky-600" : "bg-sky-300"} w-full px-2 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold text-lg transition duration-300`}
  onClick={() => setToggle("theory")}
>
  theory
</button>

<button
  className={`${toggle === "output" ? "bg-sky-600" : "bg-sky-300"} w-full px-2 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold text-lg transition duration-300`}
  onClick={() => setToggle("output")}
>
  output
</button>
</div>
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
       {
        toggle === "theory" ? <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="Topic"
              placeholder="Topic"
              value={formData.Topic || ""}
              onChange={handleChange}
              required
              disabled={loading} // 🔒
              className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
            />
          <textarea
            type="text"
            name="question"
            placeholder="enter the questions"
            value={formData.question || ""}
            onChange={handleChange}
            required
            disabled={loading} // 🔒
            rows={6}
            cols={50}
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
          <textarea
            type="text"
            name="theory"
            placeholder="theory"
            value={formData.theory || ""}
            onChange={handleChange}
            disabled={loading} // 🔒
            rows={6}
            cols={50}
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
          <textarea
            type="text"
            name="code"
            placeholder="enter the code"
            value={formData.code || ""}
            onChange={handleChange}
            disabled={loading} // 🔒
            rows={6}
            cols={50}
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
          <input
            type="text"
            name="category"
            placeholder="category"
            value={formData.category || ""}
            onChange={handleChange}
            required
            disabled={loading} // 🔒
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
           <input
            type="text"
            name="language"
            placeholder="enter the language"
            value={formData.language || ""}
            onChange={handleChange}
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
          aria-label="Submit"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ReactLoading type="spin" color="white" height={25} width={25} />
              </div>
            ) : <div>Submit</div>}
          </button>
        </form>: <form onSubmit={handleSubmitOutput} className="space-y-4">
            <input
              type="text"
              name="Topic"
              placeholder="Topic"
              value={formData.Topic || ""}
              onChange={handleChange}
              required
              disabled={loading} // 🔒
              className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
            />
          <textarea
            type="text"
            name="question"
            placeholder="enter the questions"
            value={formData.question || ""}
            onChange={handleChange}
            disabled={loading} // 🔒
            rows={6}
            cols={50}
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
          <textarea
            type="text"
            name="outputQuestion"
            placeholder="outputQuestion"
            value={formData.outputQuestion || ""}
            onChange={handleChange}
            disabled={loading} // 🔒
            rows={6}
            cols={50}
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
           <textarea
            type="text"
            name="theory"
            placeholder="theory"
            value={formData.theory || ""}
            onChange={handleChange}
            disabled={loading} // 🔒
            rows={6}
            cols={50}
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
          <input
            type="text"
            name="category"
            placeholder="category"
            value={formData.category || ""}
            onChange={handleChange}
            required
            disabled={loading} // 🔒
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
          />
          <input
            type="text"
            name="language"
            placeholder="enter the language"
            value={formData.language || ""}
            onChange={handleChange}
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
          aria-label="Submit"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ReactLoading type="spin" color="white" height={25} width={25} />
              </div>
            ) : <div>Submit</div>}
          </button>
        </form>
       }
        </div>
        </div>
  );
};

export default AdminQuery;
