using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.LogOn;
using System.Data;

namespace Data.LogOn
{
    public class DA_LogOn
    {
        private Conexion cn;
        public DA_LogOn()
        {
           cn = new Conexion();
        }
        public object DA_Login(Usuario usuario)
        {
            DataSet ds = cn.ejecutarDataSet("SP_LOGIN", usuario.DNI, usuario.CONTRASEÑA);
            try {
                Usuario usua = new Usuario();
                var lUsuario = (from DataRow v_campos in ds.Tables[0].Rows
                                select new
                                {
                                    ID = v_campos["ID"],
                                    NOMBRES = v_campos["NOMBRES"],
                                    EMAIL = v_campos["EMAIL"],
                                    CELULAR = v_campos["CELULAR"],
                                    DIRECCION = v_campos["DIRECCION"],
                                    DNI = v_campos["DNI"],
                                    CONTRASEÑA = v_campos["CONTRASEÑA"],
                                    IDPERF = v_campos["IDPERF"]
                                }).Distinct().ToList();
                    foreach (var item in lUsuario)
                    {
                        Usuario usu = new Usuario();
                        usu.ID = Convert.ToInt32(item.ID);
                        usu.NOMBRES = Convert.ToString(item.NOMBRES);
                        usu.EMAIL = Convert.ToString(item.EMAIL);
                        usu.CELULAR = Convert.ToString(item.CELULAR);
                        usu.DIRECCION = Convert.ToString(item.DIRECCION);
                        usu.DNI = Convert.ToString(item.DNI);
                        usu.CONTRASEÑA = Convert.ToString(item.CONTRASEÑA);
                        usu.IDPERF = Convert.ToInt32(item.IDPERF);
                    usua = usu;
                    }
                return usua;
                }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public object DA_Registrar_Usuario(int __a, string __b)
        {
            try
            {
                if (__a == 0 || __a == 1) { 
                    int res;
                    res = Convert.ToInt32(cn.ejecutarEscalar("SP_REGISTRO_USUARIO", __a, __b));
                    return res;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
