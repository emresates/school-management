import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

// Burdaki sidebar yapısı düzenlenmeli
export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="w-1/6 mobile:w-1/12 desktop:w-[10%]">
        <Sidebar />
      </div>
      <div className="w-5/6 overflow-y-auto mobile:w-11/12 desktop:w-[90%]">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
