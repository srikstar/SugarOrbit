import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

import './Auth.css'
import { auth } from '../../FirebaseConfig'
import { setUserData } from '../../Redux/user.redux'

// ─── helpers ────────────────────────────────────────────────────────────────

const isValidPhone = (v) => /^\d{10}$/.test(v)
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

// ─── Firebase OTP functions ──────────────────────────────────────────────────

let confirmationResult = null

const requestOtp = async (phone) => {
  const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' })
  confirmationResult = await signInWithPhoneNumber(auth, `+91${phone}`, verifier)
}

const verifyLogin = async (phone, otp) => {
  const result = await confirmationResult.confirm(otp)
  return result.user
}

const verifySignup = async (data, otp) => {
  const result = await confirmationResult.confirm(otp)
  // TODO: call your backend here to save name + email
  // await axios.post('/api/users/register', { ...data, uid: result.user.uid })
  return result.user
}

// ─── OTP input (6 boxes) ────────────────────────────────────────────────────

function OtpInput({ value, onChange }) {
  const inputs = useRef([])
  const digits  = value.split('').concat(Array(6).fill('')).slice(0, 6)

  const handleKey = (e, i) => {
    if (e.key === 'Backspace') {
      const next = digits.slice()
      if (next[i]) {
        next[i] = ''
        onChange(next.join(''))
      } else if (i > 0) {
        next[i - 1] = ''
        onChange(next.join(''))
        inputs.current[i - 1]?.focus()
      }
      return
    }
    if (!/^\d$/.test(e.key)) return
    const next = digits.slice()
    next[i] = e.key
    onChange(next.join(''))
    if (i < 5) inputs.current[i + 1]?.focus()
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted.padEnd(6, '').slice(0, 6))
    inputs.current[Math.min(pasted.length, 5)]?.focus()
    e.preventDefault()
  }

  return (
    <div className="auth-otp-row">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          className="auth-otp-box"
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={() => {}}
          onKeyDown={(e) => handleKey(e, i)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          autoFocus={i === 0}
        />
      ))}
    </div>
  )
}

// ─── Countdown ──────────────────────────────────────────────────────────────

function Countdown({ seconds, onEnd }) {
  const [left, setLeft] = useState(seconds)

  useEffect(() => {
    setLeft(seconds)
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) { clearInterval(id); onEnd(); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [seconds])

  return (
    <span className="auth-countdown">
      Resend in {left}s
    </span>
  )
}

// ─── Main Auth component ─────────────────────────────────────────────────────

function Auth({ onClose, isOpen, onAuthSuccess }) {
  const [mode, setMode]           = useState('login')
  const [step, setStep]           = useState('form')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [canResend, setCanResend] = useState(false)

  const [phone, setPhone]             = useState('')
  const [name, setName]               = useState('')
  const [email, setEmail]             = useState('')
  const [signupPhone, setSignupPhone] = useState('')
  const [otp, setOtp]                 = useState('')

  const dispatch = useDispatch()   // ← added

  // ── reset on mode switch ──────────────────────────────────────────────────
  const switchMode = (m) => {
    setMode(m); setStep('form'); setError('')
    setPhone(''); setName(''); setEmail('')
    setSignupPhone(''); setOtp('')
  }

  const handleClose = () => {
    switchMode('login')
    onClose()
  }

  // ── step 1: send OTP ──────────────────────────────────────────────────────
  const handleFormSubmit = async () => {
    setError('')
    const p = mode === 'login' ? phone : signupPhone

    if (mode === 'signup') {
      if (!name.trim())          return setError('Please enter your name.')
      if (!isValidEmail(email))  return setError('Please enter a valid email.')
    }
    if (!isValidPhone(p))        return setError('Please enter a valid 10-digit mobile number.')

    setLoading(true)
    try {
      await requestOtp(p)          // ← calls Firebase
      setStep('otp')
      setCanResend(false)
    } catch {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── step 2: verify OTP ────────────────────────────────────────────────────
  const handleOtpSubmit = async () => {
    if (otp.length !== 6) return setError('Please enter the 6-digit OTP.')
    setError(''); setLoading(true)
    try {
      // ── Firebase verify ──
      const user = mode === 'login'
        ? await verifyLogin(phone, otp)
        : await verifySignup({ name, email, phone: signupPhone }, otp)

      // ── Save to Redux ──
      dispatch(setUserData({ phone: user.phoneNumber, uid: user.uid }))

      onAuthSuccess?.()
      handleClose()
    } catch {
      setError('Incorrect OTP. Please try again.')
      setOtp('')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setOtp(''); setError(''); setCanResend(false)
    const p = mode === 'login' ? phone : signupPhone
    try { await requestOtp(p) } catch { setError('Could not resend OTP.') }
  }

  const maskedPhone = (p) => p.replace(/(\d{2})\d{6}(\d{2})/, '$1••••••$2')

  return (
    <div
      className={`auth-main-container ${isOpen ? 'auth-open' : ''}`}
      onClick={handleClose}
    >
      <div className="auth-panel" onClick={(e) => e.stopPropagation()}>

        {/* ── invisible reCAPTCHA mount point ── */}
        <div id="recaptcha-container" />   {/* ← ADDED HERE */}

        {/* Header */}
        <div className="auth-header">
          <span className="auth-title">
            {step === 'otp'
              ? 'Verify OTP'
              : mode === 'login' ? 'Welcome back' : 'Create account'}
          </span>
          <button className="auth-close-btn" onClick={handleClose}>✕ Close</button>
        </div>

        <div className="auth-divider" />

        {/* Body */}
        <div className="auth-body">

          {/* ── FORM STEP ────────────────────────────── */}
          {step === 'form' && (
            <>
              <div className="auth-toggle-row">
                <button
                  className={`auth-toggle-btn ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => switchMode('login')}
                >
                  Log in
                </button>
                <button
                  className={`auth-toggle-btn ${mode === 'signup' ? 'active' : ''}`}
                  onClick={() => switchMode('signup')}
                >
                  Sign up
                </button>
              </div>

              <div className="auth-fields">

                {mode === 'signup' && (
                  <>
                    <div className="auth-field-group">
                      <label className="auth-label">Name</label>
                      <input
                        className="auth-input"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-label">Email</label>
                      <input
                        className="auth-input"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="auth-field-group">
                  <label className="auth-label">Mobile number</label>
                  <div className="auth-phone-row">
                    <span className="auth-phone-prefix">+91</span>
                    <input
                      className="auth-input auth-input-phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={mode === 'login' ? phone : signupPhone}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 10)
                        mode === 'login' ? setPhone(v) : setSignupPhone(v)
                      }}
                    />
                  </div>
                </div>

                {error && <p className="auth-error">{error}</p>}

                <button
                  className="auth-submit-btn"
                  onClick={handleFormSubmit}
                  disabled={loading}
                >
                  {loading ? 'Sending OTP…' : 'Send OTP'}
                </button>

                <p className="auth-switch-hint">
                  {mode === 'login'
                    ? <>New here? <button className="auth-link" onClick={() => switchMode('signup')}>Create an account</button></>
                    : <>Already have an account? <button className="auth-link" onClick={() => switchMode('login')}>Log in</button></>
                  }
                </p>
              </div>
            </>
          )}

          {/* ── OTP STEP ─────────────────────────────── */}
          {step === 'otp' && (
            <div className="auth-otp-section">
              <p className="auth-otp-hint">
                We sent a 6-digit OTP to<br />
                <strong>+91 {maskedPhone(mode === 'login' ? phone : signupPhone)}</strong>
              </p>

              <OtpInput value={otp} onChange={setOtp} />

              {error && <p className="auth-error">{error}</p>}

              <button
                className="auth-submit-btn"
                onClick={handleOtpSubmit}
                disabled={loading || otp.length < 6}
              >
                {loading ? 'Verifying…' : 'Verify & Continue'}
              </button>

              <div className="auth-resend-row">
                {canResend
                  ? <button className="auth-link" onClick={handleResend}>Resend OTP</button>
                  : <Countdown seconds={30} onEnd={() => setCanResend(true)} />
                }
              </div>

              <button
                className="auth-back-btn"
                onClick={() => { setStep('form'); setOtp(''); setError('') }}
              >
                ← Change number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth