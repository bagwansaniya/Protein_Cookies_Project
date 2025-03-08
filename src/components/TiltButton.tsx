import { Link } from 'react-router-dom';

interface TiltButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const TiltButton = ({ to, children, className = '' }: TiltButtonProps) => {
  return (
    <Link
      to={to}
      className={`inline-block bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg ${className}`}
    >
      {children}
    </Link>
  );
};