import moment from "moment";

export const getDate = (iso) => {
    const startdate = moment(iso);
    const expected_enddate = moment(startdate).add(3, "hours");
    const data = moment(expected_enddate).fromNow()

    // checking if post was posted during the day, meaning 24 hours, then return in format "hours ago"
    // if more than 24 hours return on format "mouth day"
    // data.split(' ')[1] === 'hours'
    if (true) {
        let date = moment(iso).format('LL')

        return `${date.split(',')[0]}`
    }
    return `${data}`
}