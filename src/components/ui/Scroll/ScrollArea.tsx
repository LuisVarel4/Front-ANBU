import React, {
  type ReactNode,
  useRef,
  useEffect,
  forwardRef,
} from 'react';

export type ScrollAreaProps = {
  children: ReactNode;
  className?: string;
  autoScroll?: boolean;
};

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, className = '', autoScroll = false }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);

    // Usamos la ref pasada o fallback a la interna
    const combinedRef = (ref as React.RefObject<HTMLDivElement>) ?? internalRef;

    useEffect(() => {
      if (autoScroll && combinedRef.current) {
        combinedRef.current.scrollTop = combinedRef.current.scrollHeight;
      }
    }, [children, autoScroll, combinedRef]);

    return (
      <div
        ref={combinedRef}
        className={`scrollbar-thin scrollbar-thumb-red-anbu scrollbar-track-transparent h-full overflow-y-auto ${className}`}
      >
        {children}
      </div>
    );
  },
);

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
