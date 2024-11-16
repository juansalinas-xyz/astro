'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Menu, X, ChevronDown, BotIcon, Zap, CreditCard, AlarmClock, Rocket, NotebookPen, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from './lib/supabaseClient'

export default function NotionLikeLandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (success) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('waiting_list')
      .insert([{ email }])

    if (error) {
      setError('Hubo un error al registrarte. Por favor, intenta de nuevo.')
    } else {
      setSuccess(true)
      setEmail('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-gray-900 font-sans">
      <header className="sticky top-0 z-50 bg-[#FBFBFA] border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BotIcon className="h-8 w-8 text-[#00B4D8]" />
            <span className="text-xl font-bold">Astro AI</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-sm hover:text-[#00B4D8] transition duration-300">
              Características
            </Link>
            <Link href="#faq" className="text-sm hover:text-[#00B4D8] transition duration-300">
              FAQ
            </Link>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden bg-[#FBFBFA] py-4 px-4 border-t border-gray-200">
            <Link href="#features" className="block py-2 hover:text-[#00B4D8] transition duration-300">
              Características
            </Link>
            <Link href="#faq" className="block py-2 hover:text-[#00B4D8] transition duration-300">
              FAQ
            </Link>
          </nav>
        )}
      </header>

      <main>
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Impulsa tus ventas con <span className="text-[#00B4D8]">Astro AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Contrata agentes de IA para automatizar tus ventas y tareas, llevando tu negocio al siguiente nivel.
            </p>
            {success ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8" role="alert">
                <p>Gracias por unirte a la lista de espera.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8" id="waiting-list">
                <Input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow"
                  required
                />
                <Button type="submit" disabled={loading} className="bg-[#00B4D8] hover:bg-[#0077B6] text-white">
                  {loading ? 'Registrando...' : 'Unirse a la Lista de Espera'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            )}
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <p className="text-sm text-gray-500 mb-8">
              Sé el primero en saber cuando lancemos. Sin spam, lo prometemos.
            </p>
          </div>
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-20 filter blur-3xl"></div>
            <Image
              src="/astro-hero-image.png"
              alt="Astro AI - Agentes de IA para impulsar tus ventas"
              width={1200}
              height={675}
              className="rounded-xl shadow-2xl relative z-10"
            />
          </div>
        </section>

        <section id="features" className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">¿Por qué contratar agentes Astro AI?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BotIcon className="h-8 w-8 text-[#00B4D8]" />}
                title="Integración con Whatsapp"
                description="Nuestros agentes de IA venden tus productos por Whatsapp"
              />
              <FeatureCard
                icon={<NotebookPen className="h-8 w-8 text-[#00B4D8]" />}
                title="Gestión centralizada de inventario"
                description="Gestiona tus productos de forma eficiente para maximizar tus ventas"
              />
              <FeatureCard
                icon={<CreditCard className="h-8 w-8 text-[#00B4D8]" />}
                title="Integración con pasarelas de pagos"
                description="Procesa los pagos con la pasarela que ya utilizas"
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-[#00B4D8]" />}
                title="Finalización Automática de Tareas"
                description="Aumenta la productividad y eficiencia de tu negocio"
              />
              <FeatureCard
                icon={<AlarmClock className="h-8 w-8 text-[#00B4D8]" />}
                title="Ventas personalizadas 24/7"
                description="Tus agentes de IA trabajan sin descanso"
              />
              <FeatureCard
                icon={<Rocket className="h-8 w-8 text-[#00B4D8]" />}
                title="Fuerza Laboral Escalable"
                description="Escala tu equipo de IA según tus necesidades"
              />
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#FBFBFA] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="max-w-3xl mx-auto">
              <FAQItem
                question="¿Qué es Astro AI?"
                answer="Astro AI es una plataforma que proporciona agentes de inteligencia artificial para automatizar ventas y tareas, ayudando a las empresas a crecer y ser más eficientes."
              />
              <FAQItem
                question="¿Cómo funciona la integración con WhatsApp?"
                answer="Nuestros agentes de IA se integran directamente con tu cuenta de WhatsApp Business, permitiéndoles interactuar con tus clientes y procesar ventas de manera autónoma."
              />
              <FAQItem
                question="¿Puedo personalizar los agentes de IA?"
                answer="Sí, puedes personalizar los agentes de IA para que se adapten a tu marca y a tus necesidades específicas de negocio."
              />
              <FAQItem
                question="¿Qué tipo de soporte ofrecen?"
                answer="Ofrecemos diferentes niveles de soporte según el plan elegido, desde soporte por email hasta soporte 24/7 para nuestros clientes empresariales."
              />
            </div>
          </div>
        </section>

        <section className="bg-[#00B4D8] py-16 md:py-24 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para revolucionar tu negocio?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Únete a la lista de espera y sé de los primeros en experimentar el poder de Astro AI.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-[#00B4D8] hover:bg-gray-100"
              onClick={() => {
                const waitingListForm = document.querySelector('form');
                if (waitingListForm) {
                  waitingListForm.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Unirse a la Lista de Espera
              <ArrowUp className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BotIcon className="h-8 w-8 text-[#00B4D8]" />
              <span className="text-xl font-bold">Astro AI</span>
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Astro AI. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#FBFBFA] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        <ChevronDown className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-600">
          {answer}
        </p>
      )}
    </div>
  )
}