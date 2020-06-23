using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Entity.LogOn;
using Business.LogOn;

namespace ProyectoIntegrador.Controllers
{
    public class LogOnController : Controller
    {
        B_LogOn _LogOn = new B_LogOn();
        // GET: LogOn
        public ActionResult Login()
        {
            Session.Clear();
            return View();
        }
        public ActionResult CerrarSesion()
        {
            Session.Clear();
            return RedirectToAction("Login", "LogOn");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(Usuario usuario)
        {
            if (ModelState.IsValid)
            {
                Usuario obj = new Usuario();
                obj = (Usuario)_LogOn.B_Login(usuario);
                Session.Clear();
                Session["Session_Login"] = obj;
                if (obj.ID != 0)
                {
                    return RedirectToAction("Principal", "Principal");
                }
                else
                {
                    TempData["msgError"] = "Usuario y/o contraseña incorrecta.";
                    return RedirectToAction("Login", "LogOn");
                }
            }
            else
            {
                return RedirectToAction("Login", "LogOn");
            }
        }
        public ActionResult Registrate()
        {
            //if (Session["Session_Login"] == null)
            //{
            //    return RedirectToAction("Login", "LogOn");
            //}
            return View();
        }
        [HttpPost]
        public ActionResult _Registrate(int __a,string __b)
        {
            return Json(_LogOn.B_Registrar_Usuario(__a, __b));
        }
    }
}