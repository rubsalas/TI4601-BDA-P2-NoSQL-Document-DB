using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace bda_p2_api.Models
{
    public class Collaborator
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; } = string.Empty;

        public string? nombre { get; set; } = string.Empty;

        public string? correo{ get; set; } = string.Empty;

        public string? contra { get; set; } = string.Empty;

        public string? puesto { get; set; } = string.Empty;

        public string? depa { get; set; } = string.Empty;
        
        public List<Request>? solicitudes { get; set; }
    }
}
