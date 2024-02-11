import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const categories = ['men', 'women', 'kids'];

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  if (!categories.includes(id)) {
    notFound();
  }

  return (
    <div>
      <h1>Category Page</h1>
    </div>
  );
}
