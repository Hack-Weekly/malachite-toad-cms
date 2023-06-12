import { MongoClient, ObjectId } from "mongodb";
import SpaceInterface from '../../../types/api/SpaceInterface';
import UserInterface from '../../../types/api/UserInterface';
import SpaceUsersInterface from '../../../types/api/SpaceUsersInterface';

export default defineEventHandler(async(event) => {

    const config = useRuntimeConfig()

    const body = await readBody(event)

    const client = new MongoClient(config.mongodb_uri)

    const database = client.db("toadcms");        
    
    let res: any;
    let userId: any
    let spacesId: any;
    
    try {
        
        const userCollection = database.collection<UserInterface>("users");
        const spaceCollection = database.collection<SpaceInterface>("space");
        const spaceUsersCollection = database.collection<SpaceUsersInterface>("spaceUsers");
        
        const current_user = await userCollection.findOne({email: body.email });
        
        userId = current_user?._id;

        if(userId) {

            const response = await spaceUsersCollection.find({ user_id: new ObjectId(userId) }).toArray()

            const modi_response = await Promise.all(response.map( async el => {

                const space = await spaceCollection.findOne({ _id: new ObjectId(el.space_id) })
                const all_users_in_space = await spaceUsersCollection.find({ space_id: el.space_id }).toArray() 

                const mode_all_users_in_space = await Promise.all(all_users_in_space.map( async el => {
                    const user = await userCollection.findOne({ _id: new ObjectId(el.user_id)})
                    return user
                }))

                return {
                    space: space,
                    users: mode_all_users_in_space
                }

            }))

            res = modi_response;
            
        }

    } catch (error) {
        console.error(error);
    }

    return { res }
})
