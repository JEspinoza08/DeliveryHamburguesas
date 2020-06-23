using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.HG;

namespace Business.HG
{
    public class B_HG
    {
        DA_HG _hg = new DA_HG();
        public Object B_RegistrarProductoPromo(int __a, string __b)
        {
            try
            {
                return new DA_HG().D_RegistrarProductoPromo(__a, __b);
            }catch(Exception ex)
            {
                throw ex;
            }
        }
        public Object B_All(int __a,string __b)
        {
            try
            {
                return new DA_HG().D_All(__a, __b);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
