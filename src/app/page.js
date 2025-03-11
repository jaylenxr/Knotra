'use client';

import { motion } from 'framer-motion';
import React from 'react';

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', padding: '30px 0', margin: '0 auto' }}>
      <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', color: '#008B3A' }}>
        Your Healthy Hair Journey Begins Now
      </motion.h1>
    </div>
  );
}

export default Home;
