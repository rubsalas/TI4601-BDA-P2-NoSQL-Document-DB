using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace bda_p2_api.Models
{
    public class Request
    {
        public string? tipo {  get; set; }

        public string? destino { get; set; }

        public string? motivo { get; set; }

        public string? inicio { get; set; }

        public string? final { get; set; }

        public string? aerolinea { get; set; }

        public int precio { get; set; }

        public string? alojamiento { get; set; }

        public string? transporte { get; set; }

        public string? estado { get; set; }
    }
}
