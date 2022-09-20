declare module "photoswipe/lightbox" {
  import { PluginObject } from "vue";

  export interface Props {
    foo: string;
  }

  export interface PluginOptions {
    [id as string]: Record<string, string>;
  }

  declare const lightbox: PluginObject<PluginOptions>;

  export default lightbox;
}

declare module "photoswipe" {
  import { PluginObject } from "vue";

  export interface Props {
    foo: string;
  }

  export interface PluginOptions {
    [id as string]: Record<string, string>;
  }

  declare const lightbox: PluginObject<PluginOptions>;

  export default lightbox;
}
