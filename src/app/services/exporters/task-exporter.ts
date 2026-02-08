import { Task } from '../../models/task.model';

/**
 * Abstract base class for task exporters.
 * Follows the Open-Closed Principle: open for extension, closed for modification.
 * 
 * To add a new export format:
 * 1. Extend this class
 * 2. Implement the abstract members
 * 3. Register the exporter in ExportService
 * 
 * @example
 * // Adding CSV export in the future:
 * export class CsvExporter extends TaskExporter {
 *   readonly formatName = 'CSV';
 *   readonly fileExtension = '.csv';
 *   export(tasks: Task[]): void {
 *     // CSV implementation
 *   }
 * }
 */
export abstract class TaskExporter {
    /** Human-readable format name (e.g., 'JSON', 'CSV') */
    abstract readonly formatName: string;

    /** File extension including dot (e.g., '.json', '.csv') */
    abstract readonly fileExtension: string;

    /**
     * Export tasks to the specific format and trigger download.
     * @param tasks - Array of tasks to export
     */
    abstract export(tasks: Task[]): void;

    /**
     * Triggers browser download of a file.
     * @param content - File content as string or Blob
     * @param filename - Name of the file to download
     */
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

    /**
     * Generates a timestamped filename.
     * @returns Filename with current date (e.g., 'tasks-export-2026-02-08.json')
     */
    protected generateFilename(): string {
        const date = new Date().toISOString().split('T')[0];
        return `tasks-export-${date}${this.fileExtension}`;
    }
}
