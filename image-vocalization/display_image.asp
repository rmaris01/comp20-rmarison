<body>
<%
response.write(request.form("<img src= '" & request.querystring("image") & "'/>"))
%>
</body>