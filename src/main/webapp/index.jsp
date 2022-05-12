<%@ page import="com.bill" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Bill Generation</title>

	<link rel="stylesheet" href="Views/bootstrap.min.css">
	<script src="Components/jquery-3.4.1.min.js"></script>
	<script src="Components/bill.js"></script>

</head>
<body>

	<div class="container"><div class="row"><div class="col-6">
	
	<h1>Bill Generation s</h1>

	<form id="formItem" name="formItem" method="post" action="items.jsp">
 		Owner Name:
			<input id="bname" name="bname" type="text" class="form-control form-control-sm">
		<br> Date:
			<input id="bdate" name="bdate" type="date" class="form-control form-control-sm">
		<br> Account Number:
			<input id="accno" name="accno" type="text" class="form-control form-control-sm">
		<br> Pre Reading:
			<input id="prereading" name="prereading" type="text" class="form-control form-control-sm">
		<br> Current Reading:
			<input id="curreading" name="curreading" type="text" class="form-control form-control-sm">
		<br>
		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
		<input type="hidden" id="hidbillIDSave" name="hidbillIDSave" value="">
	</form>


				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>

				<br>
	<div id="divItemsGrid">
 		<%
 		bill itemObj = new bill();
 		out.print(itemObj.readItems());
 		%>
	</div>
	</div>
	</div>
	</div>

</body>
</html>