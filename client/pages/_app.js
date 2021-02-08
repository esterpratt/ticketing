import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

// when navigating to a page, next imports the component from the file and wrap it inside its own custom component (the App).
// We define here our own custom component that next will wrap it with
// We can only import gloabl css in this file - next will not parse the other files
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

// Since this is not a page, the arguments of getInitialProps are different:
// The req object is nested inside { ctx: {req, res}}
// The Component object represent the component of the page that we are on, so we can call its getInitialProps from here
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
