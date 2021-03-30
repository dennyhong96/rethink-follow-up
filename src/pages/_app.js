import Head from "next/head";
import { Fragment } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "@styles/globalStyles";
import theme from "@styles/theme";

function MyApp({ Component, pageProps }) {
	return (
		<Fragment>
			<Head>
				<title>Rethink Challenge #3</title>
			</Head>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Component {...pageProps} />
			</ThemeProvider>
		</Fragment>
	);
}

export default MyApp;
