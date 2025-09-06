export class DateTimeUtils {
    static modifyHours(dateTimeString: string, hours: number){
        const datetime = new Date(dateTimeString);
        datetime.setHours(datetime.getHours() + hours)
        
        return datetime;
    }
}