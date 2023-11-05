namespace bda_p2_api.Models
{
    public class MongoDBSettings
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName{ get; set; } = null!;
        public string AdminCollectionName { get; set; }
        public string CollabCollectionName { get; set; }
    }
}
