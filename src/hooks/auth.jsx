import { createContext, useContext, useState, useEffect } from "react";
import { api } from '../services/api';

export const AuthContext = createContext({});
function AuthProvider({ children }){
  const [data, setData] = useState({});
  async function signIn({ email, password }){
    try{
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;
      localStorage.setItem("@nomedoprojeto:user", JSON.stringify(user));
      localStorage.setItem("@nomedoprojeto:token", token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ user, token })
    }catch(error) {
      if(error.response){
        alert(error.response.data.message)
      }else{
        alert("not was possible goes into")
      }
    }

  }

  function signOut(){
    localStorage.removeItem("@nomedoprojeto:token"); 
    localStorage.removeItem("@nomedoprojeto:user");
    setData({});
    }

    async function updateProfile({ user, avatarFile }){
      try{
        if(avatarFile) { 
          const fileUploadForm = new FormData();
          fileUploadForm.append("avatar", avatarFile);
          const response = await api.patch("/users/avatar", fileUploadForm);
          user.avatar = response.data.avatar;
          }
      await api.put("/users", user);
      localStorage.setItem("@nomedoprojeto:user", JSON.stringify(user));
      setData({ user, token: data.token });
      alert("Profile update!");
      }catch(error){
      if(error.response){
      alert(error.response.data.message)
      }else {
      {alert("not went possible update of profile")}
      }
      }
      }


      useEffect(() => { 
        const user = localStorage.getItem("@nomedoprojeto:user");
        const token = localStorage.getItem("@nomedoprojeto:token"); 
        if(token && user) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setData({ token, user: JSON.parse(user) });
        }
      }, []);
      


  return(
    <AuthContext.Provider value={{ updateProfile, signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };