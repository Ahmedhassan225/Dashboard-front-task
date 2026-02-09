import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskExporter } from './task-exporter';


@Injectable({ providedIn: 'root' })
export class JsonExporter extends TaskExporter {
    readonly formatName = 'JSON';
    readonly fileExtension = '.json';

    export(tasks: Task[]): void {
        const json = JSON.stringify(tasks, null, 2);
        const filename = this.generateFilename();
        this.downloadFile(json, filename);
    }
}
