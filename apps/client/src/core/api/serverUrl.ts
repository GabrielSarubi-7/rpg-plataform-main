const configuredServerUrl = import.meta.env.VITE_SERVER_URL?.trim() ?? "";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isLocalHost(hostname: string) {
  return LOCAL_HOSTS.has(hostname);
}

function isLocalServerUrl(url: string) {
  try {
    return isLocalHost(new URL(url).hostname);
  } catch {
    return false;
  }
}

function shouldUseConfiguredServerUrl() {
  if (!configuredServerUrl) {
    return false;
  }

  if (typeof window === "undefined") {
    return true;
  }

  if (!isLocalServerUrl(configuredServerUrl)) {
    return true;
  }

  return isLocalHost(window.location.hostname);
}

export const SERVER_URL = shouldUseConfiguredServerUrl()
  ? configuredServerUrl.replace(/\/$/, "")
  : "";
