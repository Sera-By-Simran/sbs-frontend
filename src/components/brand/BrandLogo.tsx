import React from 'react';
import Image from 'next/image';

export type BrandLogoVariant = 'header' | 'footer' | 'stacked' | 'monogram';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  className = '',
  priority = false,
}) => {
  switch (variant) {
    case 'header':
      return (
        <div className={`relative flex items-center ${className}`}>
          <Image
            src="/brand/logo-header.png"
            alt="SÉRA BY SIMRAN"
            width={240}
            height={80}
            priority={priority}
            className="h-10 w-auto object-contain"
          />
        </div>
      );

    case 'footer':
      return (
        <div className={`relative flex items-center ${className}`}>
          <Image
            src="/brand/logo-footer.svg"
            alt="SÉRA BY SIMRAN"
            width={180}
            height={60}
            priority={priority}
            className="h-9 w-auto object-contain brightness-100"
          />
        </div>
      );

    case 'stacked':
      return (
        <div className={`relative flex items-center ${className}`}>
          <Image
            src="/brand/logo-stacked.png"
            alt="SÉRA BY SIMRAN"
            width={140}
            height={140}
            priority={priority}
            className="h-20 w-auto object-contain"
          />
        </div>
      );

    case 'monogram':
      return (
        <div className={`relative flex items-center ${className}`}>
          <Image
            src="/brand/monogram.png"
            alt="SÉRA Monogram"
            width={48}
            height={48}
            priority={priority}
            className="h-8 w-8 object-contain"
          />
        </div>
      );

    default:
      return null;
  }
};
