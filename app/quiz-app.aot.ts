import "../global-styles/quiz-app.css";

// The browser platform with a compiler
import { platformBrowser } from "@angular/platform-browser";

// The app module
import { QuizAppModuleNgFactory } from "../aot/app/quiz-app/quiz-app.module.ngfactory";

// Compile and launch the module
platformBrowser().bootstrapModuleFactory(QuizAppModuleNgFactory);
