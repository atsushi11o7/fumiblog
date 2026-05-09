import { useEffect, useRef, useState } from 'react';

export interface UseTypingLoopOptions {
  typeSpeed?: number;
  holdDuration?: number;
}

export function useTypingLoop(text: string, options?: UseTypingLoopOptions) {
  const { typeSpeed = 60, holdDuration = 20_000 } = options ?? {};
  const [displayLen, setDisplayLen] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (displayLen < text.length) {
      timerRef.current = setTimeout(() => setDisplayLen((n) => n + 1), typeSpeed);
    } else {
      timerRef.current = setTimeout(() => setDisplayLen(0), holdDuration);
    }
    return () => clearTimeout(timerRef.current);
  }, [displayLen, text.length, typeSpeed, holdDuration]);

  return { displayLen };
}
