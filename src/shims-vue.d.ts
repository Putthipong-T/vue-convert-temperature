declare module "*.vue" {
    import { defineComponent } from "vue";
    const component: ReturnType<typeof defineComponent>;
    export default component;
  }
  declare module './components/read.js' {
    export function myQuery(startTime: string): Promise<any>;
    // Add other type declarations for the module's exports if necessary
  }
  