// frontend/src/Contact.js

import React, { useState } from 'react';
import { sendContactForm } from '../api/contactApi';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(''); // Limpia mensajes de estado anteriores

    try {
      // Llama a la función desacoplada para enviar los datos
      await sendContactForm(form);
      setStatusMessage('✅ Mensaje enviado correctamente. ¡Gracias por contactarme!');
      setForm({ name: '', email: '', message: '' }); // Limpia el formulario
    } catch (error) {
      // Maneja los errores que vienen de contactApi.js
      setStatusMessage(`❌ Error al enviar el mensaje: ${error.message}. Por favor, intenta de nuevo.`);
      console.error('Error al manejar el envío del formulario en el componente:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-16 text-gray-800 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 border-b-2 border-indigo-500 inline-block">
          Contacto
        </h2>

        <p className="mb-8 text-lg leading-relaxed">
          Si tienes alguna pregunta, propuesta de colaboración o simplemente
          quieres saludar, no dudes en escribirme. ¡Responderé lo antes posible!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-semibold">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={form.message}
              onChange={handleChange}
              disabled={loading}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>

        {statusMessage && (
          <p className={`mt-6 text-center text-lg ${statusMessage.startsWith('✅') ? 'text-green-500' : 'text-red-500'}`}>
            {statusMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;