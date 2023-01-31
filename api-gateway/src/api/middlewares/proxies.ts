import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxyMiddleware = createProxyMiddleware("/auth", {
  target: `http://localhost:4001`,
  changeOrigin: true,
  pathRewrite: {
    "^/auth": "",
  },
});

export const homeProxyMiddleware = createProxyMiddleware("/home", {
  target: `http://localhost:4002`,
  changeOrigin: true,
  pathRewrite: {
    "^/home": "",
  },
});

export const ecomProxyMiddleware = createProxyMiddleware("/ecom", {
  target: `http://localhost:4004`,
  changeOrigin: true,
  pathRewrite: {
    "^/ecom": "",
  },
});
