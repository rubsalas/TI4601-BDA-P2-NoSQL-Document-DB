using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace bda_p2_api.Models
{
    public class Administrator
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id {  get; set; } = string.Empty;

        public string? nombre { get; set; }

        public string? correo { get; set; }

        public string? contra { get; set; }

        public string? puesto { get; set; }

        public string? depa { get; set; }
    }
}
