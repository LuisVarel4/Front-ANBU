import React, { type ReactNode, useRef, useEffect } from "react";

export type ScrollAreaProps = {
  children: ReactNode;
  className?: string;
  autoScroll?: boolean;
};

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className = "",
  autoScroll = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children, autoScroll]);

  return (
    <div
      ref={scrollRef}
      className={`scrollbar-thin scrollbar-thumb-red-anbu scrollbar-track-transparent overflow-y-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
