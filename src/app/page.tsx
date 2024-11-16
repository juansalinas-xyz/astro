"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, SetStateAction } from 'react'
import { Zap, Rocket, Instagram, BotIcon, CreditCard, AlarmClockPlus, NotebookPen, ArrowRight, CheckCircle2, Menu, ArrowUp } from 'lucide-react'
import { supabase } from './lib/supabaseClient'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

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
    <div className="flex flex-col min-h-screen">
         <header className="bg-gradient-to-b from-white to-blue-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BotIcon className="h-8 w-8 text-[#00B4D8]" />
          <span className="text-xl font-bold text-black">Astro AI</span>
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-[#00B4D8] transition duration-300">
            Características
          </Link>
          <Link href="#faq" className="text-sm font-medium text-gray-600 hover:text-[#00B4D8] transition duration-300">
            FAQ
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Impulsa tus ventas con <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#0077B6]">Astro AI</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl">
              Contrata agentes de IA para automatizar tus ventas y tareas, llevando tu negocio al siguiente nivel.
            </p>
            {success ? (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline"> Gracias por unirte a la lista de espera.</span>
              </div>
            ) : (
              <form id="waiting-list" className="flex flex-col sm:flex-row gap-2 mb-4" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
                  className="flex-grow"
                  required
                  aria-label="Dirección de correo electrónico"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Por favor, introduce una dirección de correo electrónico válida"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registrando...
                    </span>
                  ) : (
                    <>
                      Unirse a la Lista de Espera
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
            {error && <p className="text-red-600 mt-2">{error}</p>}
            <p className="text-sm text-gray-500 mb-4">
              Sé el primero en saber cuando lancemos. Sin spam, lo prometemos.
            </p>
          </div>
          <div className="md:w-1/2 relative mt-8 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <Image
              src="/astro-hero-image.png"
              alt="Astro AI - Agentes de IA para impulsar tus ventas"
              width={1000}
              height={1000}
              className="rounded-lg shadow-2xl relative z-10 animate-float"
            />
          </div>
        </div>
      </div>
    </header>

      <main className="flex-grow">
        <section id="features" className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">¿Por qué contratar agentes Astro AI?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <TarjetaCaracteristica
                icono={<BotIcon className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Integración con Whatsapp"
                descripcion="Nuestros agentes de IA venden tus productos por Whatsapp"
              />
              <TarjetaCaracteristica
                icono={<NotebookPen className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Gestión centralizada de inventario"
                descripcion="Gestiona tus productos de forma eficiente para maximizar tus ventas"
              />
              <TarjetaCaracteristica
                icono={<CreditCard className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Integración con pasarelas de pagos"
                descripcion="Procesa los pagos con la pasarela que ya utilizas"
              />
              <TarjetaCaracteristica
                icono={<Zap className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Finalización Automática de Tareas"
                descripcion="Aumenta la productividad y eficiencia de tu negocio"
              />
              <TarjetaCaracteristica
                icono={<AlarmClockPlus className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Ventas personalizadas 24/7"
                descripcion="Tus agentes de IA trabajan sin descanso"
              />
              <TarjetaCaracteristica
                icono={<Rocket className="w-12 h-12 text-[#00B4D8]" />}
                titulo="Fuerza Laboral Escalable"
                descripcion="Escala tu equipo de IA según tus necesidades"
              />
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Preguntas Frecuentes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">¿Qué es Astro AI?</h3>
                <p className="text-gray-600">Astro AI es una plataforma que proporciona agentes de inteligencia artificial para automatizar ventas y tareas, ayudando a las empresas a crecer y ser más eficientes.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">¿Cómo funciona la integración con WhatsApp?</h3>
                <p className="text-gray-600">Nuestros agentes de IA se integran directamente con tu cuenta de WhatsApp Business, permitiéndoles interactuar con tus clientes y procesar ventas de manera autónoma.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">¿Puedo personalizar los agentes de IA?</h3>
                <p className="text-gray-600">Sí, puedes personalizar los agentes de IA para que se adapten a tu marca y a tus necesidades específicas de negocio.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">¿Qué tipo de soporte ofrecen?</h3>
                <p className="text-gray-600">Ofrecemos diferentes niveles de soporte según el plan elegido, desde soporte por email hasta soporte 24/7 para nuestros clientes empresariales.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">¿Listo para revolucionar tu negocio?</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Únete a la lista de espera y sé de los primeros en experimentar el poder de Astro AI.
            </p>

            <Link href="#waiting_list" className="block text-sm font-medium text-gray-600 hover:text-[#00B4D8] transition duration-300">
              <Button size="lg" variant="secondary">
                Unirse a la Lista de Espera
                <ArrowUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>          
          </div>
        </section>
        
        
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Astro AI</h3>
              <p className="text-sm text-gray-400">Impulsando negocios con inteligencia artificial</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Astro AI. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
          ¡Gracias por unirte a la lista de espera!
        </div>
      )}
    </div>
  )
}

function TarjetaCaracteristica({ icono, titulo, descripcion }: { icono: React.ReactNode; titulo: string; descripcion: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          {icono}
        </div>
        <CardTitle>{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-center">{descripcion}</p>
      </CardContent>
    </Card>
  )
}