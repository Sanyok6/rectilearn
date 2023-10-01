"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export const useNavigationEvent = (onPathnameChange: ({ shallow }: { shallow: boolean }) => void) => {
  const pathname = usePathname(); // Get current route
  const searchParams = useSearchParams();

  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);
  const savedSearchparams = useRef(searchParams);

  useEffect(() => {
    // If REF has been changed, do the stuff
    if (savedPathNameRef.current !== pathname || savedSearchparams.current !== searchParams) {
      onPathnameChange({ shallow: true });
      // Update REF
      savedPathNameRef.current = pathname;
      savedSearchparams.current = searchParams;
    }
  }, [pathname, searchParams, onPathnameChange]);
};

export const useCompleteEvent = (onPathnameChange: ({ shallow }: { shallow: boolean }) => void) => {
    const pathname = usePathname(); // Get current route
    const searchParams = useSearchParams();
  
    useEffect(() => {
      onPathnameChange({ shallow: true });
    }, [pathname, searchParams, onPathnameChange]);
  };