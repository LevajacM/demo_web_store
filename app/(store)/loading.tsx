import { LoaderTwo } from '@/components/ui/loader';

const Loading = () => {
  return (
    <div className='h-full'>
      <div className='grid place-items-center h-screen w-full'>
        <LoaderTwo />
      </div>
    </div>
  );
};

export default Loading;
