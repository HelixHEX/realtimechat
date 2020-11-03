import ReactGA from "react-ga";

export const PageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search)
}

export const Event = (category: string, action: string, label: string) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  })
}