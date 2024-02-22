import { ReactNode, FC } from "react";
import SideNavigation from "../SideNavigation";

interface LayoutProps {
  children: ReactNode; // ReactNode allows any valid JSX to be passed as children
}
const SideNavigationLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-6 px-5 h-full">
      <div className="min-h-[100vh] md:block col-span-1">
        <SideNavigation />
      </div>
      <div className="col-span-5  h-full">{children}</div>
    </div>
  );
};

export default SideNavigationLayout;
