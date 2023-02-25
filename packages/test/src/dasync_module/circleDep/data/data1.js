export const count = async () => {
    const module2 = await import('./data2')
    const module3 = await import('./data3')
    return module2.count() + module3.count()
};