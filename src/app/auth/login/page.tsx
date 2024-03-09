import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export const metadata = {
  title: 'Sign In',
  description: 'Login page on the sigma shop website',
};

interface Props {
  searchParams: {
    redirectTo?: string;
  };
}

export default function LoginPage({ searchParams }: Props) {
  const redirectTo = searchParams.redirectTo;

  return (
    <div className='flex min-h-screen flex-col pt-32 sm:pt-52'>
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>Sign In</h1>

      <LoginForm redirectTo={redirectTo} />
    </div>
  );
}
