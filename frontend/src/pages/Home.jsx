import React, { useState } from 'react'

const Home = () => {
  const [showMore, setShowMore] = useState(false)

  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-start p-6 pt-6 min-h-full">
      <div className="text-center max-w-xl mx-auto mt-4 flex flex-col items-center space-y-6">
        {/* Imagen de perfil */}
        <img
          src="/profile.webp"
          alt="Foto de Lluís Alcalà"
          loading="lazy"
          className="w-48 h-48 rounded-full object-cover border-4 border-blue-400 mb-20"
        />

        {/* Título y descripción */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            ¡Hola! Soy <span className="text-blue-400">Lluís Alcalà</span>
          </h1>
          <p className="text-lg text-gray-300">
            Profesional DevOps especializado en automatización de infraestructuras, CI/CD y
            despliegues escalables que garantizan eficiencia operativa y fiabilidad en entornos
            de producción.
          </p>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4">
          <a href="mailto:lluis.alcala98@gmail.com" className="btn-primary">
            Contáctame
          </a>
          <a
            href="/Profile.pdf"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver CV
          </a>
        </div>

        {/* Mostrar más info */}
        <div className="mt-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-300 underline hover:text-blue-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {showMore ? 'Ocultar más info' : 'Mostrar más info'}
          </button>
        </div>

        {showMore && (
          <div className="space-y-3 text-gray-300 text-left">
            <p>
              <strong>📍 Ubicación:</strong> Barcelona, España
            </p>
            <p>
              <strong>💼 Especialidades:</strong> Cloud Platform, DevOps, Kubernetes
            </p>
            <p>
              <strong>🚀 Experiencia:</strong> 2 años trabajando en proyectos Cloud
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Home
