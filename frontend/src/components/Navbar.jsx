import React, { useEffect, useState, useContext } from 'react';
import { Search, Code2, LogIn, UserPlus, X, LogOut } from 'lucide-react';
import { SearchContext } from '../ContextApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { setSearch } = useContext(SearchContext);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(searchValue);
    console.log(searchValue)
    setSearchValue('');
    setSearchBar(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Logged out successfully!');
    navigate('/'); // ✅ After logout, redirect user to home page
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  const sentQuery = async()=>{
    const token = await localStorage.getItem("token")
    if(token){
      navigate('/sentQuery')
    }else{
      navigate("/authenticate")
    }
  }
  return (
    <>
      {searchBar ? (
        <form onSubmit={onSubmit}>
          <div className="w-full pb-2.5 flex bg-white fixed top-0 z-50 md:hidden lg:hidden">
            <input
              type="text"
              placeholder="Search tutorials..."
              className="w-[75%] py-2 px-4 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 ml-8 mt-3"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <X
              className="ml-2 mt-5 cursor-pointer"
              onClick={() => setSearchBar(false)}
            />
            <Search
              className="absolute left-10 top-6 h-5 w-5 text-gray-400"
            />
          </div>
        </form>
      ) : (
        <nav className="bg-white fixed w-full top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-0 lg:justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Code2 className="h-7 w-7 text-indigo-600" />
                <span className="text-lg font-bold text-gray-800">
                  TechLearn
                </span>
              </div>

              {/* Search */}
              <div className="flex-1 max-w-lg mx-8">
                <form onSubmit={onSubmit}>
                  <div className="relative">
                    {/* Big screens */}
                    <input
                      type="text"
                      placeholder="Search tutorials..."
                      className="hidden lg:block w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                      onChange={(e) => setSearchValue(e.target.value)}
                      value={searchValue}
                    />
                    <Search
                      className="hidden lg:block absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    />

                    {/* Small screens */}
                    <Search
                      className="block lg:hidden h-5 w-5 text-black cursor-pointer"
                      onClick={() => setSearchBar(true)}
                    />
                  </div>
                </form>
              </div>

              {/* Buttons */}
              <div className="flex items-center lg:space-x-4">
                {token ? (<>
                  <button
                    className=" hidden ml-5 lg:flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                    onClick={logout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                  <button
                    className=" flex ml-5 lg:hidden items-center px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                    onClick={logout}
                  >
                    <LogOut className="h-5 w-5 lg:mr-2" />
                  </button>
                  </>
                ) : (
                  <button
                    className="ml-5 flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                    onClick={() => navigate('/authenticate')}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </button>
                )}
                
                <button className="flex  lg:flex items-center text-sm  lg:px-4 lg:text-lg lg:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" onClick={sentQuery}>
                  <UserPlus className="hidden lg:flex h-5 w-5 mr-2" />
                  Query Sent
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
