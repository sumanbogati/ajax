/**
 * @author  Suman Bogati <http://jsgyan.blogspot.in/>
 */
(function (window) {
    var Ajax = {
		/**
			This Function initiates the XMLHttpRequeset Object,
			the object-path for commmunication between Client and Server.
		**/
        init: function () {
			if (window.XMLHttpRequest) {
                //IE7+, Firefox, Chrome, Opera, Safari
				this.http = new XMLHttpRequest();
            } else {
				// // IE 6 and older
                this.http = new ActiveXObject("Microsoft.XMLHTTP");
            }
												  
            this.onReadStateChange();
			
			// It triggers if some error occured with http request
            this.http.onerror = function (err) {
                console.log("Error " + err);
            };
			
			// It triggers if http request is interrupted
            this.http.onabort = function (evt) {
                console.log("Error abort " + evt);
            }
        },
		
		/**
			This function is used to send the http
			request to server, The paramter "path" expects for server path
			and "data" for sending to server.
		**/
        send: function (method, data, path, cb) {
			console.log('send');
			/** callback function is initiate and
			    will be invoked after got response from server **/
            this.cb = cb; 
			if(method == 'GET'){
				// To send data in GET method, we prepend '?' to the data
				path =  path+'?'+data; 
				data = null;
				this.http.open(method,  path, true);
			}	else {
				this.http.open(method,  path, true);
				
				/** It sends the data by using POST method as key pair value like,
				with name=suman&age=30, server gets value as name = suman; and age = 30; **/
				this.http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			}
			// Sending request to server
		    this.http.send(data); 
        }
		
		/**
			This Function triggers to show the HTTP request status, 
			it gets the data from server if request is succeed
		**/
        onReadStateChange: function () {
			console.log('init');
            var that = this;
            this.http.onreadystatechange = function (evt) {
				console.log('ready state ' + that.http.readyState + ' status code ' + that.http.status);
				// It means the fetch operation has been completed
                if (that.http.readyState == 4) {
                    if (typeof that.cb != 'undefined') {
						// 200, means http request is successful.
						// with readyState 4 means, data is downloaded successfully
                        if (that.http.status == 200) {
                            that.cb({'data' : that.http.responseText});
                        } else {
                            that.cb({'error' : evt});                            
                        }
                    }
                }
            }
        },
		
		
    };
    window.Ajax = Ajax;
})(window);