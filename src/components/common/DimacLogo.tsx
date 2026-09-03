import React from 'react';
import { useApp } from '../../context/AppContext';
import { LogoColorTheme } from '../../types';

interface DimacLogoProps {
  variant?: 'full' | 'horizontal' | 'symbol' | 'badge';
  theme?: 'light' | 'dark' | 'original';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
  customImageUrlOverride?: string | null;
  colorThemeOverride?: LogoColorTheme;
  brandNameOverride?: string;
  taglineOverride?: string;
  forceVector?: boolean;
}

export const DimacLogo: React.FC<DimacLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showTagline,
  customImageUrlOverride,
  colorThemeOverride,
  brandNameOverride,
  taglineOverride,
  forceVector = false,
}) => {
  // Safe App Context access
  let appLogoConfig = {
    customImageUrl: '/assets/dimac-logo-official.svg' as string | null,
    brandName: 'DIMAC',
    tagline: 'ASIA PREMIER LAWYERS',
    showTagline: true,
    colorTheme: 'official' as LogoColorTheme,
  };

  try {
    const app = useApp();
    if (app && app.logoConfig) {
      appLogoConfig = app.logoConfig;
    }
  } catch (e) {
    // Rendered outside AppProvider fallback
  }

  const customImage = customImageUrlOverride !== undefined 
    ? customImageUrlOverride 
    : (!forceVector ? (appLogoConfig.customImageUrl || '/assets/dimac-logo-official.svg') : null);
  const colorTheme = colorThemeOverride || appLogoConfig.colorTheme || 'official';
  const brandName = brandNameOverride || appLogoConfig.brandName || 'DIMAC';
  const tagline = taglineOverride || appLogoConfig.tagline || 'ASIA PREMIER LAWYERS';
  const displayTagline = showTagline !== undefined ? showTagline : appLogoConfig.showTagline;

  // Theme color maps for Official DIMAC Vector Identity
  const THEME_COLORS: Record<LogoColorTheme, { green: string; red: string }> = {
    official: {
      green: '#165A31', // Official Forest Green
      red: '#A02B2D',   // Deep Crimson Red
    },
    gold: {
      green: '#0F381E', // Deep Emerald
      red: '#C59B27',   // Imperial Gold
    },
    monochrome: {
      green: '#1E293B', // Slate Charcoal
      red: '#475569',   // Cool Grey
    },
    emerald: {
      green: '#047857', // Emerald Green
      red: '#BE123C',   // Ruby Rose
    },
  };

  const { green, red } = THEME_COLORS[colorTheme] || THEME_COLORS.official;

  // Dimension scaling configuration
  const scaleMap = {
    xs: { h: 30, text: 'text-[14px] font-black', tag: 'text-[6px] tracking-[0.06em] leading-[1.15]' },
    sm: { h: 40, text: 'text-[18px] font-black', tag: 'text-[7.5px] tracking-[0.08em] leading-[1.15]' },
    md: { h: 54, text: 'text-[24px] font-black', tag: 'text-[9.5px] tracking-[0.10em] leading-[1.2]' },
    lg: { h: 68, text: 'text-[30px] font-black', tag: 'text-[12px] tracking-[0.12em] leading-[1.2]' },
    xl: { h: 90, text: 'text-[40px] font-black', tag: 'text-[15px] tracking-[0.14em] leading-[1.2]' },
  };

  const currentScale = scaleMap[size] || scaleMap.md;

  // Exact vector rendering of the official DIMAC Soaring Eagle + 5-Pointed Star
  const EagleSymbol = (
    <svg 
      viewBox="0 0 200 135" 
      className="shrink-0 overflow-visible"
      style={{ height: `${currentScale.h}px`, width: `${Math.round(currentScale.h * 1.48)}px` }}
      aria-label="DIMAC Official Eagle Logo"
    >
      {/* 5-Pointed Red Star - Upper Right quadrant */}
      <polygon 
        points="172,20 176,32 189,32 178,40 182,52 172,44 162,52 166,40 155,32 168,32" 
        fill={red} 
      />

      {/* Main Eagle Body & Wings in Official Forest Green */}
      <g fill={green}>
        {/* Left/Upper Wing - 5 Spread Primary Feathers */}
        <path d="M 68,14 
                 C 70,24 74,34 71,45 
                 C 66,33 58,23 48,15 
                 C 51,26 55,37 51,49 
                 C 45,39 36,30 26,24 
                 C 30,36 34,48 33,60 
                 C 27,53 20,47 13,43 
                 C 18,55 24,67 34,76 
                 C 47,87 63,92 82,92 
                 C 96,92 109,87 120,80 
                 L 110,75 
                 C 98,80 86,82 74,81 
                 C 62,80 51,75 42,68 
                 C 49,65 56,60 62,53 
                 C 68,46 73,37 77,27 
                 C 72,32 66,37 60,40 
                 C 65,29 67,18 68,14 Z" />

        {/* Right/Rear Wing - Swept Back Wingtips */}
        <path d="M 82,92 
                 C 94,90 106,85 117,78 
                 C 128,71 138,62 145,51 
                 C 148,42 147,33 144,24 
                 C 139,32 132,39 124,44 
                 C 130,36 133,26 131,16 
                 C 125,24 117,31 109,36 
                 C 112,28 113,19 109,10 
                 C 103,20 95,29 85,37 
                 C 79,42 72,48 66,54 
                 C 76,52 86,54 96,58 
                 C 105,62 113,68 119,75 
                 C 105,80 91,84 82,92 Z" />

        {/* Central Torso / Core */}
        <path d="M 62,56 C 70,50 79,47 89,47 C 98,47 107,51 114,57 C 108,68 97,76 84,80 C 72,76 65,66 62,56 Z" />
      </g>

      {/* Eagle Head & Curved Beak in Crimson Red */}
      <g fill={red}>
        {/* Head Crown Plumage & Curved Beak */}
        <path d="M 104,54 
                 C 112,52 121,52 129,54 
                 C 137,56 144,55 150,51 
                 C 155,48 159,50 161,53 
                 C 159,56 156,58 152,60 
                 C 146,63 140,66 134,68 
                 C 126,71 117,72 108,72 
                 C 104,66 102,60 104,54 Z" />
        {/* Hooked Beak Tip */}
        <path d="M 154,52 C 160,54 165,57 162,61 C 157,60 151,59 148,57 Z" />
      </g>

      {/* Lower Fan-Out Tail Feathers in Crimson Red */}
      <g fill={red}>
        <path d="M 58,74 
                 C 49,79 39,85 30,91 
                 C 38,89 47,86 55,82 
                 C 46,88 36,95 26,102 
                 C 36,99 46,94 55,89 
                 C 47,95 39,102 31,109 
                 C 42,105 53,99 62,91 
                 C 68,85 73,79 77,73 
                 C 70,72 63,73 58,74 Z" />
      </g>
    </svg>
  );

  // If a custom image was uploaded/entered, display it smoothly with height scaling
  const LogoVisual = customImage ? (
    <img 
      src={customImage} 
      alt={brandName} 
      className="object-contain shrink-0" 
      referrerPolicy="no-referrer"
      style={{ height: `${currentScale.h}px`, maxHeight: `${currentScale.h}px`, maxWidth: `${Math.round(currentScale.h * 2.8)}px` }}
      onError={(e) => {
        // Fallback to local official SVG if external fails
        if (e.currentTarget.src !== '/assets/dimac-logo-official.svg') {
          e.currentTarget.src = '/assets/dimac-logo-official.svg';
        }
      }}
    />
  ) : (
    EagleSymbol
  );

  if (variant === 'symbol') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{LogoVisual}</div>;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2.5 bg-white px-3 py-1.5 border border-[#DCE5DF] shadow-xs ${className}`}>
        {LogoVisual}
        <div className="flex flex-col">
          <span 
            className="font-black uppercase leading-none text-sm tracking-tight"
            style={{ color: green, fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
          >
            {brandName}
          </span>
          {displayTagline && (
            <span 
              className="font-bold uppercase tracking-[0.08em] text-[6.5px] leading-tight mt-0.5 whitespace-pre-line"
              style={{ color: red, fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
            >
              {tagline}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
        {LogoVisual}
        <div className="flex flex-col justify-center">
          <span 
            className={`uppercase leading-none ${currentScale.text}`}
            style={{ color: green, fontFamily: '"Helvetica Neue", Arial, sans-serif', letterSpacing: '0.04em' }}
          >
            {brandName}
          </span>
          {displayTagline && (
            <span 
              className={`font-bold uppercase leading-tight mt-0.5 whitespace-pre-line ${currentScale.tag}`}
              style={{ color: red, fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
            >
              {tagline}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default 'full' variant: Eagle symbol on top + Brand Name + Tagline below
  return (
    <div className={`inline-flex flex-col items-center text-center ${className}`}>
      {LogoVisual}
      <div className="mt-1.5 flex flex-col items-center">
        <span 
          className={`uppercase leading-none ${currentScale.text}`}
          style={{ color: green, fontFamily: '"Helvetica Neue", Arial, sans-serif', letterSpacing: '0.05em' }}
        >
          {brandName}
        </span>
        {displayTagline && (
          <span 
            className={`font-bold uppercase leading-tight mt-0.5 whitespace-pre-line ${currentScale.tag}`}
            style={{ color: red, fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
          >
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};
