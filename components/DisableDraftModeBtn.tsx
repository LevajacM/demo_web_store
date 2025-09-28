'use client';

import { useDraftModeEnvironment } from 'next-sanity/hooks';
import { useRouter } from 'next/navigation';

const DisableDraftModeBtn = () => {
  const environment = useDraftModeEnvironment();
  const router = useRouter();

  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }

  const handleClick = async () => {
    await fetch('/draft-mode/disable');
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className='fixed bottom-4 right-4 bg-yellow-400 px-4 py-2 z-100 rounded-xl border-2 border-yellow-600'
    >
      Disable Draft Mode
    </button>
  );
};

export default DisableDraftModeBtn;
