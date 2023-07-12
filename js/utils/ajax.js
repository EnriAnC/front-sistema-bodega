export default async function ajax(url, options){
    try {
        const res = options ? await fetch(url, options) : await fetch(url);
        const json = await res.json()
        return json
    } catch (err) {
        const message = err.statusText || 'Error en el fetch';
        console.log(err)
        return {error: `${err.status}: ${message}`}
    }
}