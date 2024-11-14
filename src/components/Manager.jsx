import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";

    if (ref.current.src.includes("public/eye-crss.png")) {
      ref.current.src = "public/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "public/eye-crss.png";
      passwordRef.current.type = "text";
    }
  };

  const deletePassword = (id) => {

    let c = confirm ("Are you sure you want to delete")

    if (c) {

      setPasswordArray(passwordArray.filter (item => item.id != id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter (item => item.id != id)));
     
    }
    
  }
  
  const editPassword = (id) => {
    setForm(passwordArray.filter (item => item.id === id)[0])
    setPasswordArray (passwordArray.filter (item => item.id != id))
   
    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter (item => item.id != id)));

  }

  const copyContent = (content) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(content);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    const { site, username, password } = form;

    if (!site || !username || !password) {
      toast.warn("Please fill out all fields before saving.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    setPasswordArray([...passwordArray, {...form , id : uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form , id : uuidv4()}]));
    setForm({ site: "", username: "", password: "" })
   
    console.log([...passwordArray, form]);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div>
        <div className="absolute top-0 -z-10 h-full w-full bg-green-50">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl mt-7 p-5">
        <h1 className="font-bold text-4xl">
          <span className="text-green-700">&lt;</span>
          Safe
          <span className="text-green-500"> Guard /&gt;</span>
        </h1>
        <p className="text-green-900 text-lg">Your Own Password Manager</p>
        <div className="text-black flex flex-col p-4 gap-8">
          <input
            type="text"
            className="rounded-full border border-green-500 w-full text-black py-1 px-4"
            name="site"
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Webiste URL here .. "
            id=""
          />
          <div className="flex justify-between gap-7 w-full">
            <input
              type="text"
              className="rounded-full border border-green-500 w-full text-black py-1 px-4"
              name="username"
              onChange={handleChange}
              value={form.username}
              id=""
              placeholder="Enter User Name"
            />

            <div className="relative">
              <input
                type="password"
                ref={passwordRef}
                className="rounded-full border border-green-500 w-full text-black py-1 p-4"
                name="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                id=""
              />
              <span className="absolute right-[3px] top-[4-px] cursor-pointer">
                <img
                  width={26}
                  ref={ref}
                  className="p-1"
                  src="public/eye.png"
                  alt="eye"
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>
          <button
            className="flex flex-center items-center bg-green-400 rounded-full px-4 py-2 text-white w-fit hover:bg-green-300 border-2 border-green-700"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No password to display</div>}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden mb-10">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">UserName</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 ">
                {passwordArray.map((item) => {
                  return (
                    <tr key={item}>
                      <td className="border border-white py-2 px-2">
                        <div className="flex justify-center items-center">
                          <a
                            href={item.site}
                            target="_blank"
                            className="cursor-pointer"
                          >
                            {item.site}
                          </a>
                          <div
                            className="size-5 cursor-pointer"
                            onClick={() => {
                              copyContent(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/ujxzdfjx.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 ">
                        <div className="flex justify-center items-center">
                          {item.username}
                          <div
                            className="size-5 cursor-pointer"
                            onClick={() => {
                              copyContent(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/ujxzdfjx.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 ">
                        <div className="flex justify-center items-center">
                          {item.password}

                          <div
                            className="size-5 cursor-pointer"
                            onClick={() => {
                              copyContent(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/ujxzdfjx.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 ">
                        <div className="flex justify-center items-center">
                          <span  onClick={()=> {editPassword(item.id)}}  className="cursor-pointer mx-1">
                            <lord-icon
                              src="https://cdn.lordicon.com/zfzufhzk.json"
                              trigger="hover"
                             
                            ></lord-icon>
                          </span>
                          <span  onClick={()=> {deletePassword(item.id)}}  className="cursor-pointer mx-1">
                            <lord-icon
                              src="https://cdn.lordicon.com/wpyrrmcq.json"
                              trigger="hover"
                              
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
