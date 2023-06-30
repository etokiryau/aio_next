import { FC, ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Image from "next/image";
import ArrowSmall from "@/components/ui/_icons/ArrowSmallIcon";
import LogoNavIcon from "@/components/ui/_icons/LogoNavIcon";
import DocumentIcon from "@/components/ui/_icons/DocumentIcon";
import MaterialsIcon from "@/components/ui/_icons/MaterialsIcon";
import ConstructionIcon from "@/components/ui/_icons/ConstrctionIcon";
import SmarthouseIcon from "@/components/ui/_icons/SmartHouseIcon";
import CodesignIcon from "@/components/ui/_icons/CodesignIcon";

import styles from "./navbar.module.scss";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import { selectAccount, toggleSidebar } from "../accountSlice";

interface IPathes {
    name: string,
    path: string,
    icon: ReactElement
};

const Navbar: FC = () => {
	const { pathname } = useRouter();
    const { isActive } = useTypedSelector(selectAccount);
    const dispatch = useTypedDispatch();

    const pathes: IPathes[] = [
        {name: 'Home page', path: '/dashboard', icon: <LogoNavIcon />},
        {name: 'Documentation', path: '/documentation', icon: <DocumentIcon />},
        {name: 'Materials', path: '/materials', icon: <MaterialsIcon />},
        {name: 'Construction', path: '/construction', icon: <ConstructionIcon />},
        {name: 'Smart house', path: '/smarthouse', icon: <SmarthouseIcon />},
        {name: 'Co-design', path: '/codesign', icon: <CodesignIcon />}
    ];

    return (
        <nav className={`${styles.navbar} ${isActive ? '' : styles.notActive}`}>
            <div className={styles.navbar__content}>
                <div className={styles.navbar__header}>
                    <Image src="/largeLogo.svg" alt="logo" width={60} height={29} />
                    <div onClick={() => dispatch(toggleSidebar())}><ArrowSmall /></div>
                </div>
                <ul className={styles.navbar__links}>
                    {pathes.map((item, i) => {
                        return (
                            <li key={i}>
                                <Link
                                    href={item.path}
                                    className={
                                        pathname === item.path
                                            ? styles.activeLink
                                            : ""
                                    }
                                >
                                    {item.icon}
                                    <p>{item.name}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Link className={styles.navbar__back} href="/">
                AIO main page
            </Link>
        </nav>
    )
}

export default Navbar;