import cn from 'classnames';
export type LoaderSizeTypes = 'large' | 'medium' | 'small';
export type LoaderVariantTypes = 'blink' | 'scaleUp' | 'moveUp';
export interface LoaderTypes
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  tag?: 'div' | 'span';
  size?: LoaderSizeTypes;
  variant?: LoaderVariantTypes;
  showOnlyThreeDots?: boolean;
  className?: string;
}

const variants = {
  blink: 'animate-blink',
  scaleUp: 'animate-scale-up',
  moveUp: 'animate-move-up',
};
const sizes = {
  small: 'w-1.5 h-1.5',
  medium: 'w-2.5 h-2.5',
  large: 'w-3 h-3',
};

const handleLoaderPosition = (size: LoaderSizeTypes) => {
  return size === 'small' ? 'relative top-1.5' : 'relative top-3';
};

const handleVariantClasses = (
  variant: LoaderVariantTypes,
  size: LoaderSizeTypes
) => {
  return variant === 'moveUp' && size === 'small'
    ? 'animate-move-up-small'
    : variants[variant];
};

export const Loader = ({
  tag = 'div',
  size = 'medium',
  variant = 'moveUp',
  showOnlyThreeDots,
  className,
}: LoaderTypes) => {
  const Component = tag;
  return (
    <Component
      className={cn(
        'flex items-center gap-2',
        variant === 'moveUp' && handleLoaderPosition(size),
        className
      )}
    >
      <span
        className={cn(
          'rounded-full bg-current',
          handleVariantClasses(variant, size),
          sizes[size]
        )}
      />
      <span
        className={cn(
          'animation-delay-200 rounded-full bg-current',
          handleVariantClasses(variant, size),
          sizes[size]
        )}
      />
      <span
        className={cn(
          'animation-delay-500 rounded-full bg-current',
          handleVariantClasses(variant, size),
          sizes[size]
        )}
      />
      {variant === 'moveUp' && !showOnlyThreeDots ? (
        <span
          className={cn(
            'animation-delay-700 rounded-full bg-current',
            handleVariantClasses(variant, size),
            sizes[size]
          )}
        />
      ) : null}
    </Component>
  );
};
