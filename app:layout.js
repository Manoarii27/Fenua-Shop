import './globals.css';

export const metadata = {
  title: 'Fenua — La marketplace du Fenua',
  description: 'La plateforme pour vendre et livrer entre les îles de Polynésie.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
