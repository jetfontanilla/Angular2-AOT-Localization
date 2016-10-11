// The browser platform with a compiler
import { platformBrowser } from "@angular/platform-browser";
import { enableProdMode } from "@angular/core";

// The app module
import { ProgressAppModuleNgFactory } from "../aot/app/progress-app/progress-app.module.ngfactory";

if (process.env.ENV === "production") {
    enableProdMode();
}

// Compile and launch the module
platformBrowser().bootstrapModuleFactory(ProgressAppModuleNgFactory);
