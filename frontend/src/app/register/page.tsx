'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Label, TextInput, Spinner } from 'flowbite-react';
import { register } from '@/lib/api';
import ToastNotification from '@/components/ToastNotification';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false); // NEW

  const validate = () => {
    let valid = true;
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid.';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
      valid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...apiPayload } = formData;
      await register(apiPayload);

      setToast({ message: 'Registration successful!', type: 'success' });

      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch {
      setToast({ message: 'Registration failed. Try again.', type: 'error' });
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
            <TextInput name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <TextInput name="email" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <TextInput name="password" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <TextInput name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <Button
            className="mt-4 w-full cursor-pointer"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" aria-label="Registering spinner" className="me-3" light />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
