using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.LogOn
{
    public class Usuario
    {
        public int ID { get; set; }
        public string NOMBRES { get; set; }
        public string EMAIL { get; set; }
        public string CELULAR { get; set; }
        public string DIRECCION { get; set; }
        public string DNI { get; set; }
        public string CONTRASEÑA { get; set; }
        public int IDPERF { get; set; }
    }
}
