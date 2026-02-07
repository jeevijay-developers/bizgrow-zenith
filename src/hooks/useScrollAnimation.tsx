import { useEffect, useRef, useState, forwardRef, ForwardedRef } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Wrapper component for animated sections
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(20px)";
      case "down":
        return "translateY(-20px)";
      case "left":
        return "translateX(20px)";
      case "right":
        return "translateX(-20px)";
      case "fade":
        return "translateY(0)";
      default:
        return "translateY(20px)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : getInitialTransform(),
        transition: `opacity 0.3s ease-out ${delay}ms, transform 0.3s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Staggered children animation wrapper - with forwardRef support
interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggeredContainer = forwardRef<HTMLDivElement, StaggeredContainerProps>(
  ({ children, className = "", staggerDelay = 100 }, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { ref: animationRef, isVisible } = useScrollAnimation();

    // Combine refs if needed
    const setRefs = (node: HTMLDivElement | null) => {
      // Set the internal animation ref
      (animationRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      
      // Set the forwarded ref
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <div ref={setRefs} className={className}>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <div
                key={index}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(15px)",
                  transition: `opacity 0.3s ease-out ${index * staggerDelay}ms, transform 0.3s ease-out ${index * staggerDelay}ms`,
                }}
              >
                {child}
              </div>
            ))
          : children}
      </div>
    );
  }
);

StaggeredContainer.displayName = "StaggeredContainer";