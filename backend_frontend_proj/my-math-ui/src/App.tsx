// src/App.tsx
import React from 'react';
import { Calculator } from './components/Calculator';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Calculator />
      </div>
    </div>
  );
}
