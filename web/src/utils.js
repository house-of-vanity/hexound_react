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
    const dateP = parseInt(date);
    return moment(dateP, "s").fromNow();
}
