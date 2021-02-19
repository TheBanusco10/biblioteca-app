function getDiasRestantes(fecha) {

    let actual = new Date();  
    
    // To calculate the time difference of two dates 
    let Difference_In_Time = fecha.getTime() - actual.getTime(); 
    
    // To calculate the no. of days between two dates 
    return parseInt(Difference_In_Time / (1000 * 3600 * 24)); 

}