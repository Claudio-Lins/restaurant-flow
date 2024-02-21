import { Sidebar } from "@/components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <div className="grid-cols-adminLayout grid min-h-screen w-full bg-gradient-to-r from-rose-900 via-rose-700 to-rose-900">
      <Sidebar />
      <main className="px-4 pb-12 pt-8">{children}</main>
    </div>
  );
}
