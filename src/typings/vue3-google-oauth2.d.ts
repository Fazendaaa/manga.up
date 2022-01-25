// https://github.com/guruahn/vue3-google-oauth2
declare module "vue3-google-oauth2" {
  import { Plugin } from "vue";

  export declare class GoogleAuth {
    load(config): Promise<>;
    signIn(): Promise<>;
    getAuthCode(): Promise<>;
    signOut(): Promise<>;
  }

  export interface GoogleOptions {
    clientId: string;
    scope: string;
    prompt: string;
    fetch_basic_profile: boolean;
  }

  export interface Vue3GoogleOauth {
    isInit: boolean;
    isAuthorized: boolean;
  }

  declare const googleAuth: GoogleAuth;

  declare const Vue3GoogleOauthPlugin: Plugin;

  export default Vue3GoogleOauthPlugin;
}
