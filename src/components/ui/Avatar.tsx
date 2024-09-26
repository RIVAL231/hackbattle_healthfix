// src/components/ui/Avatar.tsx

import React from 'react';

// Define the types for the Avatar props
type AvatarProps = {
  children: React.ReactNode;
};

type AvatarImageProps = {
  src: string;
  alt: string;
};

type AvatarFallbackProps = {
  children: React.ReactNode;
};

// Avatar component
export const Avatar: React.FC<AvatarProps> = ({ children }) => {
  return <div className="avatar">{children}</div>;
};

// AvatarImage component
export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt }) => {
  return <img className="avatar-image" src={src} alt={alt} />;
};

// AvatarFallback component
export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children }) => {
  return <div className="avatar-fallback">{children}</div>;
};
