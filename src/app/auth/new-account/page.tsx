import { titleFont } from '@/config/fonts';
import { NewAccountForm } from './ui/NewAccountForm';

export default function NewAccountPage() {
  return (
    <div className='flex min-h-screen flex-col pt-32 sm:pt-52'>
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>New account</h1>

      <NewAccountForm />
    </div>
  );
}
