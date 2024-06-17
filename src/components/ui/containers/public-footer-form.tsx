import Link from 'next/link';

type Route = {
  path: string;
  name: string;
};

type Props = {
  routes: Route[];
};

const PublicFooterForm = ({ routes }: Props) => {
  return (
    <div className='mt-4 flex justify-between'>
      {routes.map((r: Route, index) => (
        <div key={index}>
          <Link
            href={r.path}
            className='font-semibold text-gray-400 hover:underline'
          >
            {r.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PublicFooterForm;
