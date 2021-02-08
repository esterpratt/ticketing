import Router from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: () => Router.push('/orders'),
  })

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    // we invoke the function before we call setInerval
    // because setInterval will start after 1000 ms
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    // return function for setInterval is called if we stop showing the component
    // or if the component is about to re-render
    // (which here is nont, because we don't have dependency as the second argument of the useEffect)
    return () => {
      clearInterval(timerId);
    }
  }, []);

  if (timeLeft < 0) {
    return <div>Order Expired</div>
  }
  
  // TODO: check how to save environment variables with nextJS
  return <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
      token={({id}) => doRequest({ token: id})}
      stripeKey="pk_test_51ICop6GOFEbQphvfL4Blr5Fjr6Cxn55bo9pf3ypM90hKXA7Na4gyQA1zjf4CTBeZlOwKeH00OneGiSNh4zoH20Fe0074SHfSLv"
      amount={order.ticket.price * 100}
      email={currentUser.email}
      />
      {errors}
    </div>
};

OrderShow.getInitialProps =  async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;