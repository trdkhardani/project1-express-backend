import app from '../app.ts'
import config from '../config/config.ts'
import { CronJobs } from '../utils/cron.utils.ts';

CronJobs.generateTicketQR()

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
});