import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-wellness-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-2 text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link to="/" className="mt-6">
        <Button>
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
