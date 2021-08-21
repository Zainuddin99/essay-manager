export const checkUpdatedTime = (d1, d2) =>{
    const d22 = new Date(d2).toLocaleDateString()
    if(d1 === d2){
        return 'No changes made'
    }
    return d22
} 