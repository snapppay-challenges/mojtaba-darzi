import React, { memo, ReactNode } from "react";
import Header from "./header";

type LayoutProps = {
    children: ReactNode;
    title: string;
    back?: boolean;
    home?: boolean;
};

const Layout = memo(({ children, title, back = true, home = true }: LayoutProps) => (
    <div className="max-w-[1024px] mx-auto pb-16">
        <Header title={title} home={home} back={back} />
        {children}
    </div>
));

export default Layout;
