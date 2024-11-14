"use client";

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, X, Zap, Brain, Rocket, Users, Github, Twitter, Linkedin, Bot, BotIcon, CreditCard, AlarmClockPlus } from 'lucide-react'

export default function Componente() {
  const [] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white">
        {/* Navegación */}
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">Astro AI</span>
          </Link>
        </nav>

        {/* Sección Hero */}
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            Haz crecer tus ventas con  <span className="text-[#00B4D8]">Astro AI</span>
          </h1>
          <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
            Contrata agentes Astro AI para hacer crecer tus ventas y completar tareas de forma automática.
          </p>
          <form className="max-w-md mx-auto mb-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Ingresa tu email"
                className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                required
                aria-label="Dirección de correo electrónico"
              />
              <button
                type="submit"
                className="bg-[#00B4D8] text-white px-6 py-2 rounded-lg hover:bg-[#0096C7] transition duration-300"
              >
                Unirse a la Lista de Espera
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-500">
            Sé el primero en saber cuando lancemos.
          </p>
        </div>

        {/* Sección de Características */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">¿Por qué contratar agentes Astro AI?</h2>
            <div className="grid md:grid-cols-3 gap-8">

              <TarjetaCaracteristica
                icono={<BotIcon className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Integración con Whatsapp"
                descripcion="Nuestros agentes de IA venden tus productos por Whatsapp"
              />

              <TarjetaCaracteristica
                icono={<CreditCard className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Integración con pasarelas de pagos"
                descripcion="Nuestros agentes de IA procesan los pagos de sus ventas con la pasarela de pagos que utilices"
              />

              <TarjetaCaracteristica
                icono={<AlarmClockPlus className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Vende de forma personalizada 24/7"
                descripcion="Nuestros agentes de IA trabajan incansablemente para hacer crecer tu negocio"
              />

              <TarjetaCaracteristica
                icono={<Zap className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Finalización Automática de Tareas"
                descripcion="Nuestros agentes de IA trabajan incansablemente para completar tus tareas, aumentando la productividad y la eficiencia."
              />

              <TarjetaCaracteristica
                icono={<Brain className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Toma de Decisiones Inteligente"
                descripcion="Aprovecha los algoritmos avanzados de IA para una toma de decisiones más inteligente y basada en datos en tus procesos de negocio."
              />

              <TarjetaCaracteristica
                icono={<Rocket className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Fuerza Laboral Escalable"
                descripcion="Escala fácilmente tu fuerza laboral de IA hacia arriba o hacia abajo según las necesidades de tu negocio, sin la sobrecarga de la contratación tradicional."
              />
            </div>
          </div>
        </section>
      </header>

      <main className="flex-grow">
        {/* El contenido principal iría aquí */}
      </main>

      {/* Pie de Página */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex justify-center space-x-4">
                <Link href="#" className="text-gray-400 hover:text-[#00B4D8] transition duration-300">
                  <Github size={24} />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#00B4D8] transition duration-300">
                  <Twitter size={24} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#00B4D8] transition duration-300">
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <div className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} Astro AI. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


function TarjetaCaracteristica({ icono, titulo, descripcion }: { icono: React.ReactNode; titulo: string; descripcion: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        {icono}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center text-black">{titulo}</h3>
      <p className="text-gray-600 text-center">{descripcion}</p>
    </div>
  )
}