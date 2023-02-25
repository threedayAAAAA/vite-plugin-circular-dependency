export const count = async () => {
    const module = await import('./data2')
    return 1 + module.count()
};