import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const signup = async () => {
    if (!name || !email || !password) {
      return toast.error('Please fill in all fields');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email address');
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        name: name,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        time: Timestamp.now(),
      };

      await addDoc(collection(fireDB, 'users'), user);
      toast.success('Signup successful!');

      // Clear form
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email is already in use');
      } else {
        toast.error(error.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}
      <div className='bg-gray-800 px-10 py-10 rounded-xl'>
        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>

        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          name='name'
          className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
          placeholder='Name'
        />
<br />
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
          name='password'
          className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
          placeholder='Password'
        />

        <div className='flex justify-center mb-3'>
          <button
            onClick={signup}
            disabled={loading}
            className={`w-full text-white font-bold px-2 py-2 rounded-lg ${
              loading ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </div>

        <p className='text-white'>
          Already have an account?{' '}
          <Link to='/login' className='text-red-500 font-bold'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
