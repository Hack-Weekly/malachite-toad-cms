import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "D:/Documents/Side projects/malachite-toad-cms/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}