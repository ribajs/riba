export const createPageHtml = ({
  namespace,
  content,
  route,
  includePreload = false,
}: {
  namespace: string;
  content: string;
  route?: string;
  includePreload?: boolean;
}) => {
  const routeAttr = route ? ` data-route="${route}"` : "";
  const preloadLink = includePreload
    ? '<link rel="router-preload" href="/prefetched.html" />'
    : "";
  return `
    <html>
      <head>
        <title>${namespace}</title>
        ${preloadLink}
      </head>
      <body>
        <div id="app">
          <main data-namespace="${namespace}"${routeAttr}>${content}</main>
        </div>
      </body>
    </html>
  `;
};

export const mountRouterFixture = (namespace = "home") => {
  document.body.textContent = "";
  const wrapper = document.createElement("div");
  wrapper.id = "app";
  const container = document.createElement("main");
  container.dataset.namespace = namespace;
  const link = document.createElement("a");
  link.id = "plain-link";
  link.href = "/next.html";
  link.textContent = "next";
  container.appendChild(link);
  wrapper.appendChild(container);
  document.body.appendChild(wrapper);
  return { wrapper, container, link };
};
