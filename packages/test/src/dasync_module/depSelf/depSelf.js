export const count = 1
export const sum = async () => {
    const module = await import('./depSelf')
    return module.count + count
}