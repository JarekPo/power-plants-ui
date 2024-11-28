import ReactGA from 'react-ga4';

const googleAnalyticsID = import.meta.env.VITE_GA_ID;

export const initGA = () => {
  ReactGA.initialize(googleAnalyticsID as string);
};

export const logPageView = () => {
  ReactGA.send({hitType: 'pageview', page: '/'});
};
