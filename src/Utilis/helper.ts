export const formateDate = (date: Date) => {
    const now = new Date();
    const update = new Date();
    date = new Date(date)
    const midNight = new Date(date.setHours(24, 0, 0, 0))
    const weekDay = new Date(date.setDate(date.getDate() + 7))
    if (now < midNight) {
        return update.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    } else if (now < weekDay) {
        return update.toLocaleString('default', { weekday: "long" })
    } else {
        const day = update.getDate();
        const month = update.toLocaleString('default', { month: 'short' });
        const year = update.getFullYear();
        return `${month} ${day}, ${year}`
    }
}