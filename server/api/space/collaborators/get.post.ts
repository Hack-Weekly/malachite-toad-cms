import { MongoClient, ObjectId } from "mongodb";
import UserInterface from '../../../../types/api/UserInterface';
import SpaceUsersInterface from '../../../../types/api/SpaceUsersInterface';

export default defineEventHandler(async(event) => {

    const config = useRuntimeConfig()

    const body = await readBody(event)

    const client = new MongoClient(config.mongodb_uri)

    const database = client.db("toadcms");        
    
    let res: any;
    
    try {
        const spaceUsersCollection = database.collection<SpaceUsersInterface>("spaceUsers");
        
        const collaborators = await spaceUsersCollection.find({space_id: new ObjectId(body.spaceId) }).toArray();
        // get all user ids from collaborators array and find all users
        const userIds = collaborators.map(collaborator => collaborator.user_id);
        const users = await database.collection<UserInterface>("users").find({_id: {$in: userIds}}).toArray();
        res = [users, collaborators]
       

    } catch (error) {
        console.error(error);
    }

    return { res }
})
