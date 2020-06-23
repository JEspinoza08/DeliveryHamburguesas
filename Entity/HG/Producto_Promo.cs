using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.HG
{
    public class Producto_Promo
    {
        public int ID { get; set; }
        public string NOMBRE { get; set; }
        public string PRECIO { get; set; }
        public int CANTIDAD { get; set; }
        public string BNOMBRE { get; set; }
        public string PNOMBRE { get; set; }
        public string IMAGEN { get; set; }
    }
    public class Combos
    {
        public int ID { get; set; }
        public string NOMBRE { get; set; }
    }
    public class Cantidad
    {
        public int ID { get; set; }
        public int CANTIDAD { get; set; }
    }
}
