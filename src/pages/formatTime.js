import { DateTime } from "luxon"

const formatDate = (date) => {
    return DateTime.fromISO(date).toFormat("MMMM dd, yyyy")
}

export {
    formatDate
}