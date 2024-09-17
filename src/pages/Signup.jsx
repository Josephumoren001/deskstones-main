import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const Signup = () => {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  console.log(formData);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all the fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup' ,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  
  return (
    <div className='min-h-screen mt-20'>
     <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">
      <div className="flex-1">
      <Link
        to="/"
        className="font-bold dark:text-white text-4xl"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Desk
        </span>{' '}
        Stones
      </Link>
      <p className='text-sm mt-5'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat veritatis aut nulla ipsa odio ad alias. 
        Voluptas aut itaque nostrum eligendi, in cupiditate dolore facere sed minima doloribus corporis dolorem.
      </p>
      </div>
      <div className=" flex-1">
        <div className="">
          <form  className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@unikcreativezone.com.ng' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
            </div>

            <Button gradientDuoTone="greenToBlue" type='submit' disabled={loading} >
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button> 
            <OAuth />
          </form>

          <div className="mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className=' text-blue-500'>
            Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-3 ' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
     </div>
    </div>
  )
}

export default Signup