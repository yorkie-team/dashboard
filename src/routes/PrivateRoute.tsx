import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import { useAppSelector } from 'app/hooks'

export function PrivateRoute() {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.users)
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return <Outlet />
}
