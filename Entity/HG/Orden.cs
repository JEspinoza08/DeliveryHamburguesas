using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.HG
{
    public class Orden
    {
        public int ID { get; set; }
        public string TOKEN { get; set; }
        public int ID_PRODPROM { get; set; }
        public string NOMBREPROD { get; set; }
        public int CANTIDAD { get; set; }
        public string PRECIO { get; set; }
        public string FECHAORDEN { get; set; }
        public string IMAGENPROD { get; set; }
        public string COMENTARIO { get; set; }
        public string NOMBRE_ESTADO { get; set; }
    }
    public class OrdenGlobal
    {
        public int ID { get; set; }
        public string TOKEN { get; set; }
        public int ID_PRODPROM { get; set; }
        public string NOMBREPROD { get; set; }
        public int CANTIDAD { get; set; }
        public string PRECIO { get; set; }
        public string FECHAORDEN { get; set; }
        public string IMAGENPROD { get; set; }
        public string COMENTARIO { get; set; }
        public string NOMBRE_ESTADO { get; set; }
        public string NOMBRES { get; set; }
    }
}
