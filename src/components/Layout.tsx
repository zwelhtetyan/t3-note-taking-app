interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-3 gap-10">{children}</div>
  );
};

export default Layout;
