import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center">
      <nav className="flex space-x-4 mb-4">
        <Link
          href="/dashboard/profiles"
          className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Profiles
        </Link>
        <Link
          href="/dashboard/orders"
          className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Orders
        </Link>
      </nav>
      {children}
    </section>
  );
}
