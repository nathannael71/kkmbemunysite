'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ContactForm({ formspreeId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      let endpoint = 'https://formspree.io/f/' + formspreeId;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className={`w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className={`w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject', { required: 'Subject is required' })}
          className={`w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base ${errors.subject ? 'border-red-500' : ''}`}
        />
        {errors.subject && (
          <span className="text-red-500 text-sm mt-1">{errors.subject.message}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          {...register('message', { required: 'Message is required' })}
          rows="4"
          className={`w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base ${errors.message ? 'border-red-500' : ''}`}
        />
        {errors.message && (
          <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>
        )}
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-apple-blue text-white rounded-full btn-apple transition-apple font-medium disabled:opacity-70"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      
      {/* Success & Error Messages */}
      {submitStatus === 'success' && (
        <div className="form-alert alert-success">
          <i className="fas fa-check-circle"></i>
          <span>Thank you! Your message has been sent successfully.</span>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="form-alert alert-error">
          <i className="fas fa-exclamation-circle"></i>
          <span>Oops! Something went wrong. Please try again later.</span>
        </div>
      )}
    </form>
  );
}
