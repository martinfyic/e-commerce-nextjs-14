import Image from 'next/image';
import { redirect } from 'next/navigation';

import { OrderStatus, PaypalButton, Title } from '@/components';
import { getOrderById } from '@/actions';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok || !order) redirect('/auth/login');

  const address = order.OrderAddress;
  const products = order.OrderItem;

  return (
    <div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
      <div className='flex w-[1000px] flex-col'>
        <Title title={`Order #${id.split('-').at(-1)}`} />

        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {/* Cart */}
          <div className='mt-5 flex flex-col'>
            <OrderStatus isPaid={order.isPaid} />

            {/* Items Cart */}
            {products.map((prod) => (
              <div key={`${prod.product.slug}-${prod.size}`} className='my-2 flex'>
                <Image
                  src={`/products/${prod.product.ProductImage[0].url}`}
                  alt={prod.product.title}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  className='mr-5 rounded'
                />
                <div>
                  <p>{prod.product.title}</p>
                  <p>
                    {currencyFormat(prod.price)} x {prod.quantity}
                  </p>
                  <p className='mt-1 font-semibold'>
                    Subtotal: ${currencyFormat(prod.price * prod.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='flex flex-col rounded-xl bg-white p-3 shadow-xl sm:p-7'>
            <h2 className='mb-2 text-2xl font-semibold'>Shipping Address</h2>
            <div className='mb-10'>
              <p className='text-xl'>
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>
                {address?.city}, {address?.countryId}
              </p>
              <p>CP {address?.postalCode}</p>
              <p>{address?.phone}</p>
            </div>

            {/* Divider */}
            <div className='mb-10 h-0.5 w-full rounded bg-gray-200' />

            <h2 className='mb-2 text-2xl font-semibold'>Order Summary</h2>
            <div className='grid grid-cols-2'>
              <span className='mb-2 text-left'>Nro of Products</span>
              <span className='mb-2 text-right'>
                {order.itemsInOrder} {order.itemsInOrder === 1 ? 'Article' : 'Articles'}
              </span>

              <span className='mb-2 text-left'>Subtotal</span>
              <span className='mb-2 text-right'>{currencyFormat(order.subTotal)}</span>

              <span className='mb-2 text-left'>Taxes 22%</span>
              <span className='mb-2 text-right'>{currencyFormat(order.tax)}</span>

              <span className='mt-5 text-left text-2xl'>Total</span>
              <span className='mt-5 text-right text-2xl'>
                {currencyFormat(order.total)}
              </span>
            </div>
            <div className='flex-1' />
            <div className='mb-2 mt-5 w-full'>
              {order.isPaid ? (
                <OrderStatus isPaid={order.isPaid} />
              ) : (
                <PaypalButton orderId={order.id} amount={order.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
