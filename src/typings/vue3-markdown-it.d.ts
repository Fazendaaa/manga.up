declare module "vue3-markdown-it" {
  import { PluginObject } from "vue";

  export interface Props {
    anchor?: object;
    breaks?: boolean;
    emoji?: object;
    highlight?: object;
    html?: boolean;
    langPrefix?: string;
    linkify?: boolean;
    plugins?: Array;
    quotes?: string | string[];
    source?: string;
    tasklists?: object;
    toc?: object;
    typographer?: boolean;
    xhtmlOut?: boolean;
  }

  export interface PluginOptions {
    [id as string]: Record<string, string>;
  }

  declare const Vue3MarkdownIt: PluginObject<PluginOptions>;

  export default Vue3MarkdownIt;
}
