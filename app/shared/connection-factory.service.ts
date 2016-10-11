import { Injectable } from "@angular/core";
import { Http, Headers, URLSearchParams, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

// Add the RxJS Observable operators we need in this app.
import "../rxjs-operators";

@Injectable()
export class ConnectionFactoryService {
    static SERVICE_URL = {
        bridge: "/api/bridge",
        tutor: "/api/tutor",
        postoffice: "/api/postoffice",
        reportcard: "/api/reportcard",
        meterman: "/api/meterman",
        site: "/rest",
        base: "",
        commerce: "/api/bridge/commerce",
        content: "/api/bridge/content",
        identity: "/api/bridge/identity"
    };

    static SERVICE_ACCEPT_HEADERS = {
        v1: "application/vnd.englishcentral-v1+json,application/json;q=0.9,*/*;q=0.8",
        v2: "application/vnd.englishcentral-v2+json,application/json;q=0.9,*/*;q=0.8",
        v4: "application/vnd.englishcentral-v4+json,application/json;q=0.9,*/*;q=0.8"
    };

    static METHOD_GET = "get";
    static METHOD_POST = "post";
    static METHOD_PUT = "put";
    static METHOD_DELETE = "delete";

    constructor(private http: Http) {
    }

    service(connectionName?: string) {
        let baseServiceUrl = connectionName && connectionName in ConnectionFactoryService.SERVICE_URL
            ? ConnectionFactoryService.SERVICE_URL[connectionName]
            : ConnectionFactoryService.SERVICE_URL.base;

        return new BaseConnection(this.http, baseServiceUrl);
    }
}

class BaseConnection {
    private path: string = "";

    constructor(private http: Http, private serviceUrl) {
    }

    setPath(path: string): BaseConnection {
        this.path = path;
        return this;
    }

    getUrl(): string {
        return this.serviceUrl + this.path;
    }

    get(query?: Object, postBody?: any, version?: string): Observable<any> {
        return this.request(ConnectionFactoryService.METHOD_GET, this.getUrl(), query, postBody, this.getAcceptHeader(version));
    }

    post(query?: Object, postBody?: any, version?: string): Observable<any> {
        return this.request(ConnectionFactoryService.METHOD_POST, this.getUrl(), query, postBody, this.getAcceptHeader(version));
    }

    put(query?: Object, postBody?: any, version?: string): Observable<any> {
        return this.request(ConnectionFactoryService.METHOD_PUT, this.getUrl(), query, postBody, this.getAcceptHeader(version));
    }

    delete(query?: Object, postBody?: any, version?: string): Observable<any> {
        return this.request(ConnectionFactoryService.METHOD_DELETE, this.getUrl(), query, postBody, this.getAcceptHeader(version));
    }

    private request(method: string,
                    requestUrl: string,
                    query?: Object,
                    postBody?: any,
                    additionalHeaders?: Object): Observable<any> {
        let params = new URLSearchParams();
        if (!_.isEmpty(query)) {
            _.forEach(query, (value, key) => params.set(key, value));
        }

        let url = requestUrl;
        let body = _.isObject(postBody) ? JSON.stringify(postBody) : postBody || "";
        let headers = new Headers(_.assign({"Content-Type": "application/json"}, additionalHeaders));
        let options = new RequestOptions({headers: headers, search: params});

        let response: Observable<Response>;

        switch (method) {
            case ConnectionFactoryService.METHOD_GET:
                response = this.http.get(url, options);
                break;
            case ConnectionFactoryService.METHOD_POST:
                response = this.http.post(url, body, options);
                break;
            case ConnectionFactoryService.METHOD_PUT:
                response = this.http.put(url, body, options);
                break;
            case ConnectionFactoryService.METHOD_DELETE:
                response = this.http.delete(url, options);
                break;
            default:
                return Observable.throw("Invalid HTTP method");
        }

        return response.map(this.extractData).catch(e => this.handleError(e));
    }

    private extractData(res: Response): Object | String {
        if (!res.text()) {
            return "";
        }

        try {
            let body = res.json();
            return body || {};
        } catch (e) {
            return res.text();
        }
    }

    private handleError(error: any) {
        console.log("connectionFactory", error, error.status ? error.status : 0);

        return Observable.throw(error);
    }

    private getAcceptHeader(version?: string): Object {
        if (!version) {
            return {};
        }

        return version in ConnectionFactoryService.SERVICE_ACCEPT_HEADERS
            ? {Accept: ConnectionFactoryService.SERVICE_ACCEPT_HEADERS[version]}
            : {};
    }
}
