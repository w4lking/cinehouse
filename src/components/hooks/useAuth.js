import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = sessionStorage.getItem("perfil");
    setUserProfile(profile);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return { userProfile, handleLogout };
}
