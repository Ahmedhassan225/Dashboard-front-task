import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskExporter } from './exporters/task-exporter';
import { JsonExporter } from './exporters/json-exporter';

/**
 * Service to manage task export functionality.
 * Maintains a registry of available exporters and delegates export operations.
 * 
 * Following the Open-Closed Principle:
 * - To add a new format, create a new exporter class and register it
 * - No need to modify existing code
 */
@Injectable({ providedIn: 'root' })
export class ExportService {
    private readonly exporters = new Map<string, TaskExporter>();

    constructor(private readonly jsonExporter: JsonExporter) {
        // Register available exporters
        this.registerExporter('json', jsonExporter);

        // Future exporters can be added here:
        // this.registerExporter('csv', csvExporter);
        // this.registerExporter('xml', xmlExporter);
    }

    /**
     * Registers an exporter for a specific format.
     * @param format - Format identifier (e.g., 'json', 'csv')
     * @param exporter - TaskExporter instance
     */
    private registerExporter(format: string, exporter: TaskExporter): void {
        this.exporters.set(format, exporter);
    }

    /**
     * Exports tasks using the specified format.
     * @param tasks - Array of tasks to export
     * @param format - Export format identifier
     */
    exportTasks(tasks: Task[], format: string): void {
        const exporter = this.exporters.get(format);
        if (!exporter) {
            console.error(`Unknown export format: ${format}`);
            return;
        }
        exporter.export(tasks);
    }

    /**
     * Gets list of available export formats.
     * @returns Array of format identifiers
     */
    getAvailableFormats(): string[] {
        return Array.from(this.exporters.keys());
    }

    /**
     * Gets the human-readable name for a format.
     * @param format - Format identifier
     * @returns Format name or undefined if not found
     */
    getFormatName(format: string): string | undefined {
        return this.exporters.get(format)?.formatName;
    }
}
