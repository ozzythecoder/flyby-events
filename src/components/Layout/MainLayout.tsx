import HeaderBar from "./HeaderBar";
import SideNav from "./Sidenav";
import SkipToContent from "./SkipToContent";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="_bg-container" className="bg-background">
      <div className="relative mx-auto max-w-[1000px]">
        <SkipToContent />
        <SideNav />
        <div className="p-8 h-[100vh] w-full">
          <HeaderBar />
          <div className=" left-0 my-4 w-full h-[1px] bg-background-800"></div>
          <main id="main" tabIndex={-1} className="max-w-[800px] mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
