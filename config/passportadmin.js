const LocalStrategy = require('passport-local');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const db = client.db('myapp');


module.exports = (passport)=> {
    passport.use('local-admin', new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done)=> {
        Admin.findOne({email: email})
        .then(admin=> {
            if(!admin) {
    
                return done(null, false, {message: 'Email is not registered'});
            }{
                bcrypt.compare(password, admin.password, (err, isMatch)=> {
                    if(err) throw err;
                    if(isMatch) {
                        return done(null, admin)
                    }else{
                        return done(null, false, {message: 'Password do not match'})
                    }
                })
            }

        })
    }) )
    passport.serializeUser((admin, done)=> {
        done(null, admin.id)
    });

    passport.deserializeUser((id, done)=> {
        Admin.findById(id, (err, admin)=> {
            done(err, admin)
        })
    })

    db.createUser({
        user: 'admin',
        pwd: 'password',
        roles: [{ role: 'readWrite', db: 'myapp' }]
      }, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
    });
    

    


 admin.save((err, admin) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Admin account added: ' + admin.email);
    }
 });
}