export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
