// global.d.ts
export {}

declare global {
  interface Window {
    dataLayer: Record<string, any>[]
    gtag: (...args: any[]) => void
    google: {
      translate: {
        TranslateElement: new (options: any, element: string) => void
        InlineLayout: {
          SIMPLE: any
        }
      }
    }
  }
}
