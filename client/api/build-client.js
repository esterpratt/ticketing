import axios from 'axios';

export default ({ req }) => {
  // getInitialProps also get excuted on the client: when Routing inside the app!
  // In order to check it, we can use the window object, that exists only in the browser
  if (typeof window === 'undefined') {
    // axios.create allows creating preconfigured version of axios with baseURL and headers that will behave as normal axios
    return axios.create({
      // We can create External Name Service to map the domain of the requests (won't do it here)
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: '',
    });
  }
};
