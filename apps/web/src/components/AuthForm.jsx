import React, { useState } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { Alert } from './Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGitlab,  } from '@fortawesome/free-brands-svg-icons'

const AuthForm = () => {
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const toggleMode = () => setAuthMode(authMode === "signin" ? "signup" : "signin");

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    const { error } =
      authMode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) setError(error.message)
  }
  
  const handleGitLabLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'gitlab'
    })
    if (error) setError(error.message)
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {showAlert && (
        <Alert 
          message="Check your email for the magic link to complete signup!"
          type="success"
          onClose={() => setShowAlert(false)}
        />
      )}
      
      <div className="w-full max-w-sm space-y-6">
        {/* Social Login Buttons First */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleGitHubLogin}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faGithub} />
            GitHub
          </button>
          <button
            onClick={handleGitLabLogin}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white bg-[#FC6D26] rounded-lg hover:bg-[#E24329]"
          >
            <FontAwesomeIcon icon={faGitlab} />
            GitLab
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-white">Or continue with email</span>
          </div>
        </div>

        {/* Original Email Form */}
        <motion.div
          key={authMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 rounded bg-gray-700 border border-gray-600 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
          <button
            onClick={handleAuth}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : authMode === "signin" ? "Sign In" : "Sign Up"}
          </button>
          <button
            className="mt-4 text-sm text-yellow-300 underline"
            onClick={toggleMode}
          >
            {authMode === "signin"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthForm;