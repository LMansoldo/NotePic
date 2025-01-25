import React from "react"

const MainLayout = ({ children, ...props }: { children: React.ReactNode } & React.ComponentProps<'main'>) => {
	return (
		<main {...props}>
			{children}
		</main>
	)
}

export default MainLayout