'use client'; // Ensure the component runs on the client-side

import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IoSend } from 'react-icons/io5';

// Yup schema for form validation
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

type FormValues = {
  email: string;
};

const Newsletter = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const submitForm = async (values: FormValues, resetForm: () => void) => {
    const { email } = values;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URI}/newsletter`, { email });
      toast.success('You have successfully subscribed to the newsletter!');
      setSubmitted(true);
      resetForm(); // Reset form
    } catch (error) {
      toast.error('There was an error subscribing to the newsletter. Please try again later.');
      resetForm(); // Reset form
    }
  };

  return (
    <div className="flex w-[300px] h-[45px] self-center flex-col items-center justify-center bg-[#618B7F] rounded-full overflow-hidden">
      {!submitted && (
        <>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => submitForm(values, resetForm)}
          >
            <Form className="flex flex-col">
              <div className="flex flex-row">
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full text-white placeholder:text-gray-300 px-4 py-2 bg-transparent rounded-md shadow-sm focus:outline-none focus:border-transparent"
                />
                <button type="submit" className="font-bold p-2 m-1 rounded-full bg-[#B0C5B3]">
                  <IoSend className="w-full h-full text-[#618B7F] text-2xl ml-0.5" />
                </button>
              </div>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
};

export default Newsletter;
