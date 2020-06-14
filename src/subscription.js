import axios from "./axios"

const vapidPublicKey = 'BMrGKN9nPel61-1NVXxnVJhoIzLVq0Jdf4f7kubHYtYCGigjTbMT6QDY6G3wMMySM7bWz6z9M4O8AVx49s9bbHc';

export const subscribe = async () => {
    let reg
    let sub
    let res

    try {
        reg = await navigator.serviceWorker.ready
        sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        let userId = localStorage.getItem("userId")
        console.log(localStorage.getItem("userId"), JSON.stringify(sub))

        res = await axios.post('/notification/subscribe',
            {
                body: {
                    sub: JSON.stringify(sub),
                    userId
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

        console.log(res)
    } catch (e) {
        console.error(e)
    }

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}