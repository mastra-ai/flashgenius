/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MASTRA_SERVER_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
