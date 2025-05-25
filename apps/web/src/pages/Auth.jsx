import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import AuthForm from '../components/AuthForm';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/builder');
      }
    };
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/builder');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default Auth;
