import React from "react"
import { Sidebar } from "../sidebar/sidebar"
import styles from "./layout.module.scss"

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={styles["root"]}>
			<Sidebar links={["profile", "dashboard", "notes", "settings"]} />
			<div className={styles["layout"]}>{children}</div>
		</div>
	)
}

export { Layout }
