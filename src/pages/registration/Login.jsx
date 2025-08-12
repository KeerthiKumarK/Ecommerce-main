import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const login = async () => {
    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email address');
    }

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(auth, email, password);

      toast.success('Login successful', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        theme: 'colored',
      });

      localStorage.setItem('user', JSON.stringify(result));
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error('User not found. Please sign up.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password.');
      } else {
        toast.error(error.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}
      <div className='bg-gray-800 px-10 py-10 rounded-xl'>
        <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>

        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name='email'
          className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
          placeholder='Email'
        />
<br />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
          placeholder='Password'
        />

        <div className='flex justify-center mb-3'>
          <button
            onClick={login}
            disabled={loading}
            className={`w-full text-black font-bold px-2 py-2 rounded-lg ${
              loading ? 'bg-yellow-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className='text-white'>
          Don&apos;t have an account?{' '}
          <Link to='/signup' className='text-yellow-500 font-bold'>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
