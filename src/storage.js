// Unified storage: works in Claude artifacts (window.storage) AND production (localStorage)
export async function storageGet(key) {
  if (window.storage?.get) {
    try {
      const r = await window.storage.get(key);
      return r ? r.value : null;
    } catch { /* fall through */ }
  }
  return localStorage.getItem(key);
}

export async function storageSet(key, value) {
  if (window.storage?.set) {
    try { await window.storage.set(key, value); return; } catch { /* fall through */ }
  }
  localStorage.setItem(key, value);
}
