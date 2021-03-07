import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  const ticketsList = tickets.map(ticket => {
    return (<tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.price}</td>
      <td>
        <Link href="/tickets/[ticketId]" as={`tickets/${ticket.id}`}>
          <a>View</a>
        </Link>
      </td>
    </tr>)
  })

  return (
    <div>
      <h2>Tickets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketsList}
        </tbody>
      </table>
    </div>
  )
};

// function of nextJS. nextJS calls this function while trying to render the app on the server.
// It allows fetching data that the component needs during the SSR process.
// We cannot request data inside the component during SSR:
// The component is rendered one single time, so we cannot wait for a response.
// getInitialProps get the request object with the headers we need to path to the request (host: ticketing.dev and the cookie)
// When there is getInitialProps in the app component, this function is not invocted automatically
// So we invoce it in the app (see there)
LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
