export function cleanCSS(cssString) {
    return cssString
    .replace(/\s+/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim();
}

export function cleanHTML(htmlString) {
    return htmlString
      .replace(/<!--[\s\S]*?-->/g, '')  // Remove HTML comments
      .replace(/>\s+</g, '><')  // Remove whitespaces between tags
      .replace(/\n/g, '')  // Remove new lines
      .replace(/\s+/g, ' ')  // Replace multiple spaces with a single space
      .trim();  // Remove leading and trailing spaces
}

export function cleanJS(jsString) {
    return jsString
      .replace(/\/\/.*$/gm, '')
      .replace(/\s+/g, ' ')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .trim();
}