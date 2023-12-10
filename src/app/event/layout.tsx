export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-8 h-[100vh] bg-background-900 text-text-400">
      {children}
    </div>
  );
}
