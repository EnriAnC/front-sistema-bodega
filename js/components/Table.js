
export default function Table(){
    const $template = document.createElement('template');
    $template.innerHTML = `
        <table>
            <thead>
                <tr>

                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    `
    const table = $template.content
    
    return {
        addClass: function(querySelector, classes=[]){
            const $element = table.querySelector(querySelector)
            for (const cls of classes) {
                $element.classList.add(cls)
            }
        },
        addColumns: function(...columns){
            const $thead = table.querySelector('thead')
            for (const column of columns) {
                $thead.firstElementChild.innerHTML += `<th>${column}</th>`
            }
        },
        addRows: function(data){
            data.forEach(object=>{
                const tds = Object.values(object).map(value=>`<td>${value}</td>`).join('')
                table.querySelector('tbody').innerHTML += `<tr>
                    ${tds}
                </tr>`
            })  
        },
        insertIntoElementById: function(id){
            document.getElementById(id).innerHTML = ''
            document.getElementById(id).append(table)
        },
        insertAfterElementById: function(id){
            const $element = document.getElementById(id)
            if ($element.nextElementSibling.className === table.firstElementChild.className) $element.nextElementSibling.innerHTML = ''
            $element.after(table)
        }
        ,
        getTemplate: function(){
            return table
        }
    }
}