import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateForum() {
  const initialValues = {
    title: '',
    theme: '',
    userId: ''
  }
  const onSubmit = (data) => {
    axios.post('http://back.r3mob.fr/forum', data).then(() => {
      navigate('/')
    })
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a title'),
    theme: Yup.string().required('You must input a theme'),
    userId: Yup.string().min(3).required('You must input a user id')
  })
  let navigate = useNavigate()
  return (
    <div className='createForumPage'>
      {/* <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className='formContent'>
          <label htmlFor='title'>Title</label>
          <ErrorMessage name='title' component='span' />
          <Field autocomplete="off" id='inputCreateForum' name='title' placeholder='Title' />
          <label htmlFor='theme'>Theme</label>
          <ErrorMessage name='theme' component='span' />
          <Field autocomplete="off"  id='inputCreateForum' name='theme' placeholder='Theme' />
          <label htmlFor='userId'>User Id</label>
          <ErrorMessage name='userId' component='span' />
          <Field autocomplete="off"  id='inputCreateForum' name='userId' placeholder='User Id' />
          <button type='submit'>Create Forum</button>
        </Form>
      </Formik> */}
    </div>
  )
}

export default CreateForum
