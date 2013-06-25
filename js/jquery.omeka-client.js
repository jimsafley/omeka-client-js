( function( $ ) {
	$.omekaClient = function( apiBaseUrl ) {

		this.apiBaseUrl = apiBaseUrl;

		// Make a GET request.
		this.get = function( resource, id, query ) {
			return this.request( "GET", resource, id, null, query );
		};

		// Make a POST request.
		this.post = function( resource, data, query ) {
			return this.request( "POST", resource, null, data, query );
		};

		// Make a POST /files request.
		this.postFile = function( file, data, query ) {

			// Use the FormData interface to build the request body.
			var formData = new FormData();
			formData.append( "file", file );
			formData.append( "data", JSON.stringify( data ) );

			return $.ajax({
				url: this.apiBaseUrl + "/files?" + this.buildQuery( query ), 
				type: "POST", 
				data: formData, 
				processData: false, 
				contentType: false
			});
		};

		// Make a PUT request.
		this.put = function( resource, id, data, query ) {
			return this.request( "PUT", resource, id, data, query );
		};

		// Make a DELETE request.
		this.delete = function( resource, id, query ) {
			return this.request( "DELETE", resource, id, null, query );
		};

		// Set the authentication key.
		this.setKey = function( key ) {
			this.key = key;
		};

		// Make a request, returning the jQuery XHR object.
		this.request = function( type, resource, id, data, query ) {

			// Build the URL.
			var url = apiBaseUrl + "/" + resource;
			if ( id ) {
				var url = url + "/" + id;
			}
			url = url + "?" + this.buildQuery( query );

			// Make the request.
			var settings = { url: url, type: type };
			if ( "POST" === type || "PUT" === type ) {
				settings.data = JSON.stringify( data );
				settings.contentType = "application/json";
			}
			return $.ajax( settings );
		};

		// Build the URL query.
		this.buildQuery = function( query ) {
			if ( !query ) {
				query = {};
			}
			if ( this.key ) {
				query.key = this.key;
			}
			return $.param( query );
		}

		// Return this function.
		return this;
	}
})( jQuery );
