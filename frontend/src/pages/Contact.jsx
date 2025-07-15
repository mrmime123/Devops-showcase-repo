import React, { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí podrías integrar EmailJS, Formspree o backend propio
    alert('Mensaje enviado. ¡Gracias por contactarme!')
    setForm({ name: '', email: '', message: '' })
  }

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
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
