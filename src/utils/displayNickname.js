export const displayNickname = (nickname) => {
    if (nickname.length >= 15) {
        return `${nickname.slice(0, 14)}...`
    }

    return nickname
}