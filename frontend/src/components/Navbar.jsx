import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="h-16 bg-blue-950 text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-300 hover:text-white transition-colors"
        >
          MiPortfolio
        </Link>

        {/* Navegación */}
        <ul className="flex gap-x-12 text-lg font-medium tracking-wide">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 underline underline-offset-4 px-2'
                  : 'hover:text-blue-300 transition-colors px-2'
              }
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 underline underline-offset-4 px-2'
                  : 'hover:text-blue-300 transition-colors px-2'
              }
            >
              Sobre mí
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 underline underline-offset-4 px-2'
                  : 'hover:text-blue-300 transition-colors px-2'
              }
            >
              Contacto
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
