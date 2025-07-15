import React, { useEffect, useState } from 'react'
import { fetchSkills } from '../api/skillsApi'
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'

const getIconComponent = (iconName) => {
  if (iconName.startsWith('Fa') && FaIcons[iconName]) {
    return FaIcons[iconName]
  }
  if (iconName.startsWith('Si') && SiIcons[iconName]) {
    return SiIcons[iconName]
  }
  return null
}

const SkillsSection = () => {
  const [skillGroups, setSkillGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkills()

        // Mapear íconos
        const enriched = data.map((group) => ({
          ...group,
          skills: group.skills.map((skill) => ({
            ...skill,
            Icon: getIconComponent(skill.icon_name),
          })),
        }))

        setSkillGroups(enriched)
      } catch (error) {
        console.error('Error loading skills', error)
      } finally {
        setLoading(false)
      }
    }

    loadSkills()
  }, [])

  if (loading) return <p className="text-gray-400">Cargando habilidades...</p>

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-300">Habilidades</h2>
      {skillGroups.map((group, index) => (
        <div key={index}>
          <h3 className="text-xl font-bold text-blue-400">{group.category}</h3>
          <ul className="flex flex-wrap gap-4 mt-2">
            {group.skills.map((skill, idx) => {
              const Icon = skill.Icon
              return (
                <li
                  key={idx}
                  className="bg-gray-700 text-white px-3 py-2 rounded shadow flex items-center"
                >
                  {Icon && <Icon className="mr-2 text-blue-500" />}
                  {skill.name}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default SkillsSection
