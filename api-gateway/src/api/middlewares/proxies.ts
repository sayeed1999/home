import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxyMiddleware = createProxyMiddleware("/auth", {
  target: `http://localhost:4001`,
  changeOrigin: true,
  pathRewrite: {
    "^/auth": "",
  },
});
