var mysql= require('mysql');
var express=require('express');
var multer, storage, path, crypto;
var fs = require('fs');
multer = require('multer')
path = require('path');
crypto = require('crypto');

const app=express();
const port=1225;
const ipAddress="10.0.2.2"

var con=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"kikicare_bd"
});

app.get('/', (req, res) => {
  res.send("Serveur KiKiCare");
    });
  
  app.post('/AddUser', function (req, res) {
  
    var first_name = req.query.first_name;
    var last_name = req.query.last_name;
    var email = req.query.email;
    var password = req.query.password;
    var url_image = req.query.url_image;
    var address = req.query.address;
    var phone = req.query.phone;
    var mode = req.query.mode;
  
    var sql = "INSERT INTO USER (email, first_name, last_name, password, url_image, address, phone, mode ) VALUES('" + email + "', '" + first_name + "' , '" + last_name + "', '" + password + "', '" + url_image + "', '" + address + "', '" + phone + "', '" + mode + "')";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("user " + email + " added !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("user " + email + " added !");
  
  });
  
  app.post('/UpdateUser', function (req, res) {
  
    var first_name = req.query.first_name;
    var last_name = req.query.last_name;
    var email = req.query.email;
    var url_image = req.query.url_image;
  
    var sql = "UPDATE USER set first_name = '" + first_name + "', last_name = '" + last_name + "', url_image =  '" + url_image + "' WHERE email LIKE '" + email + "'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("user " + email + " updated !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("user " + email + " added !");
  
  });
  
  app.post('/UpdateFullUser', function (req, res) {
  
    var first_name = req.query.first_name;
    var last_name = req.query.last_name;
    var email = req.query.email;
    var password = req.query.password;
    var phone = req.query.phone;
    var address = req.query.address;
    var url_image = req.query.url_image;
  
    var sql = "UPDATE USER set first_name = '" + first_name + "', last_name = '" + last_name + "', url_image =  '" + url_image + "', password =  '" + password + "', phone =  '" + phone + "', address =  '" + address + "' WHERE email LIKE '" + email + "'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("user " + email + " updated !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("user " + email + " added !");
  
  });
  
  app.get('/getUser', function (req, res) {
    var sql = "SELECT * FROM USER WHERE EMAIL LIKE '" + req.query.email + "'";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result[0]);
        console.log("get " + req.query.email);
      });
  });
  
  app.post('/AddAnimal', function (req, res) {
  
    var name = req.query.name;
    var id_user = req.query.id_user;
    var sexe = req.query.sexe;
    var type = req.query.type;
    var image = req.query.image;
    var date_nais = req.query.date_nais;
    var race = req.query.race;
    var size = req.query.size;
  
    var sql = "INSERT INTO ANIMAL (id_user, name, sexe, type, date_nais, race,size,image ) VALUES('" + id_user + "', '" + name + "' , '" + sexe+ "', '" + type + "', '" + date_nais + "', '" + race +"', '" + size +"', '" + image + "')";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("animal " + name + "added !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("animal " + name + " added !");
  
  });
  
  app.get('/getAnimal', function (req, res) {
    var sql = "SELECT * FROM ANIMAL WHERE  for_adoption=0 AND NAME LIKE '" + req.query.name +"'AND TYPE LIKE '" + req.query.type +"'AND id_user LIKE '" + req.query.id_user +"'";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result[0]);
        console.log("get " + req.query.name);
      });
  });
  
  
  app.get('/getAnimalsByUser', function (req, res) {
    var sql = "SELECT * FROM ANIMAL WHERE for_adoption= 0 and id_user ='" + req.query.id_user + "'";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result);
        console.log("get " + req.query.id_user);
      });
  });
  
  app.post('/deleteAnimal', function (req, res) {
  
    var sql = "DELETE animal, reminders FROM animal INNER JOIN reminders ON animal.id = reminders.id_animal WHERE animal.id='"+ req.query.id +"'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("animal " + req.query.name+ "deleted!");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("animal " + req.query.name+ "deleted!");
  
  });
  
  app.post('/updateAnimal', function (req, res) {
  
    var sql = "UPDATE ANIMAL SET name='" + req.query.name + "', race='" + req.query.race + "', size='" + req.query.size +"', date_nais='" + req.query.birth +"'where id='" + req.query.id + "'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("animal " + req.query.name+ "Updated !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("animal " + req.query.name+ "Updated!");
  
  });
  
  
  app.post('/AddReminders', function (req, res) {
    var id_user = req.query.id_user;
    var id_animal = req.query.id_animal;
    var next_date = req.query.next_date;
    var current_date = req.query.current_date;
    var next_date2 = req.query.next_date2;
    var next_date3 = req.query.next_date3;
    var next_date4 = req.query.next_date4;
    var next_date5 = req.query.next_date5;
    
   
  
    var sql = "INSERT INTO reminders (id_cat,id_user,id_animal,last_date,next_date) VALUES('" + 1+ "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+ "', '" + next_date+ "'), ('" + 2+ "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+ "', '" + next_date2+ "'),('" + 3 + "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+ "', '" + next_date3+ "'),('" + 4 + "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+ "', '" + next_date4+ "'),('" + 5 + "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+ "', '" + next_date5+ "')";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("reminders Cat added !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("reminders Cat added !");
  });
  
  
  app.post('/AddRemindersDog', function (req, res) {
    var id_user = req.query.id_user;
    var id_animal = req.query.id_animal;
    var next_date = req.query.next_date;
    var current_date = req.query.current_date;
    var next_date2 = req.query.next_date2;
    var next_date3 = req.query.next_date3;
    var next_date4 = req.query.next_date4;
    var next_date5 = req.query.next_date5;
    var next_date6 = req.query.next_date6;
    var next_date7 = req.query.next_date7;
    var next_date8 = req.query.next_date8;
  
   
  
    var sql = "INSERT INTO reminders (id_cat,id_user,id_animal,last_date,next_date) VALUES ('" + 1+ "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+ "', '" + next_date+ "'), ('" + 2+ "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+  "', '" + next_date2+ "'),('" + 3 + "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+  "', '" + next_date3+ "'),('" + 4 + "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+  "', '" + next_date4+ "'),('" + 5 + "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+  "', '" + next_date5+ "'),('" + 6+ "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+  "', '" + next_date6+ "'), ('" + 7+ "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+  "', '" + next_date7+ "'),('" + 8+ "', '" + id_user+ "' , '" + id_animal+"', '" + current_date+  "', '" + next_date8+ "')";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("reminders  Dog added !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("reminders Dog  added !");
  });
  
  
  
  app.post('/updateReminders', function (req, res) {
  
    var sql = "UPDATE reminders SET last_date = '" + req.query.last_date +"', next_date= '" + req.query.next_date +"' where id_animal='" + req.query.id_animal +"' and  id_cat= '" + req.query._cat + "'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("reminders Updated !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("Reminders  Updated !");
  
  });
  
  
  app.get('/getRemindersByAnimal', function (req, res) {
    var sql = "SELECT * FROM reminders WHERE id_user ='" + req.query.id_user + "' AND id_animal ='" + req.query.id_animal + "' ";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result[0]);
        console.log("get " + req.query.id_user);
      });
  });
  
  app.get('/getRemindersByUser', function (req, res) {
    var sql = "SELECT * FROM reminders WHERE id_user ='" + req.query.id_user + "'";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result);
        console.log("get all reminders !");
      });
  });
  
  app.post('/doneReminder', function (req, res) {
  
    var sql = "UPDATE reminders SET done=1 where id_animal='" + req.query.id_animal +"'  and id_cat= '" + req.query.id_cat + "'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("LostFound  Updated !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("Reminders  Updated !");
  
  });
  
  
  app.post('/AddFound', function (req, res) {
    var id_user = req.query.id_user;
    var type = req.query.type;
    var image = req.query.image;
    var place = req.query.place;
    var description = req.query.description;
    var date = req.query.date;
  
    var sql = "INSERT INTO LOST_AND_FOUND (id_user,type,place,description,image,date,found ) VALUES('" + id_user + "', '" + type + "' , '" + place+ "', '" + description+ "', '" + image +"', '" + date + "', 1)";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("found added !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("found   added !");
  });
  
  app.post('/AddLost', function (req, res) {
    var id_user = req.query.id_user;
    var type = req.query.type;
    var image = req.query.image;
    var place = req.query.place;
    var description = req.query.description;
    var date = req.query.date;
    var lost=1;
  
    var sql = "INSERT INTO LOST_AND_FOUND (id_user,type,place,description,image,date,lost ) VALUES('" + id_user + "', '" + type + "' , '" + place+ "', '" + description+ "', '" + image +"', '" + date + "' , '"+lost+ "')";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("lost  added !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("lost  added !");
  });
  
  
  app.get('/getAllFound', function (req, res) {
    var sql = "SELECT * FROM lost_and_found WHERE found like 1 ";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result);
        console.log("get  founds" );
      });
  });
  
  app.get('/getAllLost', function (req, res) {
    var sql = "SELECT * FROM lost_and_found WHERE lost like 1 ";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result);
        console.log("get  losts" );
      });
  });
  
  app.post('/deleteLostFound', function (req, res) {
  
    var sql = "DELETE FROM lost_and_found   WHERE id='"+ req.query.id +"'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("LostFound deleted!");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("LostFound deleted!");
  
  });
  
  app.post('/updateLostFound', function (req, res) {
  
    var sql = "UPDATE lost_and_found SET type='" + req.query.type + "', place='" + req.query.place + "', description='" + req.query.desc +"'where id='" + req.query.id + "'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("LostFound  Updated !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("lostFound Updated!");
  
  });
  
  app.post('/found', function (req, res) {
  
    var sql = "UPDATE lost_and_found SET done=1 where id= '" + req.query.id + "'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("LostFound  Updated !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("LostFound  Updated !");
  
  });
  
  
  
  
  app.post('/AddForAdoption', function (req, res) {
  
    var name = req.query.name;
    var id_user = req.query.id_user;
    var sexe = req.query.sexe;
    var type = req.query.type;
    var image = req.query.image;
    var date_nais = req.query.date_nais;
    var race = req.query.race;
    var size = req.query.size;
    var adoption=1;
  
    var sql = "INSERT INTO ANIMAL (id_user, name, sexe, type, date_nais, race,size,image,for_adoption ) VALUES('" + id_user + "', '" + name + "' , '" + sexe+ "', '" + type + "', '" + date_nais + "', '" + race +"', '" + size +"', '" + image + "', '" +adoption+ "')";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("animal " + name + "added !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("animal " + name + " added !");
  });
  
  
  
  app.get('/getAnimalAdoptionByUser', function (req, res) {
    var sql = "SELECT * FROM ANIMAL WHERE  for_adoption=1 AND state=0 AND NAME LIKE '" + req.query.name +"'AND TYPE LIKE '" + req.query.type +"'AND id_user LIKE '" + req.query.id_user +"'";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result[0]);
        console.log("get " + req.query.name);
      });
  });
  
  app.get('/getAllAdoption', function (req, res) {
    var sql = "SELECT * FROM ANIMAL WHERE for_adoption= 1 and state=0";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result);
        console.log("get all adoption ");
      });
  });
  
  app.post('/deleteAnimalAdopt', function (req, res) {
  
    var sql = "DELETE FROM ANIMAL where id='"+ req.query.id +"'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("animal " + req.query.name+ "deleted!");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("animal deleted!");
  
  });
  
  
  app.post('/doneAdoption', function (req, res) {
  
    var sql = "UPDATE ANIMAL SET state=1 where id= '" + req.query.id + "'";
  
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("animal " + req.query.name+ "Updated !");
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("animal  Updated!");
  
  });
  
  app.get('/getLastAnimal', function (req, res) {
    var sql = "SELECT id FROM ANIMAL WHERE for_adoption= 0 and id_user ='" + req.query.id_user + "' order by id desc limit 1";
      con.query(sql, function (err, result) {
        if(err) throw err;
        res.json(result[0]);
        console.log("get " + req.query.id_user);
      });
  });
  
  
  

  storage = multer.diskStorage({
      destination: './uploads/',
      filename: function(req, file, cb) {
        return crypto.pseudoRandomBytes(16, function(err, raw) {
          if (err) {
            return cb(err);
          }
          return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
        });
      }
    });
  
  
  // Post User Picture
  app.post(
    "/uploadUserImage",
    multer({
      storage: storage
    }).single('upload'), function(req, res) {
      console.log(req.file);
      console.log(req.body);
      res.redirect("/uploads/" + req.file.filename);
      var fileName = req.file.filename;
      console.log(req.file.filename);
      var sql = "SELECT id FROM USER ORDER BY ID DESC LIMIT 1";
        con.query(sql, function (err, result) {
          if(err) throw err;
          var sql = "UPDATE USER SET url_image = 'http://" + ipAddress + ":" + port + "/uploads/" + fileName + "' WHERE id = " + result[0].id;
            con.query(sql, function (err, result) {
              if(err) throw err;
              res.json(result[0]);
  
            });
        });
      return res.status(200).end();
    });
  
  app.get('/uploads/:upload', function (req, res){
    file = req.params.upload;
    console.log(req.params.upload);
    var img = fs.readFileSync(__dirname + "/uploads/" + file);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  
  });
  

app.listen(port, () => console.log("serveur listening on : " + port));
