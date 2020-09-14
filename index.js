const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const writeInFile = require('./utils/writeInFile');
const categoryName = require('./utils/categoryName');

const result = excelToJson({
    sourceFile: 'teachers.xlsx',
    header: {
        rows: 1
    },
    columnToKey: {'*': '{{columnHeader}}'}
})['Лист1'];

let text;
result.map((el, idx, mas) => {
    if (el['Фамилия'] !== undefined) {
        text = basicInformation(el);
        if (el['Вид']){
            text = text + '\n\tcourse:\n'
            text = text + courses(el);
        }
    }
    console.log(text);
    // fs.writeFileSync('default.md', writeInFile(el));
})

function courses(el){
    return `\t-
                place: ${el['ОООД повышения квалификации']}
                title: ${el['Название курса']}
                hour: ${el['Объем курса (часы)']}
                date: ${el['Дата выдачи'].getFullYear()}`
}

function basicInformation(el){
    return `
    ---
        title: ${el['Фамилия']} ${el['Имя']} ${el['Отчество']}
        place_education: ${el['Образовательное учреждение']}
        general_experience: ${el['Общий стаж']}
        position: ${el['Должность']}
        taxonomy:
            category:
                - ${categoryName(el['Должность'])}
        education: ${el['Вид образования']}
        experience: ${el['Педагогический стаж']}
        email: ${el['Адрес электронной почты']}
        category: ${el['Квалификационная категория'].split(' ')[0]}`;
}