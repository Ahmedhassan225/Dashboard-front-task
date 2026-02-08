import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskExporter } from './task-exporter';

/**
 * JSON exporter implementation.
 * Exports tasks as a formatted JSON file.
 */
@Injectable({ providedIn: 'root' })
export class JsonExporter extends TaskExporter {
    readonly formatName = 'JSON';
    readonly fileExtension = '.json';

    /**
     * Exports tasks as a prettified JSON file.
     * @param tasks - Array of tasks to export
     */
    export(tasks: Task[]): void {
        const json = JSON.stringify(tasks, null, 2);
        const filename = this.generateFilename();
        this.downloadFile(json, filename);
    }
}
