export function getLocalStorageData(param) {
    let str = localStorage.getItem(param)
    if (str.length === 0) {return}
    return JSON.parse(str)
}
export function setLocalStorageData(param) {
    let str = localStorage.setItem(param)
    if (str.length === 0) {return}
    return JSON.parse(str)
}