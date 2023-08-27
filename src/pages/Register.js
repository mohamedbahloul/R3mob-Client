import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const initialValues = {
        username: '',
        password: ''
          }
      const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth', data).then(() => {
          navigate('/auth/login')
        })
      } 
      const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required('You must input a username'),
        password: Yup.string().min(4).max(20).required('You must input a password')
      })
  return (
    <div className='createForumPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className='formContent'>
          <label htmlFor='username'>Username</label>
          <ErrorMessage name='username' component='span' />
          <Field autocomplete="off"  id='inputCreateForum' name='username' placeholder='Username' />
          <label htmlFor='password'>Password</label>
          <ErrorMessage name='password' component='span' />
          <Field type="password" autocomplete="off"  id='inputCreateForum' name='password' placeholder='Password' />
          
          
          <button type='submit'>Register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register