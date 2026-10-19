/**
 * Theme boot — shared between the server layout and the client ThemeProvider.
 *
 * Kept in a plain module (no `"use client"`) so the `[locale]` server layout can
 * inline the script: a `<script>` rendered inside a Client Component is never
 * executed on the client, which React 19 flags as an error.
 */

export const THEME_STORAGE_KEY = "tidjarati-theme";

export type Theme = "light" | "dark" | "system";

export const DEFAULT_THEME: Theme = "dark";

/**
 * Applies the stored theme to `<html>` before the first paint (no flash).
 * Mirrors `ThemeProvider`'s resolution: stored value → `prefers-color-scheme`.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{
var stored=window.localStorage.getItem("${THEME_STORAGE_KEY}");
var theme=stored==="light"||stored==="dark"||stored==="system"?stored:"${DEFAULT_THEME}";
var resolved=theme==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):theme;
var root=document.documentElement;
root.classList.toggle("dark",resolved==="dark");
root.style.colorScheme=resolved;
}catch(e){}})();`;
