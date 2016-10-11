// The browser platform with a compiler
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

// The app module
import { ProgressAppModule } from "./progress-app/progress-app.module";

if (process.env.ENV === "production") {
    enableProdMode();
}

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(ProgressAppModule);
