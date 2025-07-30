// src/components/Calculator.tsx
import React, { useState } from 'react'
import { useCalc } from '../hooks/useCalc'
import logo from '../assets/endava_logo_pos_CMYK_C.svg'   // make sure this file exists
import './Calculator.css'

export function Calculator() {
  const [powX, setPowX] = useState<string>('')
  const [powY, setPowY] = useState<string>('')
  const powCalc = useCalc('/pow')

  const [fibN, setFibN] = useState<string>('')
  const fibCalc = useCalc(`/fibonacci/${parseInt(fibN || '0', 10)}`)

  const [factN, setFactN] = useState<string>('')
  const factCalc = useCalc(`/factorial/${parseInt(factN || '0', 10)}`)

  const [flipped, setFlipped] = useState([false, false, false])
  const toggleFlip = (i: number) => {
    setFlipped(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  // clear inputs when flipping back
  const clearInputs = (i: number) => {
  if (i === 0) { setPowX(''); setPowY(''); powCalc.reset(); }
  if (i === 1) { setFibN(''); fibCalc.reset(); }
  if (i === 2) { setFactN(''); factCalc.reset(); }
}

  return (
    <div className="calc-root">
      {/* Logo centered above title */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img src={logo} alt="Endava Logo" className="calc-logo" />
      </div>

      <h1 className="calc-title">Calculator</h1>
      <div className="cards-container">
        {[0,1,2].map(i => {
          const labels = ['Power (xⁿ)', 'Fibonacci (n‑th term)', 'Factorial (n!)']
          return (
            <div key={i} className={`flip-card ${flipped[i] ? 'flipped' : ''}`}>              
              <div className="flip-card-inner">
                {/* front flips to show form */}
                <div className="flip-card-front" onClick={() => toggleFlip(i)}>
                  <span>{labels[i]}</span>
                </div>

                {/* back flips back when clicking background */}
                <div className="flip-card-back" onClick={() => { toggleFlip(i); clearInputs(i) }}>
                  <h3 className="back-title">{labels[i]}</h3>

                  {/* each form stops click from bubbling to background */}
                  {i === 0 && (
                    <form onSubmit={e => { e.preventDefault(); powCalc.callCalc({ x: parseFloat(powX)||0, y: parseFloat(powY)||0 }); }} onClick={e => e.stopPropagation()}>
                      <input type="number" placeholder="A" value={powX} onChange={e => setPowX(e.target.value)} />
                      <input type="number" placeholder="B" value={powY} onChange={e => setPowY(e.target.value)} />
                      <button type="submit" disabled={powCalc.loading}>Calculate</button>
                      {powCalc.data && <p>Result: {powCalc.data.result}</p>}
                      {powCalc.error && <p className="error">{powCalc.error}</p>}
                    </form>
                  )}

                  {i === 1 && (
                    <form onSubmit={e => { e.preventDefault(); fibCalc.callCalc({ x: parseInt(fibN)||0 }); }} onClick={e => e.stopPropagation()}>
                      <input type="number" placeholder="n (X)" value={fibN} onChange={e => setFibN(e.target.value)} />
                      <button type="submit" disabled={fibCalc.loading}>Calculate</button>
                      {fibCalc.data && <p>Result: {fibCalc.data.result}</p>}
                      {fibCalc.error && <p className="error">{fibCalc.error}</p>}
                    </form>
                  )}

                  {i === 2 && (
                    <form onSubmit={e => { e.preventDefault(); factCalc.callCalc({ x: parseInt(factN)||0 }); }} onClick={e => e.stopPropagation()}>
                      <input type="number" placeholder="n (X)" value={factN} onChange={e => setFactN(e.target.value)} />
                      <button type="submit" disabled={factCalc.loading}>Calculate</button>
                      {factCalc.data && <p>Result: {factCalc.data.result}</p>}
                      {factCalc.error && <p className="error">{factCalc.error}</p>}
                    </form>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
