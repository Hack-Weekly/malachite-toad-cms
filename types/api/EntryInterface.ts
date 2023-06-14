export default interface EntryInterface {
    _id?: any;
    space_id: any;
    name: string;
    slug: string;
    fields: any[];
    contents: any[];
    created_at: Date;   
    updated_at: Date;
    published: boolean;
}