$(function(){
	
	// Toggle button to show navigation menu on mobile
	$('.navbar-toggle').click(function(){
		if ($(this).hasClass('collapsed')) {
			$('.site-nav').slideDown();
			$('.navbar-toggle').removeClass('collapsed');
		} else {
			$('.site-nav').slideUp(function(){
				$('.navbar-toggle').addClass('collapsed');
			});
		}
	});

	// Date range picker on visitor application form
	if ( $('#visitor-application_dates').length > 0 ) {
		$('#visitor-application_dates').dateRangePicker({
			format: 'DD-MM-YYYY',
			startOfWeek: 'monday',
			inline: true,
			container: '.boltforms-dates-row',
			alwaysOpen: true
		}).bind('datepicker-change',function(event,obj) {
			var a = moment(obj.date1);
			var b = moment(obj.date2);
			var diffDays = b.diff(a, 'days');
			$('#visitor-application_length').val(diffDays+1).change();
		});
	}

	// Show textarea for research outcomes on visitor application form
	$('#visitor-application_previous').change(function() {
    	if (this.checked) {
        	$('.boltforms-research-row').slideDown();
    	} else {
    		$('.boltforms-research-row').slideUp();
    	}
	});

	// Show special approval message on visitor application form
	$('#visitor-application_length, input[name="visitor-application[phd]"], input[name="visitor-application[airfare-type]"], input[name="visitor-application[accommodation-type]"]').change(function() {
		console.log('change');
    	if ( ( $('#visitor-application_phd_1:checked, #visitor-application_airfare-type_1:checked, #visitor-application_accommodation-type_1:checked').length > 0 ) || ( $(this).val() > 14) ) {
        	$('.boltform .approval-message').slideDown();
        	$('#visitor-application_standard').val('non-standard');
    	} else if ( ( $('#visitor-application_phd_1:checked, #visitor-application_airfare-type_1:checked, #visitor-application_accommodation-type_1:checked').length < 1 ) && ( $('#visitor-application_length').val() <= 14) ) {
    		$('.boltform .approval-message').slideUp();
    		$('#visitor-application_standard').val('standard');
    	}
	});

	// Move form hint text below form fields
	$('.visitor-application_publication-hint').insertAfter('#visitor-application_publication');

	// Show form hint on condition
	$('input[name="visitor-application[publication]"]').change(function() {
		if ( $('#visitor-application_publication_0:checked').length > 0 ) {
	    	$('.boltform .visitor-application_publication-hint').slideDown();
		} else if ( $('#visitor-application_publication_0:checked').length < 1 ) {
			$('.boltform .visitor-application_publication-hint').slideUp();
		}
	});

});


