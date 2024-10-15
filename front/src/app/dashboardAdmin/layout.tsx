import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen">
      {/* Barra de navegación a la izquierda */}
      <div className="w-1/4 bg-gray-900 text-white p-6">
        <nav className="space-y-4">
          <Link
            href="/dashboardAdmin/appointments"
            className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
          >
            Turnos Reservados
          </Link>
          <Link
            href="/dashboardAdmin/categories"
            className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
          >
            Servicios
          </Link>
          <Link
            href="/dashboardAdmin/users"
            className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
          >
            Usuarios
          </Link>
        </nav>
      </div>

      {/* Contenido principal a la derecha */}
      <div className="flex-1 bg-gray-100 p-6">
        {children}
      </div>
    </section>
  );
}
