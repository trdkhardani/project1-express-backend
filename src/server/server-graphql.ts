import app from '../graphql/app.ts';
import config from '../config/config.ts'

app.listen(config.graphQLPort, () => {
    console.log(`GraphQL Server is running on port ${config.graphQLPort}`)
});