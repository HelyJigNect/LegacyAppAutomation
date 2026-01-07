import { faker } from "@faker-js/faker";

export class TsHelper {
    static normalizeDate(dateStr: string): string {
        if (!dateStr) return '';
        const parts = dateStr.split(/[\/\-\.]/).map(p => p.trim());
        let year: string, month: string, day: string;

        if (parts[0].length === 4) {
            [year, month, day] = parts;
        } else {
            [month, day, year] = parts;
        }

        year = year.padStart(4, '0');
        month = month.padStart(2, '0');
        day = day.padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    static formatDate(date: Date): string {
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    }

    static getRandomDateBetweenDays(minDaysBack: number, maxDaysBack: number): Date {
        const now = new Date();
        const from = new Date();
        const to = new Date();

        from.setDate(now.getDate() - maxDaysBack);
        to.setDate(now.getDate() - minDaysBack);

        return faker.date.between({ from, to });
    }

    static getRandomTime(hourMin: number, hourMax: number): string {
        return `${faker.number.int({ min: hourMin, max: hourMax }).toString().padStart(2, '0')}:${faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0')}`;
    }

    static getRandomFromList<T>(list: T[], count: number = 1): T | T[] {
        if (!list || list.length === 0) {
            throw new Error('Input list is empty');
        }
        const shuffledList = [...list];
        for (let i = shuffledList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
        }

        const selected = shuffledList.slice(0, count);
        return count === 1 ? selected[0] : selected;
    }
}