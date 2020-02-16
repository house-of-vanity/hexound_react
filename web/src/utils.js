import moment from 'moment';

export const getUrlByMethodParams = (origin, params, methodeOptions) => {
    let paramsString = `${methodeOptions.url}`;
    let i = 0;
    for(const param in params ){
        if(param in methodeOptions.params){
            paramsString += (i !== 0) ? '&' : '';
            paramsString += `${methodeOptions.params[param]}=${params[param]}`;
            i++;
        }
    }
    return origin + paramsString
}
export const getTemplateDate = (date) =>{
    const d = new Date(parseInt(date));
    const m = (d.getMonth().toString().length === 1 ) ? `0${(d.getMonth() + 1 ).toString()}` : (d.getMonth() + 1).toString();
    const y = d.getYear(); 
    const day = (d.getDay().toString().length === 1 ) ? `0${(d.getDay() + 1).toString()}` : (d.getDay() + 1).toString();
    //return `${day}/${m}/${y}`;
    const dateP = parseInt(date);
    console.log(dateP);
    return moment(dateP, "s").fromNow();
}
