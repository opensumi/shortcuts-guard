function removeFirstSegment(segments: string): string {
  const dotIndex = segments.indexOf('.');
  return dotIndex === -1 ? '' : segments.slice(dotIndex + 1);
}

/* 
  https://developer.chrome.com/docs/extensions/mv3/match_patterns/
  Here's the basic syntax:
  <url-pattern> := <scheme>://<host><path>
  <scheme> := '*' | 'http' | 'https' | 'file' | 'ftp' | 'urn'
  <host> := '*' | '*.' <any char except '/' and '*'>+
  <path> := '/' <any chars> 
*/
function matchPattern(url: string, pattern: string): boolean {
  url = url.trim();
  const patternResults = /^(\*|https?):\/\/(\*|(?:\*\.)?[^/*]+)(\/.*)$/.exec(
    pattern,
  );
  const urlResults = /^(\*|https?):\/\/(\*|(?:\*\.)?[^/*]+)(\/.*)$/.exec(url);
  if (!(patternResults && urlResults)) {
    return false;
  }
  const [, scheme, host, path] = urlResults;
  const [, patternScheme, patternHost, patternPath] = patternResults;
  if (patternScheme !== '*' && scheme !== patternScheme) {
    return false;
  }
  if (
    !patternHost.startsWith('*.') &&
    patternHost !== '*' &&
    host !== patternHost
  ) {
    return false;
  }
  // https://*.google.com matches www.google.com and google.com
  if (
    patternHost.startsWith('*.') &&
    removeFirstSegment(host) !== patternHost.slice(2) &&
    host !== patternHost.slice(2)
  ) {
    return false;
  }
  const regExp = new RegExp(`^${patternPath.replace(/[*]/g, '[^]*')}$`);
  if (!regExp.test(path)) {
    return false;
  }
  return true;
}

/**
 * @param url 当前标签页的 URL
 * @param pattern 用于匹配的匹配模式
 */
export function matchUrl(url: string, pattern: string): boolean {
  return matchPattern(url, pattern);
}
