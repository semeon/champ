exports.index = function(req, res){
  res.render('admin', 
  					{ title: 'Admin',
  						page: 'index',
  						user: req.user
  					});
};

exports.drivers = function(req, res){

  var data = [];

  data[0] = {};
  data[0].id = "pup";
  data[0].nick = "pup";
  data[0].name = "Basil Pupkin";
  data[0].email = "pup@mail.ru";
  data[0].tel = "+7 921 555 5555";

  data[1] = {};
  data[1].id = "pup2";
  data[1].nick = "pup2";
  data[1].name = "Basil Pupkin 2";
  data[1].email = "pup2@mail.ru";
  data[1].tel = "+7 921 555 5555";

  console.log(data);

  res.render('admin', 
            { title: 'Admin/Drivers',
              page: 'drivers',
              user: req.user,
              data: data
            });
};

