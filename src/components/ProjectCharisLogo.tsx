import React from 'react';
import Image from 'next/image';

interface ProjectCharisLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gold' | 'slate' | 'warm';
  showText?: boolean;
  className?: string;
}

const ProjectCharisLogo: React.FC<ProjectCharisLogoProps> = ({
  size = 'md',
  variant = 'light',
  showText = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const imageSizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return {
          background: 'bg-[#2D3E4F]',
          iconColor: 'text-[#C9A76B]',
          textColor: 'text-[#F8F5ED]',
        };
      case 'gold':
        return {
          background: 'bg-[#C9A76B]',
          iconColor: 'text-[#2D3E4F]',
          textColor: 'text-[#F8F5ED]',
        };
      case 'slate':
        return {
          background: 'bg-[#7A9BB0]',
          iconColor: 'text-[#C9A76B]',
          textColor: 'text-[#F8F5ED]',
        };
      case 'warm':
        return {
          background: 'bg-[#D4B896]', // Warm light brown/tan
          iconColor: 'text-[#2D3E4F]',
          textColor: 'text-[#2D3E4F]',
        };
      default: // light
        return {
          background: 'bg-[#F8F5ED]',
          iconColor: 'text-[#C9A76B]',
          textColor: 'text-[#2D3E4F]',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} flex items-center justify-center mb-2`}>
        <Image
          src="/logo.png"
          alt="Project Charis Logo"
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="object-contain"
          priority
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <div
          className={`${styles.textColor} font-heading ${textSizeClasses[size]} text-center leading-tight`}
        >
          <div>PROJECT</div>
          <div>CHARIS</div>
        </div>
      )}
    </div>
  );
};

export default ProjectCharisLogo;
