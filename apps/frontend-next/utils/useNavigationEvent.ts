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

export const useCompleteEvent = (onPathnameChange: ({ shallow }: { shallow: boolean }) => void) => {
    const pathname = usePathname(); // Get current route
    const searchParams = useSearchParams();
    const path = useContext(PathCtx);
  
    useEffect(() => {
      path.setPath(false);
      onPathnameChange({ shallow: true });
    }, [pathname, searchParams, onPathnameChange]);
  };