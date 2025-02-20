import { defineConfig, type DefaultTheme } from "vitepress";
import { siteconfig } from "./siteconfig";
import fs from "fs-extra";
import path from "path";

import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

import {
  getFileNameWithoutExtension,
  kebabToCamelCase,
} from "../../scripts/utils/utils";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vDocs/",
  ignoreDeadLinks: true,
  // outDir: 'build',
  cleanUrls: true,
  title: siteconfig.name,
  titleTemplate: `:title | ${siteconfig.name}`,
  description: siteconfig.desc,
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/vDocs/favicons/favicon.ico" }],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/vDocs/favicons/favicon-16x16.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/vDocs/favicons/favicon-32x32.png",
      },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: "/vDocs/favicons/apple-touch-icon.png" },
    ],
    ["link", { rel: "manifest", href: "/vDocs/favicons/site.webmanifest" }],
    ["meta", { name: "description", content: siteconfig.desc }],
    ["meta", { property: "og:title", content: siteconfig.name }],
    ["meta", { property: "og:description", content: siteconfig.desc }],
    [
      "meta",
      {
        property: "og:image",
        content:
          "https://placehold.co/1200x630/1f212d/5a78e6.png?font=poppins&text=vDocs",
      },
    ],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    [
      "meta",
      {
        property: "og:url",
        content: "https://programming-with-ia.github.io/vDocs/",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      {
        name: "twitter:image",
        content:
          "https://placehold.co/800x418/1f212d/5a78e6.png?font=poppins&text=vDocs",
      },
    ],
    ["meta", { name: "twitter:image:alt", content: "vDocs Branding" }],
  ],
  themeConfig: {
    logo: "https://api.iconify.design/fluent-color/book-open-24.svg",
    // logo: "https://api.iconify.design/fluent-color/book-20.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Hooks", link: "/hooks" },
      { text: "Packages", link: "/introduction" },
    ],

    sidebar: {
      "/": [
        {
          text: "Docs",
          link: "/",
          collapsed: false,
          items: [{ text: "Introduction", link: "/introduction" }],
        },
        NavSectionGroup({
          text: "Hooks",
          collapsed: false,
          folderPath: "hooks",
          fileName2Label: kebabToCamelCase,
        }),
        NavSectionGroup({
          text: "Packages",
          collapsed: false,
          folderPath: "packages"
        }),
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/programming-with-ia/vDocs" },
    ],

    editLink: {
      pattern: (pgData) => {
        // return JSON.stringify(pgData) //! for Debug
        return pgData.relativePath.startsWith("hooks")
          ? "https://github.com/programming-with-ia/contribution/docs/hooks.md"
          : "https://github.com/programming-with-ia/vDocs/blob/master/docs/:path";
      },
    },

    footer: {
      message: "vDocs",
      copyright: "Made with ❤ by Immi",
    },

    returnToTopLabel: "Go to top",

    search: {
      provider: "local",
    },
  },
});

function NavSectionGroup(
  options: {
    folderPath: string;
    fileName2Label?: (fileName: string) => string;
  } & Omit<DefaultTheme.SidebarItem, "items" | "link">
): DefaultTheme.SidebarItem {
  const fileNames = fs
    .readdirSync(path.join("./docs", options.folderPath), {
      withFileTypes: true,
    })
    .map((n) => n.name)
    .filter((fileName) => fileName.endsWith(".md"));

  const hasIndexFile = fileNames.indexOf("index.md") != -1;

  const items = fileNames
    .filter((fileName) => fileName != "index.md")
    .map(getFileNameWithoutExtension)
    .map(
      (fileName) =>
        ({
          text: options.fileName2Label
            ? options?.fileName2Label(fileName)
            : fileName,
          link: `/${options.folderPath}/` + fileName,
        } satisfies DefaultTheme.SidebarItem)
    );
  return {
    ...options,
    link: hasIndexFile ? "/" + options.folderPath : undefined,
    items: items,
  };
  // return items;
}
