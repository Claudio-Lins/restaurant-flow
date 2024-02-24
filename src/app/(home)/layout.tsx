import { Navbar } from "@/components/home/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
}
