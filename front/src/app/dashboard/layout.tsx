import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center min-h-screen py-8">
      {/* Tarjeta con fondo blanco transparente, bordes redondeados y sombra */}
      <div className="w-full max-w-4xl p-6 bg-white bg-opacity-80 rounded-lg shadow-lg shadow-gray-900">
        
        {/* Menú de navegación centrado */}
        <nav className="flex justify-center space-x-4 mb-4">
          <Link
            href="/dashboard/profiles"
            className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            Mi Perfil
          </Link>
          <Link
            href="/dashboard/orders"
            className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            Turnos Atendidos
          </Link>
        </nav>
      </div>

      {/* Contenido dinámico */}
      <div>{children}</div>
    </section>
  );
}
