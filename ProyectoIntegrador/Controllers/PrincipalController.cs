using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Web.Mvc;
using Entity.LogOn;
using Business.LogOn;
using System.IO;
using System.Web.Script.Serialization;
using Entity.HG;
using Business.HG;
namespace ProyectoIntegrador.Controllers
{
    public class PrincipalController : Controller
    {
        string LocalImagen = Convert.ToString(ConfigurationManager.AppSettings["LocalCargaImg"]);
        B_LogOn _LogOn = new B_LogOn();
        B_HG _hg = new B_HG();
        // GET: Principal
        public ActionResult Principal()
        {
            if (Session["Session_Login"] == null)
            {
                return RedirectToAction("Login", "LogOn");
            }
            Usuario usuario = ((Usuario)Session["Session_Login"]);
            ViewBag.perfil = usuario.IDPERF;

            return View();
        }
        public ActionResult Promociones()
        {
            if (Session["Session_Login"] == null)
            {
                return RedirectToAction("Login", "LogOn");
            }
            Usuario usuario = ((Usuario)Session["Session_Login"]);
            ViewBag.perfil = usuario.IDPERF;
            return View();
        }
        public ActionResult Menu()
        {
            return View();
        }
        public ActionResult Nosotros()
        {
            if (Session["Session_Login"] == null)
            {
                return RedirectToAction("Login", "LogOn");
            }
            Usuario usuario = ((Usuario)Session["Session_Login"]);
            ViewBag.perfil = usuario.IDPERF;
            ViewBag.id_usuario = usuario.ID;
                return View();
        }
        public ActionResult Perfil()
        {
            if (Session["Session_Login"] == null)
            {
                return RedirectToAction("Login", "LogOn");
            }
            Usuario usuario = ((Usuario)Session["Session_Login"]);
            ViewBag.perfil = usuario.IDPERF;
            ViewBag.id_usuario = usuario.ID;
            return View();
        }
        [HttpPost]
        public ActionResult _Registrate(int __a, string __b)
        {
            return Json(_LogOn.B_Registrar_Usuario(__a, __b));
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult SubirArchivo(HttpPostedFileBase __archivo, string _b)
        {
            string _archivo = "";
            string _filelocal = "";
            string _doc_url = "";

            if (_archivo != null)
            {
                _filelocal = Path.GetFileName(__archivo.FileName);
                _archivo = String.Format("{0:ddMMyyyy_hhmmss}", DateTime.Now);

                string tipoArchivo = _filelocal.Substring(_filelocal.LastIndexOf("."), (_filelocal.Length - _filelocal.LastIndexOf("."))).ToLower();

                switch (tipoArchivo)
                {
                    case ".jpg":
                        __archivo.SaveAs(Path.Combine(LocalImagen, "Img_" + _archivo + ".jpg"));
                        _doc_url = "Img_" + _archivo + ".jpg";
                        break;
                    case ".jpeg":
                        __archivo.SaveAs(Path.Combine(LocalImagen, "Img_" + _archivo + ".jpeg"));
                        _doc_url = "Img_" + _archivo + ".jpeg";
                        break;
                    case ".png":
                        __archivo.SaveAs(Path.Combine(LocalImagen, "Img_" + _archivo + ".png"));
                        _doc_url = "Img_" + _archivo + ".png";
                        break;
                }

            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            var response = serializer.Serialize(_doc_url);
            return Content(response);

        }

        [HttpPost]
        public ActionResult _All(int __a, string __b)
        {
            return Json(_hg.B_All(__a, __b));
        }
        [HttpPost]
        public ActionResult _RegistrarPromo(int __a,string __b)
        {
            return Json(_hg.B_RegistrarProductoPromo(__a, __b));
        }

        public ActionResult OrdenesGlobales()
        {
            if (Session["Session_Login"] == null)
            {
                return RedirectToAction("Login", "LogOn");
            }
            Usuario usuario = ((Usuario)Session["Session_Login"]);
            ViewBag.perfil = usuario.IDPERF;
            ViewBag.id_usuario = usuario.ID;
            return View();
        }
    }
}