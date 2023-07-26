export default async function postFormData(target, url){
    const formData = new FormData(target); // Crea un objeto iterable FormData con los datos del formulario
    const jsonData = {}
    for (const data of formData) {
      jsonData[data[0]] = data[1]
    } 
    console.log(jsonData)
    const res = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(jsonData),
    })
    return await res.json()
}