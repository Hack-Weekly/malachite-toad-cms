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
        await client.connect();
     
        const usersCollection = database.collection<UserInterface>("users");
        const spaceUsersCollection = database.collection<SpaceUsersInterface>("spaceUsers");

        // works
        const user = await usersCollection.findOne({email: body.email});
        // TODO: check if user is already a collaborator

        // works
        const spaceUser = await spaceUsersCollection.insertOne({
            user_id: user?._id, 
            space_id: new ObjectId(body.spaceId),
            role: body.role
        });

        // works
        const collaborators = await spaceUsersCollection.find({space_id: new ObjectId(body.spaceId) }).toArray();

        // works
        const userIds = collaborators.map(collaborator => collaborator.user_id);
        
        // works
        const users = await database.collection<UserInterface>("users").find({_id: { $in: userIds }  }).toArray();
        
        res = [users, collaborators]
       

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }

    return { res }
})
