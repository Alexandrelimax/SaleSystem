



const isEmpty = (elements, collectionErrors) => {
    for (const key in elements) {
        if (elements[key] === 0) {
            collectionErrors.push(`O campo ${key} deve ser preenchido`);

        }
    }
}
const validName =(element, collectionErrors)=> {
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(element.first_name) || !nameRegex.test(element.last_name)) {
         collectionErrors.push('Os campos de nome e sobrenome devem conter apenas letras maiúsculas e minúsculas!');
    }
}
const dateFormat = (date)=>{
    if(!date){
        date = new Date();
    }else{

    }
}




module.exports = {isEmpty, validName, dateFormat} ;