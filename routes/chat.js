
/*
 * GET users listing.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database:'sakila'
});


exports.list = function(req, res){
	connection.connect();
	connection.query("SELECT * FROM exam_info", function(err,rows, fields){
	    if(err){
	        throw err
	    }    
	    for(var i=0; i<rows.length;i++){
	        console.log(rows[i].area+" | "+rows[i].grade+" | "+rows[i].area_to+" | "+rows[i].exam_date);
	    }
	    res.render('chat', { title: '신청페이지' , documents: rows});	
		connection.end();
	});

	
};