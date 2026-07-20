<%@ Page Language="C#" %>
<%
Response.ContentType = "application/json";
var u = Context.User.Identity.Name ?? "";
u = u.Replace("\\", "\\\\").Replace("\"", "\\\"");
Response.Write("{\"user\":\"" + u + "\"}");
%>
