import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ArrowLeft,
  RefreshCw,
  KeyRound,
  Check,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

const MOCK_USERS = [
  { identifier: 'admin@dorm.edu', email: 'admin@dorm.edu', password: 'Admin@2026!', role: 'admin', name: 'Angel' },
  { identifier: 'admin', email: 'admin@dorm.edu', password: 'Admin@2026!', role: 'admin', name: 'Angel' },
  { identifier: 'angelbenitezayado477@gmail.com', email: 'angelbenitezayado477@gmail.com', password: 'Tenant@2026!', role: 'tenant', name: 'Angel' },
  { identifier: 'angel', email: 'angelbenitezayado477@gmail.com', password: 'Tenant@2026!', role: 'tenant', name: 'Angel' },
  { identifier: 'james.ayunting@email.com', email: 'james.ayunting@email.com', password: 'James@2026!', role: 'tenant', name: 'James Ayunting' },
];

const REGISTERED_EMAILS = [
  'admin@dorm.edu',
  'angelbenitezayado477@gmail.com',
  'james.ayunting@email.com',
];

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 60; // seconds

type Screen = 'login' | 'forgot-step1' | 'forgot-step2' | 'locked' | 'reset-success';

function PasswordRule({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${met ? 'text-green-600' : 'text-gray-400'}`}>
      {met ? <Check className="w-3 h-3 flex-shrink-0" /> : <X className="w-3 h-3 flex-shrink-0" />}
      <span>{text}</span>
    </div>
  );
}

function getPasswordRules(pw: string) {
  return {
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
  };
}

function PasswordStrengthBar({ password }: { password: string }) {
  const rules = getPasswordRules(password);
  const score = Object.values(rules).filter(Boolean).length;
  const colors = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];
  const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : 'bg-gray-200'}`}
          />
        ))}
      </div>
      {password && (
        <p className={`text-xs font-medium ${score >= 4 ? 'text-green-600' : score >= 3 ? 'text-yellow-600' : 'text-red-500'}`}>
          {labels[score]}
        </p>
      )}
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1">
        <PasswordRule met={rules.length} text="At least 8 characters" />
        <PasswordRule met={rules.upper} text="Uppercase letter" />
        <PasswordRule met={rules.lower} text="Lowercase letter" />
        <PasswordRule met={rules.number} text="Number (0-9)" />
        <PasswordRule met={rules.special} text="Special character (e.g. @!#)" />
      </div>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>('login');

  // Login state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutCountdown, setLockoutCountdown] = useState(LOCKOUT_DURATION);
  const lockoutTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotEmailError, setForgotEmailError] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [mockOtp] = useState(() => String(Math.floor(100000 + Math.random() * 900000)));
  const [otpError, setOtpError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [resetError, setResetError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (screen === 'locked') {
      setLockoutCountdown(LOCKOUT_DURATION);
      lockoutTimer.current = setInterval(() => {
        setLockoutCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(lockoutTimer.current!);
            setAttempts(0);
            setLoginError(false);
            setScreen('login');
            return LOCKOUT_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (lockoutTimer.current) clearInterval(lockoutTimer.current); };
  }, [screen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);

    const user = MOCK_USERS.find(
      (u) => u.identifier === identifier.trim() && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (rememberMe) localStorage.setItem('rememberedUser', identifier);
      toast.success(`Welcome back, ${user.name}!`);
      navigate(user.role === 'admin' ? '/' : '/tenant');
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setLoginError(true);
      if (next >= MAX_ATTEMPTS) {
        setScreen('locked');
      }
    }
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotEmailError('');
    if (!REGISTERED_EMAILS.includes(forgotEmail.trim())) {
      setForgotEmailError('No account found with that email address.');
      return;
    }
    toast.success(`Verification code sent to ${forgotEmail} (Demo: ${mockOtp})`);
    setScreen('forgot-step2');
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...verificationCode];
    next[idx] = val.slice(-1);
    setVerificationCode(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setResetError('');

    const entered = verificationCode.join('');
    if (entered !== mockOtp) {
      setOtpError('Invalid verification code. Please try again.');
      return;
    }

    const rules = getPasswordRules(newPassword);
    if (!Object.values(rules).every(Boolean)) {
      setResetError('Password does not meet all requirements.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }

    setScreen('reset-success');
  };

  const quickFill = (role: 'admin' | 'tenant') => {
    if (role === 'admin') {
      setIdentifier('admin@dorm.edu');
      setPassword('Admin@2026!');
    } else {
      setIdentifier('angelbenitezayado477@gmail.com');
      setPassword('Tenant@2026!');
    }
    setLoginError(false);
  };

  // ─── LOCKOUT SCREEN ───────────────────────────────────────────────────────
  if (screen === 'locked') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#800000] via-[#6b0000] to-[#4a0000] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[#800000] px-8 py-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-xl font-semibold">Account Temporarily Locked</h2>
          </div>
          <div className="px-8 py-8 text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
              <p className="text-red-700 font-semibold text-sm mb-2">
                Too Many Failed Login Attempts
              </p>
              <p className="text-red-600 text-sm leading-relaxed">
                Your account has been temporarily locked after <strong>5 consecutive failed login attempts</strong>. This is a security measure to protect your account from unauthorized access.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-gray-500 text-xs mb-1">Auto-unlock in</p>
              <p className="text-[#800000] text-3xl font-bold tabular-nums">{lockoutCountdown}s</p>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#800000] rounded-full transition-all duration-1000"
                  style={{ width: `${(lockoutCountdown / LOCKOUT_DURATION) * 100}%` }}
                />
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-amber-800 text-xs font-semibold mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Administrative Notice
              </p>
              <p className="text-amber-700 text-xs leading-relaxed">
                If you believe this is an error or cannot wait, please contact your <strong>System Administrator</strong> for immediate assistance and account unlock support.
              </p>
              <p className="text-amber-600 text-xs mt-2">
                Contact: <span className="font-medium">sysadmin@dorm.edu</span>
              </p>
            </div>
            <button
              onClick={() => { setScreen('forgot-step1'); setForgotEmail(''); }}
              className="w-full py-3 text-[#800000] border-2 border-[#800000] rounded-xl text-sm font-medium hover:bg-[#800000]/5 transition-all"
            >
              Reset Password Instead
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESET SUCCESS SCREEN ─────────────────────────────────────────────────
  if (screen === 'reset-success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#800000] via-[#6b0000] to-[#4a0000] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-green-500 px-8 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <CheckCircle2 className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-white text-xl font-semibold">Password Reset Successful</h2>
            <p className="text-white/80 text-sm mt-1">Your account has been secured</p>
          </div>
          <div className="px-8 py-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
              <p className="text-green-700 text-sm leading-relaxed">
                Your password has been successfully updated. You can now log in with your new credentials.
              </p>
            </div>
            <button
              onClick={() => {
                setScreen('login');
                setIdentifier('');
                setPassword('');
                setAttempts(0);
                setLoginError(false);
                setNewPassword('');
                setConfirmPassword('');
                setVerificationCode(['', '', '', '', '', '']);
              }}
              className="w-full py-3.5 bg-[#800000] text-white rounded-xl font-medium hover:bg-[#6b0000] transition-all shadow-lg"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── FORGOT PASSWORD STEP 2 ───────────────────────────────────────────────
  if (screen === 'forgot-step2') {
    const rules = getPasswordRules(newPassword);
    const allRulesMet = Object.values(rules).every(Boolean);

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#800000] via-[#6b0000] to-[#4a0000] flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#800000] px-8 py-6">
            <button
              onClick={() => setScreen('forgot-step1')}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-xl">
                <KeyRound className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white text-lg font-semibold">Reset Password</h2>
                <p className="text-white/70 text-xs">Step 2 of 2 — Enter code & set new password</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-5">
            {/* OTP */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                6-Digit Verification Code
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Enter the code sent to <span className="font-medium text-[#800000]">{forgotEmail}</span>
              </p>
              <div className="flex gap-2 justify-center">
                {verificationCode.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { otpRefs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`w-11 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none focus:border-[#800000] transition-colors ${
                      digit ? 'border-[#800000] bg-[#800000]/5 text-[#800000]' : 'border-gray-300 bg-gray-50'
                    }`}
                  />
                ))}
              </div>
              {otpError && (
                <div className="flex items-center gap-1.5 mt-2 text-red-600 text-xs">
                  <XCircle className="w-3.5 h-3.5" />
                  {otpError}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Create New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="e.g. Hrm@2026!"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent bg-gray-50 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password guideline label */}
                <div className="mt-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                  <p className="text-xs text-blue-700 font-medium mb-1.5">Password Requirements:</p>
                  <p className="text-xs text-blue-600 italic">
                    "Must be ≥8 characters, contain uppercase, lowercase, a number, and a special character (e.g., Hrm@2026!)."
                  </p>
                </div>

                {newPassword && <PasswordStrengthBar password={newPassword} />}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type={showConfirmPw ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent bg-gray-50 text-sm ${
                      confirmPassword && confirmPassword !== newPassword
                        ? 'border-red-400'
                        : confirmPassword && confirmPassword === newPassword
                        ? 'border-green-400'
                        : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && confirmPassword === newPassword && (
                  <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                  </p>
                )}
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Passwords do not match
                  </p>
                )}
              </div>

              {resetError && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-600 text-sm">{resetError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!allRulesMet || verificationCode.join('').length < 6}
                className="w-full py-3.5 bg-[#800000] text-white rounded-xl font-semibold hover:bg-[#6b0000] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Password & Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ─── FORGOT PASSWORD STEP 1 ───────────────────────────────────────────────
  if (screen === 'forgot-step1') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#800000] via-[#6b0000] to-[#4a0000] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[#800000] px-8 py-6">
            <button
              onClick={() => setScreen('login')}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-xl">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white text-lg font-semibold">Password Recovery</h2>
                <p className="text-white/70 text-xs">Step 1 of 2 — Verify your email</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSendCode} className="px-8 py-8 space-y-5">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-blue-700 text-sm leading-relaxed">
                Enter your registered email address and we'll send you a 6-digit verification code to reset your password.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => { setForgotEmail(e.target.value); setForgotEmailError(''); }}
                  placeholder="Enter your registered email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent bg-gray-50 text-sm ${
                    forgotEmailError ? 'border-red-400' : 'border-gray-300'
                  }`}
                  required
                />
              </div>
              {forgotEmailError && (
                <div className="flex items-center gap-1.5 mt-1.5 text-red-600 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {forgotEmailError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#800000] text-white rounded-xl font-semibold hover:bg-[#6b0000] transition-all shadow-lg"
            >
              Send Verification Code
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setScreen('login')}
                className="text-[#800000] text-sm hover:underline"
              >
                Remembered your password? Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─── MAIN LOGIN SCREEN ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#800000] via-[#6b0000] to-[#4a0000] flex items-center justify-center p-4">

      {/* Desktop Layout */}
      <div className="hidden lg:flex max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Left – Branding Panel */}
        <div className="w-5/12 bg-[#800000] p-10 flex flex-col justify-between">
          <div>
            <div className="bg-white/15 p-4 rounded-2xl inline-block mb-6">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-white text-2xl font-bold leading-snug mb-3">
              Dorm Tenant Rental<br />Management System
            </h1>
            <p className="text-white/70 text-sm leading-relaxed">
              Streamlined property management for educational institutions. Manage rooms, tenants, payments, and maintenance — all in one place.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-xs font-medium">Teen T-ITans · SIA2 Module 1</span>
            </div>
          </div>

          <div className="space-y-2.5 bg-white/10 rounded-xl p-5">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Quick Demo Login</p>
            <button
              onClick={() => quickFill('admin')}
              className="w-full px-4 py-3 bg-white/15 hover:bg-white/25 rounded-xl transition-all text-left group"
            >
              <div className="text-white font-semibold text-sm">Admin Account</div>
              <div className="text-white/60 text-xs group-hover:text-white/80 transition-colors">admin@dorm.edu</div>
            </button>
            <button
              onClick={() => quickFill('tenant')}
              className="w-full px-4 py-3 bg-white/15 hover:bg-white/25 rounded-xl transition-all text-left group"
            >
              <div className="text-white font-semibold text-sm">Tenant Account</div>
              <div className="text-white/60 text-xs group-hover:text-white/80 transition-colors">angelbenitezayado477@gmail.com</div>
            </button>
          </div>
        </div>

        {/* Right – Login Form */}
        <div className="w-7/12 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to access your dashboard</p>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5 mb-5">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 text-sm font-semibold">Login Failed</p>
                <p className="text-red-600 text-xs mt-0.5">
                  Invalid username or password. Attempt {attempts}/{MAX_ATTEMPTS}.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Username or Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => { setIdentifier(e.target.value); setLoginError(false); }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent bg-gray-50 text-sm transition-all"
                  placeholder="Enter username or email address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                  className="w-full pl-10 pr-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent bg-gray-50 text-sm transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Utility Row */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#800000] rounded"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => { setScreen('forgot-step1'); setForgotEmail(''); setForgotEmailError(''); }}
                className="text-[#800000] text-sm font-medium hover:text-[#6b0000] hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#800000] text-white rounded-xl font-semibold hover:bg-[#6b0000] active:scale-[0.99] transition-all shadow-lg text-base"
            >
              Login
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => navigate('/register')}
              className="text-[#800000] text-sm font-medium hover:underline"
            >
              Don't have an account? Register here
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-xs">Dorm Tenant Rental Management System · Teen T-ITans</p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="bg-white/20 p-4 rounded-2xl inline-block mb-3">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white text-xl font-bold leading-snug">
            Dorm Tenant Rental<br />Management System
          </h1>
          <p className="text-white/60 text-xs mt-1">Teen T-ITans · SIA2 Module 1</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-xs">Sign in to access your account</p>
          </div>

          {loginError && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-3 mb-4">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 text-xs font-semibold">Login Failed</p>
                <p className="text-red-600 text-xs">Invalid username or password. Attempt {attempts}/{MAX_ATTEMPTS}.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Username or Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => { setIdentifier(e.target.value); setLoginError(false); }}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent bg-gray-50 text-sm"
                  placeholder="Username or email address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                  className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent bg-gray-50 text-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#800000]"
                />
                <span className="text-xs text-gray-600">Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => { setScreen('forgot-step1'); setForgotEmail(''); setForgotEmailError(''); }}
                className="text-[#800000] text-xs font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#800000] text-white rounded-xl font-semibold hover:bg-[#6b0000] transition-all shadow-lg text-sm"
            >
              Login
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            <p className="text-xs text-gray-500 text-center font-medium">Quick Demo Login</p>
            <button
              onClick={() => quickFill('admin')}
              className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all text-left"
            >
              <div className="text-xs font-semibold text-gray-900">Admin Account</div>
              <div className="text-xs text-gray-500">admin@dorm.edu</div>
            </button>
            <button
              onClick={() => quickFill('tenant')}
              className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all text-left"
            >
              <div className="text-xs font-semibold text-gray-900">Tenant Account</div>
              <div className="text-xs text-gray-500">angelbenitezayado477@gmail.com</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
