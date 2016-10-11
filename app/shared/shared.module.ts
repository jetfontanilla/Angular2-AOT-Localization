import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { ConsoleLoggerService, NewRelicLoggerService } from "./logger";
import { LoggerService } from "./logger.service";
import { ConnectionFactoryService } from "./connection-factory.service";

// emitter service
import { EmitterService } from "./emitter.service";


@NgModule({
    imports: [CommonModule, HttpModule, JsonpModule],
    declarations: [],
    exports: [CommonModule, HttpModule, JsonpModule, FormsModule],
    providers: [
        ConnectionFactoryService,
        ConsoleLoggerService,
        NewRelicLoggerService,
        LoggerService,
        EmitterService
    ]
})
export class SharedModule {
}
