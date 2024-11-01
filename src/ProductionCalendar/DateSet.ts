class DateSet {
  private dates: Set<string>;

  constructor() {
    this.dates = new Set<string>();
  }

  add(date: Date): void {
    const dateString = this.formatDate(date);
    this.dates.add(dateString);
  }

  addAll(dates: Date[]): void {
    dates.forEach(this.add, this);
  }

  has(date: Date): boolean {
    const dateString = this.formatDate(date);
    return this.dates.has(dateString);
  }

  delete(date: Date): boolean {
    const dateString = this.formatDate(date);
    return this.dates.delete(dateString);
  }

  values(): Date[] {
    return Array.from(this.dates).map((dateString) => new Date(dateString));
  }

  clear(): void {
    this.dates.clear();
  }

  size(): number {
    return this.dates.size;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  of(payload: DateSet): DateSet {
    const newDataSet = new DateSet();
    newDataSet.addAll(this.values());
    newDataSet.addAll(payload.values());
    return newDataSet;
  }

  static ofDates(dates: string[]) {
    const dataSet = new DateSet();
    dataSet.addAll(dates.map((d) => new Date(d)));
    return dataSet;
  }
}

export default DateSet;
