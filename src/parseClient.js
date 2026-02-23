import ParseImport from 'parse';

const Parse = ParseImport.default ?? ParseImport;


export function initParse() {
    try {
        console.log(Parse);
        Parse.initialize("dSgFcimEA5ChxXibirC2y9K0IYivJDsU67dlJFcu", "vcvxWngpN5DAv7Xh9TSrnrMkRZinmy76lgU6OxnI");
        Parse.serverURL = "https://parseapi.back4app.com/";
        console.log("Parse OK:", typeof Parse.initialize);
        return Parse;
    } catch (e) {
    console.error("Error initializing Parse:", e);
    return null;
} 
}

export { Parse };
