export default function Loading() {
  return (
    <div className='flex h-screen min-h-screen items-center justify-center'>
      <div className='h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500'></div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500'></div>
    </div>
  );
}
