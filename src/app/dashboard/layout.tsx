import SkipToContent from "@components/SkipToContent";
import SwipeMenu from "@components/SwipeMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-[100vh]">
      <SkipToContent />
      <div id="sidebar" className="bg-background-200 flex-grow">
        <SwipeMenu />
      </div>
      <main id="main" tabIndex={0} className="flex-grow-[2] bg-background-100">
        {children}
      </main>
    </div>
  );
}
