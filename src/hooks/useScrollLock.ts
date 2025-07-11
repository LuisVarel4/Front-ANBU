import { useEffect } from 'react';

function useScrollLock(lock = false) {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', lock);
    document.documentElement.classList.toggle('overflow-hidden', lock);

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [lock]);
}

export default useScrollLock;
