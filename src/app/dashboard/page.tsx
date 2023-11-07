interface PageProps {
  children: React.ReactNode;
}

export default function Dashboard(props: PageProps) {
  return (
    <main>
      <h1 className="font-heading text-4xl text-primary-600">Dashboard</h1>
    </main>
  );
}
