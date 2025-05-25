import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import MainFeatures from './components/MainFeatures';
import Auth from './pages/Auth';
import { WorkflowBuilder } from './components/WorkflowBuilder';

function Header() {
  return (
    <header className="flex items-center gap-3 text-3xl font-bold">
      <Zap className="text-yellow-400 animate-pulse" size={32} />
      Zap
      <nav className="ml-auto space-x-4 text-lg">
        <Link to="/" className="text-yellow-300 hover:underline">Home</Link>
        <Link to="/auth" className="text-yellow-300 hover:underline">Sign In / Up</Link>
      </nav>
    </header>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <Routes location={location}>
          <Route path="/" element={<MainFeatures />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/builder" element={<WorkflowBuilder />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <Header />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
