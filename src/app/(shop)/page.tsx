import { titleFont } from '@/config/fonts';

export default function Home() {
	return (
		<>
			<h1>Hola mundo</h1>
			<h1 className={titleFont.className}>Hola mundo</h1>
		</>
	);
}
