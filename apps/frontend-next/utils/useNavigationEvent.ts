"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useRef } from "react";

const defaultCtx = {
  path: false,
  setPath: (newVal: boolean) => {},
  /* more settings */
};

export const PathCtx = createContext(defaultCtx);

export const useNavigationEvent = (beforePathnameChange: ({ shallow }: { shallow: boolean}) => void) => {
  const { path } = useContext(PathCtx);
  const oldPath = useRef(path);

  useEffect(() => {
    if (path === oldPath.current) return;
    oldPath.current = path;
    // console.log("Path changed to", path);
    if (path) beforePathnameChange({ shallow: true});
  }, [path]);
}

// export const useNavigationEvent = (onPathnameChange: ({ shallow }: { shallow: boolean }) => void) => {
//   const pathname = usePathname(); // Get current route
//   const searchParams = useSearchParams();

//   // Save pathname on component mount into a REF
//   const savedPathNameRef = useRef(pathname);
//   const savedSearchparams = useRef(searchParams);

//   useEffect(() => {
//     // If REF has been changed, do the stuff
//     if (savedPathNameRef.current !== pathname || savedSearchparams.current !== searchParams) {
//       onPathnameChange({ shallow: true });
//       // Update REF
//       savedPathNameRef.current = pathname;
//       savedSearchparams.current = searchParams;
//     }
//   }, [pathname, searchParams, onPathnameChange]);
// };

export const useCompleteEvent = (onPathnameChange: ({ shallow }: { shallow: boolean }) => void) => {
    const pathname = usePathname(); // Get current route
    const searchParams = useSearchParams();
    const path = useContext(PathCtx);
  
    useEffect(() => {
      path.setPath(false);
      onPathnameChange({ shallow: true });
    }, [pathname, searchParams, onPathnameChange]);
  };