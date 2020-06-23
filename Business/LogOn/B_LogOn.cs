using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.LogOn;
using Entity.LogOn;

namespace Business.LogOn
{
    public class B_LogOn
    {
        DA_LogOn _logOn = new DA_LogOn();
        public Object B_Login(Usuario usuario)
        {
            try
            {
                return new DA_LogOn().DA_Login(usuario);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public Object B_Registrar_Usuario(int __a, string __b)
        {
            try
            {
                return new DA_LogOn().DA_Registrar_Usuario(__a, __b);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
