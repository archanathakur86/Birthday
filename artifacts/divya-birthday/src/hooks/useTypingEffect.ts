import { useState, useEffect, useCallback, useRef } from 'react';

export function useTypingEffect(
  text: string,
  speed: number = 50,
  startDelay: number = 0,
  onComplete?: () => void
) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    
    setDisplayedText('');
    setIsComplete(false);
    setIsTyping(false);

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setIsTyping(true);
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(typeNextChar, speed + (Math.random() * speed * 0.5));
      } else {
        setIsTyping(false);
        setIsComplete(true);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };

    if (text) {
      timeout = setTimeout(typeNextChar, startDelay);
    }

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayedText, isTyping, isComplete };
}
