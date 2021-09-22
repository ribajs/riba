import { Response } from 'express';
import { SuggestService } from './suggest.service';
export declare class SuggestController {
    readonly suggest: SuggestService;
    constructor(suggest: SuggestService);
    suggestion(res: Response, namespace: string, word: string): Promise<Response<any, Record<string, any>>>;
    allSuggestions(res: Response, word: string): Promise<Response<any, Record<string, any>>>;
}
