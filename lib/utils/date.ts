export function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function isToday(date: Date) {
    return isSameDay(date, new Date());
}

export function getStartOfWeek(date: Date) {
    const d = new Date(date);
    const day = d.getDay();

    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);

    return d;
}

export function formatDateLocal(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
