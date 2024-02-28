//* Forma de implementar control sin middleware, con en layout, si no esta autenticado lo redirige al login

// import { auth } from '@/auth.config';
// import { redirect } from 'next/navigation';

// export default async function CheckoutLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();

//   if (!session?.user) redirect('/auth/login?redirectTo=/checkout/address');

//   return <>{children}</>;
// }
