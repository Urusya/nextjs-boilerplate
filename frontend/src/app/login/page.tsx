'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Label, TextInput, Spinner } from 'flowbite-react';
import { login, setAuthToken } from '@/lib/api';
import ToastNotification from '@/components/ToastNotification';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [errors, setErrors] = useState({ username: '', password: '' });

  const validate = () => {
    const newErrors = { username: '', password: '' };
    let valid = true;

    if (!username.trim()) {
      newErrors.username = 'Username is required.';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await login(username, password);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      setAuthToken(data.access);

      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch {
      setToast({ message: 'Login failed. Please check credentials.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          position="top-right"
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-sm space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <TextInput
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: '' });
              }}
              color={errors.username ? 'failure' : undefined}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: '' });
              }}
              color={errors.password ? 'failure' : undefined}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <Button
            className="mt-4 w-full cursor-pointer"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" aria-label="Login spinner" className="me-3" light />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
