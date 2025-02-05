const phoenRegex = /^(9|09|\+989|\+9809)\d{9}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function convertNumbers(text) {
    let result = text;
    const regexes = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
    ];
    regexes.forEach((item, index) => (result = result.replace(item, index)));
    return result;
}

export { convertNumbers, phoenRegex, emailRegex };
