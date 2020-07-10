import { Component } from '@angular/core';
import {
    ScheduleComponent, EventSettingsModel, View, TimelineMonthService,
    ResizeService, EventRenderedArgs, DragAndDropService, CellTemplateArgs, getWeekNumber, TimeScaleModel,getWeekLastDate
} from '@syncfusion/ej2-angular-schedule';
import { headerRowData } from './data';
import { extend, Internationalization } from '@syncfusion/ej2-base';

/**
 * Sample for Schedule header rows
 */

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    providers: [TimelineMonthService, ResizeService, DragAndDropService]
})
export class AppComponent {
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 0, 1);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], headerRowData, null, true) };
    public currentView: View = 'TimelineMonth';
    public instance: Internationalization = new Internationalization();
    public timeScale: TimeScaleModel = {
        enable: true,
        slotCount: 4
    };
    getMonthDetails(value: CellTemplateArgs): string {
        return this.instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'yMMMM' });
    }

    getWeekDetails(value: CellTemplateArgs): string {
        return 'Week ' + getWeekNumber(getWeekLastDate(value.date, 0));
    }     
    getMajorTime(date: Date): string {
         return this.instance.formatDate(date, { skeleton: 'ms' }).replace(':00', '');
    }
    getMinorTime(date: Date): string {
        return this.instance.formatDate(date, { skeleton: 'ms' }).replace(':00', '');
    }
    getDateHeaderText(value: Date) :string {
        return this.instance.formatDate(value, { skeleton: 'Ed' });
    };
    onEventRendered(args: EventRenderedArgs): void {
        const categoryColor: string = args.data.CategoryColor as string;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }
}

