using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.HG;
using System.Data;
namespace Data.HG
{
    public class DA_HG
    {
        private Conexion cn;
        public DA_HG()
        {
            cn = new Conexion();
        }
        public int D_RegistrarProductoPromo(int __a, string __b)
        {
            try
            {
                int res;
                res = Convert.ToInt32(cn.ejecutarEscalar("SP_REGISTRO_PRODUCTOPROMO", __a, __b));
                return res;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public Object D_All(int __a,string __b)
        {
            try
            {
                if(__a == 0 || __a == 1 || __a == 9 || __a == 12 || __a == 17 || __a == 18)
                {
                    DataSet ds = new Conexion().ejecutarDataSet("SP_REGISTRO_PRODUCTOPROMO", __a, __b);
                    List<Combos> oLisfiltro = new List<Combos>();
                    var obListafiltro = (from DataRow v_campos in ds.Tables[0].Rows
                                         select new
                                         {
                                             ID = v_campos["ID"],
                                             NOMBRE = v_campos["NOMBRE"]
                                         }).ToList();
                    foreach (var p in obListafiltro)
                    {
                        Combos lis = new Combos();
                        lis.ID = Convert.ToInt32(p.ID);
                        lis.NOMBRE = Convert.ToString(p.NOMBRE);
                        oLisfiltro.Add(lis);
                    }
                    return obListafiltro;
                }
                else if (__a == 3 || __a == 6)
                {
                    DataSet ds = new Conexion().ejecutarDataSet("SP_REGISTRO_PRODUCTOPROMO", __a, __b);
                    List<Producto_Promo> oLisfiltro = new List<Producto_Promo>();
                    var obLista = (from DataRow v_campos in ds.Tables[0].Rows
                                         select new
                                         {
                                             ID = v_campos["ID"],
                                             NOMBRE = v_campos["NOMBRE"],
                                             PRECIO = v_campos["PRECIO"],
                                             CANTIDAD = v_campos["CANTIDAD"],
                                             BNOMBRE = v_campos["BNOMBRE"],
                                             PNOMBRE = v_campos["PNOMBRE"],
                                             IMAGEN = v_campos["IMAGEN"]
                                         }).ToList();
                    foreach (var p in obLista)
                    {
                        Producto_Promo lis = new Producto_Promo();
                        lis.ID = Convert.ToInt32(p.ID);
                        lis.NOMBRE = Convert.ToString(p.NOMBRE);
                        lis.PRECIO = Convert.ToString(p.PRECIO);
                        lis.CANTIDAD = Convert.ToInt32(p.CANTIDAD);
                        lis.BNOMBRE = Convert.ToString(p.BNOMBRE);
                        lis.PNOMBRE = Convert.ToString(p.PNOMBRE);
                        lis.IMAGEN = Convert.ToString(p.IMAGEN);
                        oLisfiltro.Add(lis);
                    }
                    return obLista;
                }
                else if (__a == 4 || __a == 7 || __a == 10 || __a == 11 || __a == 13 || __a == 14 || __a == 15)
                {
                    int res;
                    res = Convert.ToInt32(cn.ejecutarEscalar("SP_REGISTRO_PRODUCTOPROMO", __a, __b));
                    return res;
                }
                else if(__a == 5)
                {
                    DataSet ds = new Conexion().ejecutarDataSet("SP_REGISTRO_PRODUCTOPROMO", __a, __b);
                    List<Cantidad> oLisfiltro = new List<Cantidad>();
                    var obListafiltro = (from DataRow v_campos in ds.Tables[0].Rows
                                         select new
                                         {
                                             ID = v_campos["ID"],
                                             CANTIDAD = v_campos["CANTIDAD"]
                                         }).ToList();
                    foreach (var p in obListafiltro)
                    {
                        Cantidad lis = new Cantidad();
                        lis.ID = Convert.ToInt32(p.ID);
                        lis.CANTIDAD = Convert.ToInt32(p.CANTIDAD);
                        oLisfiltro.Add(lis);
                    }
                    return obListafiltro;
                }
                else if(__a == 8)
                {
                    DataSet ds = new Conexion().ejecutarDataSet("SP_REGISTRO_PRODUCTOPROMO", __a, __b);
                    List<Orden> oLisfiltro = new List<Orden>();
                    var obListafiltro = (from DataRow v_campos in ds.Tables[0].Rows
                                         select new
                                         {
                                             ID = v_campos["ID"],
                                             TOKEN = v_campos["TOKEN"],
                                             ID_PRODPROM = v_campos["ID_PRODPROM"],
                                             NOMBREPROD = v_campos["NOMBREPROD"],
                                             CANTIDAD = v_campos["CANTIDAD"],
                                             PRECIO = v_campos["PRECIO"],
                                             FECHAORDEN = v_campos["FECHAORDEN"],
                                             IMAGENPROD = v_campos["IMAGENPROD"],
                                             COMENTARIO = v_campos["COMENTARIO"],
                                             NOMBRE_ESTADO = v_campos["NOMBRE_ESTADO"]
                                         }).ToList();
                    foreach (var p in obListafiltro)
                    {
                        Orden lis = new Orden();
                        lis.ID = Convert.ToInt32(p.ID);
                        lis.TOKEN = Convert.ToString(p.TOKEN);
                        lis.ID_PRODPROM = Convert.ToInt32(p.ID_PRODPROM);
                        lis.NOMBREPROD = Convert.ToString(p.NOMBREPROD);
                        lis.CANTIDAD = Convert.ToInt32(p.CANTIDAD);
                        lis.PRECIO = Convert.ToString(p.PRECIO);
                        lis.FECHAORDEN = Convert.ToString(p.FECHAORDEN);
                        lis.IMAGENPROD = Convert.ToString(p.IMAGENPROD);
                        lis.COMENTARIO = Convert.ToString(p.COMENTARIO);
                        lis.NOMBRE_ESTADO = Convert.ToString(p.NOMBRE_ESTADO);
                        oLisfiltro.Add(lis);
                    }
                    return obListafiltro;
                }
                else if (__a == 16)
                {
                    DataSet ds = new Conexion().ejecutarDataSet("SP_REGISTRO_PRODUCTOPROMO", __a, __b);
                    List<OrdenGlobal> oLisfiltro = new List<OrdenGlobal>();
                    var obListafiltro = (from DataRow v_campos in ds.Tables[0].Rows
                                         select new
                                         {
                                             ID = v_campos["ID"],
                                             TOKEN = v_campos["TOKEN"],
                                             ID_PRODPROM = v_campos["ID_PRODPROM"],
                                             NOMBREPROD = v_campos["NOMBREPROD"],
                                             CANTIDAD = v_campos["CANTIDAD"],
                                             PRECIO = v_campos["PRECIO"],
                                             FECHAORDEN = v_campos["FECHAORDEN"],
                                             IMAGENPROD = v_campos["IMAGENPROD"],
                                             COMENTARIO = v_campos["COMENTARIO"],
                                             NOMBRE_ESTADO = v_campos["NOMBRE_ESTADO"],
                                             NOMBRES = v_campos["NOMBRES"]
                                         }).ToList();
                    foreach (var p in obListafiltro)
                    {
                        OrdenGlobal lis = new OrdenGlobal();
                        lis.ID = Convert.ToInt32(p.ID);
                        lis.TOKEN = Convert.ToString(p.TOKEN);
                        lis.ID_PRODPROM = Convert.ToInt32(p.ID_PRODPROM);
                        lis.NOMBREPROD = Convert.ToString(p.NOMBREPROD);
                        lis.CANTIDAD = Convert.ToInt32(p.CANTIDAD);
                        lis.PRECIO = Convert.ToString(p.PRECIO);
                        lis.FECHAORDEN = Convert.ToString(p.FECHAORDEN);
                        lis.IMAGENPROD = Convert.ToString(p.IMAGENPROD);
                        lis.COMENTARIO = Convert.ToString(p.COMENTARIO);
                        lis.NOMBRE_ESTADO = Convert.ToString(p.NOMBRE_ESTADO);
                        lis.NOMBRES = Convert.ToString(p.NOMBRES);
                        oLisfiltro.Add(lis);
                    }
                    return obListafiltro;
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
