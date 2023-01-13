// @ts-check
// 위 주석은 TS파일이 JS파일을 보호한다.
// 이런식으로 코멘트를 이용해서 JS에 타입을 써줄 수 있다.
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
    return true;
}
/**
 * Exits the program
 * @param {number} code
 * @returns number
 */
export function exit(code) {
    return code + 1;
}
