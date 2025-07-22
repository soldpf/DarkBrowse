// URL validation and formatting utilities

export const validateUrl = (url) => {
  try {
    // Check if it's a valid URL
    new URL(url);
    return true;
  } catch {
    // Check if it's a search query or domain without protocol
    if (url && url.trim().length > 0) {
      return true;
    }
    return false;
  }
};

export const formatUrl = (input) => {
  if (!input || !input.trim()) {
    return '';
  }

  const trimmedInput = input.trim();
  
  // If it already has a protocol, return as is
  if (trimmedInput.startsWith('http://') || trimmedInput.startsWith('https://')) {
    return trimmedInput;
  }
  
  // If it looks like a domain (contains a dot but no spaces)
  if (trimmedInput.includes('.') && !trimmedInput.includes(' ')) {
    return `https://${trimmedInput}`;
  }
  
  // If it's a localhost or IP address
  if (trimmedInput.startsWith('localhost') || isIPAddress(trimmedInput)) {
    return `http://${trimmedInput}`;
  }
  
  // Otherwise, treat it as a search query
  return `https://duckduckgo.com/?q=${encodeURIComponent(trimmedInput)}`;
};

export const isIPAddress = (str) => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(str) || ipv6Regex.test(str);
};

export const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return url;
  }
};

export const isSecureUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export const sanitizeUrl = (url) => {
  // Remove potentially dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  
  for (const protocol of dangerousProtocols) {
    if (url.toLowerCase().startsWith(protocol)) {
      return 'about:blank';
    }
  }
  
  return url;
};

export const getUrlTitle = (url) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
    // Remove www. prefix
    return hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

export const isOnionUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.endsWith('.onion');
  } catch {
    return false;
  }
};

export const getSearchUrl = (query, searchEngine = 'duckduckgo') => {
  const encodedQuery = encodeURIComponent(query);
  
  switch (searchEngine) {
    case 'duckduckgo':
      return `https://duckduckgo.com/?q=${encodedQuery}`;
    case 'startpage':
      return `https://www.startpage.com/sp/search?query=${encodedQuery}`;
    case 'searx':
      return `https://searx.org/?q=${encodedQuery}`;
    default:
      return `https://duckduckgo.com/?q=${encodedQuery}`;
  }
};
