"use client";

import React from "react";

export const MedSupportLogo: React.FC<{
  className?: string;
  iconOnly?: boolean;
}> = ({ className = "h-9 w-auto", iconOnly = false }) => {
  return (
    <div className="inline-flex items-center shrink-0">
      <img
        src="/bike-logo.png"
        alt="MedGo"
        className={`object-contain max-h-full max-w-full shrink-0 ${className}`}
      />
    </div>
  );
};

