/* eslint-disable no-restricted-globals */
import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { getConfig } from "./getConfig"
import history from "./utils/history"
import "open-props/style"
import "open-props/normalize"
import { Auth0Provider } from "@auth0/auth0-react"

const onRedirectCallback = (appState: any) => {
	history.push(
		appState && appState.returnTo
			? appState.returnTo
			: window.location.pathname
	)
}
const config = getConfig()
const providerConfig = {
	domain: config.domain,
	clientId: config.clientId,
	...(config.audience ? { audience: config.audience } : null),
	redirectUri: window.location.origin,
	onRedirectCallback,
}

ReactDOM.render(
	<Auth0Provider {...providerConfig}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Auth0Provider>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

//   client.connect(function (err) {
//     if (err) return callback(err);
