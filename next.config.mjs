/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "/api/socket/:path*",
      },
    ];
  },
};
export default config;
