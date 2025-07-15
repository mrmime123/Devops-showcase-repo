import React, { useEffect, useState } from 'react'
import { fetchExperiences } from '../api/experienceApi'

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchExperiences()
        setExperiences(data)
      } catch (error) {
        console.error('Error loading experiences', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <p className="text-gray-400">Cargando experiencia...</p>

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-300">Experiencia Profesional</h2>

      <div className="relative border-l-2 border-blue-500 ml-4 pl-6">
        {experiences.map((exp, index) => (
          <div key={index} className="mb-10 relative">
            {/* Puntos en la línea */}
            <div className="absolute -left-3 top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-200" />

            <div className="bg-gray-800 p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-400">{exp.title}</h3>
              <p className="text-gray-300">
                {exp.company} — <em>{exp.period}</em>
              </p>
              <p className="text-gray-400 mt-2">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
