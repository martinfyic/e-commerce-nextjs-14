import { redirect } from 'next/navigation';

export default function NamePage() {
  redirect('/auth/login');
}
