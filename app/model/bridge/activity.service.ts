import { Injectable } from "@angular/core";
import { ConnectionFactoryService } from "../../shared/connection-factory.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ActivityService {

    constructor(private connection: ConnectionFactoryService) {
    }

    getByDialogId(dialogId: number): Observable<Object> {
        return this.connection
            .service("bridge")
            .setPath("/content/activity")
            .get({
                dialogIDs: dialogId
            });
    }
}
