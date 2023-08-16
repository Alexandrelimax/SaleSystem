



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
const validCPF = (cpf,collectionErrors)=>{
    if (cpf.length !== 11) {
        collectionErrors.push('CPF inválido');
    }
}




module.exports = {isEmpty, validName, validCPF} ;