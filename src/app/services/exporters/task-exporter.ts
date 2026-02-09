import { Task } from '../../models/task.model';

export abstract class TaskExporter {
    abstract readonly formatName: string;

    abstract readonly fileExtension: string;

    abstract export(tasks: Task[]): void;

    protected downloadFile(content: string | Blob, filename: string): void {
        const blob = typeof content === 'string'
            ? new Blob([content], { type: 'text/plain;charset=utf-8' })
            : content;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }

    protected generateFilename(): string {
        const date = new Date().toISOString().split('T')[0];
        return `tasks-export-${date}${this.fileExtension}`;
    }
}
