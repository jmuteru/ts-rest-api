


export const genUsername  = ()=>{
    const prefix ="user-"
    const randomChars  = Math.random().toString(36).slice(2)
    const username = prefix + randomChars
    return username
}