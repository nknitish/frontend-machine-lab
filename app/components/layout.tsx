"use client";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-red-100 h-screen justify-center items-center">
      {children}
    </div>
  );
}
