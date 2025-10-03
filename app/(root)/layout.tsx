import { Navbar } from "@/components";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
