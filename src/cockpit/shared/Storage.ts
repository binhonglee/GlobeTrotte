import { CacheStorageName } from "@/cache/CacheStorage";

type LocalStorageKey = CacheStorageName | "auth" | "saved_trips" | "theme";

export function getLocal(key: LocalStorageKey): string | null {
  return localStorage.getItem(key);
}

export function setLocal(key: LocalStorageKey, value: string): void {
  return localStorage.setItem(key, value);
}

export function removeLocal(key: LocalStorageKey): void {
  return localStorage.removeItem(key);
}
