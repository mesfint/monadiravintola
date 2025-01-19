declare module 'webpack/lib/container/ModuleFederationPlugin' {
    import { Compiler, WebpackPluginInstance } from 'webpack';
  
    interface ModuleFederationPluginOptions {
      name: string;
      filename?: string;
      remotes?: Record<string, string>;
      exposes?: Record<string, string>;
      shared?: Record<string, any>;
    }
  
    class ModuleFederationPlugin implements WebpackPluginInstance {
      constructor(options: ModuleFederationPluginOptions);
      apply(compiler: Compiler): void;
    }
  
    export = ModuleFederationPlugin;
  }
  