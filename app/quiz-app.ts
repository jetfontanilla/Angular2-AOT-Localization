import "../global-styles/quiz-app.css";

// The browser platform with a compiler
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

// The app module
import { QuizAppModule } from "./quiz-app/quiz-app.module";

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(QuizAppModule);
