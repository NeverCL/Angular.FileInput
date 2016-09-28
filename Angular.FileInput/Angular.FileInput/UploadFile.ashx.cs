using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Angular.FileInput
{
    /// <summary>
    /// UploadFile 的摘要说明
    /// </summary>
    public class UploadFile : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            var ids = new List<long>();
            for (int i = 0; i < context.Request.Files.Count; i++)
            {
                ids.Add(i + 1);
            }
            context.Response.Write('[' + string.Join(",", ids) + ']');
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}