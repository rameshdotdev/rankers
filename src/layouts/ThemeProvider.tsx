import { RootState } from "@/app/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeMode = useSelector((state: RootState) =>
    state.theme.isDark ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  return <div>{children}</div>;
}
