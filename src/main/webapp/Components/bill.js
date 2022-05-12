$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

// save
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
 	$("#alertSuccess").text("");
 	$("#alertSuccess").hide();
 	$("#alertError").text("");
 	$("#alertError").hide();

	// Form validation-------------------
	var status = validateItemForm();
	if (status != true)
 	{
 		$("#alertError").text(status);
 		$("#alertError").show();
 		return;
 	}
	
	// If valid------------------------
	var type = ($("#hidbillIDSave").val() == "") ? "POST" : "PUT";
 	$.ajax(
 	{
 		url : "billAPI",
 		type : type,
 		data : $("#formItem").serialize(),
 		dataType : "text",
 		complete : function(response, status)
 	{
 
	onItemSaveComplete(response.responseText, status);
 	}
 });
	
	
});
	
// update	
$(document).on("click", ".btnUpdate", function(event)
{

				$("#hidbillIDSave").val(
					$(this).closest("tr").find('#hidbillIDUpdate').val());
 	$("#bname").val($(this).closest("tr").find('td:eq(0)').text());
	$("#bdate").val($(this).closest("tr").find('td:eq(1)').text());
 	$("#accno").val($(this).closest("tr").find('td:eq(2)').text());
 	$("#prereading").val($(this).closest("tr").find('td:eq(3)').text());
	$("#curreading").val($(this).closest("tr").find('td:eq(4)').text());
});

$(document).on("click", ".btnRemove", function(event)
{
 	$.ajax(
 	{
 		url : "billAPI",
 		type : "DELETE",
 		data : "billID=" + $(this).data("billID"),
 		dataType : "text",
 		complete : function(response, status)
 		{
 		onItemDeleteComplete(response.responseText, status);
 		}
 	});
});


// REMOVE==========================================
$(document).on("click", ".remove", function(event)
{
 	$(this).closest(".bill").remove();

 	$("#alertSuccess").text("Removed successfully.");
 	$("#alertSuccess").show();
});



function onItemSaveComplete(response, status)
	{
	if (status == "success")
	 	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} 
	else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	 	$("#hidbillIDSave").val("");
	 	$("#formItem")[0].reset();
	}
	
function onItemDeleteComplete(response, status)
{
	if (status == "success")
 	{
 		var resultSet = JSON.parse(response);
 		if (resultSet.status.trim() == "success")
 	{
 		$("#alertSuccess").text("Successfully deleted.");
 		$("#alertSuccess").show();
 		$("#divItemsGrid").html(resultSet.data);
 	} 
	else if (resultSet.status.trim() == "error")
 	{
 		$("#alertError").text(resultSet.data);
 		$("#alertError").show();
 	}
 	} 
		else if (status == "error")
 	{
 		$("#alertError").text("Error while deleting.");
 		$("#alertError").show();
 	} 
		else
 	{
 		$("#alertError").text("Unknown error while deleting..");
 		$("#alertError").show();
 	}
}

function validateItemForm()
{
	// NAME
	if ($("#bname").val().trim() == "")
 	{
 		return "Insert name.";
 	}
	// DATE
	if ($("#bdate").val().trim() == "")
 	{
 		return "Insert Date.";
 	}
	// ACCOUNT NUMBER
	if ($("#accno").val().trim() == "")
	{
 		return "Insert Account Number.";
 	}
	// PRE READING
	if ($("#prereading").val().trim() == "")
 	{
 		return "Insert Pre Reading Value.";
 	}
	// CURRENT READING
	if ($("#curreading").val().trim() == "")
	{
 		return "Insert Current Reading Value.";
 	}
	return true;
}
